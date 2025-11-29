from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_submit(request):
    """
    Handle contact form submission from ContactPage.tsx
    Accepts: name, email, message
    """
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    message = request.data.get('message', '').strip()

    # Basic validation
    if not name or not email or not message:
        return Response({'error': 'All fields are required.'}, status=400)

    # Optional: Save to DB (you can create a Contact model later)
    # Contact.objects.create(name=name, email=email, message=message)

    # Send notification email (if email backend is configured)
    try:
        send_mail(
            subject=f"UC-Collection Contact: {name}",
            message=f"From: {name}\nEmail: {email}\n\nMessage:\n{message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
            fail_silently=True,
        )
    except Exception as e:
        print("Email send failed:", e)

    # Return success response
    return Response({'success': True, 'message': 'Thank you for contacting us!'})