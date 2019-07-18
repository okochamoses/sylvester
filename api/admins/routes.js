const router = require("express").Router();
const adminService = require("./service");
const passport = require("./authenticate");
const { superAdminGuard } = require("./authGuards");

const authenticate = passport.authenticate("admin", { session: false });

// auth and reg
router.post("/", authenticate, adminService.register);
router.get("/", [authenticate, superAdminGuard], adminService.getAdmins);
router.post("/authenticate", adminService.authenticate);
// router.admin("/profile", authenticate, adminService.viewProfile);
// fix prices for
// enable/disable customers and vendors
//

module.exports = router;
