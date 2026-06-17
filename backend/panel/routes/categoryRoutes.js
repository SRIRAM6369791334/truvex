const express = require('express');

const { queryRows, queryResult, parseJson } = require('../utils/db');
const { slugFrom, toBoolean, integerOrDefault, linesToJson } = require('../utils/forms');
const { upload } = require('../../node/middleware/upload');

const router = express.Router();

function normalizeCategory(row = {}) {
  return {
    id: row.id || '',
    name: row.name || '',
    slug: row.slug || '',
    description: row.description || '',
    image: row.image || '',
    icon_name: row.icon_name || '',
    tags: Array.isArray(row.tags) ? row.tags.join('\n') : parseJson(row.tags, []).join('\n'),
    trending: row.trending === undefined ? false : Boolean(row.trending),
    is_active: row.is_active === undefined ? true : Boolean(row.is_active),
    sort_order: row.sort_order || 0,
  };
}

function categoryPayload(body, file) {
  return {
    name: body.name,
    slug: body.slug || slugFrom(body.name),
    description: body.description || null,
    image: file ? `/uploads/${file.filename}` : (body.existing_image || null),
    icon_name: body.icon_name || null,
    tags: linesToJson(body.tags),
    trending: toBoolean(body.trending),
    is_active: toBoolean(body.is_active),
    sort_order: integerOrDefault(body.sort_order, 0),
  };
}

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const rows = await queryRows(
      db,
      `SELECT c.*, COALESCE(csc.supplier_count, 0) AS supplier_count
       FROM categories c
       LEFT JOIN category_supplier_counts csc ON csc.category_id = c.id
       ORDER BY c.sort_order ASC, c.name ASC`,
    );
    const subcategories = await queryRows(
      db,
      `SELECT *
       FROM subcategories
       ORDER BY sort_order ASC, name ASC`,
    );
    const grouped = subcategories.reduce((acc, subcategory) => {
      acc[subcategory.category_id] = acc[subcategory.category_id] || [];
      acc[subcategory.category_id].push(subcategory);
      return acc;
    }, {});

    return res.render('categories/list', {
      title: 'Categories',
      categories: rows.map((category) => ({
        ...category,
        tags: parseJson(category.tags, []),
        subcategories: grouped[category.id] || [],
      })),
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/new', (req, res) => {
  res.render('categories/form', {
    title: 'New Category',
    category: normalizeCategory(),
    subcategories: [],
    action: '/categories',
    submitLabel: 'Create Category',
  });
});

router.post('/', upload.single('image_file'), async (req, res, next) => {
  try {
    const payload = categoryPayload(req.body, req.file);

    if (!payload.name || !payload.slug) {
      req.flash('error', 'Name and slug are required.');
      return res.redirect('/categories/new');
    }

    const result = await queryResult(
      req.app.locals.db,
      `INSERT INTO categories
        (name, slug, description, image, icon_name, tags, trending, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.name,
        payload.slug,
        payload.description,
        payload.image,
        payload.icon_name,
        payload.tags,
        payload.trending,
        payload.is_active,
        payload.sort_order,
      ],
    );

    req.flash('success', 'Category created.');
    return res.redirect(`/categories/${result.insertId}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const rows = await queryRows(db, 'SELECT * FROM categories WHERE id = ? LIMIT 1', [req.params.id]);

    if (!rows[0]) {
      const error = new Error('Category not found.');
      error.statusCode = 404;
      throw error;
    }

    const subcategories = await queryRows(
      db,
      'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort_order ASC, name ASC',
      [req.params.id],
    );

    return res.render('categories/form', {
      title: 'Edit Category',
      category: normalizeCategory(rows[0]),
      subcategories,
      action: `/categories/${req.params.id}`,
      submitLabel: 'Update Category',
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/:id', upload.single('image_file'), async (req, res, next) => {
  try {
    const payload = categoryPayload(req.body, req.file);

    if (!payload.name || !payload.slug) {
      req.flash('error', 'Name and slug are required.');
      return res.redirect(`/categories/${req.params.id}/edit`);
    }

    const result = await queryResult(
      req.app.locals.db,
      `UPDATE categories
       SET name = ?, slug = ?, description = ?, image = ?, icon_name = ?, tags = ?,
           trending = ?, is_active = ?, sort_order = ?
       WHERE id = ?`,
      [
        payload.name,
        payload.slug,
        payload.description,
        payload.image,
        payload.icon_name,
        payload.tags,
        payload.trending,
        payload.is_active,
        payload.sort_order,
        req.params.id,
      ],
    );

    req.flash(result.affectedRows ? 'success' : 'error', result.affectedRows ? 'Category updated.' : 'Category not found.');
    return res.redirect(`/categories/${req.params.id}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    const result = await queryResult(req.app.locals.db, 'DELETE FROM categories WHERE id = ?', [req.params.id]);
    req.flash(result.affectedRows ? 'success' : 'error', result.affectedRows ? 'Category deleted.' : 'Category not found.');
    return res.redirect('/categories');
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/subcategories', upload.single('sub_image_file'), async (req, res, next) => {
  try {
    const name = req.body.name;
    const slug = req.body.slug || slugFrom(name);
    const subImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !slug) {
      req.flash('error', 'Subcategory name is required.');
      return res.redirect(`/categories/${req.params.id}/edit`);
    }

    await queryResult(
      req.app.locals.db,
      `INSERT INTO subcategories
        (category_id, name, slug, description, image, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.params.id,
        name,
        slug,
        req.body.description || null,
        subImage,
        toBoolean(req.body.is_active),
        integerOrDefault(req.body.sort_order, 0),
      ],
    );

    req.flash('success', 'Subcategory added.');
    return res.redirect(`/categories/${req.params.id}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.post('/:categoryId/subcategories/:subcategoryId/delete', async (req, res, next) => {
  try {
    const result = await queryResult(
      req.app.locals.db,
      'DELETE FROM subcategories WHERE id = ? AND category_id = ?',
      [req.params.subcategoryId, req.params.categoryId],
    );
    req.flash(result.affectedRows ? 'success' : 'error', result.affectedRows ? 'Subcategory deleted.' : 'Subcategory not found.');
    return res.redirect(`/categories/${req.params.categoryId}/edit`);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id/subcategories/json', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const subcategories = await queryRows(
      db,
      'SELECT id, name FROM subcategories WHERE category_id = ? ORDER BY sort_order ASC, name ASC',
      [req.params.id],
    );
    return res.json(subcategories);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
});

module.exports = router;
