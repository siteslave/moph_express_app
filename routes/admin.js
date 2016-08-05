var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Members = require('../models/members')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index-admin', { title: 'Express' });
});

// admin/members
router.get('/members', function (req, res) {
  var db = req.db;
  var limit = parseInt(req.query.limit);
  var offset = parseInt(req.query.offset);

  console.log(req.query);

  Members.getList(db, limit, offset)
    .then(function (rows) {
      // succes
      res.send({ ok: true, rows: rows });
    })
    .catch(function (err) {
      // error
      res.send({ ok: false, msg: err });
    });
  
});

router.get('/members/search', function (req, res) {
  var db = req.db;
  var query = req.query.query;

  // console.log(req.query);

  Members.search(db, query)
    .then(function (rows) {
      // succes
      res.send({ ok: true, rows: rows });
    })
    .catch(function (err) {
      // error
      res.send({ ok: false, msg: err });
    });
  
});

router.get('/members/total', function (req, res) {
  var db = req.db;

  Members.getTotal(db)
    .then(function (rows) {
      // succes
      res.send({ ok: true, total: rows[0].total });
    })
    .catch(function (err) {
      // error
      res.send({ ok: false, msg: err });
    });
  
});

router.post('/members', function (req, res) {
  var db = req.db;
  var member = req.body.member;
  // console.log(req.body);
  member.password = crypto.createHash('md5')
    .update(member.password).digest('hex');
  
  Members.save(db, member)
    .then(function () {
      res.send({ ok: true });
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
  
})

router.put('/members', function (req, res) {
  var db = req.db;

  var member = req.body.member;
   
  Members.update(db, member)
    .then(function () {
      res.send({ ok: true })
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err })
    });
})

router.get('/members/:id', function (req, res) {
  var db = req.db;
  var id = req.params.id;

  Members.detail(db, id)
    .then(function (rows) {
      res.send({ ok: true, member: rows[0] });
      // members = {id: 1, fullname: 'xxx', username: 'xxx', ...}
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
})

router.delete('/members/:id', function (req, res) {
  var id = req.params.id;
  var db = req.db;

  Members.remove(db, id)
    .then(function () {
      res.send({ ok: true })
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err })
    });
})

router.get('/groups', function (req, res) {
  var db = req.db;
  
  Members.getGroups(db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
})


module.exports = router;
