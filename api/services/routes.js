const router = require("express").Router();
const service = require("./serviceImpl");
const passportAdmin = require("../admins/authenticate");
const { superAdminGuard } = require("../admins/authGuards");

const adminAuth = passportAdmin.authenticate("admin", { session: false });

router.get("/", service.getByRange);
router.post("/", [adminAuth, superAdminGuard], service.add); // TODO: Add admin auth guard to route
router.post("/:serviceid/subservices", [adminAuth, superAdminGuard], service.addSubService);
router.delete("/:serviceid/subservices/:id", [adminAuth, superAdminGuard], service.deleteSubService);

module.exports = router;
