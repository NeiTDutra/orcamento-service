var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site_index', { title: 'Página inicial', site: 'N', sitee: 'Servicos' });
});

router.get('/creator', function(req, res, next) {
  res.render('site_creator', { title: 'Creator' });
});

router.get('/manual', function(req, res, next) {
  res.render('site_manual', { title: 'Manual de uso' });
});

router.get('/contato', function(req, res, next) {
  res.render('site_contato', { title: 'Contato' });
});

module.exports = router;
