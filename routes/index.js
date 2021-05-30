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

router.get('/manual/geral', function(req, res, next) {
  res.render('manual_visao_geral', { title: 'Manual de uso', title_manual: 'Visão geral' });
});

router.get('/manual/listando', function(req, res, next) {
  res.render('manual_listando_orcamentos', { title: 'Manual de uso', title_manual: 'Listando orçamantos' });
});

router.get('/manual/criando', function(req, res, next) {
  res.render('manual_criando_orcamentos', { title: 'Manual de uso', title_manual: 'Criando orçamantos' });
});

router.get('/manual/imprimindo', function(req, res, next) {
  res.render('manual_imprimindo_orcamentos', { title: 'Manual de uso', title_manual: 'Imprimindo orçamantos' });
});

router.get('/manual/apagando', function(req, res, next) {
  res.render('manual_apagando_orcamentos', { title: 'Manual de uso', title_manual: 'Apagando orçamantos' });
});

router.get('/manual/logando', function(req, res, next) {
  res.render('manual_login', { title: 'Manual de uso', title_manual: 'Fazendo login' });
});

router.get('/manual/niveis', function(req, res, next) {
  res.render('manual_niveis', { title: 'Manual de uso', title_manual: 'Níveis de acesso' });
});

router.get('/manual/contato', function(req, res, next) {
  res.render('manual_contato', { title: 'Manual de uso', title_manual: 'Contato' });
});

router.get('/contato', auth.csrfProtection, index_controller.contato_get);

router.post('/contato', auth.csrfProtection, index_controller.contato_post);

module.exports = router;
