var express = require('express');
var router = express.Router();
const lineReader = require('line-reader');
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');



/* GET home page. */
router.get('/', function (req, res, next) {
    //reports back the total amount of earnings seen thus far.
    var prices = new Map([
        ['hotdog', 20],
        ['hamburger', 35],
        ['soda', 4],
        ['cookie', 6]
    ]);
    let line;
    var total;
    var item;
    var quantity;

    log.info("made it here");

    lineReader.eachLine('logs/orders.log', function(line) {
        //log.info("line ingested");

        var str = line.split(' ');
        item = str[3];
        quantity = str[4];

        //log.info(item.toString());
        //log.info(quantity.toString());
        //log.info(prices.get(item));

        total = Number(total + prices.get(item) * quantity);
        // log.info("" + total);
    });

    // log.info("" + total);

    res.render('test', {title: 'Get Total', message: total.toString()});

    lineReader.open('logs/orders.log', function(reader) {
        if (reader.hasNextLine()) {
            reader.nextLine(function(line) {
                console.log(line);
            });
        }
    });
});

module.exports = router;
