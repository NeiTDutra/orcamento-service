const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
let auth = require('../controllers/authController');

/* GET users listing. */
router.get( '/user/create', auth.csrfProtection, auth.IsAuthenticated, user_controller.user_create_get );

router.post( '/user/create', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, user_controller.user_create_post );

router.get( '/', auth.IsAuthenticated, user_controller.user_list );

router.get( '/user/:id', auth.csrfProtection, auth.IsAuthenticated, user_controller.user_detail );

router.post( '/user/:id/delete', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, user_controller.user_delete_post );

router.get( '/user/:id/update', auth.csrfProtection, auth.IsAuthenticated, user_controller.user_update_get );

router.post( '/user/:id/update', auth.parseForm, auth.csrfProtection, auth.IsAuthenticated, user_controller.user_update_post );

router.get('/userlogin', auth.csrfProtection, user_controller.user_login_get);

router.get('/userloging', user_controller.user_login_get_google);

router.get('/userloging/callback', user_controller.user_login_get_google_callback);

router.post('/userlogin', auth.parseForm, auth.csrfProtection, user_controller.user_login_post);

router.get('/userlogout', user_controller.user_logout_get);

module.exports = router;
