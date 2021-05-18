exports.IsAuthenticated = function(req,res,next){
	//Passport creates a function to your session called isAuthenticated(), so you can use it to verify if the user really login in the app
	//console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
		//So, here you are saying that if the route called had any other function, it will goes to the next one ( which is rendering the HTML )
		next();
	}else{
		//Or else, goes back to login page
		res.redirect('/users/userlogin');
	}
};

var csrf = require('csurf');
var bodyParser = require('body-parser');

exports.csrfProtection = csrf({cookie:true});

exports.parseForm = bodyParser.urlencoded({extended: false});

exports.isMaster = function(req, res, next) {

	if(loged && loged.status === 'master') {
		next();
	}else{
		res.send('Você não pode executar esta ação. Contate o administrador para mais detalhes.');
	}
};