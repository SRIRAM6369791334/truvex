const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const test = require('node:test');
const request = require('supertest');

process.env.NODE_ENV = 'test';

const { createApp } = require('../../app');
const { buildRateLimiters } = require('../../middleware/rateLimiters');

function createDb(handler) {
  const db = {
    queries: [],
    async query(sql, params = []) {
      this.queries.push({ sql, params });
      return handler(sql, params);
    },
  };

  return db;
}

function appWithDb(db) {
  return createApp({
    db,
    rateLimiters: buildRateLimiters({ apiMax: 1000, formMax: 1000 }),
  });
}

test('schema creates categories before services and avoids persisted supplier_count drift', () => {
  const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  const categoriesIndex = schema.indexOf('CREATE TABLE categories');
  const servicesIndex = schema.indexOf('CREATE TABLE services');
  const categoriesBlock = schema.slice(categoriesIndex, servicesIndex);

  assert.ok(categoriesIndex >= 0, 'categories table must exist');
  assert.ok(servicesIndex >= 0, 'services table must exist');
  assert.ok(categoriesIndex < servicesIndex, 'categories must be created before services foreign key');
  assert.equal(/supplier_count\s+INT/i.test(categoriesBlock), false, 'supplier_count should not be manually persisted');
  assert.match(schema, /CREATE VIEW category_supplier_counts/i, 'supplier_count should come from a computed view/query');
});

test('GET /api/categories/:id/subcategories lists active subcategories', async () => {
  const db = createDb((sql) => {
    if (sql.includes('FROM categories c')) {
      return [[{
        id: 7,
        name: 'Industrial Machinery',
        slug: 'industrial-machinery',
        supplier_count: 4,
        tags: '[]',
      }]];
    }

    if (sql.includes('FROM subcategories')) {
      return [[
        {
          id: 21,
          category_id: 7,
          name: 'CNC Machines',
          slug: 'cnc-machines',
          is_active: 1,
          sort_order: 1,
        },
      ]];
    }

    return [[]];
  });

  const response = await request(appWithDb(db))
    .get('/api/categories/7/subcategories')
    .expect(200);

  assert.equal(response.body.success, true);
  assert.equal(response.body.data.length, 1);
  assert.equal(response.body.data[0].slug, 'cnc-machines');
  assert.ok(
    db.queries.some((query) => query.sql.includes('WHERE category_id = ?')),
    'route should query subcategories by category id',
  );
});

test('GET /api/categories returns computed supplier_count with nested subcategories', async () => {
  const db = createDb((sql) => {
    if (sql.includes('FROM categories c')) {
      return [[{
        id: 1,
        name: 'Packaging',
        slug: 'packaging',
        supplier_count: 9,
        tags: '["boxes"]',
      }]];
    }

    if (sql.includes('FROM subcategories')) {
      return [[{
        id: 5,
        category_id: 1,
        name: 'Corrugated Boxes',
        slug: 'corrugated-boxes',
        is_active: 1,
      }]];
    }

    return [[]];
  });

  const response = await request(appWithDb(db))
    .get('/api/categories')
    .expect(200);

  assert.equal(response.body.data[0].supplier_count, 9);
  assert.deepEqual(response.body.data[0].tags, ['boxes']);
  assert.equal(response.body.data[0].subcategories[0].name, 'Corrugated Boxes');
});
