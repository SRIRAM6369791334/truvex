require('dotenv').config();
const { query, getPool } = require('./config/database');

async function checkDb() {
  const pool = getPool();
  try {
    const [cats] = await query('SELECT * FROM categories');
    console.log('Categories count:', cats.length);
    if (cats.length > 0) console.log('Sample category:', cats[0]);

    const [srvs] = await query('SELECT * FROM services');
    console.log('Services count:', srvs.length);
    if (srvs.length > 0) console.log('Sample service:', srvs[0]);

  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    pool.end();
  }
}

checkDb();
