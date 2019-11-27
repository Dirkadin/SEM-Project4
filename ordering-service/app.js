var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const axios = require('axios').default;
var wait = require('wait-promise');

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

async function getCount() {
    try {
        let res = await axios({
            url: 'http://localhost:5002/getcount/' + item,
            method: 'get',
            timeout: '8000',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status == 200) {
            console.log(res.status);
        }
        return res.data.itemsInInventory;
    } catch (error) {
        console.log(error);
    }
}

const getThings = async () => {
    try {
        return await axios.get('http://localhost:5002/getcount/' + item);
    } catch (error) {
        console.log(error);
    }
};

async function getCount() {
    let json = await axios.get('http://localhost:5002/getcount/' + item);
    console.log('after call to service');
    return json;
}

var item;

app.post('/purchase/:item/:quantity', function (req, res) {
    //Call inventory service to check for item availability
    // console.log(req.params.item, req.params.quantity);
    item = req.params.item.toLowerCase();
    var quantity = req.params.quantity.toLowerCase();

    if (item === 'hotdog' || item === 'hamburger' || item === 'soda' || item === 'cookie') {
        //call inventory

        console.log(item);
        var itemsAvailable = 0;

        // (async()=>{
        //     let abc = await getCount();
        //     console.log('>>>>>>>>>>> abc', abc.data.itemsInInventory);
        // })();



        // axios.get('http://localhost:5002/getcount/' + item)
        //     .then(res => {
        //         itemsAvailable = res.data.itemsInInventory;
        //         console.log(res.data.itemsInInventory);
        //     })
        //     .catch(function(error) {
        //         console.log("Error: " + error.message);
        //     });

        // axios.get('localhost:5002/getcount/' + item)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         // always executed
        //     });

        // itemsAvailable = wait.until(axios.get('http://localhost:5002/getcount/' + item)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response.data.itemsInInventory);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         // always executed
        //     }));

        async function f() {

            let promise = axios.get('http://localhost:5002/getcount/' + item);

            let result = await promise; // wait until the promise resolves (*)

            itemsAvailable = result.data.itemsInInventory; // "done!"
            console.log("It's not stopping")
        }
        f();

        console.log("Last: " + itemsAvailable);
        res.sendStatus(418);
        console.log('status sent')
    } else {
        console.log("yut");
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
