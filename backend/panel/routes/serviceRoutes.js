const express = require('express');
const { upload } = require('../../node/middleware/upload');
const { queryRows, queryResult, parseJson } = require('../utils/db');
const {
  slugFrom,
  toBoolean,
  numberOrNull,
  integerOrDefault,
  linesToJson,
  jsonTextarea,
  jsonToTextarea,
} = require('../utils/forms');

const router = express.Router();

const serviceUpload = upload.fields([
  { name: 'image_file', maxCount: 1 },
  { name: 'gallery_files', maxCount: 10 }
]);

function normalizeService(row = {}) {
  return {
    id: row.id || '',
    title: row.title || '',
    slug: row.slug || '',
    description: row.description || '',
    long_description: row.long_description || '',
    price: row.price || '',
    price_unit: row.price_unit || 'Piece',
    in_stock: row.in_stock === undefined ? true : Boolean(row.in_stock),
    icon_name: row.icon_name || '',
    image: row.image || '',
    images: parseJson(row.images, []),
    features: jsonToTextarea(parseJson(row.features, [])),
    benefits: jsonToTextarea(parseJson(row.benefits, [])),
    process_steps: parseJson(row.process_steps, []),
    stats: parseJson(row.stats, []),
    specs: parseJson(row.specs, {}),
    delivery_info: row.delivery_info || '',
    moq: row.moq || 1,
    category_id: row.category_id || '',
    subcategory_id: row.subcategory_id || '',
    is_active: row.is_active === undefined ? true : Boolean(row.is_active),
    sort_order: row.sort_order || 0,
  };
}

function servicePayload(body) {
  return {
    title: body.title,
    slug: body.slug || slugFrom(body.title),
    description: body.description,
    long_description: body.long_description || null,
    price: numberOrNull(body.price),
    price_unit: body.price_unit || 'Piece',
    in_stock: toBoolean(body.in_stock),
    icon_name: body.icon_name || null,
    image: body.image || null,
    images: linesToJson(body.images),
    features: linesToJson(body.features),
    benefits: linesToJson(body.benefits),
    process_steps: jsonTextarea(body.process_steps),
    stats: jsonTextarea(body.stats),
    specs: jsonTextarea(body.specs),
    delivery_info: body.delivery_info || null,
    moq: integerOrDefault(body.moq, 1),
    category_id: numberOrNull(body.category_id),
    subcategory_id: numberOrNull(body.subcategory_id),
    is_active: toBoolean(body.is_active),
    sort_order: integerOrDefault(body.sort_order, 0),
  };
}

