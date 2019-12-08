var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ons-verhaal', function(req, res, next) {
  res.render('history', { title: 'Express' });
});

module.exports = router;
