from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction

class Command(BaseCommand):
    help = "Copy password from user 3 to user 1"

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                source_user = User.objects.get(pk=3)
                target_user = User.objects.get(pk=1)
                target_user.username = target_user.email
                target_user.save()

                # target_user.password = source_user.password  # copy the hashed password
                # target_user.save(update_fields=['password'])

                self.stdout.write(self.style.SUCCESS(
                    f"✅ Password from user '{source_user.username}' copied to '{target_user.username}'."
                ))
        except User.DoesNotExist as e:
            self.stdout.write(self.style.ERROR(f"❌ User not found: {e}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"⚠️ Error occurred: {e}"))
