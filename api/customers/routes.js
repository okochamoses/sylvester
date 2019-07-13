const router = require("express").Router();
const customerService = require("./customerService");

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);
router.post("/password/reset", customerService.resetPassword);

module.exports = router;
