const { describe, test, before, after } = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createApp } = require('../app');

const mockHashedPassword = bcrypt.hashSync('admin123', 10);

const mockDb = {
  async query(sql, params = []) {
    const normalizedSql = sql.replace(/\s+/g, ' ').trim().toLowerCase();

    // 1. Auth/Login Query
    if (normalizedSql.includes('select id, name, email, password, role from admin_users')) {
      const email = String(params[0] || '').trim().toLowerCase();
      if (email !== 'admin@truvex.com') {
        return [[]];
      }
      return [[{
        id: 1,
        name: 'Admin User',
        email: 'admin@truvex.com',
        password: mockHashedPassword,
        role: 'admin',
        is_active: 1
      }]];
    }

    // 2. Auth/Login Last Login Update
    if (normalizedSql.includes('update admin_users set last_login')) {
      return [{ affectedRows: 1 }];
    }

    // 3. Stats Queries (Count queries for Dashboard & List Counts)
    if (normalizedSql.startsWith('select count(*)')) {
      return [[{ total: 5 }]];
    }

    // 4. Dashboard Recent Items aliased queries
    if (normalizedSql.includes("select id, buyer_name as title, phone as meta, status, created_at, 'buyers' as resource")) {
      return [[
        { id: 1, title: 'Test Buyer', meta: '1234567890', status: 'new', created_at: new Date().toISOString(), resource: 'buyers' }
      ]];
    }
    if (normalizedSql.includes("select id, company_name as title, core_product_segment as meta, status, created_at, 'suppliers' as resource")) {
      return [[
        { id: 1, title: 'Test Supplier', meta: 'Widgets', status: 'approved', created_at: new Date().toISOString(), resource: 'suppliers' }
      ]];
    }
    if (normalizedSql.includes("select id, full_name as title, inquiry_type as meta, status, created_at, 'contacts' as resource")) {
      return [[
        { id: 1, title: 'Contact User', meta: 'General', status: 'new', created_at: new Date().toISOString(), resource: 'contacts' }
      ]];
    }

    // 5. Categories & Subcategories
    if (normalizedSql.includes('from categories') && normalizedSql.includes('supplier_count')) {
      return [[
        { id: 1, name: 'Test Category', slug: 'test-category', description: 'Test category desc', image: 'category.jpg', icon_name: 'folder', tags: '["tag1", "tag2"]', trending: 1, is_active: 1, sort_order: 1, supplier_count: 5 }
      ]];
    }
    if (normalizedSql.includes('from subcategories')) {
      return [[
        { id: 1, category_id: 1, name: 'Test Subcategory', slug: 'test-subcategory', description: 'Subcategory desc', image: 'sub.jpg', is_active: 1, sort_order: 1 }
      ]];
    }

    // 6. Services query
    if (normalizedSql.includes('from services s left join categories c')) {
      return [[
        { id: 1, title: 'Test Service', slug: 'test-service', description: 'Test description', long_description: 'Long description', price: 99.99, price_unit: 'Piece', in_stock: 1, icon_name: 'cog', image: 'service.jpg', images: '[]', features: '[]', benefits: '[]', process_steps: '[]', stats: '[]', specs: '[]', delivery_info: 'Shipped in 3 days', moq: 1, category_id: 1, category_name: 'Test Category', is_active: 1, sort_order: 1 }
      ]];
    }
    if (normalizedSql.includes('from services') && normalizedSql.includes('where id = ?')) {
      return [[
        { id: 1, title: 'Test Service', slug: 'test-service', description: 'Test description', long_description: 'Long description', price: 99.99, price_unit: 'Piece', in_stock: 1, icon_name: 'cog', image: 'service.jpg', images: '[]', features: '[]', benefits: '[]', process_steps: '[]', stats: '[]', specs: '[]', delivery_info: 'Shipped in 3 days', moq: 1, category_id: 1, category_name: 'Test Category', is_active: 1, sort_order: 1 }
      ]];
    }

    // 7. Submissions queries (list pages)
    if (normalizedSql.includes('from buyers')) {
      return [[
        { id: 1, buyer_name: 'Test Buyer', phone: '1234567890', estimated_budget: '10000', status: 'new', created_at: new Date().toISOString(), requirement_details: 'Need 100 units of widgets', address: '123 Test St', admin_notes: 'Some notes' },
        { id: 2, buyer_name: 'Completed Buyer', phone: '1234567890', estimated_budget: '5000', status: 'completed', created_at: new Date().toISOString(), requirement_details: 'Finished reqs', address: '456 Done Rd', admin_notes: 'All good' },
        { id: 3, buyer_name: 'Rejected Buyer', phone: '1234567890', estimated_budget: '2000', status: 'rejected', created_at: new Date().toISOString(), requirement_details: 'Bad reqs', address: '789 Bad Ln', admin_notes: 'Spam' }
      ]];
    }
    if (normalizedSql.includes('from suppliers')) {
      return [[
        { id: 1, company_name: 'Test Supplier', contact_person: 'Supplier Joe', mobile: '0987654321', email: 'supplier@test.com', category_id: 1, category_name: 'Test Category', core_product_segment: 'Widgets', status: 'approved', company_details: 'We make widgets', factory_images: '[]', admin_notes: 'Good supplier' }
      ]];
    }
    if (normalizedSql.includes('from contacts')) {
      return [[
        { id: 1, full_name: 'Contact User', email: 'contact@test.com', phone: '5551234', inquiry_type: 'General', status: 'new', message: 'Hello, need help', admin_notes: 'Replied' }
      ]];
    }
    if (normalizedSql.includes('from rfq_requests')) {
      return [[
        { id: 1, product_name: 'Widget RFQ', quantity: 50, delivery_city: 'New York', mobile: '5554321', status: 'new', specifications: 'Custom specs', admin_notes: 'In progress' }
      ]];
    }
    if (normalizedSql.includes('from enquiries')) {
      return [[
        { id: 1, product_service: 'Consulting', quantity_budget: '1000$', mobile: '5550000', source_page: '/services', status: 'new', requirement_details: 'Need consulting services' }
      ]];
    }
    if (normalizedSql.includes('from service_leads')) {
      return [[
        { id: 1, service_title: 'Web Dev', full_name: 'Lead User', mobile: '5551111', email: 'lead@test.com', requirement_details: 'Build a website', quantity: 1, unit: 'Project', delivery_pincode: '10001', status: 'new' }
      ]];
    }
    if (normalizedSql.includes('from callback_requests')) {
      return [[
        { id: 1, name: 'Callback User', phone: '5552222', preferred_time: 'Afternoon', topic: 'Billing', status: 'new' }
      ]];
    }
    if (normalizedSql.includes('from newsletters')) {
      return [[
        { id: 1, email: 'newsletter@test.com', is_active: 1, subscribed_at: new Date().toISOString(), unsubscribed_at: null }
      ]];
    }

    // Default SELECT fallback
    if (normalizedSql.startsWith('select')) {
      return [[]];
    }

    // Default INSERT/UPDATE/DELETE fallback
    return [{ affectedRows: 1, insertId: 1 }];
  }
};

