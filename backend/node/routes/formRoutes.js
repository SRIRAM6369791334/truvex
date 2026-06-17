const express = require('express');

const { requireAdmin } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { useLimiter } = require('../middleware/rateLimiters');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult } = require('../utils/db');

function assertIdentifier(value) {
  if (!/^[a-z_]+$/.test(value)) {
    throw new Error(`Unsafe SQL identifier: ${value}`);
  }
}

function pickWritableFields(body, writableFields) {
  return writableFields.reduce((payload, field) => {
    if (body[field] !== undefined && body[field] !== '') {
      payload[field] = body[field];
    }

    return payload;
  }, {});
}

function validatePayload(payload, requiredFields) {
  const missing = requiredFields
    .filter((field) => !payload[field])
    .map((field) => ({ field, message: `${field} is required` }));

  if (missing.length) {
    throw new AppError('Validation failed', 400, missing);
  }
}

function createFormRouter({ table, writableFields, requiredFields }) {
  assertIdentifier(table);
  writableFields.forEach(assertIdentifier);

  const router = express.Router();

  router.post('/', useLimiter('form'), asyncHandler(async (req, res) => {
    const db = req.app.locals.db;
    const payload = pickWritableFields(req.body, writableFields);
    validatePayload(payload, requiredFields);

    const columns = Object.keys(payload);
    const placeholders = columns.map(() => '?').join(', ');
    const values = columns.map((field) => payload[field]);

    const result = await queryResult(
      db,
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
      values,
    );

    return created(res, { id: result.insertId }, 'Form submitted successfully');
  }));

  router.get('/', requireAdmin, asyncHandler(async (req, res) => {
    const rows = await queryRows(
      req.app.locals.db,
      `SELECT *
       FROM ${table}
       ORDER BY created_at DESC
       LIMIT 200`,
    );

    return ok(res, rows, 'Records fetched successfully');
  }));

  return router;
}

module.exports = { createFormRouter };
