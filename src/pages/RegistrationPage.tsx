import React, { useState } from 'react';
import { ArrowLeft, Check, User, Mail, Phone, Globe, AtSign, BarChart2, AlertCircle, ChevronDown, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';
export function RegistrationPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    telegram: '',
    experience: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Phase 1: Partner Registration (Steps 1-3)
  const totalSteps = 3;
  const currentStepInPhase = step;
  const totalStepsInPhase = 3;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = () => {
    const submit = async () => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setSubmitError('Mật khẩu xác nhận không khớp');
          setIsSubmitting(false);
          return;
        }
        
        // Validate password length
        if (formData.password.length < 6) {
          setSubmitError('Mật khẩu phải có ít nhất 6 ký tự');
          setIsSubmitting(false);
          return;
        }
        
        const { confirmPassword, ...registrationData } = formData;
        await api.submitPartnerRegistration({
          ...registrationData,
          source: 'registration',
        });
        navigate('/dashboard');
      } catch (error) {
        const errorMessage = (error as Error).message || 'Không thể gửi thông tin đăng ký';
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    };

    void submit();
  };
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const renderProgress = () => {
    const steps = [t('register.steps.basicInfo'), t('register.steps.details'), t('register.steps.confirm')];
    return <div className="w-full max-w-2xl mx-auto mb-12 px-4">
        <div className="relative flex items-center justify-between">
          {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStepInPhase;
          const isCompleted = stepNum < currentStepInPhase;
          return <div key={idx} className="flex flex-col items-center flex-1 relative">
                {/* Connecting line */}
                {idx < steps.length - 1 && <div className="absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-[2px] -z-10" style={{
              background: stepNum < currentStepInPhase ? '#2563eb' : '#374151'
            }} />}

                {/* Circle */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[#0B0F17] ${isActive ? 'border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : isCompleted ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-700 text-gray-500'}`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-bold">{stepNum}</span>}
                </div>

                {/* Label */}
                <span className={`mt-2 text-xs font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>;
        })}
        </div>
      </div>;
  };
  const renderStep1 = () => <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('register.basicInfo')}
        </h2>
        <p className="text-gray-400">{t('register.basicInfoDesc')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4" /> Tên đăng nhập *
          </label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Nhập tên đăng nhập" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" required />
          <p className="text-xs text-gray-500 mt-1">Tên đăng nhập sẽ được dùng để đăng nhập vào hệ thống</p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Mật khẩu *
          </label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 pr-12 text-white focus:border-blue-500 focus:outline-none transition-colors" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Xác nhận mật khẩu *
          </label>
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Nhập lại mật khẩu" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 pr-12 text-white focus:border-blue-500 focus:outline-none transition-colors" required />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4" /> {t('register.fullName')} *
          </label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder={t('register.fullNamePlaceholder')} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Mail className="w-4 h-4" /> {t('register.email')} *
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('register.emailPlaceholder')} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4" /> {t('register.phone')} *
          </label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('register.phonePlaceholder')} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Globe className="w-4 h-4" /> {t('register.country')} *
          </label>
          <div className="relative">
            <select name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none appearance-none transition-colors">
              <option value="">{t('register.selectCountry')}</option>
              <option value="VN">Vietnam</option>
              <option value="US">United States</option>
              <option value="SG">Singapore</option>
              <option value="JP">Japan</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <button onClick={nextStep} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity mt-8">
        {t('register.continue')}
      </button>
    </div>;
  const renderStep2 = () => <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('register.additionalDetails')}
        </h2>
        <p className="text-gray-400">{t('register.additionalDetailsDesc')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <AtSign className="w-4 h-4" /> {t('register.telegram')}
          </label>
          <input type="text" name="telegram" value={formData.telegram} onChange={handleInputChange} placeholder="@yourusername" className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" />
          <p className="text-xs text-gray-500 mt-1">
            {t('register.telegramDesc')}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> {t('register.experience')}
          </label>
          <div className="relative">
            <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none appearance-none transition-colors">
              <option value="">{t('register.selectExperience')}</option>
              <option value="beginner">{t('register.experience.beginner')}</option>
              <option value="intermediate">{t('register.experience.intermediate')}</option>
              <option value="expert">{t('register.experience.expert')}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">
            {t('register.reason')}
          </label>
          <textarea name="reason" value={formData.reason} onChange={handleInputChange} placeholder={t('register.reasonPlaceholder')} rows={4} className="w-full bg-[#2d3748] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none" />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg border border-gray-600 text-white font-medium hover:bg-white/5 transition-colors">
          {t('register.back')}
        </button>
        <button onClick={nextStep} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity">
          {t('register.continue')}
        </button>
      </div>
    </div>;
  const renderStep3 = () => <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('register.confirm')}
        </h2>
        <p className="text-gray-400">
          {t('register.confirmDesc')}
        </p>
      </div>

      <div className="bg-[#2d3748]/50 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 block mb-1">Tên đăng nhập</span>
            <span className="text-white font-medium">
              {formData.username || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.fullName')}</span>
            <span className="text-white font-medium">
              {formData.fullName || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.email')}</span>
            <span className="text-white font-medium">
              {formData.email || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.phone')}</span>
            <span className="text-white font-medium">
              {formData.phone || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.country')}</span>
            <span className="text-white font-medium">
              {formData.country || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.telegram')}</span>
            <span className="text-white font-medium">
              {formData.telegram || t('register.notProvided')}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">{t('register.experience')}</span>
            <span className="text-white font-medium capitalize">
              {formData.experience || t('register.notSpecified')}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white">{t('register.whatNext')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
          <li>{t('register.next1')}</li>
          <li>{t('register.next2')}</li>
          <li>{t('register.next3')}</li>
          <li>{t('register.next4')}</li>
        </ul>
      </div>

      {submitError && (
        <div className="text-sm text-red-300 bg-red-900/20 border border-red-800 rounded-lg p-3">
          {submitError}
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="px-6 py-3 rounded-lg border border-gray-600 text-white font-medium hover:bg-white/5 transition-colors">
          {t('register.back')}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang gửi...' : t('register.submit')}
        </button>
      </div>
    </div>;
  return <div className="min-h-screen bg-[#0B0F17] text-white font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/partners')} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white">
              {t('register.partnerReg')}
            </h1>
            <p className="text-xs text-gray-500">
              {t('register.step')} {currentStepInPhase} {t('register.of')} {totalStepsInPhase}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase">
            {language}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderProgress()}

        <motion.div key={step} initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }} className="max-w-2xl mx-auto bg-[#1e293b] rounded-2xl p-8 border border-gray-800 shadow-xl">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </motion.div>
      </main>
    </div>;
}