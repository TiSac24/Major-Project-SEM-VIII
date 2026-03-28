function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

function studentOnly(req, res, next) {
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({ message: 'Student access required' });
  }
  next();
}

module.exports = {
  adminOnly,
  studentOnly,
};

