// Centralized API helper
// Priority: explicit VITE_API_URL -> fallback heuristic (production frontend on Vercel) -> current origin
const PUBLIC_BACKEND_FALLBACK = 'https://skillflash.onrender.com';
let computedBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
if (!computedBase && typeof window !== 'undefined') {
  const origin = window.location.origin.replace(/\/$/, '');
  // If we're on a vercel.app static deployment and no env provided, use known backend
  if (/vercel\.app$/i.test(new URL(origin).hostname)) {
    computedBase = PUBLIC_BACKEND_FALLBACK;
    console.warn('[api] VITE_API_URL missing at build time; using fallback backend', computedBase);
  } else {
    computedBase = origin; // local dev proxy (if configured) or same-origin backend
  }
}
export const API_BASE = computedBase.replace(/\/$/, '');

export const authHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function parseJSONSafe(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { success: false, error: 'Invalid JSON response', raw: text }; }
}

export const post = async (path, data, opts = {}) => {
  let response, json;
  const url = `${API_BASE}${path}`;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader(), ...(opts.headers || {}) },
      body: JSON.stringify(data)
    });
  } catch (networkErr) {
    return { success: false, error: 'Network error', detail: networkErr?.message };
  }
  json = await parseJSONSafe(response);
  if (!response.ok) {
    // Common production misconfig: frontend calling itself instead of backend -> HTML returned (invalid JSON) or 405
    if (response.status === 405) {
      return { success: false, error: 'Method Not Allowed (405). Backend URL likely incorrect (got static site). Check VITE_API_URL.' };
    }
    if (json.error === 'Invalid JSON response') {
      return { success: false, error: 'Unexpected non-JSON response (did you point API_BASE to the frontend?).', raw: json.raw?.slice(0,200) };
    }
    return { success: false, error: json.error || response.statusText, status: response.status };
  }
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

