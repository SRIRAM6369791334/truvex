require('dotenv').config();
const { query, getPool } = require('./config/database');
const fs = require('fs');
const path = require('path');
const https = require('https');

const UPLOADS_DIR = path.join(__dirname, '..', 'Adminpanel', 'uploads');

async function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(UPLOADS_DIR, filename);
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(`/uploads/${filename}`);
          });
        }).on('error', (err) => {
          fs.unlink(filePath, () => reject(err));
        });
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(`/uploads/${filename}`);
        });
      } else {
        file.close();
        fs.unlink(filePath, () => reject(new Error(`Failed to download image: ${response.statusCode}`)));
      }
    });
    
    request.on('error', (err) => {
      fs.unlink(filePath, () => reject(err));
    });
  });
}

function generateSlug(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
}

const DATA = [
  {
    cat: { name: 'Construction Materials', desc: 'High-quality raw materials for building and infrastructure development.', icon: 'Building', img: 'https://picsum.photos/seed/construction/600/400' },
    sub: { name: 'Cement & Concrete', desc: 'Various grades of cement and ready-mix concrete for all structural needs.', img: 'https://picsum.photos/seed/cement/600/400' },
    srv: { title: 'Premium Grade 53 Portland Cement', desc: 'Top quality 53 grade cement for fast setting and high strength construction.', price: 380, img: 'https://picsum.photos/seed/concrete/600/400' }
  },
  {
    cat: { name: 'Industrial Machinery', desc: 'Heavy-duty manufacturing and processing equipment for factories.', icon: 'Factory', img: 'https://picsum.photos/seed/machinery/600/400' },
    sub: { name: 'CNC & Lathe Machines', desc: 'Precision automated metalworking and turning machinery.', img: 'https://picsum.photos/seed/cnc/600/400' },
    srv: { title: '5-Axis CNC Milling Machine', desc: 'Advanced 5-axis CNC router for complex aerospace and automotive parts.', price: 1250000, img: 'https://picsum.photos/seed/lathe/600/400' }
  },
  {
    cat: { name: 'Packaging & Materials', desc: 'Corrugated boxes, plastics, and eco-friendly packaging solutions.', icon: 'Package', img: 'https://picsum.photos/seed/packaging/600/400' },
    sub: { name: 'Corrugated Boxes', desc: 'Durable multi-layer cardboard boxes for safe shipping and storage.', img: 'https://picsum.photos/seed/box/600/400' },
    srv: { title: 'Heavy Duty Shipping Cartons', desc: '3-ply and 5-ply corrugated cartons suitable for e-commerce and logistics.', price: 25, img: 'https://picsum.photos/seed/carton/600/400' }
  },
  {
    cat: { name: 'Electrical & Panels', desc: 'Industrial electrical supplies, switchgears, and control panels.', icon: 'Zap', img: 'https://picsum.photos/seed/electrical/600/400' },
    sub: { name: 'Industrial Switchgears', desc: 'Low and medium voltage switchgear assemblies for power distribution.', img: 'https://picsum.photos/seed/switchgear/600/400' },
    srv: { title: '3-Phase Motor Control Center (MCC)', desc: 'Custom built MCC panels with overload protection and remote monitoring.', price: 45000, img: 'https://picsum.photos/seed/panel/600/400' }
  },
  {
    cat: { name: 'Safety Equipment', desc: 'Personal Protective Equipment (PPE) and industrial safety gear.', icon: 'Shield', img: 'https://picsum.photos/seed/safety/600/400' },
    sub: { name: 'Safety Footwear', desc: 'Steel-toe boots and slip-resistant shoes for factory environments.', img: 'https://picsum.photos/seed/boots/600/400' },
    srv: { title: 'Industrial Steel-Toe Safety Boots', desc: 'High-ankle leather safety boots with anti-slip rubber soles and impact resistance.', price: 1200, img: 'https://picsum.photos/seed/shoes/600/400' }
  },
  {
    cat: { name: 'Chemicals & Adhesives', desc: 'Industrial chemicals, solvents, and heavy-duty adhesives.', icon: 'Flask', img: 'https://picsum.photos/seed/chemical/600/400' },
    sub: { name: 'Industrial Adhesives', desc: 'Epoxy resins, cyanoacrylates, and structural bonding agents.', img: 'https://picsum.photos/seed/adhesive/600/400' },
    srv: { title: 'High-Strength Epoxy Resin 50kg', desc: 'Two-part industrial epoxy adhesive for metal, concrete, and plastic bonding.', price: 8500, img: 'https://picsum.photos/seed/epoxy/600/400' }
  },
  {
    cat: { name: 'Textiles & Garments', desc: 'Bulk fabrics, yarns, and ready-made wholesale apparel.', icon: 'Scissors', img: 'https://picsum.photos/seed/textile/600/400' },
    sub: { name: 'Cotton Yarns', desc: '100% pure organic cotton yarns for weaving and knitting.', img: 'https://picsum.photos/seed/yarn/600/400' },
    srv: { title: 'Combed Cotton Yarn (30s/40s)', desc: 'Premium ring-spun combed cotton yarn suitable for high-end garment manufacturing.', price: 280, img: 'https://picsum.photos/seed/cotton/600/400' }
  },
  {
    cat: { name: 'Tools & Hardware', desc: 'Hand tools, power tools, and industrial hardware supplies.', icon: 'Wrench', img: 'https://picsum.photos/seed/tools/600/400' },
    sub: { name: 'Power Tools', desc: 'Drills, grinders, and saws for professional and industrial use.', img: 'https://picsum.photos/seed/drill/600/400' },
    srv: { title: 'Heavy Duty Angle Grinder 850W', desc: 'Professional grade 4-inch angle grinder with dust protection for metal cutting.', price: 2400, img: 'https://picsum.photos/seed/grinder/600/400' }
  },
  {
    cat: { name: 'Agricultural Equipment', desc: 'Tractors, implements, and farming automation tools.', icon: 'Tractor', img: 'https://picsum.photos/seed/agriculture/600/400' },
    sub: { name: 'Irrigation Systems', desc: 'Drip irrigation pipes, sprinklers, and water management solutions.', img: 'https://picsum.photos/seed/irrigation/600/400' },
    srv: { title: 'Drip Irrigation Pipe Roll 100m', desc: 'UV resistant 16mm cylindrical drip irrigation lateral pipe for farming.', price: 1500, img: 'https://picsum.photos/seed/pipe/600/400' }
  },
  {
    cat: { name: 'Office Supplies & IT', desc: 'Bulk office stationery, furniture, and IT infrastructure.', icon: 'Monitor', img: 'https://picsum.photos/seed/office/600/400' },
    sub: { name: 'Office Furniture', desc: 'Ergonomic chairs, workstations, and conference tables.', img: 'https://picsum.photos/seed/desk/600/400' },
    srv: { title: 'Ergonomic Mesh Office Chair', desc: 'Adjustable lumbar support office chair with breathable mesh and 3D armrests.', price: 6500, img: 'https://picsum.photos/seed/chair/600/400' }
  }
];

