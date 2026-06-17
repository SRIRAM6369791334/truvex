const assert = require('assert/strict');
const test = require('node:test');
const jwt = require('jsonwebtoken');
const request = require('supertest');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

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

function appWithDb(db, limiterOverrides = {}) {
  return createApp({
    db,
    rateLimiters: buildRateLimiters({ apiMax: 1000, formMax: 1000, ...limiterOverrides }),
  });
}

function adminToken(role = 'admin') {
  return jwt.sign({ id: 1, email: 'admin@truvex.in', role }, process.env.JWT_SECRET);
}

test('admin buyer list is blocked without JWT before any database query runs', async () => {
  const db = createDb(() => {
    throw new Error('database should not be queried for unauthorized requests');
  });

  const response = await request(appWithDb(db))
    .get('/api/buyers')
    .expect(401);

  assert.equal(response.body.success, false);
  assert.equal(db.queries.length, 0);
});

test('admin buyer list accepts a valid admin JWT', async () => {
  const db = createDb((sql) => {
    assert.match(sql, /FROM buyers/i);
    return [[{ id: 1, buyer_name: 'Aarav Traders', status: 'new' }]];
  });

  const response = await request(appWithDb(db))
    .get('/api/buyers')
    .set('Authorization', `Bearer ${adminToken()}`)
    .expect(200);

  assert.equal(response.body.success, true);
  assert.equal(response.body.data[0].buyer_name, 'Aarav Traders');
});

test('supplier admin list is protected but approved public listing stays available', async () => {
  const db = createDb((sql) => {
    assert.match(sql, /status = 'approved'/i);
    return [[{
      id: 3,
      company_name: 'Approved Works',
      mobile: '9999999999',
      admin_notes: 'private',
      status: 'approved',
      factory_images: '[]',
    }]];
  });

  await request(appWithDb(db))
    .get('/api/suppliers')
    .expect(401);

  const response = await request(appWithDb(db))
    .get('/api/suppliers?status=approved')
    .expect(200);

  assert.equal(response.body.data[0].company_name, 'Approved Works');
  assert.equal(response.body.data[0].mobile, undefined);
  assert.equal(response.body.data[0].admin_notes, undefined);
  assert.equal(response.body.data[0].status, undefined);
});

test('form submission routes are rate limited', async () => {
  const db = createDb(() => [{ insertId: 10 }]);
  const app = appWithDb(db, { formWindowMs: 60 * 1000, formMax: 1 });
  const payload = {
    full_name: 'Test User',
    email: 'test@example.com',
    inquiry_type: 'Other',
    message: 'Need sourcing support',
  };

  await request(app).post('/api/contacts').send(payload).expect(201);
  const response = await request(app).post('/api/contacts').send(payload).expect(429);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /Too many form submissions/i);
});

test('supplier upload rejects non-image factory files', async () => {
  const db = createDb(() => [{ insertId: 1 }]);

  const response = await request(appWithDb(db))
    .post('/api/suppliers')
    .field('company_name', 'Unsafe Uploads Ltd')
    .field('contact_person', 'Tester')
    .field('mobile', '9000000000')
    .field('core_product_segment', 'Machinery')
    .field('company_details', 'Testing upload validation')
    .attach('factory_images', Buffer.from('not an image'), 'malware.exe')
    .expect(400);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /Only JPG, PNG, WEBP, and GIF/i);
  assert.equal(db.queries.length, 0, 'invalid uploads should fail before insert');
});
