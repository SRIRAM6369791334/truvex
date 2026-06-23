require('dotenv').config();

const { createApp } = require('./app');

const port = Number(process.env.PORT || 5000);
const host = process.env.HOST || '0.0.0.0';
const app = createApp();

app.listen(port, host, () => {
  console.log(`Truvex Admin Panel listening on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
});
