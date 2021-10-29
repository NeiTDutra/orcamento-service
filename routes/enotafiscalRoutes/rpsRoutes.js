const express = require('express');
const router = express.Router();

const rpsController = require('../../controllers/enotafiscalControllers/rpsController');
const auth = require('../../controllers/authController');

/* GET users listing. */
router.get('/', rpsController.rps_index);

router.get('/rps/create', auth.IsAuthenticated, rpsController.rps_create_get);

router.post('/rps/create', auth.IsAuthenticated, rpsController.rps_create_post);

router.get('/rps/:id/update', auth.IsAuthenticated, rpsController.rps_update_get);

router.post('/rps/:id/update', auth.IsAuthenticated, rpsController.rps_update_post);

router.delete('/rps/:id/delete', auth.IsAuthenticated, rpsController.rps_delete);

router.get('/rps/:id', auth.IsAuthenticated, rpsController.rps_detail);

router.get('/rps', auth.IsAuthenticated, rpsController.rps_list);

module.exports = router;
