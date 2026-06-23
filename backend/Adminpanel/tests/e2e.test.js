const { describe, test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const { createApp } = require('../app');

const mockHashedPassword = bcrypt.hashSync('admin123', 10);

const mockDb = {
  async query(sql, params = []) {
    const normalizedSql = sql.replace(/\s+/g, ' ').trim().toLowerCase();

    if (normalizedSql.includes('select id, name, email, password, role from admin_users')) {
      if (String(params[0] || '').toLowerCase() !== 'admin@truvex.com') return [[]];
      return [[{
        id: 1,
        name: 'Admin User',
        email: 'admin@truvex.com',
        password: mockHashedPassword,
        role: 'admin',
      }]];
    }
    if (normalizedSql.includes('update admin_users set last_login')) return [{ affectedRows: 1 }];
    if (normalizedSql.startsWith('select count(*)')) return [[{ total: 5, count: 1 }]];

    if (normalizedSql.includes("'buyers' as resource")) {
      return [[{ id: 1, title: 'Test Buyer', meta: '1234567890', status: 'new', created_at: new Date().toISOString(), resource: 'buyers' }]];
    }
    if (normalizedSql.includes("'suppliers' as resource")) {
      return [[{ id: 1, title: 'Test Supplier', meta: 'Widgets', status: 'approved', created_at: new Date().toISOString(), resource: 'suppliers' }]];
    }
    if (normalizedSql.includes("'contacts' as resource")) {
      return [[{ id: 1, title: 'Contact User', meta: 'General', status: 'new', created_at: new Date().toISOString(), resource: 'contacts' }]];
    }

    if (normalizedSql.includes('select id, name from categories')) {
      return [[{ id: 1, name: 'Test Category' }]];
    }
    if (normalizedSql.includes('from categories') && normalizedSql.includes('supplier_count')) {
      return [[{
        id: 1,
        name: 'Test Category',
        slug: 'test-category',
        description: 'Test category',
        image: '/uploads/category.jpg',
        icon_name: 'folder',
        tags: '["tag1","tag2"]',
        trending: 1,
        is_active: 1,
        sort_order: 1,
        supplier_count: 5,
      }]];
    }
    if (normalizedSql.includes('select * from categories where id = ?')) {
      return [[{
        id: 1,
        name: 'Test Category',
        slug: 'test-category',
        description: 'Test category',
        image: '/uploads/category.jpg',
        icon_name: 'folder',
        tags: '["tag1","tag2"]',
        trending: 1,
        is_active: 1,
        sort_order: 1,
      }]];
    }
    if (normalizedSql.includes('from subcategories')) {
      return [[{
        id: 1,
        category_id: 1,
        name: 'Test Subcategory',
        slug: 'test-subcategory',
        description: 'Subcategory',
        image: '/uploads/sub.jpg',
        is_active: 1,
        sort_order: 1,
      }]];
    }

    if (normalizedSql.includes('from services s left join categories c') && normalizedSql.includes('where s.id = ?')) {
      return [[{
        id: 1,
        title: 'Test Service',
        slug: 'test-service',
        description: 'Test description',
        long_description: 'Long description',
        price: 99.99,
        price_unit: 'Piece',
        in_stock: 1,
        icon_name: 'settings',
        image: '/uploads/service.jpg',
        images: '[]',
        features: '["Feature"]',
        benefits: '["Benefit"]',
        process_steps: '["Step"]',
        stats: '[{"label":"Clients","value":"10"}]',
        specs: '{"Material":"Steel"}',
        delivery_info: '3 days',
        moq: 1,
        category_id: 1,
        subcategory_id: 1,
        category_name: 'Test Category',
        is_active: 1,
        sort_order: 1,
      }]];
    }
    if (normalizedSql.includes('from services s left join categories c')) {
      return [[{
        id: 1,
        title: 'Test Service',
        slug: 'test-service',
        description: 'Test description',
        price: 99.99,
        price_unit: 'Piece',
        in_stock: 1,
        category_name: 'Test Category',
        images: '[]',
        features: '[]',
        benefits: '[]',
        process_steps: '[]',
        stats: '[]',
        specs: '{}',
        is_active: 1,
      }]];
    }

    if (normalizedSql.includes('from buyers')) {
      return [[{
        id: 1,
        buyer_name: 'Test Buyer',
        phone: '1234567890',
        estimated_budget: '10000',
        status: 'new',
        created_at: new Date().toISOString(),
        requirement_details: 'Need widgets',
        address: 'Test address',
        admin_notes: 'Call tomorrow',
      }]];
    }
    if (normalizedSql.includes('from suppliers')) {
      return [[{ id: 1, company_name: 'Test Supplier', contact_person: 'Joe', mobile: '123', core_product_segment: 'Widgets', status: 'approved', factory_images: '[]', admin_notes: 'Good' }]];
    }
    if (normalizedSql.includes('from contacts')) {
      return [[{ id: 1, full_name: 'Contact User', email: 'contact@test.com', phone: '123', inquiry_type: 'General', status: 'new', message: 'Hello', admin_notes: '' }]];
    }
    if (normalizedSql.includes('from rfq_requests')) {
      return [[{ id: 1, product_name: 'Widget', quantity: 10, delivery_city: 'Delhi', mobile: '123', status: 'new' }]];
    }
    if (normalizedSql.includes('from enquiries')) {
      return [[{ id: 1, product_service: 'Consulting', quantity_budget: '1000', mobile: '123', source_page: '/', status: 'new' }]];
    }
    if (normalizedSql.includes('from service_leads')) {
      return [[{ id: 1, full_name: 'Lead', mobile: '123', service_title: 'Web', quantity: 1, status: 'new' }]];
    }
    if (normalizedSql.includes('from callback_requests')) {
      return [[{ id: 1, name: 'Callback', phone: '123', preferred_time: 'Morning', topic: 'Sales', status: 'new' }]];
    }
    if (normalizedSql.includes('from newsletters')) {
      return [[{ id: 1, email: 'news@test.com', is_active: 1, subscribed_at: new Date().toISOString() }]];
    }

    if (normalizedSql.startsWith('select')) return [[]];
    return [{ affectedRows: 1, insertId: 7 }];
  },
};

let server;
let port;
let cookie;

async function request(path, options = {}) {
  return fetch(`http://localhost:${port}${path}`, options);
}

before(async () => {
  const app = createApp({ db: mockDb });
  server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });
  port = server.address().port;
  const login = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@truvex.com', password: 'admin123' }),
  });
  cookie = login.headers.get('set-cookie');
});

