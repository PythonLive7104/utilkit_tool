#!/bin/sh
# Apply database migrations on container start, then run the given command
# (gunicorn). Keeps the deploy a single step — no manual migrate needed.
set -e

echo "==> Applying database migrations..."
python manage.py migrate --noinput

exec "$@"
