const express = require('express');

const { authenticateJwt, requireRole } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { useLimiter } = require('../middleware/rateLimiters');
const { supplierFactoryUpload } = require('../middleware/upload');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult, parseJson } = require('../utils/db');

const router = express.Router();
const adminOnly = [authenticateJwt, requireRole()];

function validateSupplier(payload) {
  const requiredFields = ['company_name', 'contact_person', 'mobile', 'core_product_segment', 'company_details'];
  const missing = requiredFields
    .filter((field) => !payload[field])
    .map((field) => ({ field, message: `${field} is required` }));

  if (missing.length) {
    throw new AppError('Validation failed', 400, missing);
  }
}

function uploadedFactoryImages(files) {
  return Object.values(files || {})
    .flat()
    .map((file) => `/uploads/${file.filename}`);
}

function normalizeSupplier(row, isAdmin = false) {
  const supplier = {
    ...row,
    factory_images: parseJson(row.factory_images, []),
  };

  if (!isAdmin) {
    delete supplier.mobile;
    delete supplier.email;
    delete supplier.admin_notes;
    delete supplier.status;
  }

  return supplier;
}

router.post('/', useLimiter('form'), supplierFactoryUpload, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  validateSupplier(req.body);

  const images = uploadedFactoryImages(req.files);
  const result = await queryResult(
    db,
    `INSERT INTO suppliers
      (category_id, company_name, contact_person, mobile, email, core_product_segment, company_details, factory_images)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.category_id || null,
      req.body.company_name,
      req.body.contact_person,
      req.body.mobile,
      req.body.email || null,
      req.body.core_product_segment,
      req.body.company_details,
      JSON.stringify(images),
    ],
  );

  return created(res, { id: result.insertId }, 'Supplier registration submitted successfully');
}));

router.get('/', asyncHandler(async (req, res, next) => {
  const wantsPublicApproved = req.query.status === 'approved' && !req.get('authorization');

  if (wantsPublicApproved) {
    const rows = await queryRows(
      req.app.locals.db,
      `SELECT id, category_id, company_name, contact_person, core_product_segment,
              company_details, factory_images, created_at
       FROM suppliers
       WHERE status = 'approved'
       ORDER BY created_at DESC
       LIMIT 200`,
    );

    return ok(res, rows.map((row) => normalizeSupplier(row, false)), 'Approved suppliers fetched successfully');
  }

  return authenticateJwt(req, res, () => requireRole()(req, res, next));
}), asyncHandler(async (req, res) => {
  const rows = await queryRows(
    req.app.locals.db,
    `SELECT *
     FROM suppliers
     ORDER BY created_at DESC
     LIMIT 200`,
  );

  return ok(res, rows.map((row) => normalizeSupplier(row, true)), 'Suppliers fetched successfully');
}));

router.get('/:id', adminOnly, asyncHandler(async (req, res) => {
  const rows = await queryRows(req.app.locals.db, 'SELECT * FROM suppliers WHERE id = ? LIMIT 1', [req.params.id]);

  if (!rows[0]) {
    throw new AppError('Supplier not found', 404);
  }

  return ok(res, normalizeSupplier(rows[0], true), 'Supplier fetched successfully');
}));

router.patch('/:id/status', adminOnly, asyncHandler(async (req, res) => {
  const { status, admin_notes } = req.body;
  const allowedStatuses = ['pending', 'approved', 'rejected', 'suspended'];

  if (!allowedStatuses.includes(status)) {
    throw new AppError('Valid supplier status is required', 400);
  }

  const result = await queryResult(
    req.app.locals.db,
    'UPDATE suppliers SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?',
    [status, admin_notes || null, req.params.id],
  );

  if (!result.affectedRows) {
    throw new AppError('Supplier not found', 404);
  }

  return ok(
    res,
    { id: Number(req.params.id), status },
    'Supplier status updated successfully; category counts are computed dynamically.',
  );
}));

router.put('/:id', adminOnly, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const updates = [];
  const values = [];
  const allowedFields = ['company_name', 'contact_person', 'mobile', 'email', 'core_product_segment', 'company_details', 'category_id', 'status', 'admin_notes'];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (!updates.length) {
    throw new AppError('No supplier fields provided for update', 400);
  }

  values.push(req.params.id);
  const result = await queryResult(db, `UPDATE suppliers SET ${updates.join(', ')} WHERE id = ?`, values);

  if (!result.affectedRows) {
    throw new AppError('Supplier not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Supplier updated successfully');
}));

router.delete('/:id', adminOnly, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const result = await queryResult(db, 'DELETE FROM suppliers WHERE id = ?', [req.params.id]);

  if (!result.affectedRows) {
    throw new AppError('Supplier not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Supplier deleted successfully');
}));

module.exports = router;
