import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Settings,
  LogOut,
  Bell,
  Target,
  Award,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Eye,
  MoreVertical,
  X,
  Save,
  BarChart3,
  TrendingDown,
  Activity,
  Upload,
  Layers,
  CreditCard,
  ShoppingBag,
  Shield,
  FileText,
  Tag,
  Network,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { api } from '../services/api';

// Payment logos - using actual images from public/images/ folder
const momoLogo = '/images/Logo-MoMo-Square.webp';
const vnpayLogo = '/images/vnpay-logo-vinadesign-25-12-57-55.jpg';
const vietqrLogo = '/images/vietqr.png.jpg';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    'task' | 'campaign' | 'training' | 'promo' | 'pool' | 'referral' | 'pr' | 'network' | 'card' | 'marketplace' | 'compliance' | 'regulation' | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [tasks, setTasks] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [trainings, setTrainings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [poolSettings, setPoolSettings] = useState<any[]>([]);
  const [referralSettings, setReferralSettings] = useState({
    f1Commission: 0,
    f2Commission: 0,
    minAmount: 0,
    maxCommission: 0,
  });
  const [prSettings, setPrSettings] = useState({
    prPerSale: 0,
    prPerReferral: 0,
    prPerTask: 0,
    prConversionRate: 0,
  });
  const [networkSettings, setNetworkSettings] = useState({
    maxLevels: 0,
    autoApprove: false,
    requireKYC: true,
  });
  const [cardServices, setCardServices] = useState<any[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<any[]>([]);
  const [complianceRules, setComplianceRules] = useState<any[]>([]);
  const [regulations, setRegulations] = useState<any[]>([]);
  const [paymentSettings, setPaymentSettings] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankBranch: '',
    momoEnabled: false,
    vnpayEnabled: false,
    bankTransferEnabled: false,
    qrCodeUrl: '',
  });
  const [editingPayment, setEditingPayment] = useState(false);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const mapWithId = (collection: any[]) =>
    collection.map((item) => ({ ...item, id: item?._id || item?.id }));

  const loadData = () => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setDataError(null);
        const [tasksRes, campaignsRes, trainingsRes, paymentRes, summaryRes, usersRes] =
          await Promise.all([
            api.getTasks(),
            api.getCampaigns(),
            api.getTrainings(),
            api.getPaymentSettings(),
            api.getDashboardSummary(),
            api.getUsers(),
          ]);
        setTasks(mapWithId(tasksRes));
        setCampaigns(mapWithId(campaignsRes));
        setTrainings(mapWithId(trainingsRes));
        setPaymentSettings(paymentRes);
        setSummary(summaryRes.summary || summary);
        setActivities(mapWithId(summaryRes.recentActivities || []));
        setUsers(mapWithId(usersRes || []));
      } catch (error) {
        setDataError((error as Error).message || 'Không tải được dữ liệu');
      } finally {
        setLoadingData(false);
      }
    };

    void fetchData();
  };

  useEffect(() => {
    loadData();
  }, []);
  const [summary, setSummary] = useState({
    partners: 0,
    revenue: 0,
    activeCampaigns: 0,
    avgKpi: 0,
    tasks: 0,
    trainings: 0,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [savingPayment, setSavingPayment] = useState(false);
  const initialFormState = {
    title: '',
    description: '',
    points: 0,
    deadline: '',
    assignedTo: '',
    name: '',
    commission: 0,
    startDate: '',
    endDate: '',
    status: 'active',
    sales: 0,
    revenue: 0,
    duration: '',
    level: '',
    enrolled: 0,
    completion: 0,
  };
  const [formState, setFormState] = useState(initialFormState);

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodePreview(reader.result as string);
        setPaymentSettings({
          ...paymentSettings,
          qrCodeUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = useMemo(
    () => [
      {
        icon: Users,
        label: 'Total Partners',
        value: summary.partners?.toString() || '0',
        change: '',
        changeType: 'positive',
        color: '#3b82f6',
      },
      {
        icon: DollarSign,
        label: 'Total Revenue',
        value: summary.revenue
          ? `${summary.revenue.toLocaleString('vi-VN')}đ`
          : '0đ',
        change: '',
        changeType: 'positive',
        color: '#22c55e',
      },
      {
        icon: Target,
        label: 'Active Campaigns',
        value: summary.activeCampaigns?.toString() || '0',
        change: '',
        changeType: 'positive',
        color: '#f97316',
      },
      {
        icon: TrendingUp,
        label: t('admin.avgKPIScore'),
        value: summary.avgKpi?.toString() || '0',
        change: '',
        changeType: 'positive',
        color: '#a855f7',
      },
    ],
    [summary, t]
  );

  const menuItems = [
    {
      id: 'overview',
      icon: LayoutDashboard,
      label: t('admin.overview'),
      badge: null,
    },
    {
      id: 'tasks',
      icon: CheckCircle,
      label: t('admin.manageTasks'),
      badge: null,
    },
    {
      id: 'campaigns',
      icon: TrendingUp,
      label: t('admin.manageCampaigns'),
      badge: null,
    },
    {
      id: 'training',
      icon: GraduationCap,
      label: t('admin.manageTraining'),
      badge: null,
    },
    {
      id: 'pool',
      icon: Layers,
      label: t('admin.managePools'),
      badge: null,
    },
    {
      id: 'referral-commission',
      icon: Network,
      label: t('admin.manageReferral'),
      badge: null,
    },
    {
      id: 'pr-points',
      icon: Award,
      label: t('admin.managePRPoints'),
      badge: null,
    },
    {
      id: 'network',
      icon: Users,
      label: t('admin.manageNetwork'),
      badge: null,
    },
    {
      id: 'card-services',
      icon: CreditCard,
      label: t('admin.manageCardServices'),
      badge: null,
    },
    {
      id: 'marketplace',
      icon: ShoppingBag,
      label: t('admin.manageMarketplace'),
      badge: null,
    },
    {
      id: 'compliance',
      icon: Shield,
      label: t('admin.manageCompliance'),
      badge: null,
    },
    {
      id: 'regulations',
      icon: FileText,
      label: t('admin.manageSystemRegulations'),
      badge: null,
    },
    {
      id: 'promo-codes',
      icon: Tag,
      label: t('admin.managePromoCodes'),
      badge: null,
    },
    {
      id: 'users',
      icon: Users,
      label: t('admin.manageUsers'),
      badge: null,
    },
    {
      id: 'kpi',
      icon: BarChart3,
      label: t('admin.analyzeKPI'),
      badge: null,
    },
    {
      id: 'earnings',
      icon: DollarSign,
      label: t('admin.analyzeEarnings'),
      badge: null,
    },
    {
      id: 'activities',
      icon: Activity,
      label: t('admin.activityLog'),
      badge: null,
    },
    {
      id: 'payment-settings',
      icon: Settings,
      label: t('admin.paymentSettings'),
      badge: null,
    },
  ];

  const handleCreate = (
    type:
      | 'task'
      | 'campaign'
      | 'training'
      | 'promo'
      | 'pool'
      | 'referral'
      | 'pr'
      | 'network'
      | 'card'
      | 'marketplace'
      | 'compliance'
      | 'regulation'
  ) => {
    setModalType(type);
    setEditingItem(null);
    setFormState(initialFormState);
    setShowModal(true);
  };

  const handleEdit = (
    type:
      | 'task'
      | 'campaign'
      | 'training'
      | 'promo'
      | 'pool'
      | 'referral'
      | 'pr'
      | 'network'
      | 'card'
      | 'marketplace'
      | 'compliance'
      | 'regulation',
    item: any
  ) => {
    setModalType(type);
    setEditingItem(item);
    const normalized = { ...initialFormState, ...(item || {}) };
    if (type === 'task') {
      setFormState({
        ...initialFormState,
        title: item?.title || '',
        description: item?.description || '',
        points: item?.points || 0,
        deadline: item?.deadline ? item.deadline.slice(0, 10) : '',
        assignedTo: item?.assignedTo || '',
        status: item?.status || 'active',
      });
    } else if (type === 'campaign') {
      setFormState({
        ...initialFormState,
        name: item?.name || '',
        commission: item?.commission || 0,
        startDate: item?.startDate ? item.startDate.slice(0, 10) : '',
        endDate: item?.endDate ? item.endDate.slice(0, 10) : '',
        status: item?.status || 'active',
        sales: item?.sales || 0,
        revenue: item?.revenue || 0,
      });
    } else if (type === 'training') {
      setFormState({
        ...initialFormState,
        title: item?.title || '',
        description: item?.description || '',
        duration: item?.duration || '',
        level: item?.level || '',
        enrolled: item?.enrolled || 0,
        completion: item?.completion || 0,
      });
    } else {
      setFormState(normalized);
    }
    setShowModal(true);
  };

  const handleDelete = async (
    type:
      | 'task'
      | 'campaign'
      | 'training'
      | 'promo'
      | 'pool'
      | 'card'
      | 'marketplace'
      | 'compliance'
      | 'regulation',
    id: number | string
  ) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    const idStr = id.toString();
    try {
      if (type === 'task') {
        await api.deleteTask(idStr);
        setTasks(tasks.filter((t) => t.id?.toString() !== idStr));
      }
      if (type === 'campaign') {
        await api.deleteCampaign(idStr);
        setCampaigns(campaigns.filter((c) => c.id?.toString() !== idStr));
      }
      if (type === 'training') {
        await api.deleteTraining(idStr);
        setTrainings(trainings.filter((t) => t.id?.toString() !== idStr));
      }
      if (type === 'promo')
        setPromoCodes(promoCodes.filter((p) => p.id?.toString() !== idStr));
      if (type === 'pool')
        setPoolSettings(poolSettings.filter((p) => p.id?.toString() !== idStr));
      if (type === 'card')
        setCardServices(cardServices.filter((c) => c.id?.toString() !== idStr));
      if (type === 'marketplace')
        setMarketplaceItems(
          marketplaceItems.filter((m) => m.id?.toString() !== idStr)
        );
      if (type === 'compliance')
        setComplianceRules(
          complianceRules.filter((c) => c.id?.toString() !== idStr)
        );
      if (type === 'regulation')
        setRegulations(regulations.filter((r) => r.id?.toString() !== idStr));
    } catch (error) {
      window.alert((error as Error).message || 'Không thể xóa mục này');
    }
  };

  const handleSave = async () => {
    if (!modalType) return;
    try {
      if (modalType === 'task') {
        const payload = {
          title: formState.title,
          description: formState.description,
          points: Number(formState.points) || 0,
          deadline: formState.deadline,
          assignedTo: formState.assignedTo,
          status: formState.status || 'active',
        };
        const saved = await api.saveTask(payload, editingItem?.id);
        const savedWithId = { ...saved, id: saved._id || saved.id };
        setTasks((prev) =>
          editingItem
            ? prev.map((t) =>
                t.id?.toString() === editingItem.id?.toString()
                  ? savedWithId
                  : t
              )
            : [savedWithId, ...prev]
        );
      }

      if (modalType === 'campaign') {
        const payload = {
          name: formState.name,
          commission: Number(formState.commission) || 0,
          startDate: formState.startDate,
          endDate: formState.endDate,
          status: formState.status || 'active',
          sales: Number(formState.sales) || 0,
          revenue: Number(formState.revenue) || 0,
        };
        const saved = await api.saveCampaign(payload, editingItem?.id);
        const savedWithId = { ...saved, id: saved._id || saved.id };
        setCampaigns((prev) =>
          editingItem
            ? prev.map((c) =>
                c.id?.toString() === editingItem.id?.toString()
                  ? savedWithId
                  : c
              )
            : [savedWithId, ...prev]
        );
      }

      if (modalType === 'training') {
        const payload = {
          title: formState.title,
          description: formState.description,
          duration: formState.duration,
          level: formState.level,
          enrolled: Number(formState.enrolled) || 0,
          completion: Number(formState.completion) || 0,
        };
        const saved = await api.saveTraining(payload, editingItem?.id);
        const savedWithId = { ...saved, id: saved._id || saved.id };
        setTrainings((prev) =>
          editingItem
            ? prev.map((t) =>
                t.id?.toString() === editingItem.id?.toString()
                  ? savedWithId
                  : t
              )
            : [savedWithId, ...prev]
        );
      }

      setShowModal(false);
      setEditingItem(null);
      setFormState(initialFormState);
    } catch (error) {
      window.alert((error as Error).message || 'Không thể lưu dữ liệu');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${stat.color}20`,
                }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{
                    color: stat.color,
                  }}
                />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded text-green-400 bg-green-400/10">
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <h3 className="font-bold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-[#0f1419] rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{activity.user}</div>
                  <div className="text-xs text-gray-400">
                    {activity.action}: {activity.detail}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <h3 className="font-bold mb-4">{t('admin.topPerformers')}</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-[#0f1419] rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-400">
                    {user.level} • KPI: {user.kpi}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">
                    {user.earnings}
                  </div>
                  <div className="text-xs text-gray-500">
                    F1: {user.f1} • F2: {user.f2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.manageTasksTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.manageTasksDesc')}
          </p>
        </div>
        <button
          onClick={() => handleCreate('task')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.createNewTask')}
        </button>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0f1419] border-b border-[#2a2f3e]">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.task')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.points')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.deadline')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.assignTo')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.status')}
              </th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">
                {t('admin.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-[#2a2f3e] hover:bg-[#0f1419] transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-400">
                    {task.description}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-medium">
                    {task.points} pts
                  </span>
                </td>
                <td className="p-4 text-sm">{task.deadline}</td>
                <td className="p-4 text-sm">{task.assignedTo}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${task.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit('task', task)}
                      className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('task', task.id)}
                      className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.manageCampaignsTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.manageCampaignsDesc')}
          </p>
        </div>
        <button
          onClick={() => handleCreate('campaign')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.createNewCampaign')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold mb-1">{campaign.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${campaign.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-orange-600/20 text-orange-400'}`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit('campaign', campaign)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('campaign', campaign.id)}
                  className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Commission</span>
                <span className="font-bold text-green-400">
                  {campaign.commission}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Period</span>
                <span>
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sales</span>
                <span className="font-medium">{campaign.sales}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Revenue</span>
                <span className="font-bold text-blue-400">
                  {campaign.revenue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.manageTrainingTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.manageTrainingDesc')}
          </p>
        </div>
        <button
          onClick={() => handleCreate('training')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.createNewCourse')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trainings.map((training) => (
          <div
            key={training.id}
            className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold mb-2">{training.title}</h3>
                <p className="text-sm text-gray-400 mb-3">
                  {training.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
                    {training.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    {training.duration}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit('training', training)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('training', training.id)}
                  className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Enrolled</span>
                <span className="font-medium">{training.enrolled} users</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Completion</span>
                  <span className="font-medium">{training.completion}</span>
                </div>
                <div className="h-2 bg-[#0f1419] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{
                      width: training.completion,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.manageUsersTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.manageUsersDesc')}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-[#2a2f3e] hover:border-[#3a3f4e] rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            {t('admin.filter')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-[#2a2f3e] hover:border-[#3a3f4e] rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            {t('admin.export')}
          </button>
        </div>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0f1419] border-b border-[#2a2f3e]">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.user')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.level')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.kpi')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.earnings')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.network')}
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">
                {t('admin.joinDate')}
              </th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">
                {t('admin.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  Chưa có người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id || user._id}
                  className="border-b border-[#2a2f3e] hover:bg-[#0f1419] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                        {(user.fullName || user.name || user.username || 'U')
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{user.fullName || user.name || user.username || 'N/A'}</div>
                        <div className="text-sm text-gray-400">{user.email || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-medium">
                      {user.level || 'Member'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#0f1419] rounded-full overflow-hidden max-w-[80px]">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-blue-600"
                          style={{
                            width: `${Math.min(user.kpi || 0, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{user.kpi || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-green-400">
                      ${user.earnings || '0.00'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <span className="text-gray-400">F1:</span> {user.f1 || 0} •
                      <span className="text-gray-400"> F2:</span> {user.f2 || 0}
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('vi-VN')
                      : user.joinDate || 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.view') || 'Xem chi tiết'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.more') || 'Thêm'}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderKPI = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('admin.analyzeKPI')}</h2>
        <p className="text-sm text-gray-400">{t('admin.trackPerformance')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">{t('admin.avgKPIScore')}</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold mb-2">84.5</div>
          <div className="text-sm text-green-400">+5.2 from last month</div>
        </div>

        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">{t('admin.topPerformers')}</span>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold mb-2">23</div>
          <div className="text-sm text-gray-400">KPI &gt; 90</div>
        </div>

        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Need Attention</span>
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold mb-2">8</div>
          <div className="text-sm text-red-400">KPI &lt; 60</div>
        </div>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <h3 className="font-bold mb-4">KPI Distribution</h3>
        <div className="space-y-4">
          {[
            {
              range: '90-100',
              count: 23,
              percentage: 18.6,
              color: '#22c55e',
            },
            {
              range: '80-89',
              count: 45,
              percentage: 36.5,
              color: '#3b82f6',
            },
            {
              range: '70-79',
              count: 38,
              percentage: 30.8,
              color: '#f59e0b',
            },
            {
              range: '60-69',
              count: 17,
              percentage: 13.8,
              color: '#f97316',
            },
            {
              range: '<60',
              count: 8,
              percentage: 6.5,
              color: '#ef4444',
            },
          ].map((item) => (
            <div key={item.range}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">{item.range}</span>
                <span className="font-medium">
                  {item.count} users ({item.percentage}%)
                </span>
              </div>
              <div className="h-3 bg-[#0f1419] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('admin.analyzeEarnings')}</h2>
        <p className="text-sm text-gray-400">{t('admin.trackRevenue')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Revenue',
            value: '$45,890',
            change: '+18%',
            color: '#22c55e',
          },
          {
            label: 'Total Commission',
            value: '$12,450',
            change: '+15%',
            color: '#3b82f6',
          },
          {
            label: 'Avg per Partner',
            value: '$37.2',
            change: '+8%',
            color: '#f59e0b',
          },
          {
            label: 'Top Earner',
            value: '$5,890',
            change: 'Mike J.',
            color: '#a855f7',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]"
          >
            <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div
              className="text-sm"
              style={{
                color: stat.color,
              }}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <h3 className="font-bold mb-4">{t('admin.topEarners')}</h3>
        <div className="space-y-3">
          {users.slice(0, 10).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 bg-[#0f1419] rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-sm font-bold">
                #{index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-400">{user.level}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">{user.earnings}</div>
                <div className="text-xs text-gray-500">
                  F1: {user.f1} • F2: {user.f2}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.activityLog')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.trackAllActivities')}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-[#2a2f3e] hover:border-[#3a3f4e] rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            {t('admin.filter')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-[#2a2f3e] hover:border-[#3a3f4e] rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            {t('admin.export')}
          </button>
        </div>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] overflow-hidden">
        <div className="divide-y divide-[#2a2f3e]">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-[#0f1419] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'task' ? 'bg-blue-600/20' : activity.type === 'recruitment' ? 'bg-green-600/20' : activity.type === 'earnings' ? 'bg-yellow-600/20' : 'bg-purple-600/20'}`}
                >
                  {activity.type === 'task' && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                  {activity.type === 'recruitment' && (
                    <Users className="w-5 h-5 text-green-400" />
                  )}
                  {activity.type === 'earnings' && (
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                  )}
                  {activity.type === 'training' && (
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400"> {activity.action}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.timestamp}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{activity.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Promo Codes
  const renderPromoCodes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.managePromoCodesTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.managePromoCodesDesc')}
          </p>
        </div>
        <button
          onClick={() => handleCreate('promo')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.createNewCode')}
        </button>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1419]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.code')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.discount')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.validity')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.usage')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.operations')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2f3e]">
              {promoCodes.map((promo) => (
                <tr key={promo.id} className="hover:bg-[#0f1419] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-400">{promo.code}</div>
                    <div className="text-xs text-gray-500">{promo.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">
                      {promo.discountType === 'percent' ? `${promo.discount}%` : `${promo.discount.toLocaleString()} VND`}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t('admin.max')}: {promo.maxDiscount.toLocaleString()} VND
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    <div>{promo.startDate}</div>
                    <div>{promo.endDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {promo.usedCount} / {promo.usageLimit}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      promo.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                      {promo.status === 'active' ? t('admin.active') : t('admin.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('promo', promo)}
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.edit')}
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete('promo', promo.id)}
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.delete')}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Pool Management
  const renderPool = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.managePoolTitle')}</h2>
          <p className="text-sm text-gray-400">
            {t('admin.managePoolDesc')}
          </p>
        </div>
        <button
          onClick={() => handleCreate('pool')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.createNewPool')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {poolSettings.map((pool) => (
          <div key={pool.id} className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{pool.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                pool.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
              }`}>
                {pool.status === 'active' ? t('admin.active') : t('admin.inactive')}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{pool.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">{t('admin.monthlyBonus')}</span>
                <span className="font-semibold">{pool.monthlyBonus} PR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">{t('admin.prRequired')}</span>
                <span className="font-semibold">{pool.requiredPR} PR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Thành Viên:</span>
                <span className="font-semibold">{pool.members}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit('pool', pool)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                {t('admin.edit')}
              </button>
              <button
                onClick={() => handleDelete('pool', pool.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Referral Commission
  const renderReferralCommission = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('admin.referralSettingsTitle')}</h2>
        <p className="text-sm text-gray-400">
          Cấu hình tỷ lệ hoa hồng cho F1 và F2
        </p>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.f1Commission')}
            </label>
            <input
              type="number"
              value={referralSettings.f1Commission}
              onChange={(e) => setReferralSettings({ ...referralSettings, f1Commission: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.f2Commission')}
            </label>
            <input
              type="number"
              value={referralSettings.f2Commission}
              onChange={(e) => setReferralSettings({ ...referralSettings, f2Commission: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.minOrder')}
            </label>
            <input
              type="number"
              value={referralSettings.minAmount}
              onChange={(e) => setReferralSettings({ ...referralSettings, minAmount: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.maxCommission')}
            </label>
            <input
              type="number"
              value={referralSettings.maxCommission}
              onChange={(e) => setReferralSettings({ ...referralSettings, maxCommission: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            {t('admin.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );

  // Render PR Points
  const renderPRPoints = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('admin.prSettingsTitle')}</h2>
        <p className="text-sm text-gray-400">
          Cấu hình hệ thống điểm PR
        </p>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              PR Mỗi Giao Dịch
            </label>
            <input
              type="number"
              value={prSettings.prPerSale}
              onChange={(e) => setPrSettings({ ...prSettings, prPerSale: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              PR Mỗi Giới Thiệu
            </label>
            <input
              type="number"
              value={prSettings.prPerReferral}
              onChange={(e) => setPrSettings({ ...prSettings, prPerReferral: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.prPerTask')}
            </label>
            <input
              type="number"
              value={prSettings.prPerTask}
              onChange={(e) => setPrSettings({ ...prSettings, prPerTask: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Tỷ Lệ Quy Đổi (1 PR = VND)
            </label>
            <input
              type="number"
              value={prSettings.prConversionRate}
              onChange={(e) => setPrSettings({ ...prSettings, prConversionRate: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            {t('admin.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );

  // Render Network
  const renderNetwork = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('admin.networkSettingsTitle')}</h2>
        <p className="text-sm text-gray-400">
          Cấu hình hệ thống mạng lưới
        </p>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('admin.maxLevels')}
            </label>
            <input
              type="number"
              value={networkSettings.maxLevels}
              onChange={(e) => setNetworkSettings({ ...networkSettings, maxLevels: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tự Động Phê Duyệt
              </label>
              <p className="text-xs text-gray-400">Tự động phê duyệt thành viên mới</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={networkSettings.autoApprove}
                onChange={(e) => setNetworkSettings({ ...networkSettings, autoApprove: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${networkSettings.autoApprove ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">
                Yêu Cầu KYC
              </label>
              <p className="text-xs text-gray-400">Yêu cầu hoàn thành KYC để tham gia</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={networkSettings.requireKYC}
                onChange={(e) => setNetworkSettings({ ...networkSettings, requireKYC: e.target.checked })}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${networkSettings.requireKYC ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
            </label>
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            {t('admin.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );

  // Render Card Services
  const renderCardServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.cardServicesTitle')}</h2>
          <p className="text-sm text-gray-400">
            Quản lý các dịch vụ thẻ và PR
          </p>
        </div>
        <button
          onClick={() => handleCreate('card')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.addService')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardServices.map((service) => (
          <div key={service.id} className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{service.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
              }`}>
                {service.status === 'active' ? t('admin.active') : t('admin.inactive')}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{service.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{t('admin.commission')}</span>
              <span className="font-semibold text-green-400">{service.commission}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit('card', service)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                {t('admin.edit')}
              </button>
              <button
                onClick={() => handleDelete('card', service.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Marketplace
  const renderMarketplace = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.marketplaceTitle')}</h2>
          <p className="text-sm text-gray-400">
            Quản lý sản phẩm và dịch vụ trên marketplace
          </p>
        </div>
        <button
          onClick={() => handleCreate('marketplace')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm Sản Phẩm
        </button>
      </div>

      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1419]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.category')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.commissionCol')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('admin.operations')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2f3e]">
              {marketplaceItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#0f1419] transition-colors">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{item.category}</td>
                  <td className="px-6 py-4 font-semibold text-green-400">{item.commission}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {item.status === 'active' ? t('admin.active') : t('admin.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('marketplace', item)}
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.edit')}
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete('marketplace', item.id)}
                        className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                        title={t('admin.delete')}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Compliance
  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.complianceTitle')}</h2>
          <p className="text-sm text-gray-400">
            Quản lý các quy định tuân thủ
          </p>
        </div>
        <button
          onClick={() => handleCreate('compliance')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.addRule')}
        </button>
      </div>

      <div className="space-y-4">
        {complianceRules.map((rule) => (
          <div key={rule.id} className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{rule.title}</h3>
                  {rule.required && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600/20 text-red-400">
                      Bắt Buộc
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rule.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {rule.status === 'active' ? t('admin.active') : t('admin.inactive')}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{rule.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleEdit('compliance', rule)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete('compliance', rule.id)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render System Regulations
  const renderRegulations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.systemRegulationsTitle')}</h2>
          <p className="text-sm text-gray-400">
            Quản lý các quy định và điều khoản hệ thống
          </p>
        </div>
        <button
          onClick={() => handleCreate('regulation')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.addRule')}
        </button>
      </div>

      <div className="space-y-4">
        {regulations.map((regulation) => (
          <div key={regulation.id} className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{regulation.title}</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                    {regulation.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    regulation.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {regulation.status === 'active' ? t('admin.active') : t('admin.inactive')}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{regulation.content}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleEdit('regulation', regulation)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete('regulation', regulation.id)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.paymentSettingsTitle')}</h2>
          <p className="text-sm text-gray-400">
            Quản lý thông tin tài khoản nhận thanh toán
          </p>
        </div>
        {!editingPayment && (
          <button
            onClick={() => setEditingPayment(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            {t('admin.editPayment')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bank Account Info */}
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            {t('admin.bankAccountInfo')}
          </h3>

          {editingPayment ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('admin.accountName')}
                </label>
                <input
                  type="text"
                  value={paymentSettings.accountName}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      accountName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('admin.accountNumber')}
                </label>
                <input
                  type="text"
                  value={paymentSettings.accountNumber}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      accountNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('admin.bankName')}
                </label>
                <input
                  type="text"
                  value={paymentSettings.bankName}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      bankName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('admin.bankBranch')}
                </label>
                <input
                  type="text"
                  value={paymentSettings.bankBranch}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      bankBranch: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <span className="text-sm text-gray-400">{t('admin.accountName')}</span>
                <span className="font-medium">
                  {paymentSettings.accountName}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <span className="text-sm text-gray-400">{t('admin.accountNumber')}</span>
                <span className="font-medium font-mono">
                  {paymentSettings.accountNumber}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <span className="text-sm text-gray-400">{t('admin.bankName')}</span>
                <span className="font-medium">{paymentSettings.bankName}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <span className="text-sm text-gray-400">{t('admin.bankBranch')}</span>
                <span className="font-medium">
                  {paymentSettings.bankBranch}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            {t('admin.paymentMethods')}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                  <img 
                    src={momoLogo} 
                    alt="MoMo Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback w-full h-full flex items-center justify-center bg-[#D82D8B] rounded';
                        fallback.innerHTML = '<span class="text-white font-bold text-xs">M</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">Ví MoMo</div>
                  <div className="text-xs text-gray-400">
                    Quét mã QR hoặc liên kết ví
                  </div>
                </div>
              </div>
              <label className={`relative inline-flex items-center ${editingPayment ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <input
                  type="checkbox"
                  checked={paymentSettings.momoEnabled}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      momoEnabled: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                  disabled={!editingPayment}
                />
                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${paymentSettings.momoEnabled ? 'bg-blue-600' : 'bg-gray-700'} ${editingPayment ? '' : 'opacity-50'}`}></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1">
                  <img 
                    src={vnpayLogo} 
                    alt="VNPay Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback w-full h-full flex items-center justify-center bg-blue-600 rounded';
                        fallback.innerHTML = '<span class="text-white font-bold text-xs">VP</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">VNPay</div>
                  <div className="text-xs text-gray-400">
                    Thẻ ATM, Visa, Mastercard
                  </div>
                </div>
              </div>
              <label className={`relative inline-flex items-center ${editingPayment ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <input
                  type="checkbox"
                  checked={paymentSettings.vnpayEnabled}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      vnpayEnabled: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                  disabled={!editingPayment}
                />
                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${paymentSettings.vnpayEnabled ? 'bg-blue-600' : 'bg-gray-700'} ${editingPayment ? '' : 'opacity-50'}`}></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1">
                  <img 
                    src={vietqrLogo} 
                    alt="VIETQR Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback w-full h-full flex items-center justify-center bg-green-600 rounded';
                        fallback.innerHTML = '<span class="text-white font-bold text-xs">🏦</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">Chuyển Khoản</div>
                  <div className="text-xs text-gray-400">
                    Chuyển khoản ngân hàng
                  </div>
                </div>
              </div>
              <label className={`relative inline-flex items-center ${editingPayment ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <input
                  type="checkbox"
                  checked={paymentSettings.bankTransferEnabled}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      bankTransferEnabled: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                  disabled={!editingPayment}
                />
                <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${paymentSettings.bankTransferEnabled ? 'bg-blue-600' : 'bg-gray-700'} ${editingPayment ? '' : 'opacity-50'}`}></div>
              </label>
            </div>
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a2f3e]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              {t('admin.qrCode')}
            </h3>
            {editingPayment && (
              <label className="flex items-center gap-1.5 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded text-xs cursor-pointer transition-colors">
                <Upload className="w-3 h-3" />
                {t('admin.upload')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrCodeUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="bg-white rounded-lg p-2 flex items-center justify-center aspect-square w-full">
            <img
              src={qrCodePreview || paymentSettings.qrCodeUrl}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-[10px] text-gray-500">napas 247</span>
            <span className="text-[10px] text-gray-500">|</span>
            <span className="text-red-600 font-bold text-[10px]">
              {paymentSettings.bankName}
            </span>
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {editingPayment && (
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
          <h3 className="font-bold mb-4">{t('admin.confirmChanges')}</h3>
          <p className="text-sm text-gray-400 mb-6">
            {t('admin.confirmChangesDesc')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                try {
                  setSavingPayment(true);
                  const updated = await api.updatePaymentSettings(
                    paymentSettings
                  );
                  setPaymentSettings(updated);
                  setQrCodePreview(null);
                  setEditingPayment(false);
                } catch (error) {
                  window.alert(
                    (error as Error).message || 'Không thể lưu cấu hình thanh toán'
                  );
                } finally {
                  setSavingPayment(false);
                }
              }}
              disabled={savingPayment}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {savingPayment ? 'Đang lưu...' : t('admin.saveChanges')}
            </button>
            <button
              onClick={() => setEditingPayment(false)}
              className="flex-1 px-4 py-3 bg-[#2a2f3e] hover:bg-[#3a3f4e] rounded-lg transition-colors"
            >
              {t('admin.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Recent Changes Log */}
      <div className="bg-[#1a1f2e] rounded-xl p-6 border border-[#2a2f3e]">
        <h3 className="font-bold mb-4">{t('admin.recentChangesLog')}</h3>
        <div className="space-y-3">
          {[
            {
              date: '2025-01-10 14:30',
              action: t('admin.updateAccountNumber'),
              user: 'Admin',
              detail: `${t('admin.changeFromTo')} 040809198008 → 0408091980080`,
            },
            {
              date: '2025-01-08 09:15',
              action: t('admin.enableVNPay'),
              user: 'Admin',
              detail: t('admin.enableVNPayDesc'),
            },
            {
              date: '2025-01-05 16:45',
              action: t('admin.updateBankName'),
              user: 'Admin',
              detail: `${t('admin.changeFromTo')} Maritime Bank → MSB`,
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#0f1419] rounded-lg"
            >
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{log.action}</span>
                  <span className="text-xs text-gray-500">{log.date}</span>
                </div>
                <div className="text-xs text-gray-400">{log.detail}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {t('admin.by')}: {log.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="w-full max-w-2xl bg-[#1a1f2e] rounded-xl pointer-events-auto border border-[#2a2f3e]"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#2a2f3e]">
                <h3 className="text-xl font-bold">
                  {editingItem ? t('admin.editItem') : t('admin.createNew')}{' '}
                  {modalType === 'task'
                    ? t('admin.task')
                    : modalType === 'campaign'
                      ? t('admin.campaign')
                      : t('admin.course')}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {modalType === 'task' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('admin.taskName')}
                      </label>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) =>
                          setFormState({ ...formState, title: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        placeholder="Nhập tên nhiệm vụ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mô Tả
                      </label>
                      <textarea
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        rows={3}
                        placeholder="Nhập mô tả chi tiết"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.rewardPoints')}
                        </label>
                        <input
                          type="number"
                          value={formState.points}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              points: Number(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.deadline')}
                        </label>
                        <input
                          type="date"
                          value={formState.deadline}
                          onChange={(e) =>
                            setFormState({ ...formState, deadline: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'campaign' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('admin.campaignName')}
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        placeholder="Nhập tên chiến dịch"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.commissionPercent')}
                        </label>
                        <input
                          type="number"
                          value={formState.commission}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              commission: Number(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="15"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.status')}
                        </label>
                        <select
                          value={formState.status}
                          onChange={(e) =>
                            setFormState({ ...formState, status: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.startDate')}
                        </label>
                        <input
                          type="date"
                          value={formState.startDate}
                          onChange={(e) =>
                            setFormState({ ...formState, startDate: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.endDate')}
                        </label>
                        <input
                          type="date"
                          value={formState.endDate}
                          onChange={(e) =>
                            setFormState({ ...formState, endDate: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'training' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tên Khóa Học
                      </label>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) =>
                          setFormState({ ...formState, title: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        placeholder="Nhập tên khóa học"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mô Tả
                      </label>
                      <textarea
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        rows={3}
                        placeholder="Nhập mô tả khóa học"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Thời Lượng
                        </label>
                        <input
                          type="text"
                          value={formState.duration}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              duration: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="2 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Level
                        </label>
                        <select
                          value={formState.level}
                          onChange={(e) =>
                            setFormState({ ...formState, level: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'promo' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('admin.promoCode')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        placeholder="SAIGON"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mô Tả
                      </label>
                      <textarea
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        rows={2}
                        placeholder="Mô tả mã khuyến mãi"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.discountType')}
                        </label>
                        <select className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white">
                          <option value="percent">{t('admin.percentage')}</option>
                          <option value="fixed">{t('admin.fixedAmount')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.discountValue')}
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.minOrder')}
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.maxDiscount')}
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.startDate')}
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('admin.endDate')}
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('admin.usageLimit')}
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white"
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('admin.status')}
                      </label>
                      <select className="w-full px-4 py-2 bg-[#0f1419] border border-[#2a2f3e] rounded-lg focus:border-blue-600 focus:outline-none text-white">
                        <option value="active">{t('admin.active')}</option>
                        <option value="inactive">{t('admin.inactive')}</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2a2f3e]">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#2a2f3e] hover:bg-[#3a3f4e] rounded-lg transition-colors"
                >
                  {t('admin.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {t('admin.save')}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-[#0f1419] text-white font-sans flex relative">
      {renderModal()}
      {loadingData && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 text-xs text-gray-200 bg-black/60 px-3 py-2 rounded-full border border-white/10">
          {t('admin.loading')}
        </div>
      )}
      {dataError && (
        <div className="fixed top-4 right-4 z-40 text-sm text-red-200 bg-red-900/60 border border-red-800 px-4 py-3 rounded-lg shadow-lg max-w-sm">
          {dataError}
        </div>
      )}

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
          bg-[#1a1f2e] border-r border-[#2a2f3e] flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className={`p-6 border-b border-[#2a2f3e] ${sidebarCollapsed ? 'p-4' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">Admin Panel</div>
                <div className="text-xs text-gray-400 truncate">Management System</div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-[#2a2f3e] rounded-lg transition-colors flex-shrink-0"
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
              className="lg:hidden p-1.5 hover:bg-[#2a2f3e] rounded-lg transition-colors flex-shrink-0"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                // Close sidebar on mobile after selection
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${sidebarCollapsed ? 'justify-center px-2' : ''}
                ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2a2f3e] hover:text-white'}
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm truncate">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className={`p-4 border-t border-[#2a2f3e] space-y-1 ${sidebarCollapsed ? 'p-2' : ''}`}>
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2f3e] hover:text-white transition-all
              ${sidebarCollapsed ? 'justify-center px-2' : ''}
            `}
            title={sidebarCollapsed ? t('admin.logout') : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-sm">{t('admin.logout')}</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <header className="bg-[#1a1f2e] border-b border-[#2a2f3e] px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">
                  {menuItems.find((item) => item.id === activeTab)?.label ||
                    t('admin.dashboard')}
                </h1>
                <p className="text-xs lg:text-sm text-gray-400">{t('admin.welcome')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} className="px-3 py-1.5 rounded-lg bg-[#2a2f3e] hover:bg-[#3a3f4e] text-sm text-gray-400 hover:text-white transition-colors uppercase flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {language}
              </button>
              <button className="relative p-2 hover:bg-[#2a2f3e] rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-bold">AD</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{t('admin.admin')}</div>
                  <div className="text-xs text-gray-400">{t('admin.systemManager')}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'training' && renderTraining()}
          {activeTab === 'pool' && renderPool()}
          {activeTab === 'referral-commission' && renderReferralCommission()}
          {activeTab === 'pr-points' && renderPRPoints()}
          {activeTab === 'network' && renderNetwork()}
          {activeTab === 'card-services' && renderCardServices()}
          {activeTab === 'marketplace' && renderMarketplace()}
          {activeTab === 'compliance' && renderCompliance()}
          {activeTab === 'regulations' && renderRegulations()}
          {activeTab === 'promo-codes' && renderPromoCodes()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'kpi' && renderKPI()}
          {activeTab === 'earnings' && renderEarnings()}
          {activeTab === 'activities' && renderActivities()}
          {activeTab === 'payment-settings' && renderPaymentSettings()}
        </div>
      </main>
    </div>
  );
}

