const router = require("express").Router();
const customerService = require("./service");
const passport = require("./authenticate");

const authenticate = passport.authenticate("customer", { session: false });

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);
router.get("/profile", authenticate, customerService.getProfile);
router.post("/password/reset", customerService.resetPassword);
router.post("/password/change", authenticate, customerService.changePassword);
router.post("/authenticate", customerService.authenticate);
router.put("/", authenticate, customerService.update);
router.post("/address", authenticate, customerService.addAddress);
router.put("/address", authenticate, customerService.updateAddress);

module.exports = router;
