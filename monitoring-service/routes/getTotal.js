var express = require('express');
var router = express.Router();
const lineByLine = require('n-readlines');
const liner = new lineByLine('logs/orders.log');
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');

/* GET home page. */
router.get('/', function(req, res, next) {
    //reports back the total amount of earnings seen thus far.

    let line;

    while (line = liner.next()) {
        //do stuff
    }


    res.render('test', { title: 'Get Total', message:'' });
});

module.exports = router;
