const express = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const { ok } = require('../utils/apiResponse');
const { queryRows } = require('../utils/db');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
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

  return ok(res, settings, 'Settings fetched successfully');
}));

module.exports = router;
