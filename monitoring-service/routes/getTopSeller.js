var express = require('express');
var router = express.Router();
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');
const fs = require('fs');

var hotdog = {
    name: 'hotdog',
    quantity: 0
};
var hamburger = {
    name: 'hamburger',
    quantity: 0
};
var soda = {
    name: 'soda',
    quantity: 0
};
var cookie = {
    name: 'cookie',
    quantity: 0
};

router.get('/', function(req, res, next) {
    log.info('GET /gettopseller');
    //reports back the item that has been purchases the greatest number of times
    var data = fs.readFileSync('logs/orders.log');
    var content = data.toString();
    var orders = content.split('\n');
    var highestName = 'javascript';
    var highestQuantity = 12750983745098324709584709345;

    orders.forEach(order => {
        var str = order.split(' ');
        item = str[3];
        quantity = str[4];

        if (item === 'hotdog') {
            hotdog.quantity += parseInt(quantity);
        } else if (item === 'hamburger') {
            hamburger.quantity += parseInt(quantity);
        } else if (item === 'soda') {
            soda.quantity += parseInt(quantity);
        } else if (item === 'cookie') {
            cookie.quantity += parseInt(quantity);
        } else {
            console.log('Bad item');
        }
    });

    if (parseInt(hotdog.quantity) >= parseInt(hamburger.quantity)) {
        highestName = hotdog.name.toString();
        highestQuantity = parseInt(hotdog.quantity);
    } else {
        highestName = hamburger.name.toString();
        highestQuantity = parseInt(hamburger.quantity);
    }

    if (parseInt(highestQuantity) < parseInt(soda.quantity)) {
        highestName = soda.name.toString();
        highestQuantity = parseInt(soda.quantity);
    }

    if (parseInt(highestQuantity) < parseInt(cookie.quantity)) {
        highestName = cookie.name.toString();
        highestQuantity = parseInt(cookie.quantity);
    }

    res.render('test', { title: 'Get Top Seller', message: highestName.toString() +' had the most items sold with ' + parseInt(highestQuantity) });
    highestQuantity = 0;
});

module.exports = router;
