import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { AuthContext } from './AuthContext';
// Tailwind styling applied

const LoginOrSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // Redirect if already logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 card">
        <div className="flex justify-center gap-3">
          <button onClick={() => setIsLogin(true)} disabled={isLogin} className={`flex-1 py-2 rounded-md text-sm font-medium border transition ${isLogin ? 'bg-accent text-white border-accent' : 'bg-surface text-gray-300 border-white/10 hover:border-accent/40'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} disabled={!isLogin} className={`flex-1 py-2 rounded-md text-sm font-medium border transition ${!isLogin ? 'bg-accent2 text-white border-accent2' : 'bg-surface text-gray-300 border-white/10 hover:border-accent2/40'}`}>Signup</button>
        </div>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default LoginOrSignup;