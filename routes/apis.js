var express = require('express');
var router = express.Router();
var cryptojs = require('crypto-js');


var Members = require('../models/members')

/* GET home page. */
router.get('/members', function (req, res, next) {
  
  var users = ['Satit', 'Rianpit'];
  var ciphertext = cryptojs.AES.encrypt(JSON.stringify(users), 'secret key 123');

  res.send({ ok: true, data: ciphertext.toString() });
});

module.exports = router;