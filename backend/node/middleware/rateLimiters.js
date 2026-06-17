const rateLimit = require('express-rate-limit');

function numberFromEnv(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function makeLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({ success: false, message });
    },
  });
}

function buildRateLimiters(overrides = {}) {
  return {
    api: makeLimiter({
      windowMs: overrides.apiWindowMs || numberFromEnv('API_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
      max: overrides.apiMax || numberFromEnv('API_RATE_LIMIT_MAX', 300),
      message: 'Too many API requests. Please try again later.',
    }),
    form: makeLimiter({
      windowMs: overrides.formWindowMs || numberFromEnv('FORM_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
      max: overrides.formMax || numberFromEnv('FORM_RATE_LIMIT_MAX', 20),
      message: 'Too many form submissions. Please try again later.',
    }),
    auth: makeLimiter({
      windowMs: overrides.authWindowMs || numberFromEnv('AUTH_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
      max: overrides.authMax || numberFromEnv('AUTH_RATE_LIMIT_MAX', 5),
      message: 'Too many login attempts. Please try again later.',
    }),
  };
}

function useLimiter(name) {
  return (req, res, next) => {
    const limiter = req.app.locals.rateLimiters[name];
    if (!limiter) return next();
    return limiter(req, res, next);
  };
}

module.exports = { buildRateLimiters, useLimiter };
