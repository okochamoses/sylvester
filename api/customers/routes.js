const router = require("express").Router();
const customerService = require("./customerService");

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);

module.exports = router;