let app;
let server;
let port;
let adminCookie;

before(async () => {
  app = createApp({ db: mockDb });
  server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  port = server.address().port;

  // Log in to get the session cookie
  const loginRes = await fetch(`http://localhost:${port}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email: 'admin@truvex.com', password: 'admin123' }),
    redirect: 'manual'
  });
  adminCookie = loginRes.headers.get('set-cookie');
});

after(() => {
  if (server) {
    server.close();
  }
});

// Helper functions for WCAG Contrast check
function extractVar(css, varName) {
  const regex = new RegExp(`${varName}\\s*:\\s*([^;\\s\\n]+)`);
  const match = regex.exec(css);
  return match ? match[1].trim() : null;
}

function getLuminance(hex) {
  let cleanHex = hex.trim().replace('#', '');
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return 0; // fallback default for invalid hex/non-hex colors
  }
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe('Tier 1: Feature Coverage (Happy Paths)', () => {
  const AUTH_ROUTES = [
    { path: '/', title: 'Dashboard' },
    { path: '/submissions/buyers', title: 'Buyer Requirements' },
    { path: '/submissions/suppliers', title: 'Suppliers' },
    { path: '/submissions/contacts', title: 'Contact Messages' },
    { path: '/submissions/rfq', title: 'RFQ Requests' },
    { path: '/submissions/enquiries', title: 'Quick Enquiries' },
    { path: '/submissions/service-leads', title: 'Service Leads' },
    { path: '/submissions/callbacks', title: 'Callback Requests' },
    { path: '/submissions/newsletters', title: 'Newsletter Subscribers' },
    { path: '/services', title: 'Services' },
    { path: '/categories', title: 'Categories' },
  ];

  test('GET /login - unauthenticated', async () => {
    const res = await fetch(`http://localhost:${port}/login`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('Admin Login') || html.includes('Login'), 'Login page must contain "Admin Login" or "Login"');
  });

  test('GET /login - authenticated redirects to /', async () => {
    const res = await fetch(`http://localhost:${port}/login`, {
      headers: { Cookie: adminCookie },
      redirect: 'manual'
    });
    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.headers.get('location'), '/');
  });

  for (const route of AUTH_ROUTES) {
    test(`GET ${route.path} - redirects to /login if unauthenticated`, async () => {
      const res = await fetch(`http://localhost:${port}${route.path}`, { redirect: 'manual' });
      assert.strictEqual(res.status, 302);
      assert.ok(res.headers.get('location').includes('/login'));
    });

    test(`GET ${route.path} - returns 200 and renders successfully when authenticated`, async () => {
      const res = await fetch(`http://localhost:${port}${route.path}`, {
        headers: { Cookie: adminCookie }
      });
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      assert.ok(html.includes(route.title), `Page for ${route.path} should contain title/header "${route.title}"`);
    });
  }
});

