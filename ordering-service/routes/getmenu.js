var express = require('express');
var router = express.Router();
const path = require('path');
const viewsPath = {root: path.join(__dirname, "../views")};
const log = require('simple-node-logger').createSimpleLogger('logs/events.log');

/* GET users listing. */
router.get('/', function(req, res, next) {
  log.info('GET /getmenu');
  res.sendFile("getmenu.html", viewsPath);
});

module.exports = router;
