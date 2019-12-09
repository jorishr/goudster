var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ons-verhaal', function(req, res, next) {
  res.render('history', { title: 'Express' });
});

router.get('/info', function(req, res, next) {
  res.render('info', { title: 'Express' });
});

router.get('/waar-proeven', function(req, res, next) {
  res.render('location', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

module.exports = router;
