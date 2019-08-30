const router = require("express").Router();
const vendorService = require("./service");
const passport = require("./authenticate");

const authenticate = passport.authenticate("vendor", { session: false });

router.get("/", vendorService.getVendors);
router.post("/", vendorService.register);
router.put("/", authenticate, vendorService.update);
router.get("/:id", vendorService.getVendor);
router.post("/authenticate", vendorService.authenticate);
router.post("/password/reset", vendorService.resetPassword);
router.post("/password/change", authenticate, vendorService.changePassword);
router.get("/profile", authenticate, vendorService.profile);
router.post("/address", authenticate, vendorService.addAddress);
router.put("/address", authenticate, vendorService.updateAddress);
router.post("/services/:id", vendorService.getVendorsByService);
router.post("/services/:id/location/:state", vendorService.getVendorsByServiceAndLocation);

module.exports = router;
