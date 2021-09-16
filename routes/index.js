const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../controllers/authController');
const index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./site/site_index', { title: 'Página inicial', site: 'N', sitee: 'Servicos' });
});

router.get('/creator', function(req, res, next) {
  res.render('./site/site_creator', { title: 'Creator' });
});

router.get('/manual', function(req, res, next) {
  res.render('./site/site_manual', { title: 'Manual de uso' });
});

router.get('/manual/geral', function(req, res, next) {
  res.render('./manual/manual_visao_geral', { title: 'Manual de uso', title_manual: 'Visão geral' });
});

router.get('/manual/listando', function(req, res, next) {
  res.render('./manual/manual_listando_orcamentos', { title: 'Manual de uso', title_manual: 'Listando orçamentos' });
});

router.get('/manual/criando', function(req, res, next) {
  res.render('./manual/manual_criando_orcamentos', { title: 'Manual de uso', title_manual: 'Criando orçamentos' });
});

router.get('/manual/editando', function(req, res, next) {
  res.render('./manual/manual_editando_orcamentos', { title: 'Manual de uso', title_manual: 'Editando orçamentos' });
});

router.get('/manual/imprimindo', function(req, res, next) {
  res.render('./manual/manual_imprimindo_orcamentos', { title: 'Manual de uso', title_manual: 'Imprimindo orçamentos' });
});

router.get('/manual/apagando', function(req, res, next) {
  res.render('./manual/manual_apagando_orcamentos', { title: 'Manual de uso', title_manual: 'Apagando orçamentos' });
});

router.get('/manual/usuarios', function(req, res, next) {
  res.render('./manual/manual_usuarios', { title: 'Manual de uso', title_manual: 'Sobre usuários' });
});

router.get('/manual/logando', function(req, res, next) {
  res.render('./manual/manual_login', { title: 'Manual de uso', title_manual: 'Fazendo login' });
});

router.get('/manual/niveis', function(req, res, next) {
  res.render('./manual/manual_niveis', { title: 'Manual de uso', title_manual: 'Níveis de acesso' });
});

router.get('/manual/contato', function(req, res, next) {
  res.render('./manual/manual_contato', { title: 'Manual de uso', title_manual: 'Contato' });
});

router.get('/contato', auth.csrfProtection, index_controller.contato_get);

router.post('/contato', auth.csrfProtection, index_controller.contato_post);

module.exports = router;
