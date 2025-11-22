from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    """Serializer that exposes `phone`, `about`, and `avatar` as top-level
    fields on the User payload while storing them on the related Profile model.

    Important behaviour:
    - Reads: top-level fields are returned from Profile (if it exists).
    - Writes: top-level fields are accepted and the create/update methods will
      create or update the Profile accordingly (no nested `profile` key).
    """

    phone = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    about = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    avatar = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    action = serializers.CharField(write_only=True, required=False)
    old_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    confirm_password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",    # kept for compatibility but we'll fill it from email if missing
            "email",
            "password", # field only for create
            "first_name",
            "is_active",
            "phone",
            "about",
            "avatar",
            # security/action fields (write-only)
            "action",
            "old_password",
            "new_password",
            "confirm_password",
        ]
        read_only_fields = ["id", "is_active"]
        extra_kwargs = {
            # password is write-only. We'll enforce required-on-create in validate()
            "password": {"write_only": True},
            "email": {"required": True},
            "username": {"required": False},  # we'll set it automatically if not provided
        }

    def to_representation(self, instance):
        """Return top-level profile fields taken from the related Profile if present.
        This keeps the serialized payload flat (no nested `profile` key).
        """
        data = super().to_representation(instance)
        # fetch profile safely
        profile = getattr(instance, 'profile', None)
        if profile:
            data['phone'] = profile.phone
            data['about'] = profile.about
            data['avatar'] = profile.avatar
        else:
            # ensure keys exist and are null when profile missing
            data['phone'] = None
            data['about'] = None
            data['avatar'] = None
        return data

    def validate(self, attrs):
        """
        - Ensure username exists by copying from email when not provided.
        - Enforce password required on create only.
        - If action == 'update_security', validate old/new/confirm passwords and run password validators.
        - If password is present (create OR explicit update via 'password' field), validate it with Django validators.
        """
        request = self.context.get('request')
        is_create = getattr(self, "instance", None) is None

        # Ensure username present (derive from email if missing)
        if not attrs.get("username") and attrs.get("email"):
            attrs["username"] = attrs["email"]

        # On create, password must be present
        password = attrs.get("password")
        if is_create and not password:
            raise serializers.ValidationError({"password": "This field is required for creating a user."})

        # If action is update_security, enforce security-specific validations
        new_password = attrs.get("new_password")
        if new_password:
            # must be authenticated
            if not request or not hasattr(request, "user") or not request.user.is_authenticated:
                raise serializers.ValidationError("Authentication required to change password.")

            old_password = attrs.get("old_password")
            confirm_password = attrs.get("confirm_password")

            # ensure required
            missing = {}
            if not old_password:
                missing["old_password"] = "This field is required for password change."
            if not new_password:
                missing["new_password"] = "This field is required for password change."
            if not confirm_password:
                missing["confirm_password"] = "This field is required for password change."
            if missing:
                raise serializers.ValidationError(missing)

            # check old password correctness
            user = request.user
            if not user.check_password(old_password):
                raise serializers.ValidationError({"old_password": "Old password is incorrect."})

            # new != old
            # if old_password and new_password and old_password == new_password:
            #     raise serializers.ValidationError({"new_password": "New password must be different from the old password."})

            # new == confirm
            if new_password != confirm_password:
                raise serializers.ValidationError({"confirm_password": "New password and confirm password do not match."})

            # run django password validators for new password
            # try:
            #     validate_password(new_password, user=user)
            # except Exception as exc:
            #     # exc may be a Django ValidationError with message list
            #     raise serializers.ValidationError({"new_password": list(exc.messages)})

        # If a direct 'password' field is provided (create or explicit update),
        # validate it with Django validators as well.
        # if password:
        #     try:
        #         validate_password(password, user=getattr(self, "instance", None))
        #     except Exception as exc:
        #         raise serializers.ValidationError({"password": list(exc.messages)})

        return attrs

    def create(self, validated_data):
        # extract profile-like fields (they were sent at top-level)
        phone = validated_data.pop("phone", None)
        about = validated_data.pop("about", None)
        avatar = validated_data.pop("avatar", None)

        # remove security/action fields if present (they are not user model fields)
        validated_data.pop("action", None)
        validated_data.pop("old_password", None)
        validated_data.pop("new_password", None)
        validated_data.pop("confirm_password", None)

        password = validated_data.pop("password", None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()

        # create profile if any profile data present
        profile_data = {}
        if phone is not None:
            profile_data["phone"] = phone
        if about is not None:
            profile_data["about"] = about
        if avatar is not None:
            profile_data["avatar"] = avatar

        if profile_data:
            Profile.objects.create(user=user, **profile_data)

        return user

    def update(self, instance, validated_data):
        """
        Update user fields. Supports:
         - normal profile update (email, first_name, phone, about, avatar)
         - security update when validated_data['action'] == 'update_security'
           (will set the new password using validated_data['new_password'])
        """

        # Determine if this is a security update
        action = validated_data.pop("action", None)

        # extract profile-like fields (they were sent at top-level)
        phone = validated_data.pop("phone", None)
        about = validated_data.pop("about", None)
        avatar = validated_data.pop("avatar", None)

        # security fields
        old_password = validated_data.pop("old_password", None)
        new_password = validated_data.pop("new_password", None)
        confirm_password = validated_data.pop("confirm_password", None)

        # If this is the security action, just change password on the current user (instance)
        if new_password is not None:
            # NOTE: validation already checked old_password/new_password/confirm_password
            if new_password:
                instance.set_password(new_password)
                instance.save()
            return instance

        # Otherwise proceed with normal update flow (edit)
        # If developer included `password` field directly in edit (not recommended),
        # we'll accept and set it — otherwise password is optional and not required.
        password = validated_data.pop("password", None)

        # update user fields (email, first_name, username, etc.)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        # update or create profile
        profile_defaults = {}
        if phone is not None:
            profile_defaults["phone"] = phone
        if about is not None:
            profile_defaults["about"] = about
        if avatar is not None:
            profile_defaults["avatar"] = avatar

        if profile_defaults:
            Profile.objects.update_or_create(user=instance, defaults=profile_defaults)

        return instance
