import { useState, useEffect } from 'react';
import {
  Bell,
  DollarSign,
  FileText,
  LogOut,
  CheckCircle,
  AlertCircle,
  Users,
  CreditCard,
  ShoppingBag,
  Shield,
  Zap,
  Globe,
  LayoutDashboard,
  Layers,
  X,
  FileCheck,
  Menu,
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../services/api';

type PageType =
  | 'overview'
  | 'pool'
  | 'referral-commission'
  | 'pr-points'
  | 'my-network'
  | 'documents-training'
  | 'card-services'
  | 'marketplace'
  | 'compliance'
  | 'recent-activities'
  | 'system-regulations';

export function DashboardPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [hasJoinedPool1, setHasJoinedPool1] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loadingTrainings, setLoadingTrainings] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load pool status and tasks/campaigns on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, get userId from auth context/token
        // For now, we'll use localStorage or get from login response
        const userId = localStorage.getItem('userId') || 'current-user-id';
        setCurrentUserId(userId);

        // Fetch pool status
        try {
          const poolStatus = await api.getUserPoolStatus(userId);
          setHasJoinedPool1(poolStatus.hasJoinedPool1 || false);
        } catch {
          // If no pool status exists, it will be created on first join
        }

        // Fetch tasks, campaigns, and trainings
        const [tasksData, campaignsData, trainingsData] = await Promise.all([
          api.getTasks(),
          api.getCampaigns(),
          api.getTrainings(),
        ]);
        setTasks(tasksData || []);
        setCampaigns(campaignsData || []);
        setTrainings(trainingsData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    void loadData();
  }, []);

  const handleJoinPool = async () => {
    if (!currentUserId) return;
    try {
      await api.updateUserPoolStatus(currentUserId, { hasJoinedPool1: true });
      setHasJoinedPool1(true);
    } catch (error) {
      console.error('Error joining pool:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Render Overview Page
  const renderOverviewPage = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h1 className="text-2xl font-bold mb-2">
            {t('dashboard.welcomeBack')}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-xs font-medium">
              {t('dashboard.systemParticipationRights')}
            </span>
            <span className="text-sm text-gray-400">
              {t('dashboard.notParticipated')}
            </span>
          </div>
        </div>

        {/* System Status Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">
            {t('dashboard.systemStatus')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.currentPackage')}
              </p>
              <p className="text-lg font-semibold">999K – {t('dashboard.active')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.kycStatus')}
              </p>
              <p className="text-lg font-semibold text-yellow-400">
                {t('dashboard.notVerified')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.currentPool')}
              </p>
              <p className="text-lg font-semibold">
                {t('dashboard.notParticipated')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.incomeStatus')}
              </p>
              <p className="text-sm text-gray-300">
                {t('dashboard.incomeStatusDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">
            {t('dashboard.yourRights')} (Gói 999K)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-green-400">
                A. {t('dashboard.activatedRights')}
              </p>
              <div className="space-y-2">
                {[
                  t('dashboard.right1'),
                  t('dashboard.right2'),
                  t('dashboard.right3'),
                  t('dashboard.right4'),
                ].map((right, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {right}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-red-400">
                B. {t('dashboard.notActivatedRights')}
              </p>
              <div className="space-y-2">
                {[
                  t('dashboard.right5'),
                  t('dashboard.right6'),
                  t('dashboard.right7'),
                ].map((right, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <X className="w-4 h-4 text-red-400" />
                    {right}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              {t('dashboard.rightsNote')}
            </p>
          </div>
        </div>

        {/* Current Pool Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">{t('dashboard.currentPool')}</h2>
          {hasJoinedPool1 ? (
            <div className="space-y-6">
              {/* Pool 1 - Active */}
              <div className="bg-green-900/20 rounded-xl p-6 border-2 border-green-500/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h3 className="text-lg font-bold text-green-400">
                    Pool 1 - {t('dashboard.active')}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 mb-6">
                  {t('dashboard.pool1ActiveDesc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-5 h-5 text-green-400" />
                      <p className="text-3xl font-bold">8 PR</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {t('dashboard.referenceData')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      {t('dashboard.totalAccumulated')}
                    </p>
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-green-400" />
                      <p className="text-2xl font-bold">8 PR</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pool 2 - Not Available */}
              <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-2 text-gray-400">
                  {t('dashboard.nextPool2')}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {t('dashboard.notEnoughConditions')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('dashboard.pool2Condition')}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">
                {t('dashboard.noPoolJoined')}
              </p>
              <p className="text-sm text-gray-400 mb-6">
                {t('dashboard.viewingPool1')}
              </p>
              <div className="bg-[#1a2332] rounded-xl p-6 border-2 border-orange-500/30">
                <h3 className="text-lg font-bold mb-2 text-orange-400">
                  {t('dashboard.pool1Basic')}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t('dashboard.pool1Desc')}
                </p>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">
                    {t('dashboard.monthlyBonus')}
                  </p>
                  <p className="text-2xl font-bold">0 PR</p>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  {t('dashboard.referenceData')}
                </p>
                <button
                  onClick={handleJoinPool}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  {t('dashboard.joinPool1')}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  {t('dashboard.commissionNote')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Referral Commission Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">
            {t('dashboard.referralCommission')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.f1Commission')}
              </p>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.f2Commission')}
              </p>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {t('dashboard.commissionDetails')}
          </p>
        </div>

        {/* PR Points Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">PR – {t('dashboard.rewardPoints')}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.prBalance')}
              </p>
              <p className="text-xl font-bold">0 PR</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.prToday')}
              </p>
              <p className="text-xl font-bold">0 PR</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.prBonus')}
              </p>
              <p className="text-xl font-bold">0 PR</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {t('dashboard.prNote')}
          </p>
        </div>

        {/* KYC Verification Card */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-yellow-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">
                {t('dashboard.kycVerification')}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {t('dashboard.kycDesc')}
              </p>
              <button
                onClick={() => navigate('/kyc')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                {t('dashboard.completeKYC')}
              </button>
            </div>
          </div>
        </div>

        {/* System Immutability Statement */}
        <div className="bg-[#151b2e] rounded-xl p-6 border border-red-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold mb-4">
                {t('dashboard.systemStatement')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {[
                  t('dashboard.statement1'),
                  t('dashboard.statement2'),
                  t('dashboard.statement3'),
                  t('dashboard.statement4'),
                  t('dashboard.statement5'),
                  t('dashboard.statement6'),
                  t('dashboard.statement7'),
                ].map((statement, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    {statement}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                {t('dashboard.statementNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Pool Page
  const renderPoolPage = () => {
    const activeTasks = tasks.filter((t) => t.status === 'active').slice(0, 5);
    const activeCampaigns = campaigns.filter((c) => c.status === 'active').slice(0, 5);

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.poolProgress')}</h1>
        {hasJoinedPool1 ? (
          <div className="space-y-6">
            {/* Pool 1 - Active */}
            <div className="bg-green-900/20 rounded-xl p-6 border-2 border-green-500/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h2 className="text-xl font-bold text-green-400">
                  Pool 1 - {t('dashboard.active')}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                {t('dashboard.pool1ActiveDesc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-green-400" />
                    <p className="text-3xl font-bold">8 PR</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {t('dashboard.referenceData')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    {t('dashboard.totalAccumulated')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-green-400" />
                    <p className="text-2xl font-bold">8 PR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold">Nhiệm vụ đang hoạt động</h3>
                </div>
                <div className="space-y-3">
                  {activeTasks.map((task) => (
                    <div key={task._id || task.id} className="bg-[#1a2332] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-sm text-gray-400">{task.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-400">{task.points || 0} PR</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Campaigns */}
            {activeCampaigns.length > 0 && (
              <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold">Chiến dịch đang hoạt động</h3>
                </div>
                <div className="space-y-3">
                  {activeCampaigns.map((campaign) => (
                    <div key={campaign._id || campaign.id} className="bg-[#1a2332] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-gray-400">
                            Hoa hồng: {campaign.commission}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            {campaign.sales || 0} lượt bán
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pool 2 - Not Available */}
            <div className="bg-[#1a2332] rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-2 text-gray-400">
                {t('dashboard.nextPool2')}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {t('dashboard.notEnoughConditions')}
              </p>
              <p className="text-xs text-gray-500">
                {t('dashboard.pool2Condition')}
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-400">{t('dashboard.noPoolJoined')}</p>
            <p className="text-gray-400">{t('dashboard.viewingPool1')}</p>
            <div className="bg-[#1a2332] rounded-xl p-6 border-2 border-orange-500/30">
              <h2 className="text-xl font-bold mb-2 text-orange-400">
                {t('dashboard.pool1Basic')}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {t('dashboard.pool1Desc')}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                ({t('dashboard.referenceData')})
              </p>
              <p className="text-2xl font-bold mb-4">8 PR</p>
              <p className="text-xs text-gray-500 mb-6">
                {t('dashboard.referenceDataNote')}
              </p>
              <button
                onClick={handleJoinPool}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                {t('dashboard.joinPool1')}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  // Render Referral Commission Page
  const renderReferralCommissionPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.referralCommission')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">
              {t('dashboard.f1Commission')}
            </h3>
            <p className="text-4xl font-bold mb-2">$0.00</p>
            <span className="px-2 py-1 rounded border border-yellow-500/30 text-yellow-400 text-xs">
              {t('dashboard.provisional')}
            </span>
          </div>
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">
              {t('dashboard.f2Commission')}
            </h3>
            <p className="text-4xl font-bold mb-2">$0.00</p>
            <span className="px-2 py-1 rounded border border-yellow-500/30 text-yellow-400 text-xs">
              {t('dashboard.provisional')}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {t('dashboard.commissionCycle')}
        </p>
      </div>
    );
  };

  // Render PR Points Page
  const renderPRPointsPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">PR – {t('dashboard.rewardPoints')}</h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-purple-500/30">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t('dashboard.prBalance')}
              </p>
              <p className="text-4xl font-bold">0 PR</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t('dashboard.prToday')}
              </p>
              <p className="text-4xl font-bold">0 PR</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                {t('dashboard.prThisMonth')}
              </p>
              <p className="text-4xl font-bold">0 PR</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {t('dashboard.prDisclaimer')}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold mb-4">{t('dashboard.prHistory')}</h2>
          <div className="text-center py-12">
            <p className="text-gray-400 mb-2">
              {t('dashboard.noPRHistory')}
            </p>
            <p className="text-sm text-gray-500">
              {t('dashboard.prHistoryNote')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render My Network Page
  const renderMyNetworkPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.myNetwork')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">{t('dashboard.totalF1')}</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">{t('dashboard.totalF2')}</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.networkQuality')}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('dashboard.activeF1')}</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('dashboard.kycF1')}</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {t('dashboard.qualityOverQuantity')}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 mb-2">{t('dashboard.noF1Yet')}</p>
          <p className="text-sm text-gray-500">{t('dashboard.shareLinkNote')}</p>
        </div>
        <p className="text-xs text-gray-500">
          {t('dashboard.maxTwoTiers')}
        </p>
      </div>
    );
  };

  // Render Documents & Training Page
  const renderDocumentsTrainingPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.documentsTraining')}
        </h1>
        
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.systemUnderstanding')}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-0" />
            </div>
            <span className="ml-4 text-sm text-gray-400">0/{trainings.length}</span>
          </div>
          <p className="text-sm text-gray-500">
            {t('dashboard.completeDocsNote')}
          </p>
        </div>

        {loadingTrainings ? (
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800 text-center">
            <p className="text-gray-400">Đang tải dữ liệu...</p>
          </div>
        ) : trainings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainings.map((training) => (
              <div
                key={training._id || training.id}
                className="bg-[#151b2e] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block truncate">{training.title || 'Khóa học'}</span>
                    <p className="text-sm text-gray-400 line-clamp-2">{training.description || 'Không có mô tả'}</p>
                  </div>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <p className="text-sm text-gray-400">{training.duration || 'N/A'}</p>
                  <p className="text-xs text-gray-500">{training.level || 'All levels'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800 text-center">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">{t('dashboard.noDocsRead')}</p>
            <p className="text-sm text-gray-500">{t('dashboard.completeDocsToUnderstand')}</p>
          </div>
        )}
      </div>
    );
  };

  // Render Card & PR Services Page
  const renderCardServicesPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.cardServices')}
        </h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.serviceIntroductionRights')}
          </h3>
          <p className="text-gray-400 mb-4">
            {t('dashboard.serviceIntroductionDesc')}
          </p>
          <ul className="space-y-2 mb-4 text-sm text-gray-300">
            <li>• {t('dashboard.service1')}</li>
            <li>• {t('dashboard.service2')}</li>
            <li>• {t('dashboard.service3')}</li>
          </ul>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-400">
              {t('dashboard.validTransaction')}
            </p>
          </div>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-400">
              {t('dashboard.noFinancialServices')}
            </p>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors mb-4">
            {t('dashboard.copyReferralLink')}
          </button>
          <p className="text-xs text-gray-500">
            {t('dashboard.prNotAutoRecorded')}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.serviceIntroductionStatus')}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.numberOfReferrals')}
              </p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.confirmed')}
              </p>
              <p className="text-2xl font-bold text-green-400">8</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {t('dashboard.pendingConfirmation')}
              </p>
              <p className="text-2xl font-bold text-orange-400">0</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {t('dashboard.prOnlyWhenConfirmed')}
          </p>
        </div>
      </div>
    );
  };

  // Render Marketplace Page
  const renderMarketplacePage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('dashboard.marketplace')}</h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.yourMarketplaceRole')}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {t('dashboard.ecosystemUser')}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {t('dashboard.prUsageRights')}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {t('dashboard.marketplaceRightsNote')}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-12 border border-gray-800 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-600" />
          </div>
          <p className="text-gray-400">Merchants coming soon...</p>
        </div>
      </div>
    );
  };

  // Render Compliance & Verification Page
  const renderCompliancePage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.complianceVerification')}
        </h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border-2 border-yellow-500/30">
          <h3 className="text-lg font-bold mb-4">
            {t('dashboard.kycVerification')}
          </h3>
          <p className="text-gray-400 mb-6">
            {t('dashboard.kycDesc')}
          </p>
          <button
            onClick={() => navigate('/kyc')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            {t('dashboard.completeKYC')}
          </button>
        </div>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">
            {t('dashboard.complianceNote')}
          </p>
        </div>
      </div>
    );
  };

  // Render Recent Activities Page
  const renderRecentActivitiesPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.recentActivities')}
        </h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-center py-8">
            {t('dashboard.noActivitiesYet')}
          </p>
        </div>
      </div>
    );
  };

  // Render System Regulations Page
  const renderSystemRegulationsPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {t('dashboard.systemRegulations')}
        </h1>
        <div className="bg-[#151b2e] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-center py-8">
            {t('dashboard.regulationsComingSoon')}
          </p>
        </div>
      </div>
    );
  };

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: t('dashboard.overview') },
    { id: 'pool', icon: Layers, label: t('dashboard.pool') },
    {
      id: 'referral-commission',
      icon: DollarSign,
      label: t('dashboard.referralCommission'),
    },
    { id: 'pr-points', icon: DollarSign, label: t('dashboard.prRewardPoints') },
    { id: 'my-network', icon: Users, label: t('dashboard.myNetwork') },
    {
      id: 'documents-training',
      icon: FileText,
      label: t('dashboard.documentsTraining'),
    },
    {
      id: 'card-services',
      icon: CreditCard,
      label: t('dashboard.cardServices'),
    },
    { id: 'marketplace', icon: ShoppingBag, label: t('dashboard.marketplace') },
    {
      id: 'compliance',
      icon: Shield,
      label: t('dashboard.complianceVerification'),
    },
    {
      id: 'recent-activities',
      icon: Zap,
      label: t('dashboard.recentActivities'),
    },
    {
      id: 'system-regulations',
      icon: FileCheck,
      label: t('dashboard.systemRegulations'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex relative">
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151b2e] border border-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-2">
                {t('dashboard.confirmLogout')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('dashboard.logoutConfirmMessage')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  {t('dashboard.cancel')}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                >
                  {t('dashboard.logout')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-[#151b2e] border-r border-gray-800 flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className={`p-4 border-b border-gray-800 ${sidebarCollapsed ? 'p-3' : ''}`}>
          <div className="flex items-center gap-3">
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg truncate">AIHUB Network</h2>
                <p className="text-xs text-gray-400 truncate">Dashboard 999K</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as PageType);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${sidebarCollapsed ? 'justify-center px-2' : ''}
                  ${currentPage === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-400 hover:text-white'}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`p-4 border-t border-gray-800 ${sidebarCollapsed ? 'p-2' : ''}`}>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors
              ${sidebarCollapsed ? 'justify-center px-2' : ''}
            `}
            title={sidebarCollapsed ? t('dashboard.logout') : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-sm">{t('dashboard.logout')}</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Top Bar */}
        <header className="h-16 bg-[#151b2e] border-b border-gray-800 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold">AIHUB Network</h1>
              <p className="text-xs lg:text-sm text-gray-400">Dashboard 999K</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="px-3 py-1.5 rounded-lg bg-gray-800 text-sm text-gray-400 hover:text-white transition-colors uppercase flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              {language}
            </button>
            <button
              className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-bold">P</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'overview' && renderOverviewPage()}
              {currentPage === 'pool' && renderPoolPage()}
              {currentPage === 'referral-commission' &&
                renderReferralCommissionPage()}
              {currentPage === 'pr-points' && renderPRPointsPage()}
              {currentPage === 'my-network' && renderMyNetworkPage()}
              {currentPage === 'documents-training' &&
                renderDocumentsTrainingPage()}
              {currentPage === 'card-services' && renderCardServicesPage()}
              {currentPage === 'marketplace' && renderMarketplacePage()}
              {currentPage === 'compliance' && renderCompliancePage()}
              {currentPage === 'recent-activities' &&
                renderRecentActivitiesPage()}
              {currentPage === 'system-regulations' &&
                renderSystemRegulationsPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