after(() => server?.close());

describe('authentication API', () => {
  test('rejects unauthenticated protected requests with JSON 401', async () => {
    const response = await request('/api/dashboard');
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: 'Authentication required.' });
  });

  test('valid login creates a session and returns the user', async () => {
    const response = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@truvex.com', password: 'admin123' }),
    });
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.data.user.email, 'admin@truvex.com');
    assert.ok(response.headers.get('set-cookie'));
  });

  test('invalid login returns a consistent error envelope', async () => {
    const response = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'missing@test.com', password: 'wrong' }),
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: 'Invalid admin credentials.' });
  });

  test('session endpoint returns authenticated user', async () => {
    const response = await request('/api/auth/session', { headers: { Cookie: cookie } });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).data.user.name, 'Admin User');
  });
});

describe('admin JSON APIs', () => {
  test('dashboard excludes internal SQL from its public response', async () => {
    const response = await request('/api/dashboard', { headers: { Cookie: cookie } });
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.data.stats.length, 8);
    assert.equal(Object.hasOwn(payload.data.stats[0], 'sql'), false);
  });

  test('submission list exposes public descriptors, not table metadata', async () => {
    const response = await request('/api/submissions/buyers', { headers: { Cookie: cookie } });
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.data.config.title, 'Buyer Requirements');
    assert.deepEqual(payload.data.config.columns[0], { key: 'buyer_name', label: 'Buyer' });
    assert.equal(Object.hasOwn(payload.data.config, 'table'), false);
  });

  test('unknown submission resource returns 404 JSON', async () => {
    const response = await request('/api/submissions/not-real', { headers: { Cookie: cookie } });
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error, 'Unknown admin resource.');
  });

  test('status update validates options and updates valid statuses', async () => {
    const invalid = await request('/api/submissions/buyers/1/status', {
      method: 'PATCH',
      headers: { Cookie: cookie, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'invalid' }),
    });
    assert.equal(invalid.status, 400);

    const valid = await request('/api/submissions/buyers/1/status', {
      method: 'PATCH',
      headers: { Cookie: cookie, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'contacted', admin_notes: 'Called' }),
    });
    assert.equal(valid.status, 200);
    assert.equal((await valid.json()).message, 'Status updated.');
  });

  test('category and service responses normalize JSON database fields', async () => {
    const categoryResponse = await request('/api/categories', { headers: { Cookie: cookie } });
    const categories = (await categoryResponse.json()).data;
    assert.deepEqual(categories[0].tags, ['tag1', 'tag2']);
    assert.equal(categories[0].subcategories[0].name, 'Test Subcategory');

    const serviceResponse = await request('/api/services/1', { headers: { Cookie: cookie } });
    const service = (await serviceResponse.json()).data;
    assert.deepEqual(service.features, ['Feature']);
    assert.deepEqual(service.specs, { Material: 'Steel' });
  });

  test('create category returns created id and standard message', async () => {
    const body = new FormData();
    body.append('name', 'New Category');
    body.append('icon_name', 'folder');
    body.append('is_active', 'true');
    const response = await request('/api/categories', {
      method: 'POST',
      headers: { Cookie: cookie },
      body,
    });
    assert.equal(response.status, 201);
    const payload = await response.json();
    assert.equal(payload.data.id, 7);
    assert.equal(payload.message, 'Category created.');
  });
});

describe('SPA serving', () => {
  test('returns a clear pre-build response when client dist is absent', async () => {
    const response = await request('/categories/new');
    assert.ok([200, 503].includes(response.status));
    const text = await response.text();
    assert.ok(text.includes('React') || text.includes('<div id="root"></div>'));
  });
});
