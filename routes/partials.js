var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('partials/main');
});

router.get('/dialog/add-member', function(req, res, next) {
  res.render('partials/add-member-dialog');
});

module.exports = router;
