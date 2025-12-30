
import React, { useState } from 'react';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: name || email.split('@')[0],
      email: email
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-slate-950">
      <div className="max-w-md w-full glass p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-indigo-500 rounded-xl shadow-lg glow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355r2.73-1.477a11.952 11.952 0 004.591-4.591M12 21.355l-2.73-1.477a11.952 11.952 0 01-4.591-4.591M12 21.355V7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">VeriSight AI</h2>
        <p className="text-slate-400 text-center mb-8">Hallucination-Aware Knowledge Platform</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none" 
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none" 
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none" 
              placeholder="••••••••"
            />
          </div>
          <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.98]">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
