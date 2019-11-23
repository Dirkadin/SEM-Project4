var express = require('express');
var router = express.Router();
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');
const fs = require('fs');

router.get('/', function(req, res, next) {
    log.info('GET /getrequestcount');

    var data = fs.readFileSync('./logs/events.log');
    var content = data.toString();
    var events = content.split('\n');
    var totalEvents = 0;

    events.forEach(event => {
        totalEvents++;
    });


    res.render('test', { title: 'Total number of events ' + totalEvents, message:'' });
});

module.exports = router;
