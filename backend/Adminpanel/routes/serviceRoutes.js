const express = require('express');

const { upload } = require('../middleware/upload');
const { queryRows, queryResult, parseJson } = require('../utils/db');
const { slugFrom, toBoolean, numberOrNull, integerOrDefault } = require('../utils/forms');

const router = express.Router();

const serviceUpload = upload.fields([
  { name: 'image_file', maxCount: 1 },
  { name: 'gallery_files', maxCount: 10 },
]);

function parseArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  const parsed = parseJson(value, null);
  if (Array.isArray(parsed)) return parsed;
  return String(value).split(/\r?\n/).map((entry) => entry.trim()).filter(Boolean);
}

function parseObject(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  const parsed = parseJson(value, {});
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
}

function normalizeService(row = {}) {
  return {
    id: row.id || '',
    title: row.title || '',
    slug: row.slug || '',
    description: row.description || '',
    long_description: row.long_description || '',
    price: row.price === null || row.price === undefined ? '' : Number(row.price),
    price_unit: row.price_unit || 'Piece',
    in_stock: row.in_stock === undefined ? true : Boolean(row.in_stock),
    icon_name: row.icon_name || '',
    image: row.image || '',
    images: parseArray(row.images),
    features: parseArray(row.features),
    benefits: parseArray(row.benefits),
    process_steps: parseArray(row.process_steps),
    stats: parseArray(row.stats),
    specs: parseObject(row.specs),
    delivery_info: row.delivery_info || '',
    moq: Number(row.moq || 1),
    category_id: row.category_id || '',
    subcategory_id: row.subcategory_id || '',
    category_name: row.category_name || '',
    is_active: row.is_active === undefined ? true : Boolean(row.is_active),
    sort_order: Number(row.sort_order || 0),
  };
}

function servicePayload(body) {
  const title = String(body.title || '').trim();
  return {
    title,
    slug: String(body.slug || slugFrom(title)).trim(),
    description: String(body.description || '').trim(),
    long_description: String(body.long_description || '').trim() || null,
    price: numberOrNull(body.price),
    price_unit: String(body.price_unit || 'Piece').trim(),
    in_stock: toBoolean(body.in_stock),
    icon_name: String(body.icon_name || '').trim() || null,
    image: body.existing_image || null,
    images: JSON.stringify(parseArray(body.existing_images || body.images)),
    features: JSON.stringify(parseArray(body.features)),
    benefits: JSON.stringify(parseArray(body.benefits)),
    process_steps: JSON.stringify(parseArray(body.process_steps)),
    stats: JSON.stringify(parseArray(body.stats)),
    specs: JSON.stringify(parseObject(body.specs)),
    delivery_info: String(body.delivery_info || '').trim() || null,
    moq: integerOrDefault(body.moq, 1),
    category_id: numberOrNull(body.category_id),
    subcategory_id: numberOrNull(body.subcategory_id),
    is_active: toBoolean(body.is_active),
    sort_order: integerOrDefault(body.sort_order, 0),
  };
}

function applyFiles(payload, files) {
  if (files?.image_file?.[0]) {
    payload.image = `/uploads/${files.image_file[0].filename}`;
  }
  if (files?.gallery_files?.length) {
    payload.images = JSON.stringify(files.gallery_files.map((file) => `/uploads/${file.filename}`));
  }
}

function validateService(payload) {
  const fields = {};
  if (!payload.title) fields.title = 'Title is required.';
  if (!payload.slug) fields.slug = 'Slug is required.';
  if (!payload.description) fields.description = 'Description is required.';
  return fields;
}

router.get('/', async (req, res, next) => {
  try {
    const rows = await queryRows(
      req.app.locals.db,
      `SELECT s.*, c.name AS category_name
       FROM services s
       LEFT JOIN categories c ON c.id = s.category_id
       ORDER BY s.sort_order ASC, s.title ASC`,
    );
    return res.json({ data: rows.map(normalizeService) });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const rows = await queryRows(
      req.app.locals.db,
      `SELECT s.*, c.name AS category_name
       FROM services s
       LEFT JOIN categories c ON c.id = s.category_id
       WHERE s.id = ?
       LIMIT 1`,
      [req.params.id],
    );
    if (!rows[0]) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    return res.json({ data: normalizeService(rows[0]) });
  } catch (error) {
    return next(error);
  }
});

router.post('/', serviceUpload, async (req, res, next) => {
  try {
    const payload = servicePayload(req.body);
    applyFiles(payload, req.files);
    const fields = validateService(payload);
    if (Object.keys(fields).length) {
      return res.status(400).json({ error: 'Title, slug, and description are required.', fields });
    }

    const result = await queryResult(
      req.app.locals.db,
      `INSERT INTO services
        (title, slug, description, long_description, price, price_unit, in_stock, icon_name,
         image, images, features, benefits, process_steps, stats, specs, delivery_info, moq,
         category_id, subcategory_id, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.title, payload.slug, payload.description, payload.long_description, payload.price,
        payload.price_unit, payload.in_stock, payload.icon_name, payload.image, payload.images,
        payload.features, payload.benefits, payload.process_steps, payload.stats, payload.specs,
        payload.delivery_info, payload.moq, payload.category_id, payload.subcategory_id,
        payload.is_active, payload.sort_order,
      ],
    );

    return res.status(201).json({
      data: { id: result.insertId },
      message: 'Service created.',
    });
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', serviceUpload, async (req, res, next) => {
  try {
    const payload = servicePayload(req.body);
    applyFiles(payload, req.files);
    const fields = validateService(payload);
    if (Object.keys(fields).length) {
      return res.status(400).json({ error: 'Title, slug, and description are required.', fields });
    }

    const result = await queryResult(
      req.app.locals.db,
      `UPDATE services
       SET title = ?, slug = ?, description = ?, long_description = ?, price = ?, price_unit = ?,
           in_stock = ?, icon_name = ?, image = ?, images = ?, features = ?, benefits = ?,
           process_steps = ?, stats = ?, specs = ?, delivery_info = ?, moq = ?, category_id = ?,
           subcategory_id = ?, is_active = ?, sort_order = ?
       WHERE id = ?`,
      [
        payload.title, payload.slug, payload.description, payload.long_description, payload.price,
        payload.price_unit, payload.in_stock, payload.icon_name, payload.image, payload.images,
        payload.features, payload.benefits, payload.process_steps, payload.stats, payload.specs,
        payload.delivery_info, payload.moq, payload.category_id, payload.subcategory_id,
        payload.is_active, payload.sort_order, req.params.id,
      ],
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    return res.json({ data: { id: req.params.id }, message: 'Service updated.' });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await queryResult(req.app.locals.db, 'DELETE FROM services WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    return res.json({ data: null, message: 'Service deleted.' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
