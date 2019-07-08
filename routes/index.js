const router = require("express").Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Sylvester's App");
});

module.exports = router;
