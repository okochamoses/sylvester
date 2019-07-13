const router = require("express").Router();
const customerService = require("./customerService");

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);
router.post("/password/reset", customerService.resetPassword);
router.post("/password/change", customerService.changePassword);

module.exports = router;
