var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('validator');
var helmet = require('helmet');
var csrf = require('csurf');

require('handlebars/runtime');

// Import route handlers
var routes = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var performance = require('./routes/performance');

// Import User model
var User = require('./models/User')

// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mymongodb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));

app.use(function(req, res, next) {
  if (req.session.username) {
    User.findByUsername(req.session.username,
      function(err, user) {
        if (user) {
          req.currentUser = user;
        } else {
          req.session.destroy();
        }
        next();
      });
  } else {
      next();
  }
});

// SECURITY TAKEAWAYS:
// 1) Protecting against basic XSS Attacks by setting HTTP header
// 2) Setting Content Security Policy to whitelist script sources 
// 3) Preventing ClickJacking by disabling anyone to put application in frame
// 4) Hiding Powered by Express to reduce information avaliable to hackers. 
// 5) Preventing CSRF
// 6) Sanitizing Inputs In Model and while presenting in Handlebars by escaping strings using {{ tags}} to prevent code injection

//Basic protection against XSS Attacks by setting HTTP header
app.use(helmet.xssFilter());

//Preventing ClickJacking Attacks
// Don't allow anyone to put me in a frame.
app.use(helmet.frameguard('deny'));

//Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express (or whichever framework you use). 
//X-Powered-By: Express is sent in every HTTP request coming from Express, by default.
app.use(helmet.hidePoweredBy());

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);
app.use('/performance', performance);

app.use(csrf()); //CSRF Security

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
