const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const database = require('./config/database');
const { buildRateLimiters } = require('./middleware/rateLimiters');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { requireSession } = require('./middleware/auth');
const categoryRoutes = require('./routes/categoryRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const { createFormRouter } = require('./routes/formRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const adminAuthRoutes = require('./routes/adminAuth');
const adminDashboardRoutes = require('./routes/adminDashboard');
const adminRecordRoutes = require('./routes/adminRecords');
const adminSettingsRoutes = require('./routes/adminSettings');

const FORM_ROUTES = {
  contacts: {
    table: 'contacts',
    writableFields: ['full_name', 'email', 'phone', 'inquiry_type', 'message'],
    requiredFields: ['full_name', 'email', 'inquiry_type', 'message'],
  },
  rfq: {
    table: 'rfq_requests',
    writableFields: ['product_name', 'quantity', 'delivery_city', 'mobile', 'specifications'],
    requiredFields: ['product_name', 'quantity', 'delivery_city', 'mobile'],
  },
  enquiries: {
    table: 'enquiries',
    writableFields: ['product_service', 'quantity_budget', 'mobile', 'requirement_details', 'source_page'],
    requiredFields: ['product_service', 'quantity_budget', 'mobile'],
  },
  newsletter: {
    table: 'newsletters',
    writableFields: ['email'],
    requiredFields: ['email'],
  },
  callbacks: {
    table: 'callback_requests',
    writableFields: ['name', 'phone', 'preferred_time', 'topic'],
    requiredFields: ['name', 'phone'],
  },
  'service-leads': {
    table: 'service_leads',
    writableFields: [
      'service_id',
      'full_name',
      'mobile',
      'email',
      'requirement_details',
      'quantity',
      'unit',
      'delivery_pincode',
    ],
    requiredFields: ['full_name', 'mobile'],
  },
};

function parseAllowedOrigins(value) {
  if (!value) return true;
  return value.split(',').map((origin) => origin.trim()).filter(Boolean);
}

function createApp(options = {}) {
  const app = express();

  app.locals.db = options.db || database;
  app.locals.rateLimiters = options.rateLimiters || buildRateLimiters();

  app.set('trust proxy', 1);

  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  app.use(cors({ origin: parseAllowedOrigins(process.env.FRONTEND_URL), credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  const isProd = process.env.NODE_ENV === 'production';
  const MySQLStore = require('express-mysql-session')(session);
  const sessionStore = new MySQLStore({}, database.getPool());

  app.use(session({
    name: 'truvex_admin_sid',
    secret: process.env.SESSION_SECRET || 'development-only-change-this-session-secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      maxAge: 1000 * 60 * 60 * 8,
    },
  }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/uploads', express.static(path.join(__dirname, '..', 'Adminpanel', 'uploads')));
  app.use('/api', app.locals.rateLimiters.api);

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Truvex API is healthy' });
  });

  // Public API routes (non-admin)
  app.use('/api/buyers', buyerRoutes);
  app.use('/api/suppliers', supplierRoutes);

  Object.entries(FORM_ROUTES).forEach(([route, config]) => {
    app.use(`/api/${route}`, createFormRouter(config));
  });

  // Admin auth routes (public login/session/logout)
  app.use('/api/auth', adminAuthRoutes);

  // Admin API routes (session-protected)
  app.use('/api/dashboard', requireSession, adminDashboardRoutes);
  app.use('/api/submissions', requireSession, adminRecordRoutes);

  // Categories and services handle auth per-route (GET is public, POST/PATCH/DELETE session-protected)
  app.use('/api/categories', categoryRoutes);
  app.use('/api/services', serviceRoutes);

  // Settings: GET is public, banner operations are session-protected (per-route)
  app.use('/api/settings', settingsRoutes);

  // Serve admin client static files
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  if (options.serveClient !== false) {
    app.use(express.static(clientDist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) return next();
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
