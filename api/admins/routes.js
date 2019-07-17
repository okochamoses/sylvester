const router = require("express").Router();
const adminService = require("./service");
// const passport = require("./authenticate");
// const { superAdminGuard } = require("./authGuards");

// const authenticate = passport.authenticate("vendor", { session: false });

// auth and reg
router.post("/", adminService.register);
// router.get("/", authenticate, adminService.getAdmins);
// router.admin("/profile", authenticate, adminService.viewProfile);
// fix prices for
// enable/disable customers and vendors
//

module.exports = router;
