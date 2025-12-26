import React from 'react';
import { Globe, Network, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
export function Header() {
  const navigate = useNavigate();
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };
  return <motion.header initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.6,
    delay: 0.2,
    ease: [0.16, 1, 0.3, 1]
  }} className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F17]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20">
              <Network className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-wide text-sm leading-tight">
                {t('header.title')}
              </span>
              <span className="text-blue-200/60 text-xs font-medium">
                {t('header.subtitle')}
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors border border-white/5" aria-label="Toggle Language">
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            <button onClick={() => navigate('/login')} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 border border-white/10 hover:border-white/20">
              <LogIn className="w-4 h-4" />
              {t('header.login')}
            </button>

            <button onClick={() => navigate('/partners')} className="hidden sm:block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-900/20">
              {t('header.getStarted')}
            </button>
          </div>
        </div>
      </div>
    </motion.header>;
}