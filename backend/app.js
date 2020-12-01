// import enrollframe from "../frontend/src/components/enrollframe";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const cors = require('cors');

require('./passport').config(passport);
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var timetableRouter = require('./routes/timetable');
var enrolltableRouter = require('./routes/enrolltable')
var resultpersonRouter = require('./routes/resultperson')
var mainRouter = require('./routes/maintable');
var apiRouter = require('./routes/api')
var noticeRouter = require('./routes/notice');
var viewRouter = require('./routes/viewdetail');
var rankingRouter = require('./routes/ranking');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set("etag", false);

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/timetable', timetableRouter);
app.use('/enrolltable', enrolltableRouter);
app.use('/enrolltable/detail', enrolltableRouter);
app.use('/enrolltable/cart', enrolltableRouter);
app.use('/enrolltable/delcart', enrolltableRouter);
app.use('/api', apiRouter);
app.use('/resultperson', resultpersonRouter);
app.use('/maintable', mainRouter);
app.use('/maintable/add_friend', mainRouter);
app.use('/maintable/accept', mainRouter);
app.use('/maintable/reject', mainRouter);
app.use('/maintable/calltable', mainRouter);
app.use('/notice',noticeRouter);
app.use('/notice/search',noticeRouter);
app.use('/viewdetail', viewRouter);
app.use('/viewdetail/lookup', viewRouter);
app.use('/viewdetail/input', viewRouter);
app.use('/ranking', rankingRouter);
app.use('/maintable/seme', mainRouter);


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
