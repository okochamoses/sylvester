const router = require("express").Router();
const service = require("./serviceImpl");

router.get("/", service.getByRange);
router.post("/", service.add); // TODO: Add admin auth guard to route

module.exports = router;
