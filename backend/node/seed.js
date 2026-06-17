require('dotenv').config();
const { query, getPool } = require('./config/database');

const MOCK_CATEGORIES = [
  { name: 'Construction Materials', slug: 'construction-materials', description: 'High quality materials for building construction.', trending: true, is_active: true },
  { name: 'Industrial Machinery', slug: 'industrial-machinery', description: 'Heavy machinery and equipment for industrial use.', trending: false, is_active: true },
  { name: 'Textiles & Garments', slug: 'textiles-garments', description: 'Raw textiles and finished garments for wholesale.', trending: true, is_active: true }
];

const MOCK_SERVICES = [
  { title: 'Premium Portland Cement', slug: 'premium-portland-cement', description: '50kg bags of high-grade portland cement.', price: '350', price_unit: 'Bag', category_slug: 'construction-materials', is_active: true },
  { title: 'TMT Steel Rebars (8mm - 32mm)', slug: 'tmt-steel-rebars', description: 'Fe500D grade TMT steel rebars for construction.', price: '60000', price_unit: 'Ton', category_slug: 'construction-materials', is_active: true },
  { title: 'Industrial CNC Lathe Machine', slug: 'industrial-cnc-lathe', description: 'High precision automated CNC lathe for metalworking.', price: '1500000', price_unit: 'Machine', category_slug: 'industrial-machinery', is_active: true },
  { title: 'Raw Cotton Yarn', slug: 'raw-cotton-yarn', description: '100% pure raw cotton yarn for textile manufacturing.', price: '200', price_unit: 'Kg', category_slug: 'textiles-garments', is_active: true }
];

const MOCK_SUBCATEGORIES = [
  { category_slug: 'construction-materials', name: 'Cement & Concrete', slug: 'cement-concrete' },
  { category_slug: 'construction-materials', name: 'TMT Bars', slug: 'tmt-bars' },
  { category_slug: 'construction-materials', name: 'Bricks & Blocks', slug: 'bricks-blocks' },
  { category_slug: 'industrial-machinery', name: 'CNC Machines', slug: 'cnc-machines' },
  { category_slug: 'industrial-machinery', name: 'Packaging Machinery', slug: 'packaging-machinery' },
  { category_slug: 'textiles-garments', name: 'Cotton Yarn', slug: 'cotton-yarn' },
  { category_slug: 'textiles-garments', name: 'Denim Fabrics', slug: 'denim-fabrics' }
];

const MOCK_SUPPLIERS = [
  { company_name: 'BuildTech Materials Pvt Ltd', contact_person: 'Rajesh Kumar', mobile: '9876543210', core_product_segment: 'Cement & Steel', company_details: 'Leading manufacturer of construction materials in South India.', status: 'approved' },
  { company_name: 'Global Machineries Group', contact_person: 'Anita Desai', mobile: '9123456789', core_product_segment: 'CNC Machines', company_details: 'Importer and distributor of heavy industrial machinery.', status: 'approved' },
  { company_name: 'Southern Textiles', contact_person: 'Karthik N', mobile: '9988776655', core_product_segment: 'Cotton Yarn', company_details: 'Wholesale distributor of high-quality cotton yarn.', status: 'pending' }
];

const MOCK_BUYERS = [
  { buyer_name: 'Metro Builders Inc.', phone: '8877665544', address: '123 Main St, Chennai', requirement_details: 'Need 500 tons of Fe500D TMT steel rebars by next month.', status: 'pending' },
  { buyer_name: 'Apex Manufacturing', phone: '7766554433', address: '45 Industrial Estate, Coimbatore', requirement_details: 'Looking for 2 CNC Lathe machines with installation support.', status: 'approved' }
];

async function seed() {
  console.log('Starting database seed (Appending data)...');
  const pool = getPool();

  try {
    // 1. Seed Categories
    console.log('Seeding Categories...');
    const catMap = {}; // slug -> id
    for (const cat of MOCK_CATEGORIES) {
      const [existing] = await query('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
      if (existing.length === 0) {
        const res = await query(
          'INSERT INTO categories (name, slug, description, trending, is_active, sort_order) VALUES (?, ?, ?, ?, ?, 0)',
          [cat.name, cat.slug, cat.description, cat.trending, cat.is_active]
        );
        catMap[cat.slug] = res.insertId;
        console.log(`  Inserted category: ${cat.name}`);
      } else {
        catMap[cat.slug] = existing[0].id;
        console.log(`  Category exists: ${cat.name}`);
      }
    }

    // 1.5 Seed Subcategories
    console.log('Seeding Subcategories...');
    for (const sub of MOCK_SUBCATEGORIES) {
      const category_id = catMap[sub.category_slug];
      if (!category_id) {
        console.log(`  Skipping subcategory ${sub.name} - parent category not found`);
        continue;
      }
      
      const [existing] = await query('SELECT id FROM subcategories WHERE category_id = ? AND slug = ?', [category_id, sub.slug]);
      if (existing.length === 0) {
        await query(
          'INSERT INTO subcategories (category_id, name, slug) VALUES (?, ?, ?)',
          [category_id, sub.name, sub.slug]
        );
        console.log(`  Inserted subcategory: ${sub.name}`);
      } else {
        console.log(`  Subcategory exists: ${sub.name}`);
      }
    }

    // 2. Seed Services
    console.log('Seeding Services...');
    for (const svc of MOCK_SERVICES) {
      const [existing] = await query('SELECT id FROM services WHERE slug = ?', [svc.slug]);
      if (existing.length === 0) {
        const category_id = catMap[svc.category_slug] || null;
        await query(
          'INSERT INTO services (title, slug, description, price, price_unit, category_id, is_active, in_stock, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, true, 0)',
          [svc.title, svc.slug, svc.description, svc.price, svc.price_unit, category_id, svc.is_active]
        );
        console.log(`  Inserted service: ${svc.title}`);
      } else {
        console.log(`  Service exists: ${svc.title}`);
      }
    }

    // 3. Seed Suppliers
    console.log('Seeding Suppliers...');
    for (const sup of MOCK_SUPPLIERS) {
      const [existing] = await query('SELECT id FROM suppliers WHERE company_name = ?', [sup.company_name]);
      if (existing.length === 0) {
        await query(
          'INSERT INTO suppliers (company_name, contact_person, mobile, core_product_segment, company_details, status) VALUES (?, ?, ?, ?, ?, ?)',
          [sup.company_name, sup.contact_person, sup.mobile, sup.core_product_segment, sup.company_details, sup.status]
        );
        console.log(`  Inserted supplier: ${sup.company_name}`);
      } else {
        console.log(`  Supplier exists: ${sup.company_name}`);
      }
    }

    // 4. Seed Buyers
    console.log('Seeding Buyers...');
    for (const buy of MOCK_BUYERS) {
      const [existing] = await query('SELECT id FROM buyers WHERE buyer_name = ?', [buy.buyer_name]);
      if (existing.length === 0) {
        await query(
          'INSERT INTO buyers (buyer_name, phone, address, requirement_details, status) VALUES (?, ?, ?, ?, ?)',
          [buy.buyer_name, buy.phone, buy.address, buy.requirement_details, buy.status || 'pending']
        );
        console.log(`  Inserted buyer: ${buy.buyer_name}`);
      } else {
        console.log(`  Buyer exists: ${buy.buyer_name}`);
      }
    }

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    pool.end();
  }
}

seed();
