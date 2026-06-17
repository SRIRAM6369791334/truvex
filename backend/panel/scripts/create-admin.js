require('dotenv').config();

const bcrypt = require('bcryptjs');
const database = require('../config/database');

async function main() {
  const name = process.env.DEFAULT_ADMIN_NAME || 'Truvex Admin';
  const email = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@truvex.in').trim().toLowerCase();
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'TruvexAdmin@2024';

  if (!password || password.length < 12) {
    throw new Error('DEFAULT_ADMIN_PASSWORD must be at least 12 characters.');
  }

  const [existing] = await database.query('SELECT id FROM admin_users WHERE email = ? LIMIT 1', [email]);

  if (existing.length) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await database.query(
    `INSERT INTO admin_users (name, email, password, role, is_active)
     VALUES (?, ?, ?, 'super_admin', true)`,
    [name, email, passwordHash],
  );

  console.log(`Created admin user: ${email}`);
  console.log('Change this password after first login.');
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    const pool = database.getPool();
    await pool.end();
  });