async function categories(db) {
  return queryRows(db, 'SELECT id, name FROM categories ORDER BY name ASC');
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

    return res.render('services/list', {
      title: 'Services',
      services: rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/new', async (req, res, next) => {
  try {
    return res.render('services/form', {
      title: 'New Service',
      service: normalizeService(),
      categories: await categories(req.app.locals.db),
      action: '/services',
      submitLabel: 'Create Service',
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/', serviceUpload, async (req, res, next) => {
  try {
    const payload = servicePayload(req.body);

    if (!payload.title || !payload.slug || !payload.description) {
      req.flash('error', 'Title, slug, and description are required.');
      return res.redirect('/services/new');
    }

    // Process files
    if (req.files && req.files.image_file) {
      payload.image = '/uploads/' + req.files.image_file[0].filename;
    }
    if (req.files && req.files.gallery_files && req.files.gallery_files.length > 0) {
      payload.images = JSON.stringify(req.files.gallery_files.map(f => '/uploads/' + f.filename));
    }

    // Process dynamic JSON arrays
    if (req.body.process_steps_arr) {
      payload.process_steps = JSON.stringify(req.body.process_steps_arr.filter(s => s.trim() !== ''));
    }

    if (req.body.stats_keys) {
      const keys = Array.isArray(req.body.stats_keys) ? req.body.stats_keys : [req.body.stats_keys];
      const values = Array.isArray(req.body.stats_values) ? req.body.stats_values : [req.body.stats_values];
      const statsArr = [];
      for (let i = 0; i < keys.length; i++) {
        if (keys[i]) statsArr.push({ label: keys[i], value: values[i] || '' });
      }
      payload.stats = JSON.stringify(statsArr);
    }

    if (req.body.specs_keys) {
      const keys = Array.isArray(req.body.specs_keys) ? req.body.specs_keys : [req.body.specs_keys];
      const values = Array.isArray(req.body.specs_values) ? req.body.specs_values : [req.body.specs_values];
      const specsObj = {};
      for (let i = 0; i < keys.length; i++) {
        if (keys[i]) specsObj[keys[i]] = values[i] || '';
      }
      payload.specs = JSON.stringify(specsObj);
    }

    const result = await queryResult(
      req.app.locals.db,
      `INSERT INTO services
        (title, slug, description, long_description, price, price_unit, in_stock, icon_name,
         image, images, features, benefits, process_steps, stats, specs, delivery_info, moq,
         category_id, subcategory_id, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.title,
        payload.slug,
        payload.description,
        payload.long_description,
        payload.price,
        payload.price_unit,
        payload.in_stock,
        payload.icon_name,
        payload.image,
        payload.images,
        payload.features,
        payload.benefits,
        payload.process_steps,
        payload.stats,
        payload.specs,
        payload.delivery_info,
        payload.moq,
        payload.category_id,
        payload.subcategory_id,
        payload.is_active,
        payload.sort_order,
      ],
    );

    req.flash('success', 'Service created.');
    return res.redirect(`/services/${result.insertId}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const rows = await queryRows(req.app.locals.db, 'SELECT * FROM services WHERE id = ? LIMIT 1', [req.params.id]);

    if (!rows[0]) {
      const error = new Error('Service not found.');
      error.statusCode = 404;
      throw error;
    }

    return res.render('services/form', {
      title: 'Edit Service',
      service: normalizeService(rows[0]),
      categories: await categories(req.app.locals.db),
      action: `/services/${req.params.id}`,
      submitLabel: 'Update Service',
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/:id', serviceUpload, async (req, res, next) => {
  try {
    const payload = servicePayload(req.body);

    if (!payload.title || !payload.slug || !payload.description) {
      req.flash('error', 'Title, slug, and description are required.');
      return res.redirect(`/services/${req.params.id}/edit`);
    }

    // Process files (keep existing if none uploaded)
    payload.image = req.body.existing_image || null;
    if (req.files && req.files.image_file) {
      payload.image = '/uploads/' + req.files.image_file[0].filename;
    }

    payload.images = req.body.existing_images || '[]';
    if (req.files && req.files.gallery_files && req.files.gallery_files.length > 0) {
      payload.images = JSON.stringify(req.files.gallery_files.map(f => '/uploads/' + f.filename));
    }

    // Process dynamic JSON arrays
    if (req.body.process_steps_arr) {
      payload.process_steps = JSON.stringify(req.body.process_steps_arr.filter(s => s.trim() !== ''));
    } else if (req.body.process_steps_arr === undefined && Object.keys(req.body).length > 0) {
      payload.process_steps = '[]';
    }

    if (req.body.stats_keys) {
      const keys = Array.isArray(req.body.stats_keys) ? req.body.stats_keys : [req.body.stats_keys];
      const values = Array.isArray(req.body.stats_values) ? req.body.stats_values : [req.body.stats_values];
      const statsArr = [];
      for (let i = 0; i < keys.length; i++) {
        if (keys[i]) statsArr.push({ label: keys[i], value: values[i] || '' });
      }
      payload.stats = JSON.stringify(statsArr);
    } else if (req.body.stats_keys === undefined && Object.keys(req.body).length > 0) {
      payload.stats = '[]';
    }

    if (req.body.specs_keys) {
      const keys = Array.isArray(req.body.specs_keys) ? req.body.specs_keys : [req.body.specs_keys];
      const values = Array.isArray(req.body.specs_values) ? req.body.specs_values : [req.body.specs_values];
      const specsObj = {};
      for (let i = 0; i < keys.length; i++) {
        if (keys[i]) specsObj[keys[i]] = values[i] || '';
      }
      payload.specs = JSON.stringify(specsObj);
    } else if (req.body.specs_keys === undefined && Object.keys(req.body).length > 0) {
      payload.specs = '{}';
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
        payload.title,
        payload.slug,
        payload.description,
        payload.long_description,
        payload.price,
        payload.price_unit,
        payload.in_stock,
        payload.icon_name,
        payload.image,
        payload.images,
        payload.features,
        payload.benefits,
        payload.process_steps,
        payload.stats,
        payload.specs,
        payload.delivery_info,
        payload.moq,
        payload.category_id,
        payload.subcategory_id,
        payload.is_active,
        payload.sort_order,
        req.params.id,
      ],
    );

    req.flash(result.affectedRows ? 'success' : 'error', result.affectedRows ? 'Service updated.' : 'Service not found.');
    return res.redirect(`/services/${req.params.id}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    const result = await queryResult(req.app.locals.db, 'DELETE FROM services WHERE id = ?', [req.params.id]);
    req.flash(result.affectedRows ? 'success' : 'error', result.affectedRows ? 'Service deleted.' : 'Service not found.');
    return res.redirect('/services');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
