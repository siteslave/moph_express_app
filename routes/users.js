var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var Users = require('../models/users');

/* GET users listing. */
// /users/login
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function (req, res) {

  req.session.destroy(function (err) {
    if (!err) {
      res.redirect('/users/login')
    }
  });

})

router.post('/login', function (req, res) {
  var db = req.db;

  var username = req.body.username;
  var password = req.body.password;

  password = crypto.createHash('md5')
    .update(password)
    .digest('hex');
  
  Users.checkLogin(db, username, password)
    .then(function (rows) {
      var total = rows[0].total;
      if (total) {
        req.session.logged = true;
        res.redirect('/');
      } else {
        res.render('login', {
          error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง'
        });
      }
    })
    .catch(function (err) {
      res.render('login', {
        error: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'
      });
    });

})



module.exports = router;
