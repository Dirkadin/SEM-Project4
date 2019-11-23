var express = require('express');
var router = express.Router();
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');
const fs = require('fs');

var total = 0;
var item;
var quantity;
var prices = new Map([
    ['hotdog', 20],
    ['hamburger', 35],
    ['soda', 4],
    ['cookie', 6]
]);

router.get('/', function (req, res, next) {
    log.info('GET /gettotal');
    var data = fs.readFileSync('./logs/orders.log');

    var content = data.toString();
    var orders = content.split('\n');

    orders.forEach(order => {
        var str = order.split(' ');
        item = str[3];
        quantity = str[4];

        total += (prices.get(item) * quantity);
    });


    res.render('test', {title: 'Total money earned $' + total, message: ''});
    total = 0;
});

module.exports = router;
