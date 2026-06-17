const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');

const database = require('./config/database');
const { attachFlash } = require('./utils/flash');
const { requireAuth } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const recordRoutes = require('./routes/recordRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

function createApp(options = {}) {
  const app = express();

  app.locals.db = options.db || database;
  app.locals.appName = 'Truvex Admin';

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

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

  app.use(attachFlash);
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.currentPath = req.path;
    next();
  });

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  app.use(authRoutes);
  app.use(requireAuth);
  app.use(dashboardRoutes);
  app.use('/submissions', recordRoutes);
  app.use('/services', serviceRoutes);
  app.use('/categories', categoryRoutes);

  app.use((_req, res) => {
    res.status(404).render('error', {
      title: 'Not Found',
      message: 'The admin page you requested was not found.',
    });
  });

  app.use((error, _req, res, _next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).render('error', {
      title: statusCode === 500 ? 'Server Error' : 'Error',
      message: statusCode === 500 ? 'Something went wrong in the admin panel.' : error.message,
    });
  });

  return app;
}

module.exports = { createApp };
