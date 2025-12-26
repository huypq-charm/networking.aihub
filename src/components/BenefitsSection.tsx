import React from 'react';
import { Shield, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
export function BenefitsSection() {
  const { t } = useLanguage();
  const benefits = [{
    icon: <Shield className="w-8 h-8" />,
    title: t('benefits.autoSystem'),
    description: t('benefits.autoSystemDesc'),
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  }, {
    icon: <Zap className="w-8 h-8" />,
    title: t('benefits.aiMentor'),
    description: t('benefits.aiMentorDesc'),
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  }, {
    icon: <Award className="w-8 h-8" />,
    title: t('benefits.fiveLevels'),
    description: t('benefits.fiveLevelsDesc'),
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  }];
  return <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {benefits.map((benefit, index) => <motion.div key={index} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: index * 0.2
      }} className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center mb-6 ${benefit.color}`}>
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {benefit.description}
            </p>
          </motion.div>)}
      </div>
    </section>;
}