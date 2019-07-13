const router = require("express").Router();
const customerService = require("./service");

router.post("/", customerService.registerCustomer);
router.get("/", customerService.getCustomers);
router.post("/password/reset", customerService.resetPassword);
router.post("/password/change", customerService.changePassword);
router.post("/authenticate", customerService.authenticate);

module.exports = router;
