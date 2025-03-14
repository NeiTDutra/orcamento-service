const User = require('../models/user');
const async = require('async');

const passport = require('../config/passport');
// const passportG = require('../config/passportGoogle');
// const passportF = require('../config/passportFacebook');
// const userSocial = require('../models/userSocial');


exports.user_create_get = (req, res, next) => {

    res.render('./user/user_form', { title: 'Novo usuário', csrfToken: req.csrfToken() });
};

exports.user_create_post = (req, res, next) => {

    let user = new User(
        {
            nome: req.body.user_nome,
            email: req.body.user_email,
            senha: req.body.user_senha,
            status: req.body.user_status
        }
    );
    user.save( function (err) {

        if(err) { return next(err); }

        res.redirect(user.url);
    });
};

exports.user_list = (req, res, next) => {

    async.parallel({

        user_local: (callback) => {
            User.find().exec(callback);
        },
        user_social: (callback) => {
            userSocial.find().exec(callback);
        }, 
    }, function (err, results) {

            if(err) { return next(err); }

            res.render('./user/user_list', { title: 'Lista de usuários (local)', titleS: 'Lista de usuários (social)', error: err, userData: results });
    });

    /*User.find().exec( (err, users) => {

        if(err) { return next(err); }

        res.render('./user/user_list', { title: 'Lista de usuários', error:err, user: users });
    });*/
};

exports.user_detail = (req, res, next) => {

    User.findById(req.params.id).exec( (err, detail_user) => {

        if(err) { return next(err) }

        res.render('./user/user_detail', { title: 'Detalhe de usuário', user_detail: detail_user, csrfToken: req.csrfToken() });
    })
};

exports.user_delete_post = (req, res, next) => {

    User.findByIdAndRemove(req.body.user_id, function (err) {

        if (err) { return next(err); }
        
        res.redirect('/users');
    });
};

exports.user_update_get = (req, res,next) => {

    User.findById(req.params.id, function (err, user) {

        if (err) { return next(err); }

        if (user == null) {

            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        res.render('./user/user_form', { title: 'Update user', user: user, csrfToken: req.csrfToken() });
    });
};

exports.user_update_post = (req, res, next) => {

    let user = 
        {
            nome: req.body.user_nome,
            email: req.body.user_email,
            senha: req.body.user_senha,
            status: req.body.user_status
        };

    User.findOneAndUpdate({_id: req.params.id}, user, { new: true }, function (err, user) {

        if(err) { return next(err); }

        res.redirect(user.url);
    });
};

// Login modal form
exports.user_login_get = function(req, res, next) {

    let path = req.header('Referer');
    console.log(path);
    // value send for template for open the modal of login 
    const mod = 'open';
    res.render('./user/user_index', { title: 'Login Required', path: path, mod: mod, csrfToken: req.csrfToken() });
}; 

// Login with google routes
/**
exports.user_login_get_google = [

    passportG.authenticate('google', { 
        scope: ['https://www.googleapis.com/auth/plus.login']
    })
    
];

exports.user_login_get_google_callback = [

    passportG.authenticate('google', { failureRedirect: '/users/userlogin' }),

        function(req, res) {

            res.redirect('/orcamentos');
        }
];

// Login with facebook routes
exports.user_login_get_facebook = [

    passportF.authenticate('facebook', { 
        scope: ['public_profile', 'email']
    })
    
];

exports.user_login_get_facebook_callback = [

    passportF.authenticate('facebook', { failureRedirect: '/users/userlogin' }),

        function(req, res) {

            res.redirect('/orcamentos');
        }
];
*/

// Login with local route
exports.user_login_post = [

    passport.authenticate('local', { failureRedirect: '/users/userlogin' } ),

        function(req, res) {

            if(undefined===req.body.path){
                res.redirect('/orcamentos');
            }
            else{
                let path = req.body.path;
                res.redirect(path);
            }
        }
];

// Logout
exports.user_logout_get = function(req, res, next) {

    req.logout();
    res.redirect('/');
};
