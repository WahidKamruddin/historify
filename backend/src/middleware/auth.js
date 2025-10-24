// Placeholder authentication middleware
// TODO: Implement authentication later

const requireAuth = (req, res, next) => {
  // For now, just pass through without authentication
  // You can add authentication logic here later
  next();
};

const optionalAuth = (req, res, next) => {
  // This allows routes to work with or without authentication
  next();
};

export { requireAuth, optionalAuth };