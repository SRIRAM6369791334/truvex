function unwrapRows(result) {
  if (Array.isArray(result) && Array.isArray(result[0])) return result[0];
  return result;
}

function unwrapResult(result) {
  if (Array.isArray(result) && result[0] && !Array.isArray(result[0])) return result[0];
  return result;
}

async function queryRows(db, sql, params = []) {
  return unwrapRows(await db.query(sql, params));
}

async function queryResult(db, sql, params = []) {
  return unwrapResult(await db.query(sql, params));
}

function parseJson(value, fallback) {
  if (value === null || value === undefined || value === '') return fallback;
  if (Array.isArray(value) || typeof value === 'object') return value;

  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

module.exports = { queryRows, queryResult, parseJson };
