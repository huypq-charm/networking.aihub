import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || '*')
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    points: { type: Number, default: 0 },
    deadline: { type: Date },
    status: { type: String, default: 'active' },
    assignedTo: { type: String, default: '' },
  },
  { timestamps: true }
);

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    commission: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, default: 'active' },
    sales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    level: { type: String, default: '' },
    enrolled: { type: Number, default: 0 },
    completion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const partnerRegistrationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    businessName: { type: String, default: '' },
    businessType: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    website: { type: String, default: '' },
    referralCode: { type: String, default: '' },
    experience: { type: String, default: '' },
    reason: { type: String, default: '' },
    agreeToTerms: { type: Boolean, default: false },
    source: { type: String, default: 'partner-registration' },
    country: { type: String, default: '' },
    telegram: { type: String, default: '' },
  },
  { timestamps: true }
);

// Hash password before saving
partnerRegistrationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const paymentSettingSchema = new mongoose.Schema(
  {
    accountName: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    bankName: { type: String, default: '' },
    bankBranch: { type: String, default: '' },
    momoEnabled: { type: Boolean, default: false },
    vnpayEnabled: { type: Boolean, default: false },
    bankTransferEnabled: { type: Boolean, default: false },
    qrCodeUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    referralCode: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    method: { type: String, default: 'bank' },
    packageName: { type: String, default: '999K' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const kycSchema = new mongoose.Schema(
  {
    bankName: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    accountHolderName: { type: String, default: '' },
    cccdName: { type: String, default: '' },
    frontImage: { type: String, default: '' },
    backImage: { type: String, default: '' },
    selfieImage: { type: String, default: '' },
  },
  { timestamps: true }
);

const userPoolStatusSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerRegistration', required: true, unique: true },
    hasJoinedPool1: { type: Boolean, default: false },
    pool1PR: { type: Number, default: 0 },
    pool2PR: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);
const Training = mongoose.model('Training', trainingSchema);
const PartnerRegistration = mongoose.model(
  'PartnerRegistration',
  partnerRegistrationSchema
);
const PaymentSetting = mongoose.model('PaymentSetting', paymentSettingSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const KYCSubmission = mongoose.model('KYCSubmission', kycSchema);
const UserPoolStatus = mongoose.model('UserPoolStatus', userPoolStatusSchema);

const asyncHandler =
  (fn) =>
  (...args) =>
    Promise.resolve(fn(...args)).catch(args[2]);

app.get(
  '/api/health',
  asyncHandler(async (_req, res) => {
    res.json({ status: 'ok' });
  })
);

// Tasks
app.get(
  '/api/tasks',
  asyncHandler(async (_req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  })
);

app.post(
  '/api/tasks',
  asyncHandler(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  })
);

app.put(
  '/api/tasks/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  })
);

app.delete(
  '/api/tasks/:id',
  asyncHandler(async (req, res) => {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ success: true });
  })
);

// Campaigns
app.get(
  '/api/campaigns',
  asyncHandler(async (_req, res) => {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  })
);

app.post(
  '/api/campaigns',
  asyncHandler(async (req, res) => {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  })
);

app.put(
  '/api/campaigns/:id',
  asyncHandler(async (req, res) => {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  })
);

app.delete(
  '/api/campaigns/:id',
  asyncHandler(async (req, res) => {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ success: true });
  })
);

// Trainings
app.get(
  '/api/trainings',
  asyncHandler(async (_req, res) => {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  })
);

app.post(
  '/api/trainings',
  asyncHandler(async (req, res) => {
    const training = await Training.create(req.body);
    res.status(201).json(training);
  })
);

app.put(
  '/api/trainings/:id',
  asyncHandler(async (req, res) => {
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.json(training);
  })
);

app.delete(
  '/api/trainings/:id',
  asyncHandler(async (req, res) => {
    const deleted = await Training.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.json({ success: true });
  })
);

// Partner registrations
app.post(
  '/api/partner-registrations',
  asyncHandler(async (req, res) => {
    // Check if username already exists
    const existingUser = await PartnerRegistration.findOne({
      $or: [{ username: req.body.username?.toLowerCase() }, { email: req.body.email?.toLowerCase() }],
    });
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.username === req.body.username?.toLowerCase()
          ? 'Username already exists'
          : 'Email already exists',
      });
    }
    const registration = await PartnerRegistration.create(req.body);
    // Don't send password back
    const { password, ...registrationWithoutPassword } = registration.toObject();
    res.status(201).json(registrationWithoutPassword);
  })
);

// Login endpoint
app.post(
  '/api/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = await PartnerRegistration.findOne({
      username: username.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  })
);

// Payments & settings
app.get(
  '/api/payment-settings',
  asyncHandler(async (_req, res) => {
    let settings = await PaymentSetting.findOne();
    if (!settings) {
      settings = await PaymentSetting.create({});
    }
    res.json(settings);
  })
);

app.put(
  '/api/payment-settings',
  asyncHandler(async (req, res) => {
    const settings = await PaymentSetting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json(settings);
  })
);

app.post(
  '/api/payments',
  asyncHandler(async (req, res) => {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  })
);

// KYC
app.post(
  '/api/kyc',
  asyncHandler(async (req, res) => {
    const kyc = await KYCSubmission.create(req.body);
    res.status(201).json(kyc);
  })
);

// Users list for admin
app.get(
  '/api/users',
  asyncHandler(async (_req, res) => {
    const users = await PartnerRegistration.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    res.json(users);
  })
);

// User pool status
app.get(
  '/api/user-pool-status/:userId',
  asyncHandler(async (req, res) => {
    let status = await UserPoolStatus.findOne({ userId: req.params.userId });
    if (!status) {
      status = await UserPoolStatus.create({
        userId: req.params.userId,
        hasJoinedPool1: false,
        pool1PR: 0,
        pool2PR: 0,
      });
    }
    res.json(status);
  })
);

app.put(
  '/api/user-pool-status/:userId',
  asyncHandler(async (req, res) => {
    const status = await UserPoolStatus.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(status);
  })
);

// Dashboard summary
app.get(
  '/api/dashboard/summary',
  asyncHandler(async (_req, res) => {
    const [taskCount, campaignCount, trainingCount, registrationCount, payments] =
      await Promise.all([
        Task.countDocuments(),
        Campaign.countDocuments(),
        Training.countDocuments(),
        PartnerRegistration.countDocuments(),
        Payment.find().sort({ createdAt: -1 }).limit(10).lean(),
      ]);

    const totalRevenue =
      payments.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    const latestActivities = [
      ...payments.map((p) => ({
        type: 'payment',
        detail: `${p.fullName || 'Khách'} thanh toán ${p.amount || 0}`,
        createdAt: p.createdAt,
      })),
    ].slice(0, 10);

    res.json({
      summary: {
        partners: registrationCount,
        revenue: totalRevenue,
        activeCampaigns: campaignCount,
        avgKpi: 0,
        tasks: taskCount,
        trainings: trainingCount,
      },
      recentActivities: latestActivities,
    });
  })
);

app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: err?.message || 'Unexpected server error occurred' });
});

const port = process.env.PORT || 4000;
const mongoUri =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networking';

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Send a ping to confirm a successful connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('✅ Pinged MongoDB deployment. Connection confirmed!');
    
    app.listen(port, () => {
      console.log(`🚀 API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});

