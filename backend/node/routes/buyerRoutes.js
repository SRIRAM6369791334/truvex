const express = require('express');

const { requireAdmin } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { useLimiter } = require('../middleware/rateLimiters');
const { buyerReferenceUpload } = require('../middleware/upload');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult } = require('../utils/db');

const router = express.Router();

function validateBuyer(payload) {
  const requiredFields = ['buyer_name', 'phone', 'address', 'requirement_details'];
  const missing = requiredFields
    .filter((field) => !payload[field])
    .map((field) => ({ field, message: `${field} is required` }));

  if (missing.length) {
    throw new AppError('Validation failed', 400, missing);
  }
}

router.post('/', useLimiter('form'), buyerReferenceUpload, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  validateBuyer(req.body);

  const referenceImage = req.file ? `/uploads/${req.file.filename}` : null;
  const result = await queryResult(
    db,
    `INSERT INTO buyers
      (buyer_name, phone, address, requirement_details, estimated_budget, reference_image)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.body.buyer_name,
      req.body.phone,
      req.body.address,
      req.body.requirement_details,
      req.body.estimated_budget || null,
      referenceImage,
    ],
  );

  return created(res, { id: result.insertId }, 'Buyer requirement submitted successfully');
}));

router.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const rows = await queryRows(
    req.app.locals.db,
    `SELECT *
     FROM buyers
     ORDER BY created_at DESC
     LIMIT 200`,
  );

  return ok(res, rows, 'Buyers fetched successfully');
}));

router.get('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const rows = await queryRows(req.app.locals.db, 'SELECT * FROM buyers WHERE id = ? LIMIT 1', [req.params.id]);

  if (!rows[0]) {
    throw new AppError('Buyer not found', 404);
  }

  return ok(res, rows[0], 'Buyer fetched successfully');
}));

router.patch('/:id/status', requireAdmin, asyncHandler(async (req, res) => {
  const { status, admin_notes } = req.body;

  if (!status) {
    throw new AppError('Status is required', 400);
  }

  const result = await queryResult(
    req.app.locals.db,
    'UPDATE buyers SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?',
    [status, admin_notes || null, req.params.id],
  );

  if (!result.affectedRows) {
    throw new AppError('Buyer not found', 404);
  }

  return ok(res, { id: Number(req.params.id), status }, 'Buyer status updated successfully');
}));

router.put('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const updates = [];
  const values = [];
  const allowedFields = ['buyer_name', 'phone', 'address', 'requirement_details', 'estimated_budget', 'status', 'admin_notes'];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (!updates.length) {
    throw new AppError('No buyer fields provided for update', 400);
  }

  values.push(req.params.id);
  const result = await queryResult(db, `UPDATE buyers SET ${updates.join(', ')} WHERE id = ?`, values);

  if (!result.affectedRows) {
    throw new AppError('Buyer not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Buyer updated successfully');
}));

router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const result = await queryResult(db, 'DELETE FROM buyers WHERE id = ?', [req.params.id]);

  if (!result.affectedRows) {
    throw new AppError('Buyer not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Buyer deleted successfully');
}));

module.exports = router;
