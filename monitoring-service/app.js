var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');

var indexRouter = require('./routes/index');
var getTotalRouter = require('./routes/getTotal');
var getTopSellerRouter = require('./routes/getTopSeller');
var getRequestCountRouter = require('./routes/getRequestCount');
var getLastRequestTimeRouter = require('./routes/getLastRequestTime');
var getLastRequestStatusRouter = require('./routes/getLastRequestStatus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/gettotal', getTotalRouter);
app.use('/gettopseller', getTopSellerRouter);
app.use('/getrequestcount', getRequestCountRouter);
app.use('/getlastrequesttime', getLastRequestTimeRouter);
app.use('/getlastrequeststatus', getLastRequestStatusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  log.error('404');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  log.error('500');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
