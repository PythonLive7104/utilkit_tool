Visit https://utilkit.us to access the app.

## Deploying to Vercel

UtilKit is a static Vite + React site — every tool runs in the browser, so there is no backend.

1. Import the repository in Vercel and set **Root Directory** to `frontend`.
2. Add the environment variables from `frontend/.env.example` (`VITE_SITE_URL`, `VITE_DODO_MODE`, `VITE_DODO_SUPPORT_PRODUCT`).
3. Deploy. Build settings, redirects and SPA fallback come from `frontend/vercel.json`.

Local development: `cd frontend && npm install && npm run dev`.
