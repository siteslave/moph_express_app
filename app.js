var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var partials = require('./routes/partials');
var api = require('./routes/api');
var apis = require('./routes/apis');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'sfsdfsdffefdsfdsf',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = require('knex')({
  client: 'mysql',
  connection: {
    host: '203.157.102.69',
    port: 3306,
    database: 'hdc',
    user: 'hdc',
    password: 'Training@Angular'
  }
});

var auth = function (req, res, next) {
  // req.session
  if (req.session.logged) {
    next();
  } else {
    res.redirect('/users/login')
  }
}

var secretKey = '1234567890';

var checkToken = (req, res, next) => {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        return res.send({ ok: false, msg: 'Token ที่ส่งมาไม่ถูกต้อง.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
        ok: false,
        msg: 'ไม่พบ Token'
    });

  }

};



app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

app.use('/apis', checkToken, apis);

app.use('/admin', auth, admin);
app.use('/partials', auth, partials);

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
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    console.log(err);
    res.send({ok: false, msg: 'เกิดข้อผิดพลาด'})
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
   console.log(err);
    res.send({ok: false, msg: 'เกิดข้อผิดพลาด'})
});


module.exports = app;
