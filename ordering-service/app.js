var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var versionRouter = require('./routes/version');
var getmenuRouter = require('./routes/getmenu');
//var logsRouter = require('./routes/logs');

const log = require('simple-node-logger').createSimpleLogger('logs/events.log');
const orders = require('simple-node-logger').createSimpleLogger('logs/orders.log');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/version', versionRouter);
//app.use('/logs', logsRouter);
app.use('/getmenu', getmenuRouter);

app.post('/purchase/:item/:quantity', function (req, res) {
    console.log(req.params.item, req.params.quantity);
    var item = req.params.item.toLowerCase();
    var quantity = req.params.quantity.toLowerCase();

    if (item === 'hotdog' || item === 'hamburger' || item === 'soda' || item === 'cookie') {
        orders.info(item + ' ' + quantity);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }


});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    log.warn('GET /error');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
