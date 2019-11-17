var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getlastrequeststatus', function(req, res, next) {
    //reports back whether the last request was successful or not
    res.render('test', { title: 'Get Last Request Status', message:'' });
});

module.exports = router;
