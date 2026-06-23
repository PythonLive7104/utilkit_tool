import logging

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view, authentication_classes, permission_classes, throttle_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import EmailVerification
from .serializers import LoginSerializer, RegisterSerializer

logger = logging.getLogger(__name__)


class AuthThrottle(AnonRateThrottle):
    rate = '15/hour'


def _send_verification_email(user, token):
    """Email the advertiser a link that activates their account."""
    import resend

    if not settings.RESEND_API_KEY:
        logger.warning('Verification email not sent: RESEND_API_KEY unset (user %s)', user.email)
        return

    resend.api_key = settings.RESEND_API_KEY
    link = f'{settings.SITE_URL}/verify-email?token={token}'
    html = f"""
    <h2>Confirm your UtilKit advertiser account</h2>
    <p>Thanks for signing up to advertise on UtilKit. Confirm your email to activate
    your account and book adverts:</p>
    <p><a href="{link}"
          style="display:inline-block;padding:10px 18px;background:#4f46e5;color:#fff;
                 border-radius:8px;text-decoration:none;font-weight:600">Confirm my email</a></p>
    <p>Or paste this link into your browser:<br><a href="{link}">{link}</a></p>
    <p style="color:#888;font-size:13px">This link expires in 48 hours. If you didn't request
    this, you can ignore this email.</p>
    """
    try:
        resend.Emails.send({
            'from': settings.RESEND_FROM_EMAIL,
            'to': [user.email],
            'subject': 'Confirm your UtilKit account',
            'html': html,
        })
    except Exception:
        logger.exception('Failed to send verification email to %s', user.email)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def register(request):
    """Create an inactive advertiser account and email a verification link.

    If the email already belongs to a verified account we don't reveal that;
    we just tell the caller to check their inbox. An existing *unverified*
    account has its verification link rotated and resent.
    """
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    msg = {'detail': 'Account created. Check your email to confirm your account.'}

    existing = User.objects.filter(username=email).first()
    if existing:
        if existing.is_active:
            # Don't disclose that the account exists/verified — generic response.
            return Response({'detail': 'Check your email to confirm your account.'}, status=200)
        # Unverified: reset password to the latest one, rotate token, resend.
        existing.set_password(password)
        existing.save(update_fields=['password'])
        ev, _ = EmailVerification.objects.get_or_create(user=existing)
        ev.rotate()
        _send_verification_email(existing, ev.token)
        return Response(msg, status=201)

    user = User.objects.create_user(username=email, email=email, password=password, is_active=False)
    ev = EmailVerification.objects.create(user=user)
    _send_verification_email(user, ev.token)
    return Response(msg, status=201)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def verify_email(request):
    """Activate an account from its verification token and log the user in."""
    token = (request.data.get('token') or '').strip()
    if not token:
        return Response({'detail': 'Verification token is required.'}, status=400)

    ev = EmailVerification.objects.select_related('user').filter(token=token).first()
    if not ev:
        return Response({'detail': 'This verification link is invalid or has already been used.'}, status=400)
    if ev.is_expired:
        return Response({'detail': 'This verification link has expired. Please register again.'}, status=400)

    user = ev.user
    if not user.is_active:
        user.is_active = True
        user.save(update_fields=['is_active'])

    # Don't delete the token here. Email providers/security scanners often
    # pre-fetch links, which would consume a single-use token before the user
    # clicks it — making their real click fail. Keeping the token lets both the
    # scan and the click succeed; it stops working once is_expired (TTL) passes.
    auth_token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': auth_token.key, 'email': user.email})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def login(request):
    """Exchange email + password for an auth token."""
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    # Block unverified accounts with a clear, actionable message.
    pending = User.objects.filter(username=email, is_active=False).first()
    if pending:
        return Response(
            {'detail': 'Please confirm your email first. Check your inbox for the verification link.',
             'unverified': True},
            status=403,
        )

    user = authenticate(username=email, password=password)
    if not user:
        return Response({'detail': 'Incorrect email or password.'}, status=400)

    auth_token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': auth_token.key, 'email': user.email})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def resend_verification(request):
    """Resend the verification email for an unverified account."""
    email = (request.data.get('email') or '').strip().lower()
    user = User.objects.filter(username=email, is_active=False).first()
    if user:
        ev, _ = EmailVerification.objects.get_or_create(user=user)
        ev.rotate()
        _send_verification_email(user, ev.token)
    # Generic response either way.
    return Response({'detail': 'If that account needs confirming, we\'ve sent a new link.'})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    """Invalidate the caller's auth token."""
    Token.objects.filter(user=request.user).delete()
    return Response(status=204)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({'email': request.user.email})
