var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const axios = require('axios');

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
//app.use('/logs', logsRouter);
app.use('/getmenu', getmenuRouter);

var item;

app.post('/purchase/:item/:quantity', function (req, res) {
    //Call inventory service to check for item availability
    // console.log(req.params.item, req.params.quantity);
    item = req.params.item.toLowerCase();
    var quantity = req.params.quantity.toLowerCase();

    if (item === 'hotdog' || item === 'hamburger' || item === 'soda' || item === 'cookie') {
        //call inventory
        // let itemsRemaining = getItemsRemaining();
        let itemsRemaining;
        try {
            itemsRemaining = axios.get('localhost:5002/getcount/' + item.toString())
                .then(function (foo) {
                    console.log("okay we're done: " + foo);
                });
        } catch (error) {
            console.log(error);
        }
        // let itemsRemaining = axios.get('localhost:5002/getcount/' + item.toString());
        console.log(itemsRemaining);
        console.log(Number.parseInt(itemsRemaining));

        if (itemsRemaining > quantity) {
            //Reduce
            res.sendStatus(202);
        }




    } else {
        console.log("yut");
        res.sendStatus(418);
    }

});

const getItemsRemaining = () => {
    try {
        return axios.get('localhost:5002/getcount/' + item.toString());
    } catch (error) {
        console.error(error);
    }
};

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
