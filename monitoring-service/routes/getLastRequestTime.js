var express = require('express');
var router = express.Router();
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');
const fs = require('fs');

router.get('/', function(req, res, next) {
    log.info('GET /getlastrequesttime');

    var data = fs.readFileSync('logs/events.log');
    var content = data.toString();
    var events = content.split('\n');
    
    //The logger adds a new line to the end of each log, so we wrap around twice
    var latestEvent = events.slice(-2);

    res.render('test', { title: 'The last requst was made: ' + latestEvent, message:'' });
});

module.exports = router;
