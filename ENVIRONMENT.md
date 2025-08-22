# Environment Configuration

Frontend (Vercel) and backend (Render) deploy separately. Use these variables:

## Backend (.env on Render or local `server/.env`)
```
MONGODB_URI=YOUR_FULL_MONGODB_ATLAS_URI
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
EMAIL_USER=YOUR_GMAIL_ADDRESS
EMAIL_PASS=APP_SPECIFIC_PASSWORD
PORT=5000
CORS_ORIGIN=https://your-vercel-domain.vercel.app,http://localhost:5173
```

Notes:
- If multiple origins supply comma list in `CORS_ORIGIN` and parse in code (future enhancement).
- Keep `JWT_SECRET` different between staging/production.

## Frontend (Vercel) variables
```
VITE_API_URL=https://skillflash.onrender.com
```

## Local Development
Create `client/.env` with:
```
VITE_API_URL=http://localhost:5000
```
Create `server/.env` with values from the backend section (local secrets).

## Gotchas
- Vite only exposes variables prefixed with `VITE_` to the client.
- Restart dev servers after editing env files.
- Never commit real secrets; only examples and docs.
