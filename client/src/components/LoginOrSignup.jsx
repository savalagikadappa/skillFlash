import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { AuthContext } from './AuthContext';
import freelanceImg from '../assets/freelance.png';
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
    <div className="relative min-h-screen w-full flex items-stretch bg-black overflow-hidden">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -right-40 w-[34rem] h-[34rem] bg-blue-600/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[34rem] h-[34rem] bg-cyan-600/30 blur-[140px] rounded-full" />
      </div>
      {/* Left image panel */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-12 lg:p-20">
        <div className="relative z-10 w-full max-w-lg">
          <img src={freelanceImg} alt="Freelancing" className="w-full rounded-2xl shadow-2xl shadow-blue-900/40 ring-1 ring-white/10 object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
      </div>
      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-24 relative">
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight"><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">{isLogin ? 'Welcome Back' : 'Create Account'}</span></h1>
            <p className="text-gray-400 text-sm">{isLogin ? 'Access your dashboard and keep hiring moving.' : 'Join SkillFlash and start in under a minute.'}</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/40 border border-white/10 shadow-xl backdrop-blur-md">
            <div className="flex p-1 rounded-xl bg-surface/60 border border-white/5 mb-8">
              <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${isLogin ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow lg:shadow-blue-900/30' : 'text-gray-400 hover:text-white'}`}>Login</button>
              <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${!isLogin ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow lg:shadow-blue-900/30' : 'text-gray-400 hover:text-white'}`}>Signup</button>
            </div>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <div className="mt-8 text-center text-xs text-gray-500">
              By continuing you agree to our <span className="text-gray-300 hover:text-white cursor-pointer">Terms</span> & <span className="text-gray-300 hover:text-white cursor-pointer">Privacy Policy</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignup;