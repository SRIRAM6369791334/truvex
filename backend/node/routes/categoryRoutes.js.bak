const express = require('express');
const slugify = require('slugify');

const { requireAdmin } = require('../middleware/auth');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { ok, created } = require('../utils/apiResponse');
const { queryRows, queryResult, parseJson } = require('../utils/db');

const categoryRouter = express.Router();
const subcategoryRouter = express.Router();

function slugFrom(value) {
  return slugify(value || '', { lower: true, strict: true, trim: true });
}

function categoryPredicate(alias, identifier) {
  if (/^\d+$/.test(String(identifier))) return [`${alias}.id = ?`, Number(identifier)];
  return [`${alias}.slug = ?`, identifier];
}

function normalizeCategory(row, subcategories = []) {
  return {
    ...row,
    supplier_count: Number(row.supplier_count || 0),
    tags: parseJson(row.tags, []),
    subcategories,
  };
}

function normalizeSubcategory(row) {
  return {
    ...row,
    is_active: Boolean(row.is_active),
  };
}

async function fetchCategory(db, identifier) {
  const [predicate, value] = categoryPredicate('c', identifier);
  const rows = await queryRows(
    db,
    `SELECT c.*, COALESCE(csc.supplier_count, 0) AS supplier_count
     FROM categories c
     LEFT JOIN (SELECT category_id, COUNT(id) as supplier_count FROM suppliers WHERE status = 'approved' GROUP BY category_id) csc ON csc.category_id = c.id
     WHERE ${predicate}
     LIMIT 1`,
    [value],
  );

  return rows[0] || null;
}

categoryRouter.get('/', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const onlyActive = req.query.includeInactive !== 'true';
  const whereClause = onlyActive ? 'WHERE c.is_active = true' : '';
  const categories = await queryRows(
    db,
    `SELECT c.*, COALESCE(csc.supplier_count, 0) AS supplier_count
     FROM categories c
     LEFT JOIN (SELECT category_id, COUNT(id) as supplier_count FROM suppliers WHERE status = 'approved' GROUP BY category_id) csc ON csc.category_id = c.id
     ${whereClause}
     ORDER BY c.sort_order ASC, c.name ASC`,
  );

  if (!categories.length) return ok(res, [], 'Categories fetched successfully');

  const categoryIds = categories.map((category) => category.id);
  const placeholders = categoryIds.map(() => '?').join(',');
  const subcategories = await queryRows(
    db,
    `SELECT *
     FROM subcategories
     WHERE category_id IN (${placeholders})
       ${onlyActive ? 'AND is_active = true' : ''}
     ORDER BY sort_order ASC, name ASC`,
    categoryIds,
  );

  const grouped = subcategories.reduce((acc, subcategory) => {
    const key = subcategory.category_id;
    acc[key] = acc[key] || [];
    acc[key].push(normalizeSubcategory(subcategory));
    return acc;
  }, {});

  return ok(
    res,
    categories.map((category) => normalizeCategory(category, grouped[category.id] || [])),
    'Categories fetched successfully',
  );
}));

categoryRouter.get('/:id/subcategories', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const category = await fetchCategory(db, req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const onlyActive = req.query.includeInactive !== 'true';
  const subcategories = await queryRows(
    db,
    `SELECT *
     FROM subcategories
     WHERE category_id = ?
       ${onlyActive ? 'AND is_active = true' : ''}
     ORDER BY sort_order ASC, name ASC`,
    [category.id],
  );

  return ok(res, subcategories.map(normalizeSubcategory), 'Subcategories fetched successfully');
}));

categoryRouter.get('/:id', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const category = await fetchCategory(db, req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const subcategories = await queryRows(
    db,
    `SELECT *
     FROM subcategories
     WHERE category_id = ?
       AND is_active = true
     ORDER BY sort_order ASC, name ASC`,
    [category.id],
  );

  return ok(res, normalizeCategory(category, subcategories.map(normalizeSubcategory)), 'Category fetched successfully');
}));

categoryRouter.post('/', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const { name, description, image, icon_name, trending, is_active, sort_order } = req.body;
  const slug = req.body.slug || slugFrom(name);

  if (!name || !slug) {
    throw new AppError('Category name is required', 400);
  }

  const result = await queryResult(
    db,
    `INSERT INTO categories
      (name, slug, description, image, icon_name, tags, trending, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      slug,
      description || null,
      image || null,
      icon_name || null,
      req.body.tags ? JSON.stringify(req.body.tags) : null,
      Boolean(trending),
      is_active === undefined ? true : Boolean(is_active),
      Number(sort_order || 0),
    ],
  );

  return created(res, { id: result.insertId, slug }, 'Category created successfully');
}));

categoryRouter.put('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const updates = [];
  const values = [];
  const allowedFields = ['name', 'description', 'image', 'icon_name', 'trending', 'is_active', 'sort_order'];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (req.body.slug !== undefined || req.body.name !== undefined) {
    updates.push('slug = ?');
    values.push(req.body.slug || slugFrom(req.body.name));
  }

  if (req.body.tags !== undefined) {
    updates.push('tags = ?');
    values.push(JSON.stringify(req.body.tags));
  }

  if (!updates.length) {
    throw new AppError('No category fields provided for update', 400);
  }

  values.push(req.params.id);
  const result = await queryResult(db, `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`, values);

  if (!result.affectedRows) {
    throw new AppError('Category not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Category updated successfully');
}));

categoryRouter.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const result = await queryResult(db, 'DELETE FROM categories WHERE id = ?', [req.params.id]);

  if (!result.affectedRows) {
    throw new AppError('Category not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Category deleted successfully');
}));

categoryRouter.post('/:id/subcategories', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const category = await fetchCategory(db, req.params.id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const { name, description, image, is_active, sort_order } = req.body;
  const slug = req.body.slug || slugFrom(name);

  if (!name || !slug) {
    throw new AppError('Subcategory name is required', 400);
  }

  const result = await queryResult(
    db,
    `INSERT INTO subcategories
      (category_id, name, slug, description, image, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      category.id,
      name,
      slug,
      description || null,
      image || null,
      is_active === undefined ? true : Boolean(is_active),
      Number(sort_order || 0),
    ],
  );

  return created(res, { id: result.insertId, category_id: category.id, slug }, 'Subcategory created successfully');
}));

subcategoryRouter.delete('/:id', requireAdmin, asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const result = await queryResult(db, 'DELETE FROM subcategories WHERE id = ?', [req.params.id]);

  if (!result.affectedRows) {
    throw new AppError('Subcategory not found', 404);
  }

  return ok(res, { id: Number(req.params.id) }, 'Subcategory deleted successfully');
}));

module.exports = { categoryRouter, subcategoryRouter };