describe('Tier 2: Boundary & Styling Details', () => {
  test('Verify static CSS serves and has WCAG contrast-compliant standard custom properties', async () => {
    const res = await fetch(`http://localhost:${port}/public/css/admin.css`);
    assert.strictEqual(res.status, 200);
    const css = await res.text();

    const hasTsPrimary = css.includes('--ts-primary');
    const hasTsNeutral = css.includes('--ts-neutral');
    
    // Assert presence of new redesigned custom properties
    assert.ok(hasTsPrimary, 'CSS should contain --ts-primary custom property');
    assert.ok(hasTsNeutral, 'CSS should contain --ts-neutral custom property');

    const primaryHex = extractVar(css, '--ts-primary') || '#0f766e';
    const neutralHex = extractVar(css, '--ts-neutral') || '#102033';
    const bgHex = extractVar(css, '--ts-bg') || '#ffffff';

    const contrastPrimary = getContrast(primaryHex, bgHex);
    const contrastNeutral = getContrast(neutralHex, bgHex);

    assert.ok(contrastPrimary >= 4.5, `Primary color contrast ratio ${contrastPrimary} is below 4.5:1`);
    assert.ok(contrastNeutral >= 4.5, `Neutral color contrast ratio ${contrastNeutral} is below 4.5:1`);
  });

  test('Verify form views contain inputs with explicit labels', async () => {
    const pagesToCheck = [
      '/services/new',
      '/categories/new',
      '/login'
    ];

    for (const page of pagesToCheck) {
      const isLogin = page === '/login';
      const headers = isLogin ? {} : { Cookie: adminCookie };
      const res = await fetch(`http://localhost:${port}${page}`, { headers });
      assert.strictEqual(res.status, 200);
      const html = await res.text();

      const labelForRegex = /<label\b[^>]*\bfor=["']([^"']+)["']/g;
      let match;
      const labelIds = [];
      while ((match = labelForRegex.exec(html)) !== null) {
        labelIds.push(match[1]);
      }

      assert.ok(labelIds.length > 0, `Form page ${page} should contain at least one label with a "for" attribute`);

      for (const id of labelIds) {
        const idRegex = new RegExp(`id=["']${id}["']`);
        assert.ok(idRegex.test(html), `Form page ${page} has a label for "${id}", but no matching input/element with id="${id}" was found in the markup`);
      }
    }
  });

  test('Verify status badges render semantic coloring classes', async () => {
    const res = await fetch(`http://localhost:${port}/submissions/buyers`, { headers: { Cookie: adminCookie } });
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    const statusElementRegex = /<span\s+class=["']status\s*([^"']*)["'][^>]*>([^<]+)<\/span>/g;
    let match;
    let foundStatusBadge = false;
    while ((match = statusElementRegex.exec(html)) !== null) {
      foundStatusBadge = true;
      const extraClasses = match[1].trim();
      const statusText = match[2].trim();

      // Verify that status badges have color-specific helper classes in the redesign (not just "status")
      assert.ok(extraClasses.length > 0, `Status badge for "${statusText}" should have semantic color class, but found only "status"`);

      if (statusText === 'completed') {
        assert.ok(
          extraClasses.includes('green') || extraClasses.includes('success') || extraClasses.includes('completed'),
          `Completed status should map to a green/success class: found "${extraClasses}"`
        );
      } else if (statusText === 'rejected') {
        assert.ok(
          extraClasses.includes('red') || extraClasses.includes('danger') || extraClasses.includes('rejected'),
          `Rejected status should map to a red/danger class: found "${extraClasses}"`
        );
      }
    }
    assert.ok(foundStatusBadge, 'Should have found at least one status badge in the list');
  });
});

