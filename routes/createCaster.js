var express = require("express");
var router = express.Router();
const { createSportscasters } = require("../mockData/sportsCaster");

/* GET dummyCaster listing. */
router.post("/", function (req, res, next) {
  const body = req.body;
  createSportscasters(body);
  res.send("<p>yeahboy</p>");
});

module.exports = router;
