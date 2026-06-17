const express = require('express');

const { queryRows, queryResult, parseJson } = require('../utils/db');

const router = express.Router();

const RESOURCES = {
  buyers: {
    title: 'Buyer Requirements',
    table: 'buyers',
    statusOptions: ['new', 'contacted', 'in_progress', 'completed', 'rejected'],
    columns: [
      ['buyer_name', 'Buyer'],
      ['phone', 'Phone'],
      ['estimated_budget', 'Budget'],
      ['status', 'Status'],
      ['created_at', 'Created'],
    ],
    detailFields: [
      ['buyer_name', 'Buyer Name'],
      ['phone', 'Phone'],
      ['address', 'Address'],
      ['requirement_details', 'Requirement Details'],
      ['estimated_budget', 'Estimated Budget'],
      ['reference_image', 'Reference Image'],
      ['admin_notes', 'Admin Notes'],
    ],
  },
  suppliers: {
    title: 'Suppliers',
    table: 'suppliers',
    statusOptions: ['pending', 'approved', 'rejected', 'suspended'],
    select: `SELECT s.*, c.name AS category_name
             FROM suppliers s
             LEFT JOIN categories c ON c.id = s.category_id`,
    columns: [
      ['company_name', 'Company'],
      ['contact_person', 'Contact'],
      ['mobile', 'Mobile'],
      ['core_product_segment', 'Segment'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['company_name', 'Company Name'],
      ['contact_person', 'Contact Person'],
      ['mobile', 'Mobile'],
      ['email', 'Email'],
      ['category_name', 'Category'],
      ['core_product_segment', 'Core Product Segment'],
      ['company_details', 'Company Details'],
      ['factory_images', 'Factory Images'],
      ['admin_notes', 'Admin Notes'],
    ],
  },
  contacts: {
    title: 'Contact Messages',
    table: 'contacts',
    statusOptions: ['new', 'read', 'replied', 'closed'],
    columns: [
      ['full_name', 'Name'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['inquiry_type', 'Type'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['full_name', 'Full Name'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['inquiry_type', 'Inquiry Type'],
      ['message', 'Message'],
      ['admin_notes', 'Admin Notes'],
    ],
  },
  rfq: {
    title: 'RFQ Requests',
    table: 'rfq_requests',
    statusOptions: ['new', 'processing', 'quoted', 'closed'],
    columns: [
      ['product_name', 'Product'],
      ['quantity', 'Quantity'],
      ['delivery_city', 'City'],
      ['mobile', 'Mobile'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['product_name', 'Product Name'],
      ['quantity', 'Quantity'],
      ['delivery_city', 'Delivery City'],
      ['mobile', 'Mobile'],
      ['specifications', 'Specifications'],
      ['admin_notes', 'Admin Notes'],
    ],
  },
  enquiries: {
    title: 'Quick Enquiries',
    table: 'enquiries',
    statusOptions: ['new', 'contacted', 'closed'],
    columns: [
      ['product_service', 'Product / Service'],
      ['quantity_budget', 'Quantity / Budget'],
      ['mobile', 'Mobile'],
      ['source_page', 'Source'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['product_service', 'Product / Service'],
      ['quantity_budget', 'Quantity / Budget'],
      ['mobile', 'Mobile'],
      ['requirement_details', 'Requirement Details'],
      ['source_page', 'Source Page'],
    ],
  },
  'service-leads': {
    title: 'Service Leads',
    table: 'service_leads',
    statusOptions: ['new', 'contacted', 'closed'],
    select: `SELECT sl.*, s.title AS service_title
             FROM service_leads sl
             LEFT JOIN services s ON s.id = sl.service_id`,
    columns: [
      ['full_name', 'Name'],
      ['mobile', 'Mobile'],
      ['service_title', 'Service'],
      ['quantity', 'Quantity'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['service_title', 'Service'],
      ['full_name', 'Full Name'],
      ['mobile', 'Mobile'],
      ['email', 'Email'],
      ['requirement_details', 'Requirement Details'],
      ['quantity', 'Quantity'],
      ['unit', 'Unit'],
      ['delivery_pincode', 'Delivery Pincode'],
    ],
  },
  callbacks: {
    title: 'Callback Requests',
    table: 'callback_requests',
    statusOptions: ['new', 'called', 'no_answer', 'completed'],
    columns: [
      ['name', 'Name'],
      ['phone', 'Phone'],
      ['preferred_time', 'Preferred Time'],
      ['topic', 'Topic'],
      ['status', 'Status'],
    ],
    detailFields: [
      ['name', 'Name'],
      ['phone', 'Phone'],
      ['preferred_time', 'Preferred Time'],
      ['topic', 'Topic'],
    ],
  },
  newsletters: {
    title: 'Newsletter Subscribers',
    table: 'newsletters',
    orderBy: 'subscribed_at DESC',
    statusOptions: [],
    columns: [
      ['email', 'Email'],
      ['is_active', 'Active'],
      ['subscribed_at', 'Subscribed'],
      ['unsubscribed_at', 'Unsubscribed'],
    ],
    detailFields: [
      ['email', 'Email'],
      ['is_active', 'Active'],
      ['subscribed_at', 'Subscribed At'],
      ['unsubscribed_at', 'Unsubscribed At'],
    ],
  },
};

function getConfig(resource) {
  const config = RESOURCES[resource];
  if (!config) {
    const error = new Error('Unknown admin resource.');
    error.statusCode = 404;
    throw error;
  }
  return config;
}

function normalizeValue(value) {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function normalizeRecord(row) {
  const normalized = { ...row };
  if (normalized.factory_images) normalized.factory_images = parseJson(normalized.factory_images, []);
  return normalized;
}

router.get('/:resource', async (req, res, next) => {
  try {
    const config = getConfig(req.params.resource);
    let queryStr = config.select || `SELECT * FROM ${config.table}`;
    const values = [];
    
    if (req.query.status) {
      const prefix = config.table === 'suppliers' ? 's.' : (config.table === 'service_leads' ? 'sl.' : '');
      queryStr += ` WHERE ${prefix}status = ?`;
      values.push(req.query.status);
    }
    
    const rows = await queryRows(
      req.app.locals.db,
      `${queryStr}
       ORDER BY ${config.orderBy || 'created_at DESC'}
       LIMIT 250`,
      values
    );

    return res.render('records/list', {
      title: config.title,
      resourceKey: req.params.resource,
      config,
      rows: rows.map(normalizeRecord),
      normalizeValue,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:resource/:id', async (req, res, next) => {
  try {
    const config = getConfig(req.params.resource);
    const rows = await queryRows(
      req.app.locals.db,
      `${config.select || `SELECT * FROM ${config.table}`}
       WHERE ${config.select ? `${config.table === 'service_leads' ? 'sl' : 's'}.id` : 'id'} = ?
       LIMIT 1`,
      [req.params.id],
    );

    if (!rows[0]) {
      const error = new Error('Record not found.');
      error.statusCode = 404;
      throw error;
    }

    return res.render('records/detail', {
      title: `${config.title} Detail`,
      resourceKey: req.params.resource,
      config,
      record: normalizeRecord(rows[0]),
      normalizeValue,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/:resource/:id/status', async (req, res, next) => {
  try {
    const config = getConfig(req.params.resource);

    if (!config.statusOptions.length || !config.statusOptions.includes(req.body.status)) {
      req.flash('error', 'Invalid status selected.');
      return res.redirect(`/submissions/${req.params.resource}/${req.params.id}`);
    }

    const hasAdminNotes = config.detailFields.some(([field]) => field === 'admin_notes');
    const values = [req.body.status];
    let sql = `UPDATE ${config.table} SET status = ?`;

    if (hasAdminNotes) {
      sql += ', admin_notes = ?';
      values.push(req.body.admin_notes || null);
    }

    sql += ' WHERE id = ?';
    values.push(req.params.id);

    const result = await queryResult(req.app.locals.db, sql, values);

    if (!result.affectedRows) {
      req.flash('error', 'Record not found.');
    } else {
      req.flash('success', 'Status updated.');
    }

    return res.redirect(`/submissions/${req.params.resource}/${req.params.id}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
