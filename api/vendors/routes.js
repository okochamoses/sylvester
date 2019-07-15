const router = require("express").Router();
const vendorService = require("./service");
const passport = require("./authenticate");

const authenticate = passport.authenticate("vendor", { session: false });

router.get("/", vendorService.getVendors);
router.post("/", vendorService.register);
router.put("/", authenticate, vendorService.update);
router.post("/authenticate", vendorService.authenticate);
router.post("/password/reset", vendorService.resetPassword);
router.post("/password/change", authenticate, vendorService.changePassword);
router.post("/address", authenticate, vendorService.addAddress);
router.put("/address", authenticate, vendorService.updateAddress);

module.exports = router;