import React, { useState } from 'react';
import { Check, X, Sparkles, User, ArrowRight, Globe, Mail, MessageCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
export function OnboardingPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [showComparison, setShowComparison] = useState(false);
  const comparisonFeatures = [{
    label: t('onboarding.featureReadDocs'),
    basic: true,
    premium: true
  }, {
    label: t('onboarding.featureCertificate'),
    basic: true,
    premium: true
  }, {
    label: t('onboarding.featureReferralLink'),
    basic: false,
    premium: true
  }, {
    label: t('onboarding.featureF1F2Commission'),
    basic: false,
    premium: true
  }, {
    label: t('onboarding.featureSellPool'),
    basic: false,
    premium: true
  }, {
    label: t('onboarding.featureF1Academy'),
    basic: false,
    premium: true
  }, {
    label: t('onboarding.featureRoadmap'),
    basic: false,
    premium: true
  }, {
    label: t('onboarding.featurePassiveIncome'),
    basic: false,
    premium: true
  }];
  const package99k = {
    features: [{
      icon: '📖',
      text: t('onboarding.package99kForNew'),
      desc: t('onboarding.package99kForNewDesc'),
      iconBg: '#1a1a1a'
    }, {
      icon: '📚',
      text: t('onboarding.package99kBook'),
      desc: t('onboarding.package99kBookDesc'),
      iconBg: '#1a1a1a'
    }, {
      icon: '⭕',
      text: t('onboarding.package99kKYC'),
      desc: t('onboarding.package99kKYCDesc'),
      iconBg: '#1a1a1a'
    }, {
      icon: '✅',
      text: t('onboarding.package99kBasic'),
      desc: t('onboarding.package99kBasicDesc'),
      iconBg: '#1a1a1a'
    }],
    warning: t('onboarding.package99kWarning')
  };
  const package999k = {
    features: [{
      icon: '🔗',
      text: t('onboarding.package999kReferralLink'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '💰',
      text: t('onboarding.package999kF1Commission'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '💵',
      text: t('onboarding.package999kF2Commission'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '✅',
      text: t('onboarding.package999kSellPool'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '🎓',
      text: t('onboarding.package999kTraining'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '📊',
      text: t('onboarding.package999kNotebook'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '🤖',
      text: t('onboarding.package999kAITools'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }, {
      icon: '✨',
      text: t('onboarding.package999kAllProducts'),
      color: 'text-green-400',
      iconBg: 'rgba(34, 197, 94, 0.1)'
    }]
  };
  const reasons999k = [{
    icon: '💰',
    title: t('onboarding.reason1Title'),
    desc: t('onboarding.reason1Desc')
  }, {
    icon: '🛡️',
    title: t('onboarding.reason2Title'),
    desc: t('onboarding.reason2Desc')
  }, {
    icon: '📈',
    title: t('onboarding.reason3Title'),
    desc: t('onboarding.reason3Desc')
  }, {
    icon: '⚡',
    title: t('onboarding.reason4Title'),
    desc: t('onboarding.reason4Desc')
  }, {
    icon: '📊',
    title: t('onboarding.reason5Title'),
    desc: t('onboarding.reason5Desc')
  }, {
    icon: '📚',
    title: t('onboarding.reason6Title'),
    desc: t('onboarding.reason6Desc')
  }];
  return <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      {/* Header with Language Toggle */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#2a2a2a] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white">
              {t('onboarding.choosePackage')}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {language}
          </button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{
            background: '#2a2520',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.25), 0 0 60px rgba(251, 191, 36, 0.12)'
          }}>
              <Sparkles className="w-8 h-8" style={{
              color: '#fbbf24'
            }} />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6" style={{
            color: '#fbbf24',
            textShadow: '0 0 40px rgba(251, 191, 36, 0.3)'
          }}>
              {t('onboarding.choosePackage')}
            </h1>

            <p className="text-gray-400 text-lg mb-12">
              {t('onboarding.choosePackageDesc')}
            </p>

            <button onClick={() => navigate('/payment')} className="px-10 py-4 rounded-xl text-black font-bold text-base transition-all hover:scale-105 mb-8" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.35), 0 0 40px rgba(251, 191, 36, 0.15)'
          }}>
              {t('onboarding.buy999k')}
            </button>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
              }} />
                <span>{t('onboarding.payOnce')}</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
              }} />
                <span>{t('onboarding.lifetime')}</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
              }} />
                <span>{t('onboarding.unlimited')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3" style={{
          color: '#fbbf24',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.25)'
        }}>
            {t('onboarding.comparison')}
          </h2>
          <p className="text-center text-gray-400 mb-12">
            {t('onboarding.comparisonDesc')}
          </p>

          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden" style={{
          border: '1px solid #2a2a2a',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#0d0d0d] font-bold border-b border-[#2a2a2a]">
              <div className="text-sm text-gray-400">Tính năng</div>
              <div className="text-center text-sm text-blue-400">
                Gói 99K
                <br />
                <span className="text-xs font-normal">Cơ bản</span>
              </div>
              <div className="text-center text-sm" style={{
              color: '#fbbf24'
            }}>
                Gói 999K
                <br />
                <span className="text-xs font-normal">Premium</span>
              </div>
            </div>

            {comparisonFeatures.map((feature, index) => <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#0d0d0d] transition-colors">
                <div className="text-sm text-gray-300">{feature.label}</div>
                <div className="flex justify-center">
                  {feature.basic ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />}
                </div>
                <div className="flex justify-center">
                  {feature.premium ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-400" />}
                </div>
              </div>)}
          </div>

          <div className="text-center mt-8">
            <button onClick={() => navigate('/payment')} className="px-8 py-3 rounded-xl text-black font-bold transition-all hover:scale-105" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.35)'
          }}>
              Chọn gói 999K tối ưu
            </button>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 99K Package */}
            <div className="bg-[#0d0d0d] rounded-2xl p-8" style={{
            border: '2px solid #2a2a2a',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
          }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a]">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">GÓI 99K</h3>
                  <p className="text-sm text-gray-400">
                    {t('onboarding.package99kForNew')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {package99k.features.map((feature, idx) => <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#2a2a2a]" style={{
                  background: feature.iconBg
                }}>
                      <span className="text-base">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">
                        {feature.text}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {feature.desc}
                      </div>
                    </div>
                  </div>)}
              </div>

              <div className="rounded-lg p-3 mb-6" style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)'
            }}>
                <div className="text-xs text-red-300">{package99k.warning}</div>
              </div>
            </div>

            {/* 999K Package */}
            <div className="rounded-2xl p-8 relative" style={{
            background: 'linear-gradient(135deg, #2a2520 0%, #0d0d0d 100%)',
            border: '2px solid #fbbf24',
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.25), 0 4px 30px rgba(0, 0, 0, 0.5)'
          }}>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{
              background: '#fbbf24',
              color: '#1a1a1a',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
            }}>
                ⭐ BEST CHOICE
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: '#fbbf24',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.35)'
              }}>
                  <Sparkles className="w-6 h-6 text-[#1a1a1a]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{
                  color: '#fbbf24'
                }}>
                    GÓI 999K
                  </h3>
                  <p className="text-sm text-gray-400">
                    Mở khóa quyền kiếm tiền
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {package999k.features.map((feature, idx) => <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-white/5" style={{
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                  background: feature.iconBg
                }}>
                      <span className="text-base">{feature.icon}</span>
                    </div>
                    <span className={`text-sm font-medium ${feature.color}`}>
                      {feature.text}
                    </span>
                  </div>)}
              </div>

              <button onClick={() => navigate('/payment')} className="w-full py-4 rounded-xl text-black font-bold transition-all hover:scale-105" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)'
            }}>
                Chọn gói 999K ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why 999K */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3" style={{
          color: '#fbbf24',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.25)'
        }}>
            Tại Sao Chọn Gói 999K?
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Khám phá những lợi ích vượt trội mà chỉ gói 999K mới mang lại
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons999k.map((reason, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} className="bg-[#1a1a1a] rounded-xl p-6 transition-all hover:scale-105" style={{
            border: '1px solid #2a2a2a',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }} onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#fbbf24';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)';
          }} onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#2a2a2a';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}>
                  <span className="text-2xl">{reason.icon}</span>
                </div>
                <h3 className="font-bold mb-2 text-white">{reason.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* F1-F2 Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3" style={{
          color: '#fbbf24',
          textShadow: '0 0 30px rgba(251, 191, 36, 0.25)'
        }}>
            Cơ Chế F1 – F2
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Hiểu rõ cách bạn kiếm tiền từ hệ thống giới thiệu 2 cấp
          </p>

          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-3 relative" style={{
              background: '#fbbf24',
              border: '3px solid #fbbf24',
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.35)'
            }}>
                <User className="w-12 h-12 text-[#1a1a1a]" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-black" style={{
                boxShadow: '0 0 15px rgba(250, 204, 21, 0.6)'
              }}>
                  Bạn
                </div>
              </div>
              <span className="text-sm font-medium">Người bán giới thiệu</span>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-600" />

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-3 relative bg-green-600" style={{
              border: '3px solid #22c55e',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
            }}>
                <User className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-xs font-bold text-black" style={{
                boxShadow: '0 0 15px rgba(74, 222, 128, 0.6)'
              }}>
                  F1
                </div>
              </div>
              <span className="text-sm font-medium text-green-400">
                {t('onboarding.youRecruitDirectly')}
              </span>
              <span className="text-xs text-gray-500">{t('onboarding.highCommission')}</span>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-600" />

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-3 relative bg-blue-600" style={{
              border: '3px solid #3b82f6',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
            }}>
                <User className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold text-black" style={{
                boxShadow: '0 0 15px rgba(96, 165, 250, 0.6)'
              }}>
                  F2
                </div>
              </div>
              <span className="text-sm font-medium text-blue-400">
                F1 của bạn tuyển
              </span>
              <span className="text-xs text-gray-500">Bạn vẫn có hoa hồng</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6" style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)'
          }}>
              <h3 className="font-bold text-green-400 mb-3">F1 là gì?</h3>
              <p className="text-sm text-gray-300">
                F1 là những người mà BẠN trực tiếp tuyển dụng. Khi F1 mua bất kỳ
                bể nào (1→8), BẠN sẽ nhận hoa hồng ngay lập tức. Mỗi F1 mua bể 1
                triệu, bạn nhận 7% = 70k.
              </p>
            </div>

            <div className="rounded-xl p-6" style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)'
          }}>
              <h3 className="font-bold text-blue-400 mb-3">F2 là gì?</h3>
              <p className="text-sm text-gray-300">
                F2 là những người được F1 của bạn tuyển dụng. Khi F2 mua bất kỳ
                bể nào, cả BẠN và F1 đều nhận được hoa hồng theo tỷ lệ riêng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-12 text-center relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, #2a2520 0%, #1a1a1a 100%)',
          border: '2px solid #fbbf24',
          boxShadow: '0 0 50px rgba(251, 191, 36, 0.25), 0 4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{
            background: 'rgba(251, 191, 36, 0.15)',
            border: '2px solid #fbbf24',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)'
          }}>
              <Sparkles className="w-8 h-8" style={{
              color: '#fbbf24'
            }} />
            </div>

            <h2 className="text-4xl font-bold mb-4" style={{
            color: '#fbbf24',
            textShadow: '0 0 40px rgba(251, 191, 36, 0.3)'
          }}>
              Sẵn Sàng Mở Khóa Thu Nhập?
            </h2>
            <p className="text-gray-400 mb-8">
              Đừng bỏ lỡ cơ hội xây dựng thu nhập thụ động bền vững
            </p>

            <div className="flex flex-col items-start max-w-2xl mx-auto gap-3 mb-8">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Trả 1 lần – quyền suất đời: Không có phí gia hạn hay chi phí
                  ẩn
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  {t('onboarding.unlimitedCommission')}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Công cụ AI đào tạo đầy đủ: Hỗ trợ 24/7 để bạn thành công nhanh
                  nhất
                </span>
              </div>
            </div>

            <button onClick={() => navigate('/payment')} className="px-12 py-5 rounded-xl text-black font-bold text-lg inline-flex items-center gap-2 transition-all hover:scale-105 mb-6" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 4px 25px rgba(251, 191, 36, 0.4), 0 0 50px rgba(251, 191, 36, 0.25)'
          }}>
              <Sparkles className="w-5 h-5" />
              MUA GÓI 999K – MỞ QUYỀN KIẾM TIỀN NGAY
              <Sparkles className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-6 mb-6">
              <button 
                onClick={() => navigate('/partner-registration')}
                className="px-6 py-3 rounded-lg text-sm text-white hover:text-white transition-colors border-2 border-gray-700 hover:border-gray-600 bg-transparent hover:bg-gray-800/10"
              >
                {t('onboarding.continueJourney')}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span>✓ {t('onboarding.securePayment')}</span>
              <span>✓ {t('onboarding.instantRefund')}</span>
              <span>✓ {t('onboarding.support247')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#2a2a2a] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">GP</span>
                </div>
                <span className="text-white font-semibold">Giaiphapthe</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('onboarding.footerCompanyDesc')}
              </p>
              <p className="text-gray-500 text-xs">
                © 2025 Giaiphapthe. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">{t('onboarding.footerQuickLinks')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('onboarding.footerAboutUs')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('onboarding.footerPrivacy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('onboarding.footerTerms')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t('onboarding.footerFAQ')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">{t('onboarding.footerContact')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:support@giaiphapthe.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    <Mail className="w-4 h-4" />
                    support@giaiphapthe.com
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {t('onboarding.footerChat')}
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                    <FileText className="w-4 h-4" />
                    {t('onboarding.footerDocs')}
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Telegram</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Comparison Modal/Layout */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="min-h-screen bg-[#0a0e1a] text-white py-12 px-4"
            >
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#fbbf24' }}>
                    {t('onboarding.comparisonTitle')}
                  </h1>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Comparison Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* 99K Package */}
                  <div className="bg-[#151b2e] rounded-2xl p-8 border-2 border-gray-700">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold mb-2 text-blue-400">GÓI 99K</h2>
                      <p className="text-gray-400">{t('onboarding.package99kForNew')}</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      {package99k.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0f1419]">
                            <span className="text-base">{feature.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-sm text-white">{feature.text}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{feature.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg p-3 mb-6 bg-red-900/20 border border-red-500/30">
                      <div className="text-xs text-red-300">{package99k.warning}</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowComparison(false);
                        navigate('/payment');
                      }}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      {t('onboarding.select99k')}
                    </button>
                  </div>

                  {/* 999K Package */}
                  <div className="bg-[#151b2e] rounded-2xl p-8 border-2 border-amber-500 relative">
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-black">
                      ⭐ {t('onboarding.bestChoice')}
                    </div>
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold mb-2" style={{ color: '#fbbf24' }}>GÓI 999K</h2>
                      <p className="text-gray-400">{t('onboarding.package999kDesc')}</p>
                    </div>
                    <div className="space-y-2 mb-6">
                      {package999k.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-green-900/10 border border-green-500/20">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: feature.iconBg }}>
                            <span className="text-base">{feature.icon}</span>
                          </div>
                          <span className={`text-sm font-medium ${feature.color}`}>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowComparison(false);
                        navigate('/payment');
                      }}
                      className="w-full py-3 font-semibold rounded-lg transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        color: '#000',
                        boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)'
                      }}
                    >
                      {t('onboarding.select999k')}
                    </button>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-[#151b2e] rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#fbbf24' }}>
                    {t('onboarding.comparison')}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left p-4 text-sm text-gray-400">{t('onboarding.feature')}</th>
                          <th className="text-center p-4 text-sm text-blue-400">{t('onboarding.package99k')}</th>
                          <th className="text-center p-4 text-sm" style={{ color: '#fbbf24' }}>{t('onboarding.package999k')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonFeatures.map((feature, index) => (
                          <tr key={index} className="border-b border-gray-700 hover:bg-[#0f1419] transition-colors">
                            <td className="p-4 text-sm text-gray-300">{feature.label}</td>
                            <td className="p-4 text-center">
                              {feature.basic ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                            </td>
                            <td className="p-4 text-center">
                              {feature.premium ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>;
}