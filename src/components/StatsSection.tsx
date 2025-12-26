import React from 'react';
import { Users, Network, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  colorClass: string;
  bgClass: string;
  index: number;
}
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};
function StatCard({
  icon,
  value,
  label,
  colorClass,
  bgClass,
  index
}: StatCardProps) {
  return <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{
    once: true,
    margin: '-100px'
  }} variants={cardVariants} whileHover={{
    y: -4
  }} transition={{
    duration: 0.3
  }} className="group relative p-6 rounded-2xl bg-[#151B28] border border-white/5 hover:border-white/10 shadow-lg">
      <motion.div whileHover={{
      scale: 1.1
    }} transition={{
      duration: 0.3
    }} className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center mb-4`}>
        <div className={colorClass}>{icon}</div>
      </motion.div>
      <div className="text-3xl font-bold text-white mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-gray-400 text-sm font-medium">{label}</div>
    </motion.div>;
}
export function StatsSection() {
  const { t } = useLanguage();
  const stats = [{
    icon: <Users className="w-6 h-6" />,
    value: '20,000+',
    label: t('stats.activePartners'),
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10'
  }, {
    icon: <Network className="w-6 h-6" />,
    value: '500+',
    label: t('stats.activeCampaigns'),
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10'
  }, {
    icon: <TrendingUp className="w-6 h-6" />,
    value: '$2.5M+',
    label: t('stats.monthlyPayouts'),
    colorClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10'
  }, {
    icon: <Globe className="w-6 h-6" />,
    value: '1,000+',
    label: t('stats.websitesInSystem'),
    colorClass: 'text-green-400',
    bgClass: 'bg-green-500/10'
  }];
  return <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <StatCard key={index} index={index} icon={stat.icon} value={stat.value} label={stat.label} colorClass={stat.colorClass} bgClass={stat.bgClass} />)}
      </div>
    </section>;
}