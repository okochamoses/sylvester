const router = require("express").Router();
const service = require("./serviceImpl");

router.get("/", service.getAll);
router.post("/", service.add);
