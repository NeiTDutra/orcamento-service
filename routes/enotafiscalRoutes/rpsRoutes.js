const express = require('express');
const router = express.Router();

const rpsController = require('../../controllers/enotafiscalControllers/rpsController');
const auth = require('../../controllers/authController');

/* GET users listing. */
router.get('/', rpsController.rps_list);

router.get('/rps/create', auth.csrfProtection, auth.IsAuthenticated, rpsController.rps_create_get);

router.post('/rps/create', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, rpsController.rps_create_post);

router.get('/rps/:id/update', auth.csrfProtection, auth.IsAuthenticated, rpsController.rps_update_get);

router.post('/rps/:id/update', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, rpsController.rps_update_post);

router.post('/rps/:id/delete', auth.isMaster, auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, rpsController.rps_delete_post);

router.get('/rps/:id', auth.csrfProtection, rpsController.rps_detail);

router.get('/rps/', rpsController.rps_list);

module.exports = router;
