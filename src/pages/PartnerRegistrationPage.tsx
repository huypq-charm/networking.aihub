import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building2, FileText, MapPin, Globe, Tag, Briefcase, HelpCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';

export function PartnerRegistrationPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    address: '',
    city: '',
    website: '',
    referralCode: '',
    experience: '',
    reason: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const send = async () => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        await api.submitPartnerRegistration(formData);
        navigate('/dashboard');
      } catch (error) {
        setSubmitError((error as Error).message || 'Không thể gửi đăng ký');
      } finally {
        setIsSubmitting(false);
      }
    };
    void send();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-md border-b border-[#2a2a2a] px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">{t('register.back')}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase"
          >
            {language}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)',
            }}
          >
            <Building2 className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fbbf24' }}>
            {t('register.partnerReg')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('register.partnerRegDesc')}
          </p>
        </div>

        {/* Commission Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#151b2e] rounded-xl p-6 border border-amber-500/30 text-center"
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#fbbf24' }}>20-30%</div>
            <div className="text-sm text-gray-400">{t('register.f1Commission')}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#151b2e] rounded-xl p-6 border border-amber-500/30 text-center"
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#fbbf24' }}>10-20%</div>
            <div className="text-sm text-gray-400">{t('register.f2Commission')}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#151b2e] rounded-xl p-6 border border-amber-500/30 text-center"
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#fbbf24' }}>∞</div>
            <div className="text-sm text-gray-400">{t('register.unlimited')}</div>
          </motion.div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-[#151b2e] rounded-2xl p-8 border border-[#2a2a2a]">
          {submitError && (
            <div className="mb-4 text-sm text-red-300 bg-red-900/20 border border-red-800 rounded-lg p-3">
              {submitError}
            </div>
          )}
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">{t('register.personalInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Phone className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">{t('register.businessInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Building2 className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.businessName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder={t('register.businessNamePlaceholder')}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FileText className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.businessType')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                  aria-label={t('register.businessType')}
                  title={t('register.businessType')}
                >
                  <option value="">{t('register.selectBusinessType')}</option>
                  <option value="retail">{t('register.retail')}</option>
                  <option value="service">{t('register.service')}</option>
                  <option value="online">{t('register.online')}</option>
                  <option value="other">{t('register.other')}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.address')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t('register.addressPlaceholder')}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.city')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t('register.cityPlaceholder')}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Globe className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.website')}
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">{t('register.additionalInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Tag className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.referralCode')}
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder={t('register.referralCodePlaceholder')}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Briefcase className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.experience')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  required
                  aria-label={t('register.experience')}
                  title={t('register.experience')}
                >
                  <option value="">{t('register.selectExperience')}</option>
                  <option value="beginner">{t('register.beginner')}</option>
                  <option value="intermediate">{t('register.intermediate')}</option>
                  <option value="advanced">{t('register.advanced')}</option>
                  <option value="expert">{t('register.expert')}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <HelpCircle className="w-4 h-4" style={{ color: '#fbbf24' }} />
                  {t('register.whyPartner')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder={t('register.whyPartnerPlaceholder')}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#2a2a2a] rounded-lg focus:border-amber-500 focus:outline-none text-white resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-[#2a2a2a] bg-[#0a0e1a] text-amber-500 focus:ring-amber-500 focus:ring-2"
                required
              />
              <span className="text-sm text-gray-300">
                {t('register.agreeToTerms')}{' '}
                <a href="#" className="underline" style={{ color: '#fbbf24' }}>
                  {t('register.termsAndConditions')}
                </a>{' '}
                {t('register.and')}{' '}
                <a href="#" className="underline" style={{ color: '#fbbf24' }}>
                  {t('register.partnerPolicy')}
                </a>
                <span className="text-red-500"> *</span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
            }}
          >
            {isSubmitting ? 'Đang gửi...' : t('register.submitPartner')}
          </button>

          {/* Security Message */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
            <p className="text-sm text-gray-300">
              {t('register.securityMessage')}
            </p>
          </div>
        </form>

        {/* Support Contact */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            {t('register.haveQuestions')}{' '}
            <a href="mailto:partner@example.com" className="underline" style={{ color: '#fbbf24' }}>
              partner@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

