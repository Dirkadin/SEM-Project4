var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gettopseller', function(req, res, next) {
    //reports back the item that has been purchases the greatest number of times
    res.render('test', { title: 'Get Top Seller', message:'' });
});

module.exports = router;
