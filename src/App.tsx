import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { LandingPage } from './pages/LandingPage';
import { PartnerSelectionPage } from './pages/PartnerSelectionPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { PaymentPage } from './pages/PaymentPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { KYCPage } from './pages/KYCPage';
import { PartnerRegistrationPage } from './pages/PartnerRegistrationPage';
export function App() {
  return <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/partners" element={<PartnerSelectionPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register/:partnerType" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/kyc" element={<KYCPage />} />
          <Route path="/partner-registration" element={<PartnerRegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>;
}