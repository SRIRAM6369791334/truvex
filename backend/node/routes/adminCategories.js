const express = require('express');
const { upload } = require('../middleware/upload');
const { queryRows, queryResult, parseJson } = require('../utils/db');
const { slugFrom, toBoolean, integerOrDefault } = require('../utils/forms');

const router = express.Router();

function parseTags(value) {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  if (!value) return [];
  const parsed = parseJson(value, null);
  if (Array.isArray(parsed)) return parsed.map(String).map((tag) => tag.trim()).filter(Boolean);
  return String(value).split(/\r?\n/).map((tag) => tag.trim()).filter(Boolean);
}

function normalizeCategory(row = {}) {
  return {
    id: row.id || '', name: row.name || '', slug: row.slug || '',
    description: row.description || '', image: row.image || '',
    icon_name: row.icon_name || '', tags: parseTags(row.tags),
    trending: row.trending === undefined ? false : Boolean(row.trending),
    is_active: row.is_active === undefined ? true : Boolean(row.is_active),
    sort_order: Number(row.sort_order || 0),
    supplier_count: Number(row.supplier_count || 0),
  };
}

function normalizeSubcategory(row = {}) {
  return {
    id: row.id || '', category_id: row.category_id || '', name: row.name || '',
    slug: row.slug || '', description: row.description || '', image: row.image || '',
    is_active: row.is_active === undefined ? true : Boolean(row.is_active),
    sort_order: Number(row.sort_order || 0),
  };
}

function categoryPayload(body, file) {
  const name = String(body.name || '').trim();
  return {
    name, slug: String(body.slug || slugFrom(name)).trim(),
    description: String(body.description || '').trim() || null,
    image: file ? `/uploads/${file.filename}` : (body.existing_image || null),
    icon_name: String(body.icon_name || '').trim() || null,
    tags: JSON.stringify(parseTags(body.tags)),
    trending: toBoolean(body.trending),
    is_active: toBoolean(body.is_active),
    sort_order: integerOrDefault(body.sort_order, 0),
  };
}

async function assertTrendingLimit(db, excludedId) {
  const sql = excludedId
    ? 'SELECT COUNT(*) as count FROM categories WHERE trending = 1 AND id != ?'
    : 'SELECT COUNT(*) as count FROM categories WHERE trending = 1';
  const rows = await queryRows(db, sql, excludedId ? [excludedId] : []);
  return Number(rows[0]?.count || 0) < 6;
}

router.get('/options', async (req, res, next) => {
  try {
    const rows = await queryRows(
      req.app.locals.db, 'SELECT id, name FROM categories ORDER BY name ASC',
    );
    return res.json({ data: rows });
  } catch (error) { return next(error); }
});

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const rows = await queryRows(
      db,
      `SELECT c.*, COALESCE(csc.supplier_count, 0) AS supplier_count
       FROM categories c
       LEFT JOIN (SELECT category_id, COUNT(id) as supplier_count FROM suppliers WHERE status = 'approved' GROUP BY category_id) csc ON csc.category_id = c.id
       ORDER BY c.sort_order ASC, c.name ASC`,
    );
    const subcategories = await queryRows(
      db, `SELECT * FROM subcategories ORDER BY sort_order ASC, name ASC`,
    );
    const grouped = subcategories.reduce((acc, sub) => {
      acc[sub.category_id] = acc[sub.category_id] || [];
      acc[sub.category_id].push(normalizeSubcategory(sub));
      return acc;
    }, {});

    return res.json({
      data: rows.map((cat) => ({ ...normalizeCategory(cat), subcategories: grouped[cat.id] || [] })),
    });
  } catch (error) { return next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const rows = await queryRows(db, 'SELECT * FROM categories WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Category not found.' });

    const subcategories = await queryRows(
      db, 'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort_order ASC, name ASC',
      [req.params.id],
    );
    return res.json({ data: { category: normalizeCategory(rows[0]), subcategories: subcategories.map(normalizeSubcategory) } });
  } catch (error) { return next(error); }
});

router.get('/:id/subcategories', async (req, res, next) => {
  try {
    const rows = await queryRows(
      req.app.locals.db,
      'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort_order ASC, name ASC',
      [req.params.id],
    );
    return res.json({ data: rows.map(normalizeSubcategory) });
  } catch (error) { return next(error); }
});

