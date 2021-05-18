const express = require('express');
const router = express.Router();

const orcamento_controller = require('../controllers/orcamentoController');
let auth = require('../controllers/authController');

/* GET users listing. */
router.get('/', orcamento_controller.index);

router.get('/orcamento/create', auth.csrfProtection, auth.IsAuthenticated, orcamento_controller.orcamento_create_get);

router.post('/orcamento/create', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, orcamento_controller.orcamento_create_post);

router.get('/orcamento/:id/update', auth.csrfProtection, auth.IsAuthenticated, orcamento_controller.orcamento_update_get);

router.post('/orcamento/:id/update', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, orcamento_controller.orcamento_update_post);

router.post('/orcamento/:id/delete', auth.isMaster, auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, orcamento_controller.orcamento_delete_post);

router.get('/orcamento/:id', auth.csrfProtection, orcamento_controller.orcamento_detail);

router.get('/orcamentos', orcamento_controller.orcamento_list);

module.exports = router;