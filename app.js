const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const orcamentosRouter = require('./routes/orcamentos');
//const apiOrcamentoRouter = require('./api/routes/apiOrcamentos');

const app = express();

const passport = require('passport');
const expressSession = require('express-session');

app.use(expressSession({
  secret: 'z3|d4',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.loged = req.user;
  next();
});

//server deploy
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Site listening on port %s', port);
});

// connect engine setup
const mongoose = require('mongoose');

// string connection local
//const dev_db_url = 'mongodb://localhost:27017/nservicos';

// string connection Atlas
const user = process.env.USER;
const pass = process.env.PASS;
const dev_db_url = 'mongodb+srv://${user}:${pass}@cluster0.27qk0.gcp.mongodb.net/orcamento?retryWrites=true&w=majority';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orcamentos', orcamentosRouter);

// api route
//app.use('/api/v1.0/orcamentos', apiOrcamentoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
