var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Users = require('../models/users')
// localhost:3000/api/login
router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var db = req.db;
  var secretKey = '1234567890';
  password = crypto.createHash('md5')
    .update(password)
    .digest('hex');
  
  Users.checkLogin(db, username, password)
    .then(function (rows) {
      var total = rows[0].total;

      if (total) {
        var token = jwt.sign({ username: username }, secretKey, {
          expiresIn: "1d"
        });
        res.send({ ok: true, token: token });
      } else {
        res.send({ ok: false, msg: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง' });
      }
    })
    .catch(function (err) {
      res.send({ok: false, msg: err})
    });

});


module.exports = router;