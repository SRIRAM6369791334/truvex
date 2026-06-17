require('dotenv').config();

const { createApp } = require('./app');

const port = Number(process.env.PORT || 5001);
const app = createApp();

app.listen(port, () => {
  console.log(`Truvex API listening on http://localhost:${port}`);
});
