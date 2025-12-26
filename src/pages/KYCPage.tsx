import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Camera,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  User,
} from 'lucide-react';
import { api } from '../services/api';

export function KYCPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    frontImage: null as File | null,
    backImage: null as File | null,
    selfieImage: null as File | null,
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    cccdName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previews, setPreviews] = useState({
    front: '',
    back: '',
    selfie: '',
  });

  const handleImageUpload = (
    type: 'front' | 'back' | 'selfie',
    file: File | null
  ) => {
    if (!file) return;

    if (type === 'front') {
      setFormData({ ...formData, frontImage: file });
      setPreviews({ ...previews, front: URL.createObjectURL(file) });
    } else if (type === 'back') {
      setFormData({ ...formData, backImage: file });
      setPreviews({ ...previews, back: URL.createObjectURL(file) });
    } else if (type === 'selfie') {
      setFormData({ ...formData, selfieImage: file });
      setPreviews({ ...previews, selfie: URL.createObjectURL(file) });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const fileToBase64 = (file: File | null) =>
    new Promise<string | null>((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleSubmit = () => {
    const submit = async () => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        const payload = {
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountHolderName: formData.accountHolderName,
          cccdName: formData.cccdName,
          frontImage: (await fileToBase64(formData.frontImage)) || '',
          backImage: (await fileToBase64(formData.backImage)) || '',
          selfieImage: (await fileToBase64(formData.selfieImage)) || '',
        };
        await api.submitKyc(payload);
        navigate('/dashboard');
      } catch (error) {
        setSubmitError((error as Error).message || 'Không thể gửi KYC');
      } finally {
        setIsSubmitting(false);
      }
    };

    void submit();
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('kyc.identityVerification')}
          </h2>
          <p className="text-gray-400">
            {t('kyc.step1Instruction')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-amber-900/15 rounded-xl p-6 border backdrop-blur-sm border-amber-400/30">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-400/25 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('kyc.importantNotes')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• {t('kyc.note1')}</li>
                <li>• {t('kyc.note2')}</li>
                <li>• {t('kyc.note3')}</li>
                <li>• {t('kyc.note4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/15 to-amber-900/8 rounded-xl p-8 border-2 border-dashed backdrop-blur-sm hover:border-amber-300/70 transition-all duration-300 border-amber-300/50">
          <div className="flex flex-col items-center justify-center">
            {previews.front ? (
              <div className="relative w-full max-w-md mb-4">
                <img
                  src={previews.front}
                  alt="Front CCCD"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    setPreviews({ ...previews, front: '' });
                    setFormData({ ...formData, frontImage: null });
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Remove image"
                >
                  <span className="text-white text-sm">×</span>
                </button>
              </div>
            ) : (
              <>
                <Camera className="w-16 h-16 text-amber-300 mb-4" />
                <p className="text-lg font-semibold mb-2">
                  {t('kyc.captureFront')}
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  {t('kyc.cameraInstruction')}
                </p>
              </>
            )}
            <label className="w-full max-w-md">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload('front', file);
                }}
                className="hidden"
              />
              <div className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer">
                <Camera className="w-5 h-5" />
                {t('kyc.takePhoto')}
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('kyc.identityVerification')}
          </h2>
          <p className="text-gray-400">
            {t('kyc.step2Instruction')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-amber-900/15 rounded-xl p-6 border backdrop-blur-sm border-amber-400/30">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-400/25 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('kyc.importantNotes')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• {t('kyc.note1')}</li>
                <li>• {t('kyc.note5')}</li>
                <li>• {t('kyc.note6')}</li>
                <li>• {t('kyc.note7')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/15 to-amber-900/8 rounded-xl p-8 border-2 border-dashed backdrop-blur-sm hover:border-amber-300/70 transition-all duration-300 border-amber-300/50">
          <div className="flex flex-col items-center justify-center">
            {previews.back ? (
              <div className="relative w-full max-w-md mb-4">
                <img
                  src={previews.back}
                  alt="Back CCCD"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    setPreviews({ ...previews, back: '' });
                    setFormData({ ...formData, backImage: null });
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Remove image"
                >
                  <span className="text-white text-sm">×</span>
                </button>
              </div>
            ) : (
              <>
                <Camera className="w-16 h-16 text-amber-300 mb-4" />
                <p className="text-lg font-semibold mb-2">
                  {t('kyc.captureBack')}
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  {t('kyc.cameraInstruction')}
                </p>
              </>
            )}
            <label className="w-full max-w-md">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload('back', file);
                }}
                className="hidden"
              />
              <div className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer">
                <Camera className="w-5 h-5" />
                {t('kyc.takePhoto')}
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('kyc.faceVerification')}
          </h2>
          <p className="text-gray-400">
            {t('kyc.step3Instruction')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-amber-900/15 rounded-xl p-6 border backdrop-blur-sm border-amber-400/30">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-400/25 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('kyc.photoInstructions')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• {t('kyc.instruction1')}</li>
                <li>• {t('kyc.instruction2')}</li>
                <li>• {t('kyc.instruction3')}</li>
                <li>• {t('kyc.instruction4')}</li>
                <li>• {t('kyc.instruction5')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/15 to-amber-900/8 rounded-xl p-8 border-2 border-dashed backdrop-blur-sm hover:border-amber-300/70 transition-all duration-300 border-amber-300/50">
          <div className="flex flex-col items-center justify-center">
            {previews.selfie ? (
              <div className="relative w-full max-w-md mb-4">
                <img
                  src={previews.selfie}
                  alt="Selfie"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    setPreviews({ ...previews, selfie: '' });
                    setFormData({ ...formData, selfieImage: null });
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Remove image"
                >
                  <span className="text-white text-sm">×</span>
                </button>
              </div>
            ) : (
              <>
                <div className="w-48 h-48 rounded-full border-4 border-amber-300/50 flex items-center justify-center mb-4">
                  <User className="w-24 h-24 text-gray-400" />
                </div>
                <p className="text-lg font-semibold mb-2">
                  {t('kyc.readyToTakeSelfie')}
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  {t('kyc.autoOpenCamera')}
                </p>
              </>
            )}
            <label className="w-full max-w-md">
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload('selfie', file);
                }}
                className="hidden"
              />
              <div className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer">
                <Camera className="w-5 h-5" />
                {t('kyc.openCamera')}
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    const banks = [
      'ABBANK',
      'ACB',
      'Agribank',
      'BIDV',
      'MBBank',
      'Techcombank',
      'Vietcombank',
      'VietinBank',
      'VPBank',
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('kyc.bankInformation')}
          </h2>
          <p className="text-gray-400">
            {t('kyc.step4Instruction')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-amber-900/15 rounded-xl p-6 border backdrop-blur-sm border-amber-400/30">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-400/25 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('kyc.securityNotice')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• {t('kyc.security1')}</li>
                <li>• {t('kyc.security2')}</li>
                <li>• {t('kyc.security3')}</li>
                <li>• {t('kyc.security4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 rounded-xl p-6 border backdrop-blur-sm border-gray-800 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('kyc.bank')} <span className="text-red-400">*</span>
            </label>
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              aria-label={t('kyc.bank')}
              className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            >
              <option value="">{t('kyc.selectBank')}</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('kyc.accountNumber')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder={t('kyc.accountNumberPlaceholder')}
              className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('kyc.accountHolderName')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder={t('kyc.accountHolderNamePlaceholder')}
              className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('kyc.nameOnCCCD')}:
            </label>
            <input
              type="text"
              value={formData.cccdName || formData.accountHolderName}
              disabled
              aria-label={t('kyc.nameOnCCCD')}
              className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('kyc.confirmKYCInfo')}
          </h2>
          <p className="text-gray-400">
            {t('kyc.step5Instruction')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 rounded-xl p-6 border backdrop-blur-sm border-gray-800">
          <h3 className="text-lg font-semibold mb-4">
            {t('kyc.cccdInformation')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t('kyc.frontCCCD')}
              </p>
              {previews.front ? (
                <img
                  src={previews.front}
                  alt="Front CCCD"
                  className="w-full h-auto rounded-lg border border-gray-700"
                />
              ) : (
                <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">{t('kyc.noImage')}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t('kyc.backCCCD')}
              </p>
              {previews.back ? (
                <img
                  src={previews.back}
                  alt="Back CCCD"
                  className="w-full h-auto rounded-lg border border-gray-700"
                />
              ) : (
                <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">{t('kyc.noImage')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{t('kyc.fullName')}:</span>
            <span className="font-semibold">{formData.accountHolderName || 'N/A'}</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 rounded-xl p-6 border backdrop-blur-sm border-gray-800">
          <h3 className="text-lg font-semibold mb-4">
            {t('kyc.faceVerificationPhoto')}
          </h3>
          <div className="flex items-start gap-4">
            {previews.selfie ? (
              <img
                src={previews.selfie}
                alt="Selfie"
                className="w-32 h-32 object-cover rounded-lg border border-gray-700"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">{t('kyc.noImage')}</span>
              </div>
            )}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-400 mb-1">
                {t('kyc.verificationSuccess')}
              </p>
              <p className="text-xs text-gray-300">
                {t('kyc.faceMatchesCCCD')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 rounded-xl p-6 border backdrop-blur-sm border-gray-800">
          <h3 className="text-lg font-semibold mb-4">
            {t('kyc.bankInformation')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('kyc.bank')}:</span>
              <span className="font-semibold">{formData.bankName || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('kyc.accountNumber')}:</span>
              <span className="font-semibold">{formData.accountNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t('kyc.accountHolder')}:</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{formData.accountHolderName || 'N/A'}</span>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
          <div className="mt-4 bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-sm text-green-400">
              {t('kyc.accountNameMatchesCCCD')}
            </p>
          </div>
        </div>

        <div className="bg-[#151b2e] rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-gray-400 text-center">
            {t('kyc.submitAgreement')}{' '}
            <a href="#" className="text-amber-300 hover:underline">
              {t('kyc.termsOfUse')}
            </a>{' '}
            {t('kyc.and')}{' '}
            <a href="#" className="text-amber-300 hover:underline">
              {t('kyc.privacyPolicy')}
            </a>{' '}
            {t('kyc.ofAIHUBOS')}
          </p>
        </div>
      </div>
    );
  };

  // Logo Component
  const Logo = () => (
    <div className="flex flex-col items-center">
      <img 
        src="/images/10d81143114c7556a64968c5fbb539106104b1b5.avif" 
        alt="AIHUB luxury. Intelligence. Eternity" 
        className="h-20 w-auto object-contain"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo />
          <h2 className="text-xl font-semibold mb-6 mt-6 text-amber-300/90">
            {t('kyc.systemTitle')}
          </h2>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/40 scale-110'
                      : 'bg-gray-800/50 text-gray-500 border border-gray-700'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`h-1.5 w-16 rounded-full transition-all duration-300 ${
                      step < currentStep
                        ? 'bg-gradient-to-r from-amber-300 to-amber-500 shadow-sm shadow-amber-400/25'
                        : 'bg-gray-800/50'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            {t('kyc.step')} {currentStep}/5
          </p>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <div className="mt-6 text-sm text-red-300 bg-red-900/20 border border-red-800 rounded-lg p-3">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('kyc.back')}
          </button>
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02]"
            >
              {t('kyc.continue')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Đang gửi...' : t('kyc.submitKYC')}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-xs text-gray-500">
            © 2025 AIHUBOS. {t('kyc.allInfoConfidential')}
          </p>
          <p className="text-xs text-gray-500">
            {t('kyc.support')}:{' '}
            <a
              href="mailto:support@aihubos.com"
              className="text-amber-300 hover:text-amber-200 transition-colors"
            >
              support@aihubos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

