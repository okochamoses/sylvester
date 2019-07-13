const router = require("express").Router();
const customerService = require("./service");
const passport = require("./authenticate");

const authenticate = passport.authenticate("customer", { session: false });

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);
router.post("/password/reset", customerService.resetPassword);
router.post("/password/change", authenticate, customerService.changePassword);
router.post("/authenticate", customerService.authenticate);

module.exports = router;
