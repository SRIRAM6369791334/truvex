const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const database = require('./config/database');
const { buildRateLimiters } = require('./middleware/rateLimiters');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { categoryRouter, subcategoryRouter } = require('./routes/categoryRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const { createFormRouter } = require('./routes/formRoutes');

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

  app.use(helmet());
  app.use(cors({ origin: parseAllowedOrigins(process.env.FRONTEND_URL), credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/api', app.locals.rateLimiters.api);

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Truvex API is healthy' });
  });

  app.use('/api/categories', categoryRouter);
  app.use('/api/subcategories', subcategoryRouter);
  app.use('/api/services', serviceRoutes);
  app.use('/api/buyers', buyerRoutes);
  app.use('/api/suppliers', supplierRoutes);

  Object.entries(FORM_ROUTES).forEach(([route, config]) => {
    app.use(`/api/${route}`, createFormRouter(config));
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
