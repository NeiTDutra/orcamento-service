const express = require('express');
const router = express.Router();

const rpsController = require('../../controllers/enotafiscalControllers/rpsController');
const auth = require('../../controllers/authController');

/* GET users listing. */
router.get('/', rpsController.rps_index);

router.get('/rps/create', rpsController.rps_create_get);

router.post('/rps/create', rpsController.rps_create_post);

router.get('/rps/created', rpsController.rps_detail);

router.get('/rps/:id/update', rpsController.rps_update_get);

router.post('/rps/:id/update', rpsController.rps_update_post);

router.post('/rps/:id/delete', rpsController.rps_delete_post);

router.get('/rps/:id', rpsController.rps_detail);

router.get('/rps', rpsController.rps_list);

module.exports = router;
