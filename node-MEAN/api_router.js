var express = require('express');
var user = require('./lib/user');


var router = express.Router();

router.post('/userInfo',user.userInfo);


module.exports = router;