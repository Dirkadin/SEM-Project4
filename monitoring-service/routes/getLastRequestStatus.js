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
    var status = latestEvent.toString().split(' ');

    var str;

    if (status[0] === 'ERROR') {
        str = 'The last request resulted in a ' + status[1] + ' error';
    } else {
        str = 'The last request was sucessful'
    }

    res.render('test', { title: str, message:'' });
});

module.exports = router;
