var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login/index', {layout: 'login/layout.hbs'} );
});

module.exports = router;
