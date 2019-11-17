var express = require('express');
var router = express.Router();
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');

/* GET home page. */
router.get('/', function(req, res, next) {
  log.warn('GET /');
  res.render('index', { title: 'Express' });
});

module.exports = router;
