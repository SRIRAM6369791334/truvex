const express = require('express');

const { queryRows } = require('../utils/db');

const router = express.Router();

const STAT_QUERIES = [
  { key: 'buyers', label: 'Buyers', link: '/submissions/buyers', sql: 'SELECT COUNT(*) AS total FROM buyers' },
  { key: 'suppliers', label: 'Suppliers', link: '/submissions/suppliers', sql: 'SELECT COUNT(*) AS total FROM suppliers' },
  { key: 'approvedSuppliers', label: 'Approved Suppliers', link: '/submissions/suppliers?status=approved', sql: "SELECT COUNT(*) AS total FROM suppliers WHERE status = 'approved'" },
  { key: 'contacts', label: 'Contacts', link: '/submissions/contacts', sql: 'SELECT COUNT(*) AS total FROM contacts' },
  { key: 'rfq', label: 'RFQs', link: '/submissions/rfq', sql: 'SELECT COUNT(*) AS total FROM rfq_requests' },
  { key: 'serviceLeads', label: 'Service Leads', link: '/submissions/service-leads', sql: 'SELECT COUNT(*) AS total FROM service_leads' },
  { key: 'services', label: 'Services', link: '/services', sql: 'SELECT COUNT(*) AS total FROM services' },
  { key: 'categories', label: 'Categories', link: '/categories', sql: 'SELECT COUNT(*) AS total FROM categories' },
];

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const stats = [];

    for (const stat of STAT_QUERIES) {
      const rows = await queryRows(db, stat.sql);
      stats.push({ ...stat, total: Number(rows[0]?.total || 0) });
    }

    const recentBuyers = await queryRows(
      db,
      `SELECT id, buyer_name AS title, phone AS meta, status, created_at, 'buyers' AS resource
       FROM buyers
       ORDER BY created_at DESC
       LIMIT 5`,
    );
    const recentSuppliers = await queryRows(
      db,
      `SELECT id, company_name AS title, core_product_segment AS meta, status, created_at, 'suppliers' AS resource
       FROM suppliers
       ORDER BY created_at DESC
       LIMIT 5`,
    );
    const recentContacts = await queryRows(
      db,
      `SELECT id, full_name AS title, inquiry_type AS meta, status, created_at, 'contacts' AS resource
       FROM contacts
       ORDER BY created_at DESC
       LIMIT 5`,
    );

    const recentActivity = [...recentBuyers, ...recentSuppliers, ...recentContacts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);

    return res.render('dashboard', {
      title: 'Dashboard',
      stats,
      recentActivity,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
