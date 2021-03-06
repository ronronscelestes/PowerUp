require('dotenv').config()
require("./config/db.config"); // database initial setup
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const flash = require("connect-flash");


//deal with session
const session = require("express-session");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session again
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: new Date(Date.now() + (30 * 86400 * 1000))} ,
    saveUninitialized: true,
    resave: true,
  
  })
);

//Use Flash module
app.use(flash());
//Use Flash middleware
app.use(require("./middlewares/exposeFlashMessage"));



//loginStatus accessible in templates
app.use(require("./middlewares/exposeLoginStatus"));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRoute = require('./routes/profile');
const gamesRoute = require('./routes/games');
// const { profile } = require('console');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRoute);
app.use('/games', gamesRoute);


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
