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

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await post('/api/auth/login', { email, password });
      if(response?.success){
        const { token } = response; // { success, message, token }
        login(token, { email });
      } else {
        setError(response?.error || 'Login failed');
      }
      setLoading(false); // Ensure loading is reset on success
    } catch (error) {
      setError(error?.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wide text-gray-400">Email</label>
        <input type="email" className="w-full rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent text-sm px-3 py-2" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wide text-gray-400">Password</label>
        <input type="password" className="w-full rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent text-sm px-3 py-2" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading} />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
};

export default LoginForm;