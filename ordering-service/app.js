var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const request = require("request");

var indexRouter = require('./routes/index');
var versionRouter = require('./routes/version');
var getmenuRouter = require('./routes/getmenu');

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
app.use('/getmenu', getmenuRouter);

var item;
var quantity;

app.post('/purchase/:item/:quantity', function (req, res) {
    item = req.params.item.toLowerCase();
    quantity = req.params.quantity.toLowerCase();

    const getCountURL = 'fake-inventory-service://fake-inventory-service:5002/getcount/' + item;

    request(getCountURL, (error, response, body) => {
        let json = JSON.parse(body);
        console.log(json.itemsInInventory);
        if (json.itemsInInventory >= quantity) {
            console.log('aasfd');
            request.post({
                url: 'fake-inventory-service://fake-inventory-service:5002/setcount/' + item + '/' + (json.itemsInInventory - quantity)
            }, function (error, response, body) {
                res.sendStatus(202);
            })
        } else {
            res.sendStatus(418);
        }
    });
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
