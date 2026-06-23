const mysql = require('mysql2/promise');
async function run() {
  const conn = await mysql.createConnection({host: 'localhost', user: 'root', database: 'truvex_sourcing'});
  const [rows] = await conn.query("SELECT id, specs FROM services");
  for (const row of rows) {
    if (row.specs && row.specs.startsWith('[')) {
      try {
        const parsed = JSON.parse(row.specs);
        if (Array.isArray(parsed)) {
          const obj = {};
          parsed.forEach(p => {
            if (p.label && p.value) obj[p.label] = p.value;
          });
          await conn.query('UPDATE services SET specs = ? WHERE id = ?', [JSON.stringify(obj), row.id]);
          console.log('Updated specs for', row.id);
        }
      } catch(e) {}
    }
  }
  conn.end();
}
run();
