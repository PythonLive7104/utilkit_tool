#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# UtilKit — redeploy latest code from GitHub
# Run from /opt/utilkit:  bash update.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="utilkit.us"

echo "==> Pulling latest code..."
git pull

echo "==> Rebuilding React frontend..."
cd frontend
npm ci --prefer-offline
VITE_SITE_URL="https://$DOMAIN" npm run build
cd ..

echo "==> Rebuilding and restarting backend..."
docker compose up -d --build backend

echo "==> Reloading nginx..."
docker compose exec nginx nginx -s reload

echo "==> Done! Running: https://$DOMAIN"