describe('Tier 3: Cross-Feature & Interactive Logic', () => {
  test('Verify client JS search logic in public/js/admin.js avoids matching action button text', () => {
    const jsPath = path.join(__dirname, '../public/js/admin.js');
    const code = fs.readFileSync(jsPath, 'utf8');

    class MockElement {
      constructor(tagName) {
        this.tagName = tagName;
        this.listeners = {};
        this.hidden = false;
        this.value = '';
      }
      addEventListener(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
      }
      dispatchEvent(event) {
        if (this.listeners[event]) {
          this.listeners[event].forEach(cb => cb());
        }
      }
      closest(selector) {
        if (selector === '.panel') return mockPanel;
        return null;
      }
    }

    const mockInput = new MockElement('input');
    const mockTable = new MockElement('table');
    const mockPanel = {
      querySelector(selector) {
        if (selector === 'table[data-searchable]') return mockTable;
        return null;
      }
    };

    const mockRow1 = new MockElement('tr');
    mockRow1.textContent = 'Widget Requirement Open'; // Includes action button text "Open"

    const mockRow2 = new MockElement('tr');
    mockRow2.textContent = 'Gadget Request Edit'; // Includes action button text "Edit"

    const mockRow3 = new MockElement('tr');
    mockRow3.textContent = 'Widget Requirement'; // Row data only, no actions in textContent

    mockTable.querySelectorAll = (selector) => {
      if (selector === 'tbody tr') return [mockRow1, mockRow2, mockRow3];
      return [];
    };

    const mockDocument = {
      querySelectorAll(selector) {
        if (selector === '.table-search') return [mockInput];
        if (selector === '[data-confirm]') return [];
        return [];
      }
    };

    const sandbox = {
      document: mockDocument,
      window: { confirm: () => true },
      console
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);

    // Simulate typing "Open" in search input
    mockInput.value = 'Open';
    mockInput.dispatchEvent('input');

    // The assertion:
    // If the user searches for "Open", it should NOT match row 1 if "Open" is only the action button text.
    // Therefore, mockRow1.hidden should be true.
    assert.strictEqual(
      mockRow1.hidden,
      true,
      'Row 1 should be hidden if search text "Open" only matches the action button text (and not row content)'
    );
  });
});

describe('Tier 4: Real-World Scenarios', () => {
  test('Simulate user login flow, session creation, and redirect', async () => {
    // 1. Request dashboard when not logged in - expect redirect to /login (302)
    const resDashboardUnauth = await fetch(`http://localhost:${port}/`, { redirect: 'manual' });
    assert.strictEqual(resDashboardUnauth.status, 302);
    assert.ok(resDashboardUnauth.headers.get('location').includes('/login'));

    // 2. Request /login page - expect 200
    const resLogin = await fetch(`http://localhost:${port}/login`);
    assert.strictEqual(resLogin.status, 200);
    const loginHtml = await resLogin.text();
    assert.ok(loginHtml.includes('Login') || loginHtml.includes('Admin Login'));

    // 3. POST /login with valid credentials - expect redirect to / (302) and session cookie
    const resPostLogin = await fetch(`http://localhost:${port}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email: 'admin@truvex.com',
        password: 'admin123'
      }),
      redirect: 'manual'
    });

    assert.strictEqual(resPostLogin.status, 302);
    assert.strictEqual(resPostLogin.headers.get('location'), '/');

    const cookie = resPostLogin.headers.get('set-cookie');
    assert.ok(cookie, 'Response should set session cookie');

    // 4. Request dashboard using the session cookie - expect 200
    const resDashboardAuth = await fetch(`http://localhost:${port}/`, {
      headers: {
        Cookie: cookie
      }
    });
    assert.strictEqual(resDashboardAuth.status, 200);
    const dashboardHtml = await resDashboardAuth.text();
    assert.ok(dashboardHtml.includes('Dashboard'), 'Dashboard page should contain "Dashboard" title/header');
  });

  test('Simulate navigation and layout constraints on mobile via CSS media queries', async () => {
    const res = await fetch(`http://localhost:${port}/public/css/admin.css`);
    assert.strictEqual(res.status, 200);
    const css = await res.text();

    const mediaQueryRegex = /@media\s*\(\s*max-width\s*:\s*(\d+)px\s*\)\s*\{([^}]+(\{[^}]*\}[^}]+)*)\}/g;
    let match;
    let foundMobileMediaQuery = false;
    while ((match = mediaQueryRegex.exec(css)) !== null) {
      const maxWidth = parseInt(match[1]);
      const rules = match[2];

      if (maxWidth <= 980) {
        foundMobileMediaQuery = true;

        // Verify that sidebar is modified/collapsed under mobile view
        assert.ok(rules.includes('.sidebar'), 'Media query should modify .sidebar styling on mobile');
        assert.ok(rules.includes('width') || rules.includes('position'), 'Sidebar should have layout changes on mobile');

        // Verify that navigation or grid is collapsed dynamically (e.g. grid-template-columns: 1fr)
        assert.ok(rules.includes('.nav'), 'Media query should modify navigation layout on mobile');
      }
    }
    assert.ok(foundMobileMediaQuery, 'Should contain a mobile media query (max-width <= 980px) to collapse layouts');
  });
});
