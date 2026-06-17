const express = require('express');
const bcrypt = require('bcryptjs');

const { redirectIfAuthenticated } = require('../middleware/auth');
const { queryRows } = require('../utils/db');

const router = express.Router();

router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { title: 'Admin Login', email: req.query.email || '' });
});

router.post('/login', redirectIfAuthenticated, async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      req.flash('error', 'Email and password are required.');
      return res.redirect('/login');
    }

    const rows = await queryRows(
      db,
      `SELECT id, name, email, password, role
       FROM admin_users
       WHERE email = ?
         AND is_active = true
       LIMIT 1`,
      [email],
    );
    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      req.flash('error', 'Invalid admin credentials.');
      return res.redirect(`/login?email=${encodeURIComponent(email)}`);
    }

    await db.query('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

    req.session.user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
    req.flash('success', `Welcome back, ${admin.name}.`);
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('truvex_admin_sid');
    return res.redirect('/login');
  });
});

module.exports = router;
