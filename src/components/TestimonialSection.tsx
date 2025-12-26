import React from 'react';
import { Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
export function TestimonialSection() {
  const { t } = useLanguage();
  return <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} whileInView={{
      opacity: 1,
      scale: 1
    }} viewport={{
      once: true
    }} className="relative bg-[#111827] rounded-3xl p-8 md:p-12 border border-blue-900/30 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
            <Gem className="w-6 h-6 text-blue-400" />
          </div>

          <blockquote className="text-lg md:text-xl text-gray-200 font-medium italic mb-6 leading-relaxed max-w-3xl">
            {t('testimonial.quote')}
          </blockquote>

          <cite className="text-blue-400 text-sm font-semibold not-italic">
            {t('testimonial.author')}
          </cite>
        </div>
      </motion.div>
    </section>;
}