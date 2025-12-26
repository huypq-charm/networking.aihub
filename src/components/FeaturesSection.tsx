import React from 'react';
import { Briefcase, Globe, Laptop, Building2, Zap, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  features: string[];
  iconColor: string;
  index: number;
}
function FeatureCard({
  icon,
  title,
  subtitle,
  features,
  iconColor,
  index
}: FeatureCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} whileHover={{
    y: -5
  }} className="bg-[#151B28] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
      <div className={`mb-4 ${iconColor}`}>{icon}</div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => <li key={idx} className="flex items-center text-sm text-gray-300">
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${iconColor.replace('text-', 'bg-')}`}></span>
            {feature}
          </li>)}
      </ul>
    </motion.div>;
}
export function FeaturesSection() {
  const { t } = useLanguage();
  const features = [{
    icon: <Briefcase className="w-8 h-8" />,
    title: t('partners.ctvTitle'),
    subtitle: t('partners.ctvSubtitle'),
    features: [t('features.ctvFeature1'), t('features.ctvFeature2'), t('features.ctvFeature3')],
    iconColor: 'text-blue-400'
  }, {
    icon: <Globe className="w-8 h-8" />,
    title: t('partners.affiliateTitle'),
    subtitle: t('partners.affiliateSubtitle'),
    features: [t('features.affiliateFeature1'), t('features.affiliateFeature2'), t('features.affiliateFeature3')],
    iconColor: 'text-cyan-400'
  }, {
    icon: <Laptop className="w-8 h-8" />,
    title: t('partners.partnerTitle'),
    subtitle: t('partners.partnerSubtitle'),
    features: [t('features.partnerFeature1'), t('features.partnerFeature2'), t('features.partnerFeature3')],
    iconColor: 'text-indigo-400'
  }, {
    icon: <Building2 className="w-8 h-8" />,
    title: t('partners.agencyTitle'),
    subtitle: t('partners.agencySubtitle'),
    features: [t('features.agencyFeature1'), t('features.agencyFeature2'), t('features.agencyFeature3')],
    iconColor: 'text-purple-400'
  }, {
    icon: <Zap className="w-8 h-8" />,
    title: t('partners.staffTitle'),
    subtitle: t('partners.staffSubtitle'),
    features: [t('features.staffFeature1'), t('features.staffFeature2'), t('features.staffFeature3')],
    iconColor: 'text-orange-400'
  }, {
    icon: <Palette className="w-8 h-8" />,
    title: 'Creator & Influencer',
    subtitle: 'Content & Social Media',
    features: [t('features.creatorFeature1'), t('features.creatorFeature2'), t('features.creatorFeature3')],
    iconColor: 'text-pink-400'
  }];
  return <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('features.choosePath')}
        </h2>
        <p className="text-gray-400">
          {t('features.mainGroups')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => <FeatureCard key={index} {...feature} index={index} />)}
      </div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
          {t('features.exploreAll')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>;
}