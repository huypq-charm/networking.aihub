import React from 'react';
import { ArrowLeft, Briefcase, Globe, Laptop, Building2, Zap, Palette, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
interface PartnerCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  accessLevel: string;
  potentialIncome: string;
  color: string;
  buttonColor: string;
  index: number;
  onSelect: () => void;
}
function PartnerCard({
  icon,
  title,
  subtitle,
  description,
  features,
  accessLevel,
  potentialIncome,
  color,
  buttonColor,
  index,
  onSelect
}: PartnerCardProps) {
  const { t } = useLanguage();
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: index * 0.1
  }} className="bg-[#151B28] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all flex flex-col h-full group hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-white/5 ${color}`}>{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-6 leading-relaxed min-h-[40px]">
        {description}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, idx) => <li key={idx} className="flex items-start text-sm text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${color.replace('text-', 'bg-')}`}></span>
            {feature}
          </li>)}
      </ul>

      <div className="border-t border-white/5 pt-4 mb-6">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">{t('partners.accessLevel')}</span>
          <span className="text-gray-500">{t('partners.potentialIncome')}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className={color}>{accessLevel}</span>
          <span className="text-green-400">{potentialIncome}</span>
        </div>
      </div>

      <button onClick={onSelect} className={`w-full py-3 rounded-lg font-bold text-white text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] ${buttonColor}`}>
        {t('partners.selectPath')}
      </button>
    </motion.div>;
}
export function PartnerSelectionPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const handleSelectPath = () => {
    navigate('/onboarding');
  };
  const partners = [{
    id: 'ctv',
    icon: <Briefcase className="w-6 h-6" />,
    title: t('partners.ctvTitle'),
    subtitle: t('partners.ctvSubtitle'),
    description: t('partners.ctvDesc'),
    features: [t('partners.ctvFeature1'), t('partners.ctvFeature2'), t('partners.ctvFeature3'), t('partners.ctvFeature4'), t('partners.ctvFeature5')],
    accessLevel: 'Level 1-8',
    potentialIncome: `$500 - $5,000${t('common.perMonth')}`,
    color: 'text-blue-400',
    buttonColor: 'bg-blue-600 hover:bg-blue-500'
  }, {
    id: 'affiliate',
    icon: <Globe className="w-6 h-6" />,
    title: t('partners.affiliateTitle'),
    subtitle: t('partners.affiliateSubtitle'),
    description: t('partners.affiliateDesc'),
    features: [t('partners.affiliateFeature1'), t('partners.affiliateFeature2'), t('partners.affiliateFeature3'), t('partners.affiliateFeature4'), t('partners.affiliateFeature5')],
    accessLevel: 'Level 2-5',
    potentialIncome: `$1,000 - $20,000${t('common.perMonth')}`,
    color: 'text-purple-400',
    buttonColor: 'bg-purple-600 hover:bg-purple-500'
  }, {
    id: 'partner',
    icon: <Laptop className="w-6 h-6" />,
    title: t('partners.partnerTitle'),
    subtitle: t('partners.partnerSubtitle'),
    description: t('partners.partnerDesc'),
    features: [t('partners.partnerFeature1'), t('partners.partnerFeature2'), t('partners.partnerFeature3'), t('partners.partnerFeature4'), t('partners.partnerFeature5')],
    accessLevel: 'Level 3-5',
    potentialIncome: `$2,000 - $50,000${t('common.perMonth')}`,
    color: 'text-green-400',
    buttonColor: 'bg-green-600 hover:bg-green-500'
  }, {
    id: 'agency',
    icon: <Building2 className="w-6 h-6" />,
    title: t('partners.agencyTitle'),
    subtitle: t('partners.agencySubtitle'),
    description: t('partners.agencyDesc2'),
    features: [t('partners.agencyFeature1'), t('partners.agencyFeature2'), t('partners.agencyFeature3'), t('partners.agencyFeature4'), t('partners.agencyFeature5')],
    accessLevel: 'Level 4-5',
    potentialIncome: `$5,000 - $200,000${t('common.perMonth')}`,
    color: 'text-orange-400',
    buttonColor: 'bg-orange-600 hover:bg-orange-500'
  }, {
    id: 'staff',
    icon: <Zap className="w-6 h-6" />,
    title: t('partners.staffTitle'),
    subtitle: t('partners.staffSubtitle'),
    description: t('partners.staffDesc'),
    features: [t('partners.staffFeature1'), t('partners.staffFeature2'), t('partners.staffFeature3'), t('partners.staffFeature4'), t('partners.staffFeature5')],
    accessLevel: 'Full-time',
    potentialIncome: `$1,500 - $10,000${t('common.perMonth')}`,
    color: 'text-red-400',
    buttonColor: 'bg-red-600 hover:bg-red-500'
  }, {
    id: 'creator',
    icon: <Palette className="w-6 h-6" />,
    title: t('partners.creatorTitle'),
    subtitle: t('partners.creatorSubtitle'),
    description: t('partners.agencyDesc'),
    features: [t('partners.creatorFeature1'), t('partners.creatorFeature2'), t('partners.creatorFeature3'), t('partners.creatorFeature4'), t('partners.creatorFeature5')],
    accessLevel: 'Level 2-5',
    potentialIncome: `$800 - $30,000${t('common.perMonth')}`,
    color: 'text-pink-400',
    buttonColor: 'bg-pink-600 hover:bg-pink-500'
  }];
  return <div className="min-h-screen bg-[#0B0F17] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 pb-20">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white">
              {t('partners.choosePath')}
            </h1>
            <p className="text-xs text-gray-500">
              {t('partners.choosePathDesc')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase">
            {language}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('partners.mainGroups')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('partners.mainGroupsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {partners.map((partner, index) => <PartnerCard key={index} {...partner} index={index} onSelect={handleSelectPath} />)}
        </div>

        {/* Bottom Help Section */}
        <div className="max-w-3xl mx-auto bg-[#151B28]/50 border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

          <div className="flex justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-yellow-400" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {t('partners.notSure')}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {t('partners.notSureDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>{' '}
              {t('partners.trainee')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>{' '}
              {t('partners.member')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>{' '}
              {t('partners.partner')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>{' '}
              {t('partners.elite')}
            </span>
          </div>
        </div>
      </main>
    </div>;
}