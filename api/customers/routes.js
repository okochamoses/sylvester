const router = require("express").Router();
const customerService = require("./customerService");

router.post("/", customerService.registerCustomer);

module.exports = router;
