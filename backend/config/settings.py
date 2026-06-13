from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='django-insecure-dev-key-change-in-production')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'corsheaders',
    # Local apps
    'url_shortener',
    'temp_email',
    'bg_remover',
    'ai_tools',
    'payments',
    'contact',
    'advertising',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ── Database ─────────────────────────────────────────────────
DATABASE_URL = config('DATABASE_URL', default='')

if DATABASE_URL:
    import dj_database_url
    _db = dj_database_url.parse(DATABASE_URL, conn_max_age=600, ssl_require=True)
    DATABASES = {'default': _db}
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# ── Auth ─────────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ── Internationalisation ──────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ── Static & media files ─────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── DRF ──────────────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
    'DEFAULT_PARSER_CLASSES': ['rest_framework.parsers.JSONParser', 'rest_framework.parsers.MultiPartParser'],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/min',
    },
}

# ── CORS ─────────────────────────────────────────────────────
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = config(
        'CORS_ALLOWED_ORIGINS',
        default='https://utilkit.io',
        cast=Csv(),
    )
CORS_ALLOW_METHODS = ['GET', 'POST', 'DELETE', 'OPTIONS']

# ── App-specific config ───────────────────────────────────────
REMOVE_BG_API_KEY    = config('REMOVE_BG_API_KEY', default='')
OPENAI_API_KEY       = config('OPENAI_API_KEY', default='')
# Dodo Payments (Merchant of Record). DODO_URL is the API host — use
# https://test.dodopayments.com while developing and the live host in prod.
# DODO_WEBHOOK_SECRET is the 'whsec_...' value shown when you add the webhook
# endpoint. DODO_ADVERT_ID is the product that backs every advert booking.
DODO_API_KEY         = config('DODO_API_KEY', default='')
DODO_WEBHOOK_KEY     = config('DODO_WEBHOOK_SECRET', default='')
DODO_API_BASE        = config('DODO_URL', default='https://live.dodopayments.com').rstrip('/')
DODO_ADVERT_PRODUCT_ID = config('DODO_ADVERT_ID', default='')
# Public site origin Dodo redirects the advertiser back to after checkout.
SITE_URL             = config('SITE_URL', default='https://utilkit.us')
RESEND_API_KEY       = config('RESEND_API_KEY', default='')
RESEND_FROM_EMAIL    = config('RESEND_FROM_EMAIL', default='noreply@utilkit.io')
CONTACT_EMAIL        = config('CONTACT_EMAIL', default='')
TEMP_EMAIL_DOMAINS = config('TEMP_EMAIL_DOMAINS', default='tempmail.dev,mailnull.io,throwaway.email', cast=Csv())
TEMP_EMAIL_EXPIRY_MINUTES = config('TEMP_EMAIL_EXPIRY_MINUTES', default=30, cast=int)

# Max upload size: 25 MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 25 * 1024 * 1024
FILE_UPLOAD_MAX_MEMORY_SIZE = 25 * 1024 * 1024
