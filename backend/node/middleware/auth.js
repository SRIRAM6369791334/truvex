const jwt = require('jsonwebtoken');
const { fail } = require('../utils/apiResponse');

const ADMIN_ROLES = ['super_admin', 'admin', 'moderator'];

function authenticateJwt(req, res, next) {
  const header = req.get('authorization') || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return fail(res, 401, 'Admin authentication required');
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'development-only-change-me');
    return next();
  } catch (_error) {
    return fail(res, 401, 'Invalid or expired admin token');
  }
}

function requireRole(roles = ADMIN_ROLES) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return fail(res, 403, 'Insufficient admin permissions');
    }

    return next();
  };
}

const requireAdmin = [authenticateJwt, requireRole()];

module.exports = { ADMIN_ROLES, authenticateJwt, requireRole, requireAdmin };
