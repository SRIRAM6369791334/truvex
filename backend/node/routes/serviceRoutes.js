const express = require('express');
const slugify = require('slugify');

const { requireAdmin } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult, parseJson } = require('../utils/db');

const router = express.Router();
const JSON_FIELDS = ['images', 'features', 'benefits', 'process_steps', 'stats', 'specs'];

function slugFrom(value) {
  return slugify(value || '', { lower: true, strict: true, trim: true });
}

function servicePredicate(identifier) {
  if (/^\d+$/.test(String(identifier))) return ['s.id = ?', Number(identifier)];
  return ['s.slug = ?', identifier];
}

function normalizeService(row) {
  return JSON_FIELDS.reduce((service, field) => {
    service[field] = parseJson(row[field], []);
    return service;
  }, { ...row });
}

router.get('/', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const where = ['s.is_active = true'];
  const values = [];

  if (req.query.category) {
    if (/^\d+$/.test(String(req.query.category))) {
      where.push('s.category_id = ?');
      values.push(Number(req.query.category));
    } else {
      where.push('c.slug = ?');
      values.push(req.query.category);
    }
  }

  if (req.query.search) {
    where.push('(s.title LIKE ? OR s.description LIKE ?)');
    values.push(`%${req.query.search}%`, `%${req.query.search}%`);
  }

  const rows = await queryRows(
    db,
    `SELECT s.*, c.name AS category_name, c.slug AS category_slug
     FROM services s
     LEFT JOIN categories c ON c.id = s.category_id
     WHERE ${where.join(' AND ')}
     ORDER BY s.sort_order ASC, s.title ASC
     LIMIT 200`,
    values,
  );

  return ok(res, rows.map(normalizeService), 'Services fetched successfully');
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const [predicate, value] = servicePredicate(req.params.id);
  const rows = await queryRows(
    db,
    `SELECT s.*, c.name AS category_name, c.slug AS category_slug
     FROM services s
     LEFT JOIN categories c ON c.id = s.category_id
     WHERE ${predicate}
       AND s.is_active = true
     LIMIT 1`,
    [value],
  );

  if (!rows[0]) {
    throw new AppError('Service not found', 404);
  }

  return ok(res, normalizeService(rows[0]), 'Service fetched successfully');
}));

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const slug = req.body.slug || slugFrom(req.body.title);

  if (!req.body.title || !slug || !req.body.description) {
    throw new AppError('Service title, slug, and description are required', 400);
  }

  const result = await queryResult(
    db,
    `INSERT INTO services
      (title, slug, description, long_description, price, price_unit, in_stock, icon_name,
       image, images, features, benefits, process_steps, stats, specs, delivery_info, moq,
       category_id, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.title,
      slug,
      req.body.description,
      req.body.long_description || null,
      req.body.price || null,
      req.body.price_unit || 'Piece',
      req.body.in_stock === undefined ? true : Boolean(req.body.in_stock),
      req.body.icon_name || null,
      req.body.image || null,
      JSON.stringify(req.body.images || []),
      JSON.stringify(req.body.features || []),
      JSON.stringify(req.body.benefits || []),
      JSON.stringify(req.body.process_steps || []),
      JSON.stringify(req.body.stats || []),
      JSON.stringify(req.body.specs || []),
      req.body.delivery_info || null,
      req.body.moq || 1,
      req.body.category_id || null,
      req.body.is_active === undefined ? true : Boolean(req.body.is_active),
      req.body.sort_order || 0,
    ],
  );

  return created(res, { id: result.insertId, slug }, 'Service created successfully');
}));

router.put('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const allowedFields = [
    'title',
    'description',
    'long_description',
    'price',
    'price_unit',
    'in_stock',
    'icon_name',
    'image',
    'delivery_info',
    'moq',
    'category_id',
    'is_active',
    'sort_order',
  ];
  const updates = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  JSON_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(JSON.stringify(req.body[field]));
    }
  });

  if (req.body.slug !== undefined || req.body.title !== undefined) {
    updates.push('slug = ?');
    values.push(req.body.slug || slugFrom(req.body.title));
  }

  if (!updates.length) {
    throw new AppError('No service fields provided for update', 400);
  }

  values.push(req.params.id);
  const result = await queryResult(db, `UPDATE services SET ${updates.join(', ')} WHERE id = ?`, values);

  if (!result.affectedRows) {
    throw new AppError('Service not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Service updated successfully');
}));

router.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const result = await queryResult(db, 'DELETE FROM services WHERE id = ?', [req.params.id]);

  if (!result.affectedRows) {
    throw new AppError('Service not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Service deleted successfully');
}));

module.exports = router;
