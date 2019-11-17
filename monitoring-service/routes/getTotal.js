var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //reports back the total amount of earnings seen thus far.
    res.render('test', { title: 'Get Total', message:'' });
});

module.exports = router;
