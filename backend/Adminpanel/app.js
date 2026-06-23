const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');

const database = require('./config/database');
const { requireApiAuth } = require('./middleware/auth');
const { uploadsDir } = require('./middleware/upload');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const recordRoutes = require('./routes/recordRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const cors = require('cors');

function createApp(options = {}) {
  const app = express();
  const clientDist = options.clientDist || path.join(__dirname, 'client', 'dist');
  const clientIndex = path.join(clientDist, 'index.html');

  app.locals.db = options.db || database;
  app.locals.appName = 'Truvex Admin';

  app.set('trust proxy', 1);

  app.use(cors({ origin: true, credentials: true }));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // Serve admin's own uploads (category/service images)
  app.use('/uploads', express.static(uploadsDir));
  // Also serve the main node backend's uploads (factory images, buyer reference images)
  app.use('/uploads', express.static(path.join(__dirname, '..', 'node', 'uploads')));

  app.use(session({
    name: 'truvex_admin_sid',
    secret: process.env.SESSION_SECRET || 'development-only-change-this-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8,
    },
  }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.use('/api/auth', authRoutes);
  app.use('/api', requireApiAuth);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/submissions', recordRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/settings', settingsRoutes);

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  if (fs.existsSync(clientIndex)) {
    app.use(express.static(clientDist));
    app.get('*', (_req, res) => res.sendFile(clientIndex));
  } else {
    app.get('*', (_req, res) => {
      res.status(503).send('React client has not been built. Run "npm run build".');
    });
  }

  app.use((error, req, res, _next) => {
    let statusCode = error.statusCode || 500;
    let message = statusCode === 500 ? 'Something went wrong in the admin panel.' : error.message;

    if (error instanceof multer.MulterError) {
      statusCode = 400;
      message = error.code === 'LIMIT_FILE_SIZE'
        ? 'Image size exceeds the 2 MB limit.'
        : error.message;
    }

    if (process.env.NODE_ENV !== 'test' && statusCode === 500) {
      console.error(error);
    }

    if (req.path.startsWith('/api/')) {
      return res.status(statusCode).json({ error: message });
    }
    return res.status(statusCode).send(message);
  });

  return app;
}

module.exports = { createApp };
