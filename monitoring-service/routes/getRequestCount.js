var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getrequestcount', function(req, res, next) {
    //reports back the total number of all requests
    res.render('test', { title: 'Get Request Count', message:'' });
});

module.exports = router;