router.post('/', upload.single('image_file'), async (req, res, next) => {
  try {
    const payload = categoryPayload(req.body, req.file);
    if (!payload.name) return res.status(400).json({ error: 'Name is required.', fields: { name: 'Name is required.' } });

    if (payload.trending && !(await assertTrendingLimit(req.app.locals.db))) {
      return res.status(409).json({ error: 'You can only select up to 6 categories to show on the homepage. Please deselect an existing one first.' });
    }

    const result = await queryResult(
      req.app.locals.db,
      `INSERT INTO categories (name, slug, description, image, icon_name, tags, trending, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [payload.name, payload.slug, payload.description, payload.image, payload.icon_name, payload.tags, payload.trending, payload.is_active, payload.sort_order],
    );
    return res.status(201).json({ data: { id: result.insertId }, message: 'Category created.' });
  } catch (error) { return next(error); }
});

router.patch('/:id', upload.single('image_file'), async (req, res, next) => {
  try {
    const payload = categoryPayload(req.body, req.file);
    if (!payload.name || !payload.slug) {
      return res.status(400).json({ error: 'Name and slug are required.', fields: { name: payload.name ? undefined : 'Name is required.', slug: payload.slug ? undefined : 'Slug is required.' } });
    }

    if (payload.trending && !(await assertTrendingLimit(req.app.locals.db, req.params.id))) {
      return res.status(409).json({ error: 'You can only select up to 6 categories to show on the homepage. Please deselect an existing one first.' });
    }

    const result = await queryResult(
      req.app.locals.db,
      `UPDATE categories SET name=?, slug=?, description=?, image=?, icon_name=?, tags=?, trending=?, is_active=?, sort_order=? WHERE id=?`,
      [payload.name, payload.slug, payload.description, payload.image, payload.icon_name, payload.tags, payload.trending, payload.is_active, payload.sort_order, req.params.id],
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Category not found.' });
    return res.json({ data: { id: req.params.id }, message: 'Category updated.' });
  } catch (error) { return next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await queryResult(req.app.locals.db, 'DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Category not found.' });
    return res.json({ data: null, message: 'Category deleted.' });
  } catch (error) { return next(error); }
});

router.post('/:id/subcategories', upload.single('sub_image_file'), async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const slug = String(req.body.slug || slugFrom(name)).trim();
    const subImage = req.file ? `/uploads/${req.file.filename}` : null;
    if (!name || !slug) return res.status(400).json({ error: 'Subcategory name is required.' });

    const result = await queryResult(
      req.app.locals.db,
      `INSERT INTO subcategories (category_id, name, slug, description, image, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.params.id, name, slug, String(req.body.description || '').trim() || null, subImage, toBoolean(req.body.is_active), integerOrDefault(req.body.sort_order, 0)],
    );
    return res.status(201).json({ data: { id: result.insertId }, message: 'Subcategory added.' });
  } catch (error) { return next(error); }
});

router.patch('/:categoryId/subcategories/:subcategoryId', upload.single('sub_image_file'), async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const slug = String(req.body.slug || slugFrom(name)).trim();
    if (!name || !slug) return res.status(400).json({ error: 'Subcategory name is required.' });

    const imageSql = req.file ? ', image = ?' : '';
    const imageValue = req.file ? `/uploads/${req.file.filename}` : null;
    const params = [name, slug, String(req.body.description || '').trim() || null, toBoolean(req.body.is_active), integerOrDefault(req.body.sort_order, 0)];
    if (imageValue) params.push(imageValue);
    params.push(req.params.subcategoryId, req.params.categoryId);

    const result = await queryResult(
      req.app.locals.db,
      `UPDATE subcategories SET name=?, slug=?, description=?, is_active=?, sort_order=?${imageSql} WHERE id=? AND category_id=?`,
      params,
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Subcategory not found.' });
    return res.json({ data: { id: req.params.subcategoryId }, message: 'Subcategory updated.' });
  } catch (error) { return next(error); }
});

router.delete('/:categoryId/subcategories/:subcategoryId', async (req, res, next) => {
  try {
    const result = await queryResult(
      req.app.locals.db,
      'DELETE FROM subcategories WHERE id = ? AND category_id = ?',
      [req.params.subcategoryId, req.params.categoryId],
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Subcategory not found.' });
    return res.json({ data: null, message: 'Subcategory deleted.' });
  } catch (error) { return next(error); }
});

module.exports = router;
