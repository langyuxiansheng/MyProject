var express = require('express');
var router = express.Router();
const db = require('../dao/MySQL');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(db)
  res.send('respond with a resource');
});

module.exports = router;
