var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home_front/index', {layout: 'home_front/layout.hbs'} );
});

module.exports = router;
