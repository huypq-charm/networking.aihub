import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Copy, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';

// Payment logos - using actual images from public/images/ folder
const momoLogo = '/images/Logo-MoMo-Square.webp';
const vnpayLogo = '/images/vnpay-logo-vinadesign-25-12-57-55.jpg';
const vietqrLogo = '/images/vietqr.png.jpg';
export function PaymentPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    referralCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'bank'>('momo');
  const [promoCode, setPromoCode] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrType, setQrType] = useState<'momo' | 'bank'>('momo');
  const amount = 999000;
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await api.getPaymentSettings();
        setPaymentSettings(settings);
      } catch (error) {
        setSubmitError((error as Error).message || 'Không tải được cấu hình thanh toán');
      } finally {
        setLoadingSettings(false);
      }
    };
    void loadSettings();
  }, []);
  const packageFeatures = [
    t('payment.packageFeature1'),
    t('payment.packageFeature2'),
    t('payment.packageFeature3'),
    t('payment.packageFeature4'),
    t('payment.packageFeature5'),
    t('payment.packageFeature6')
  ];
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const handlePaymentMethodClick = (method: 'momo' | 'vnpay' | 'bank') => {
    setPaymentMethod(method);
    if (method === 'momo' || method === 'bank') {
      setQrType(method);
      setShowQRModal(true);
    }
  };
  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert(t('payment.fillInfo'));
      return;
    }
    const submit = async () => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        await api.submitPayment({
          ...formData,
          method: paymentMethod,
          amount,
          packageName: '999K',
        });
        navigate('/register');
      } catch (error) {
        setSubmitError((error as Error).message || 'Không gửi được thanh toán');
      } finally {
        setIsSubmitting(false);
      }
    };
    void submit();
  };
  const QRModal = () => <AnimatePresence>
      {showQRModal && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setShowQRModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className="w-full max-w-sm rounded-xl overflow-hidden pointer-events-auto" style={{
          background: 'linear-gradient(135deg, #2a2520 0%, #1a1a1a 100%)',
          border: '2px solid #fbbf24',
          boxShadow: '0 0 50px rgba(251, 191, 36, 0.3)'
        }}>
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-[#2a2a2a]">
                <h3 className="font-bold text-sm" style={{
              color: '#fbbf24'
            }}>
                  {t('payment.scanQR')}
                  <span className="ml-2 text-[10px] uppercase text-gray-400">
                    {qrType}
                  </span>
                </h3>
                <button onClick={() => setShowQRModal(false)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Code */}
              <div className="p-4">
                <div className="bg-white rounded-lg p-3 mb-3">
                  {loadingSettings ? (
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
                  ) : (
                    <>
                      <img
                        src={
                          paymentSettings?.qrCodeUrl ||
                          'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=AIHUB-PAYMENT'
                        }
                        alt="QR Code"
                        className="w-full h-auto"
                      />
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs text-gray-600">napas 247</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-red-600 font-bold text-xs">
                          {paymentSettings?.bankName || 'BANK'}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Account Info */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{t('payment.accountName')}</span>
                    <span className="font-medium">
                      {paymentSettings?.accountName || '---'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{t('payment.accountNumber')}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">
                        {paymentSettings?.accountNumber || '---'}
                      </span>
                      <button
                        onClick={() => paymentSettings?.accountNumber && copyToClipboard(paymentSettings.accountNumber)}
                        disabled={!paymentSettings?.accountNumber}
                        className="p-0.5 hover:bg-white/5 rounded disabled:opacity-50"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-center mb-3">
                  <div className="text-xs text-gray-400 mb-0.5">
                    {t('payment.pleaseTransferExactAmount')}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      color: '#fbbf24',
                    }}
                  >
                    {amount.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-gray-500 mt-1.5">
                    {t('payment.afterTransfer')}
                  </div>
                </div>

                {/* Confirm Button */}
                <button onClick={() => setShowQRModal(false)} className="w-full py-3 rounded-lg text-black font-bold text-sm transition-all hover:scale-105" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)'
            }}>
                  {t('payment.paid')}
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  {t('payment.checkAmountBeforeTransfer')}
                </p>
              </div>
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
  return <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      <QRModal />

      {/* Header */}
      <header className="border-b border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{t('register.back')}</span>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {language}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-[#0d0d0d] rounded-2xl p-6" style={{
            border: '1px solid #2a2a2a'
          }}>
              <h2 className="text-xl font-bold mb-1">Thông tin thanh toán</h2>
              <p className="text-sm text-gray-400 mb-6">
                Vui lòng điền đầy đủ thông tin để hoàn tất đơn hàng
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input type="text" placeholder="Nguyễn Văn A" value={formData.fullName} onChange={e => setFormData({
                  ...formData,
                  fullName: e.target.value
                })} className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#fbbf24] focus:outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input type="email" placeholder="email@example.com" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#fbbf24] focus:outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <input type="tel" placeholder="0912345678" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#fbbf24] focus:outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mã giới thiệu (nếu có)
                  </label>
                  <input type="text" placeholder="F1" value={formData.referralCode} onChange={e => setFormData({
                  ...formData,
                  referralCode: e.target.value
                })} className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#fbbf24] focus:outline-none transition-colors" />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập không nhất thiết, hệ thống sẽ tự động gán nếu không có
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-[#0d0d0d] rounded-2xl p-6" style={{
            border: '1px solid #2a2a2a'
          }}>
              <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>

              <div className="space-y-3">
                {/* MoMo */}
                <button onClick={() => handlePaymentMethodClick('momo')} className={`w-full p-4 rounded-lg border-2 transition-all text-left ${paymentMethod === 'momo' ? 'border-[#fbbf24] bg-[#fbbf24]/5' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                      <img 
                        src={momoLogo} 
                        alt="MoMo Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image not found - show placeholder
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback w-full h-full flex items-center justify-center bg-[#D82D8B] rounded';
                            fallback.innerHTML = '<span class="text-white font-bold text-xs">MoMo</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">Ví MoMo</div>
                      <div className="text-xs text-gray-400">
                        Quét mã QR hoặc liên kết ví
                      </div>
                    </div>
                    {paymentMethod === 'momo' && <Check className="w-5 h-5 text-[#fbbf24]" />}
                  </div>
                </button>

                {/* VNPay */}
                <button onClick={() => handlePaymentMethodClick('vnpay')} className={`w-full p-4 rounded-lg border-2 transition-all text-left ${paymentMethod === 'vnpay' ? 'border-[#fbbf24] bg-[#fbbf24]/5' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1">
                      <img 
                        src={vnpayLogo} 
                        alt="VNPay Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image not found
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback w-full h-full flex items-center justify-center';
                            fallback.innerHTML = '<span class="text-[#0052A5] font-bold text-xs">VNPAY</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">VNPay</div>
                      <div className="text-xs text-gray-400">
                        Thẻ ATM, Visa, Mastercard
                      </div>
                    </div>
                    {paymentMethod === 'vnpay' && <Check className="w-5 h-5 text-[#fbbf24]" />}
                  </div>
                </button>

                {/* Chuyển khoản / VIETQR */}
                <button onClick={() => handlePaymentMethodClick('bank')} className={`w-full p-4 rounded-lg border-2 transition-all text-left ${paymentMethod === 'bank' ? 'border-[#fbbf24] bg-[#fbbf24]/5' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1">
                      <img 
                        src={vietqrLogo} 
                        alt="VIETQR Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image not found
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback w-full h-full flex items-center justify-center';
                            fallback.innerHTML = '<span class="text-[#E31E24] font-bold text-xs">VIETQR</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">Chuyển khoản</div>
                      <div className="text-xs text-gray-400">
                        Chuyển khoản ngân hàng
                      </div>
                    </div>
                    {paymentMethod === 'bank' && <Check className="w-5 h-5 text-[#fbbf24]" />}
                  </div>
                </button>
              </div>
            </div>

            {submitError && (
              <div className="mb-3 text-sm text-red-300 bg-red-900/20 border border-red-800 rounded-lg p-3">
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-black font-bold text-lg transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
              }}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất thanh toán'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Với lượng đăng nhập đây có thông tin bạn đã đồng ý với{' '}
              <span className="text-[#fbbf24]">Điều khoản</span> và{' '}
              <span className="text-[#fbbf24]">Chính sách bảo mật</span> của
              chúng tôi. Chúng tôi không lưu trữ thẻ thanh toán.
            </p>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-[#0d0d0d] rounded-2xl p-6 sticky top-8" style={{
            border: '1px solid #2a2a2a'
          }}>
              <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>

              {/* Package Info */}
              <div className="rounded-lg p-4 mb-6" style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Gói đã chọn</span>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: '#fbbf24',
                    }}
                  >
                    {(amount / 1000).toLocaleString('vi-VN', {
                      maximumFractionDigits: 0,
                    })}
                    K
                  </span>
                </div>
                <div className="font-bold text-lg">Gói Năng Cao</div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Quyền lợi khi mua:</h3>
                <div className="space-y-2">
                  {packageFeatures.map((feature, idx) => <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>)}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3 pt-6 border-t border-[#2a2a2a]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Giá gốc</span>
                  <span className="text-white">
                    {amount.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <div className="flex items-center justify-between text-lg font-bold pt-3 border-t border-[#2a2a2a]">
                  <span>Tổng cộng</span>
                  <span
                    style={{
                      color: '#fbbf24',
                    }}
                  >
                    {amount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Mã khuyến mãi (nếu có)
                </label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Nhập mã khuyến mãi" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-1 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500 focus:border-[#fbbf24] focus:outline-none transition-colors text-sm" />
                  <button className="px-4 py-2 rounded-lg bg-[#fbbf24] text-black font-bold text-sm hover:bg-[#f59e0b] transition-colors">
                    Áp dụng
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Mã khuyến mãi sẽ được xác thực qua hệ thống quản trị.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#2a2a2a] space-y-2">
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Kích hoạt tức thì sau khi thanh toán</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Check className="w-4 h-4" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}