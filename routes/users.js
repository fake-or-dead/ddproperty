var express = require('express');
var router = express.Router();

var logReader = require('./log/readFile');
var logTest = require('./log/test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/test', logTest);
router.post('/', logReader);

module.exports = router;
