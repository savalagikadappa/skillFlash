import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { post } from '../api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // API base handled centrally
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await post('/api/auth/login', { email, password });
      if(response?.success){
        const { token } = response; // { success, message, token }
        login(token, { email });
      } else {
        setError(response?.error || 'Login failed');
      }
      setLoading(false);
    } catch (error) {
      setError(error?.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent p-4 text-[11px] leading-relaxed text-blue-300">
        <strong className="block text-blue-200 mb-1 tracking-wide">Demo Account</strong>
        Try instantly:<br />
        Email: <code className="font-mono">temp@gmail.com</code> · Password: <code className="font-mono">1234</code>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase">Email</label>
        <input type="email" className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-3 py-2 transition" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase">Password</label>
        <input type="password" className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-3 py-2 transition" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading} />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white tracking-wide shadow-md shadow-blue-900/30 hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;