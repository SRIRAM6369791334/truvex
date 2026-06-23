function requireApiAuth(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ error: 'Authentication required.' });
}

module.exports = { requireApiAuth };
