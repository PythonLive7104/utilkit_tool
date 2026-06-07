#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# UtilKit — redeploy latest code from GitHub
# Run from /opt/utilkit:  bash update.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="utilkit.us"

echo "==> Pulling latest code..."
git pull

# Ensure Node.js 20+ (marked and pdfjs-dist require Node >= 20). Ubuntu's apt
# Node is too old; install Node 20 LTS from NodeSource if missing/outdated.
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  echo "==> Upgrading to Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
echo "==> Using Node $(node --version)"

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
