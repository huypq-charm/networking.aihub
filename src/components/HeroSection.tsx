import React, { Children } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
export function HeroSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return <motion.section initial="hidden" animate="visible" variants={containerVariants} className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
      {/* Badge */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151B28] border border-blue-500/30 text-blue-200 mb-8">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium">
          {t('hero.badge')}
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
        <span className="text-white block mb-2">{t('hero.title1')}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500">
          {t('hero.title2')}
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl text-gray-300 font-medium mb-4 max-w-3xl">
        {t('hero.subtitle')}
      </motion.h2>

      {/* Description */}
      <motion.p variants={itemVariants} className="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl leading-relaxed">
        {t('hero.description')}
      </motion.p>

      {/* CTA Button */}
      <motion.button onClick={() => navigate('/partners')} variants={itemVariants} whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.98
    }} className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-900/30 ring-1 ring-white/10 transition-shadow hover:shadow-2xl hover:shadow-blue-900/40">
        <span>{t('hero.cta')}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Background Glow Effect */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 1.2,
      delay: 0.5,
      ease: 'easeOut'
    }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </motion.section>;
}