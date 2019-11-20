var express = require('express');
var router = express.Router();
const lineByLine = require('n-readlines');
const liner = new lineByLine('logs/orders.log');
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');

/* GET home page. */
router.get('/', function(req, res, next) {
    //reports back the total amount of earnings seen thus far.

    let prices = [['hotdog', 20], ['hamburger', 35], ['soda', 4], ['cookie', 6]];
    let line;
    var total = 0;

    while (line = liner.next()) {
        var str = line.split(' ');
        var item = str[2];
        var quantity = str[3];

        total += prices.get(item) * quantity;
    }


    res.render('test', { title: 'Get Total', message:total });
});

module.exports = router;
