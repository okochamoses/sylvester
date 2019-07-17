const superAdminGuard = (req, res, next) => {
  if (req.user.accessRights !== "super-admin") {
    return res.json({ code: 30, message: "You don't have access to view this page" });
  }
  return next();
};

module.exports = { superAdminGuard };
