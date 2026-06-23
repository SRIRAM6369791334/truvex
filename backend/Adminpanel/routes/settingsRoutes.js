const fs = require('fs');
const path = require('path');
const express = require('express');
const { upload } = require('../middleware/upload');
const { queryRows, queryResult } = require('../utils/db');

const router = express.Router();

// Helper to get all settings as key-value
async function getSettings(db) {
  const rows = await queryRows(db, 'SELECT `key`, `value` FROM settings');
  const settings = {};
  rows.forEach((row) => {
    try {
      if (row.value.startsWith('[') || row.value.startsWith('{')) {
        settings[row.key] = JSON.parse(row.value);
      } else {
        settings[row.key] = row.value;
      }
    } catch (e) {
      settings[row.key] = row.value;
    }
  });
  return settings;
}

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const settings = await getSettings(db);
    res.json({ data: settings });
  } catch (error) {
    next(error);
  }
});

router.post('/banner', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file.' });
    }

    const db = req.app.locals.db;
    const settings = await getSettings(db);
    const bannerImages = Array.isArray(settings.homepage_banner_images)
      ? settings.homepage_banner_images
      : [];

    if (bannerImages.length >= 3) {
      return res.status(400).json({ error: 'Maximum 3 banners allowed. Please remove an old banner before adding a new one.' });
    }

    const newImagePath = `/uploads/${req.file.filename}`;
    bannerImages.push(newImagePath);

    await queryResult(
      db,
      'UPDATE settings SET value = ? WHERE `key` = ?',
      [JSON.stringify(bannerImages), 'homepage_banner_images']
    );

    const updatedSettings = await getSettings(db);
    res.json({ data: updatedSettings, message: 'Banner image added successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/banner/delete', async (req, res, next) => {
  try {
    const { imagePath } = req.body;
    if (!imagePath) {
      return res.status(400).json({ error: 'imagePath is required.' });
    }

    const db = req.app.locals.db;
    const settings = await getSettings(db);
    let bannerImages = Array.isArray(settings.homepage_banner_images)
      ? settings.homepage_banner_images
      : [];

    if (!bannerImages.includes(imagePath)) {
      return res.status(404).json({ error: 'Banner image not found.' });
    }

    bannerImages = bannerImages.filter((img) => img !== imagePath);

    await queryResult(
      db,
      'UPDATE settings SET value = ? WHERE `key` = ?',
      [JSON.stringify(bannerImages), 'homepage_banner_images']
    );

    // Delete the file from the disk if it is local
    if (imagePath.startsWith('/uploads/')) {
      const filename = path.basename(imagePath);
      const filePath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updatedSettings = await getSettings(db);
    res.json({ data: updatedSettings, message: 'Banner image removed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
