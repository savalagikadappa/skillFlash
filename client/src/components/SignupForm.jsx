import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { post } from '../api';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // API base handled centrally in api.js

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!showOtpField) {
      // Step 1: Request OTP
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      try {
  await post('/api/auth/signup', { email, password });
        setMessage('OTP sent to your email');
        setShowOtpField(true);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Signup failed');
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP
      if (!otp) {
        setError('Please enter the OTP');
        setLoading(false);
        return;
      }

      try {
        const response = await post('/api/auth/verify-otp', { email, otp });
        if(response.success){
          const { token } = response; // { success, message, token }
          login(token, { email });
        } else {
          setError(response.error || 'OTP verification failed');
        }
        setLoading(false); // Reset loading on success or handled failure
      } catch (error) {
        setError(error?.error || 'OTP verification failed');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase">Email</label>
        <input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading || showOtpField} className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-sm px-3 py-2 transition" />
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase">Password</label>
        <input type="password" placeholder="Strong password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading || showOtpField} className="w-full rounded-md bg-surface/70 border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-sm px-3 py-2 transition" />
      </div>
      {showOtpField && (
        <div className="space-y-2">
          <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase">OTP</label>
          <input type="text" placeholder="6-digit code" value={otp} onChange={(e)=>setOtp(e.target.value)} disabled={loading} className="w-full tracking-widest text-center rounded-md bg-surface/70 border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-sm px-3 py-2 transition" />
        </div>
      )}
      {message && <p className="text-sm text-emerald-400">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white tracking-wide shadow-md shadow-blue-900/30 hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Signup'}
      </button>
    </form>
  );
};

export default SignupForm;