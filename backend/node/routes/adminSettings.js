const fs = require('fs');
const path = require('path');
const express = require('express');
const { upload } = require('../middleware/upload');
const { queryRows, queryResult } = require('../utils/db');
const { requireSession } = require('../middleware/auth');

const router = express.Router();

async function getSettings(db) {
  const rows = await queryRows(db, 'SELECT `key`, `value` FROM settings');
  const settings = {};
  rows.forEach((row) => {
    try {
      settings[row.key] = (row.value.startsWith('[') || row.value.startsWith('{')) ? JSON.parse(row.value) : row.value;
    } catch (e) { settings[row.key] = row.value; }
  });
  return settings;
}

router.get('/', async (req, res, next) => {
  try {
    const settings = await getSettings(req.app.locals.db);
    res.json({ data: settings });
  } catch (error) { next(error); }
});

router.post('/banner', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Please upload an image file.' });

    const db = req.app.locals.db;
    const settings = await getSettings(db);
    const bannerImages = Array.isArray(settings.homepage_banner_images) ? settings.homepage_banner_images : [];

    if (bannerImages.length >= 3) {
      return res.status(400).json({ error: 'Maximum 3 banners allowed. Please remove an old banner before adding a new one.' });
    }

    bannerImages.push(`/uploads/${req.file.filename}`);
    await queryResult(db, 'UPDATE settings SET value = ? WHERE `key` = ?', [JSON.stringify(bannerImages), 'homepage_banner_images']);

    const updatedSettings = await getSettings(db);
    res.json({ data: updatedSettings, message: 'Banner image added successfully.' });
  } catch (error) { next(error); }
});

router.post('/banner/delete', async (req, res, next) => {
  try {
    const { imagePath } = req.body;
    if (!imagePath) return res.status(400).json({ error: 'imagePath is required.' });

    const db = req.app.locals.db;
    const settings = await getSettings(db);
    let bannerImages = Array.isArray(settings.homepage_banner_images) ? settings.homepage_banner_images : [];

    if (!bannerImages.includes(imagePath)) return res.status(404).json({ error: 'Banner image not found.' });

    bannerImages = bannerImages.filter((img) => img !== imagePath);
    await queryResult(db, 'UPDATE settings SET value = ? WHERE `key` = ?', [JSON.stringify(bannerImages), 'homepage_banner_images']);

    if (imagePath.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', 'uploads', path.basename(imagePath));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    const updatedSettings = await getSettings(db);
    res.json({ data: updatedSettings, message: 'Banner image removed successfully.' });
  } catch (error) { next(error); }
});

module.exports = router;