async function seed() {
  console.log('Starting PROPER database seed for 10 realistic B2B records with images...');
  
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const pool = getPool();

  try {
    for (let i = 0; i < DATA.length; i++) {
      const item = DATA[i];
      console.log(`\n--- Generating set ${i + 1} of 10: ${item.cat.name} ---`);

      // 1. Category
      const catSlug = generateSlug(item.cat.name);
      console.log(`Downloading category image...`);
      const catImage = await downloadImage(`cat_${Date.now()}_${i}.jpg`, item.cat.img);
      
      const [catRes] = await query(
        `INSERT INTO categories 
         (name, slug, description, image, icon_name, tags, trending, is_active, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.cat.name, 
          catSlug, 
          item.cat.desc, 
          catImage, 
          item.cat.icon, 
          JSON.stringify([item.cat.name.split(' ')[0].toLowerCase(), 'b2b', 'wholesale']), 
          i < 4 ? 1 : 0, 
          1, 
          i + 1
        ]
      );
      const categoryId = catRes.insertId;
      console.log(`Inserted Category: ${item.cat.name}`);

      // 2. Subcategory
      const subSlug = generateSlug(item.sub.name);
      console.log(`Downloading subcategory image...`);
      const subImage = await downloadImage(`sub_${Date.now()}_${i}.jpg`, item.sub.img);

      const [subRes] = await query(
        `INSERT INTO subcategories 
         (category_id, name, slug, description, image, is_active, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          categoryId,
          item.sub.name,
          subSlug,
          item.sub.desc,
          subImage,
          1,
          i + 1
        ]
      );
      const subcategoryId = subRes.insertId;
      console.log(`Inserted Subcategory: ${item.sub.name}`);

      // 3. Service
      const srvSlug = generateSlug(item.srv.title);
      console.log(`Downloading service image...`);
      const srvImage = await downloadImage(`srv_${Date.now()}_${i}.jpg`, item.srv.img);

      const [srvRes] = await query(
        `INSERT INTO services 
         (title, slug, description, long_description, price, price_unit, in_stock, icon_name,
          image, images, features, benefits, process_steps, stats, specs, delivery_info, moq,
          category_id, subcategory_id, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.srv.title,
          srvSlug,
          item.srv.desc,
          `<p>This is a premium B2B product sourced from verified manufacturers. <strong>${item.srv.title}</strong> offers exceptional durability and performance for industrial applications. Our strict quality control ensures every batch meets international standards.</p><p>We offer bulk discounts and customizable packaging options. Contact us today for a detailed quotation and lead times.</p>`,
          item.srv.price,
          'Piece/Unit',
          1,
          'Box',
          srvImage,
          JSON.stringify([srvImage]),
          JSON.stringify(['ISO 9001 Certified', 'Tested for durability', 'Wholesale Pricing']),
          JSON.stringify(['Low Maintenance', 'Long Service Life', 'Cost-effective']),
          JSON.stringify([{ title: 'Order Placed', description: 'Immediate processing' }, { title: 'Dispatch', description: 'Quality check and dispatch within 48h' }]),
          JSON.stringify([{ label: 'Satisfaction', value: '98%' }, { label: 'In Stock', value: 'Yes' }]),
          JSON.stringify({ 'Material': 'Industrial Grade', 'Origin': 'India' }),
          'Dispatch within 48-72 hours. Pan-India delivery available.',
          10,
          categoryId,
          subcategoryId,
          1,
          i + 1
        ]
      );
      console.log(`Inserted Service Product: ${item.srv.title}`);
    }

    console.log('\n✅ PROPER Data seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    pool.end();
  }
}

seed();
