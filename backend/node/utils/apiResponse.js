function ok(res, data = null, message = 'OK') {
  return res.json({ success: true, message, data });
}

function created(res, data = null, message = 'Created') {
  return res.status(201).json({ success: true, message, data });
}

function fail(res, statusCode, message, errors) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}

module.exports = { ok, created, fail };
