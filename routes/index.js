var express = require('express');
var router = express.Router();

var logReader = require('./log/readFile');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/', logReader);

module.exports = router;
