const slugify = require('slugify');

function slugFrom(value) {
  return slugify(value || '', { lower: true, strict: true, trim: true });
}

function toBoolean(value) {
  return value === true || value === 'true' || value === 'on' || value === '1' || value === 1;
}

function numberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function integerOrDefault(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function linesToJson(value) {
  if (!value) return JSON.stringify([]);
  return JSON.stringify(String(value).split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
}

function jsonTextarea(value) {
  if (!value) return JSON.stringify([]);

  try {
    return JSON.stringify(JSON.parse(value));
  } catch (_error) {
    return linesToJson(value);
  }
}

function jsonToTextarea(value) {
  if (Array.isArray(value)) return value.join('\n');
  if (value && typeof value === 'object') return JSON.stringify(value, null, 2);
  return '';
}

module.exports = {
  slugFrom,
  toBoolean,
  numberOrNull,
  integerOrDefault,
  linesToJson,
  jsonTextarea,
  jsonToTextarea,
};
