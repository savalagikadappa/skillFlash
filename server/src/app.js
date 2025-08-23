const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// Enhanced CORS handling
const rawOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const allowAllIfEmpty = rawOrigins.length === 0; // fallback

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // same-origin / curl
    try {
      const host = new URL(origin).hostname;
      if (
        allowAllIfEmpty ||
        rawOrigins.includes(origin) ||
        rawOrigins.includes(host) ||
        /skillflash(-[a-z0-9]+)?\.vercel\.app$/i.test(host)
      ) {
        return cb(null, true);
      }
    } catch (_) { /* ignore */ }
    return cb(new Error('CORS: Origin not allowed: ' + origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// Explicit OPTIONS handling (some proxies strip automatic handling)
app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

module.exports = app;
