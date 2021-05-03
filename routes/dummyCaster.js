var express = require('express');
var router = express.Router();
const { createSportscasters } = require("../mockData/sportsCaster");

/* GET dummyCaster listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(createSportscasters()));
});

module.exports = router;
