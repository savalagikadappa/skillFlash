# Welcome to Skillflash

Discover top-notch freelance opportunities that empower creativity and innovation.

## Deployment

### Frontend (Vercel)
From `client/` directory:

```
vercel --prod
```

We include a `client/vercel.json` that ensures any deep link (e.g. `/login`, `/post-task`) rewrites to `index.html` so the React app can handle routing. Without this, refreshing a non-root page returns a 404.

### Backend (Render or similar)
Start command: `node src/server.js`
Environment variables required: `MONGODB_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `CORS_ORIGIN` (comma separated origins), `PORT` (optional).

### Local Dev
Frontend: `npm run dev` inside `client/`
Backend: `npm run dev` inside `server/`

Ensure `client/.env` contains `VITE_API_URL=http://localhost:5000` (or your backend port).