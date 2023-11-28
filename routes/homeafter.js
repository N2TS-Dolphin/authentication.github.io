var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home_after/index', {layout: 'home_after/layout.hbs'} );
});

module.exports = router;
