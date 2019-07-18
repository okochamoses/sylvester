const superAdminGuard = (req, res, next) => {
  if (req.user.accessLevel !== "super-admin") {
    return res.json({ code: 30, message: "You don't have permission to view this page" });
  }
  return next();
};

module.exports = { superAdminGuard };
