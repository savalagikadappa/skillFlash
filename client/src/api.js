// Centralized API helper
// Prefer explicit VITE_API_URL. Fallback: if running on Vercel (window.location) and no var, infer from origin root.
const inferred = (typeof window !== 'undefined') ? `${window.location.origin.replace(/\/$/,'')}` : '';
export const API_BASE = (import.meta.env.VITE_API_URL?.replace(/\/$/, '') || inferred).replace(/\/$/, '');

export const authHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function parseJSONSafe(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { success: false, error: 'Invalid JSON response', raw: text }; }
}

export const post = async (path, data, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(), ...(opts.headers || {}) },
    body: JSON.stringify(data)
  });
  const json = await parseJSONSafe(res);
  if(!res.ok) return { success: false, error: json.error || res.statusText, status: res.status };
  return json;
};

export const get = async (path, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...authHeader(), ...(opts.headers || {}) }
  });
  const json = await parseJSONSafe(res);
  if(!res.ok) return { success: false, error: json.error || res.statusText, status: res.status };
  return json;
};

