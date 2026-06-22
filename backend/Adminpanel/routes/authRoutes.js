const express = require('express');
const bcrypt = require('bcryptjs');

const { queryRows } = require('../utils/db');

const router = express.Router();

router.get('/session', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  return res.json({ data: { user: req.session.user } });
});

router.post('/login', async (req, res, next) => {
  try {
    if (req.session.user) {
      return res.json({ data: { user: req.session.user } });
    }

    const db = req.app.locals.db;
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
        fields: {
          email: email ? undefined : 'Email is required.',
          password: password ? undefined : 'Password is required.',
        },
      });
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
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    await db.query('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

    req.session.user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
    return res.json({
      data: { user: req.session.user },
      message: `Welcome back, ${admin.name}.`,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('truvex_admin_sid');
    return res.json({ data: null, message: 'Signed out.' });
  });
});

module.exports = router;
