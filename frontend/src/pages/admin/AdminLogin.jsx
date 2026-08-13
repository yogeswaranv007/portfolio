import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../../services/portfolioService';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.login(email, password);
      toast.success("Login Successful");
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card p-8 md:p-10 w-full max-w-md rounded-3xl relative z-10 shadow-2xl border-borders/50"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary border border-primary/20">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-text text-center">Admin Access</h1>
          <p className="text-text/60 mt-2 text-sm text-center flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text/90 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full p-4 rounded-xl bg-background/50 border border-borders focus:border-primary text-text focus:outline-none transition-all focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]"
              placeholder="admin@yogeswaran.dev"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text/90 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full p-4 rounded-xl bg-background/50 border border-borders focus:border-primary text-text focus:outline-none transition-all focus:shadow-[0_0_15px_rgba(37,99,235,0.15)]"
              placeholder="Enter secure password"
              required
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-2 ml-1">
                {error}
              </motion.p>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2 group hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-text/50 hover:text-primary transition-colors">
            &larr; Return to Public Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}
