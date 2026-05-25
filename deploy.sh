#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# UtilKit — one-time Droplet setup script
# Run as root on a fresh Ubuntu 22.04 Droplet:
#   chmod +x deploy.sh && sudo ./deploy.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# ── EDIT THESE BEFORE RUNNING ────────────────────────────────
DOMAIN="utilkit.us"
EMAIL="your@email.com"
REPO="https://github.com/PythonLive7104/utilkit_tool.git"
APP_DIR="/opt/utilkit"
# ─────────────────────────────────────────────────────────────

echo ""
echo "╔══════════════════════════════════════╗"
echo "║      UtilKit Droplet Deployment      ║"
echo "╚══════════════════════════════════════╝"
echo "  Domain : $DOMAIN"
echo "  Email  : $EMAIL"
echo ""

# 1. System packages
echo "[1/7] Installing system packages..."
apt-get update -qq
apt-get install -y -qq curl git nodejs npm

# 2. Docker
echo "[2/7] Installing Docker..."
curl -fsSL https://get.docker.com | sh
apt-get install -y -qq docker-compose-plugin

# 3. Clone repo
echo "[3/7] Cloning repository..."
if [ -d "$APP_DIR" ]; then
  echo "  Directory $APP_DIR already exists — pulling latest..."
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

# 4. Build React frontend
echo "[4/7] Building React frontend..."
cd frontend
npm ci --prefer-offline
VITE_SITE_URL="https://$DOMAIN" npm run build
cd ..

# 5. Backend .env
echo ""
echo "[5/7] Backend environment setup"
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo ""
  echo "  ┌─────────────────────────────────────────────────────┐"
  echo "  │  backend/.env has been created from the example.    │"
  echo "  │  Open a second terminal and fill in your secrets:   │"
  echo "  │                                                     │"
  echo "  │    nano $APP_DIR/backend/.env                       │"
  echo "  │                                                     │"
  echo "  │  Required values:                                   │"
  echo "  │    SECRET_KEY          (random 50-char string)      │"
  echo "  │    DATABASE_URL        (Supabase connection string) │"
  echo "  │    OPENAI_API_KEY                                   │"
  echo "  │    REMOVE_BG_API_KEY                                │"
  echo "  │    ALLOWED_HOSTS       $DOMAIN,www.$DOMAIN          │"
  echo "  └─────────────────────────────────────────────────────┘"
  echo ""
  read -rp "  Press Enter when backend/.env is ready..."
else
  echo "  backend/.env already exists — skipping."
fi

# 6. Start services (HTTP only) and get SSL cert
echo ""
echo "[6/7] Starting services and obtaining SSL certificate..."

docker compose up -d --build backend nginx

echo "  Waiting 5 seconds for nginx to be ready..."
sleep 5

docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# 7. Switch nginx to HTTPS and restart everything
echo ""
echo "[7/7] Enabling HTTPS..."

sed "s/utilkit\.io/$DOMAIN/g" nginx/nginx.ssl.conf > nginx/nginx.conf
docker compose exec nginx nginx -s reload
docker compose up -d certbot

echo ""
echo "╔══════════════════════════════════════╗"
echo "║         Deployment complete!         ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "  App  : https://$DOMAIN"
echo "  Admin: https://$DOMAIN/admin/"
echo ""
echo "  Useful commands:"
echo "    docker compose logs -f backend     # Django logs"
echo "    docker compose logs -f nginx       # Nginx logs"
echo "    docker compose restart backend     # Restart Django"
echo "    cd $APP_DIR && bash update.sh      # Deploy updates"
echo ""
