const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, './config.env')});

const connectDB = require('./config/db_connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const orcamentosRouter = require('./routes/orcamentos');

// const apiOrcamentoRouter = require('./api/routes/apiOrcamentos');

const app = express();

const passport = require('passport');
const expressSession = require('express-session');

app.use(expressSession({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.loged = req.user;
  next();
});

// connect db setup
app.set('conn', 'connectDB');

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

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
