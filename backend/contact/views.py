from django.conf import settings
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response


class ContactThrottle(AnonRateThrottle):
    rate = '5/hour'


@api_view(['POST'])
@throttle_classes([ContactThrottle])
def contact(request):
    import resend

    name = (request.data.get('name') or '').strip()
    email = (request.data.get('email') or '').strip()
    subject = (request.data.get('subject') or '').strip()
    message = (request.data.get('message') or '').strip()

    if not all([name, email, subject, message]):
        return Response({'detail': 'All fields are required.'}, status=400)

    resend.api_key = settings.RESEND_API_KEY

    html = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr>
    <p>{message.replace(chr(10), '<br>')}</p>
    """

    resend.Emails.send({
        'from': settings.RESEND_FROM_EMAIL,
        'to': [settings.CONTACT_EMAIL],
        'reply_to': email,
        'subject': f'Contact: {subject}',
        'html': html,
    })

    return Response({'detail': 'Message sent successfully.'})
