const router = require("express").Router();
const adminService = require("./service");
const passport = require("./authenticate");
const { superAdminGuard } = require("./authGuards");

const authenticate = passport.authenticate("admin", { session: false });

// auth and reg
router.post("/", authenticate, adminService.register);
router.get("/", [authenticate, superAdminGuard], adminService.getAdmins);
router.post("/authenticate", adminService.authenticate);
router.get("/profile", authenticate, adminService.viewProfile);
router.get("/:id/enable", [authenticate, superAdminGuard], adminService.enable);
router.get("/:id/disable", [authenticate, superAdminGuard], adminService.disable);
// TODO: fix prices for requests without username

module.exports = router;
