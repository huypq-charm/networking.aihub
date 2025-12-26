import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
export function LoginPage() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!formData.email || !formData.password) {
        setError(t('login.error') || 'Vui lòng nhập đầy đủ thông tin');
        setIsLoading(false);
        return;
      }
      
      // Check if admin login
      if (formData.email.toLowerCase() === 'admin' && formData.password.toLowerCase() === 'admin') {
        navigate('/admin-dashboard');
        return;
      }
      
      // Regular user login
      const user = await api.login({
        username: formData.email,
        password: formData.password,
      });
      
      // Store userId for future API calls
      if (user._id || user.id) {
        localStorage.setItem('userId', (user._id || user.id).toString());
      }
      
      // Success - navigate to regular dashboard
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = (error as Error).message || t('login.error') || 'Đăng nhập thất bại';
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-[#0B0F17] text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button onClick={() => navigate('/')} className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors z-10">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Login Form Container */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t('login.title')}</h1>
          <p className="text-gray-400">{t('login.welcome')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1e293b] rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>}

            {/* Username Input */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('login.username') || 'Tên đăng nhập'}
              </label>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your username" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none transition-colors" required />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {t('login.password')}
              </label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 pr-12 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none transition-colors" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="w-4 h-4 rounded border-gray-600 bg-[#2d3748] text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer" />
                <span className="text-sm text-gray-400">
                  {t('login.rememberMe')}
                </span>
              </label>
              <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                {t('login.forgotPassword')}
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('login.loggingIn')}
                </> : t('login.loginButton')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1e293b] text-gray-400">
                {t('login.or')}
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {t('login.noAccount')}{' '}
              <button onClick={() => navigate('/partners')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                {t('login.signUp')}
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {t('login.termsText')}{' '}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('login.terms')}
            </button>{' '}
            {t('login.and')}{' '}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('login.privacy')}
            </button>
          </p>
        </div>
      </motion.div>
    </div>;
}