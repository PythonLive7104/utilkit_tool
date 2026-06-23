#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# UtilKit — redeploy latest code from GitHub
# Run from /opt/utilkit:  bash update.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="utilkit.us"

echo "==> Pulling latest code..."
# deploy.sh generates nginx/nginx.conf from nginx.ssl.conf, which leaves the
# tracked file modified and blocks git pull. Reset it before pulling, then
# regenerate it afterwards from the (updated) HTTPS template.
git checkout -- nginx/nginx.conf 2>/dev/null || true
git pull
cp nginx/nginx.ssl.conf nginx/nginx.conf

# Ensure Node.js 20+ (marked and pdfjs-dist require Node >= 20). Ubuntu's apt
# Node is too old; install Node 20 LTS from NodeSource if missing/outdated.
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  echo "==> Upgrading to Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
echo "==> Using Node $(node --version)"

# Ensure swap exists. On a 1GB droplet the Vite production build (rollup/esbuild
# minification of large chunks) exceeds RAM and gets OOM-killed ("Killed").
if ! swapon --show | grep -q .; then
  echo "==> No swap found — creating 2G swap file..."
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Rebuilding React frontend..."
cd frontend
npm ci --prefer-offline
VITE_SITE_URL="https://$DOMAIN" npm run build
cd ..

echo "==> Rebuilding and restarting services..."
# Recreate the Postgres db, backend (runs migrations on start) AND nginx, so
# compose changes such as the shared media volume take effect — a reload alone
# won't remount. db starts first; backend waits for it via depends_on.
docker compose up -d --build db backend nginx

echo "==> Done! Running: https://$DOMAIN"
