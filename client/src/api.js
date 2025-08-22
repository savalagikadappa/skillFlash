// Centralized API helper
// Prefer explicit VITE_API_URL. Fallback: if running on Vercel (window.location) and no var, infer from origin root.
const inferred = (typeof window !== 'undefined') ? `${window.location.origin.replace(/\/$/,'')}` : '';
export const API_BASE = (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || inferred).replace(/\/$/, '');

export const authHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const post = (path, data, opts = {}) => fetch(`${API_BASE}${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...authHeader(), ...(opts.headers || {}) },
  body: JSON.stringify(data)
}).then(r => r.json());

export const get = (path, opts = {}) => fetch(`${API_BASE}${path}`, {
  headers: { ...authHeader(), ...(opts.headers || {}) }
}).then(r => r.json());

