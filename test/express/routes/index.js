const express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi route-scanner!');
});

module.exports = router;
