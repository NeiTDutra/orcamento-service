const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../controllers/authController');
const index_controller = require('../controllers/indexController');

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

router.get('/contato', auth.csrfProtection, index_controller.contato_get);

router.post('/contato', auth.csrfProtection, index_controller.contato_post);

module.exports = router;
