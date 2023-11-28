var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var  passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home/index', {layout: 'home/layout.hbs'} );
});

/* GET sign-in page. */
router.get('/login', function(req, res, next) {
  var messages = req.flash('error')
  res.render('login/index',{ 
    messages: messages,
    hasErrors: messages.length > 0, layout: 'login/layout.hbs'
   })
});

/* Post sign-up page. */
// Xử lý thông tin khi có người đăng nhập
router.post('/login',
  passport.authenticate('local.signin', { successRedirect: '/user',
                                  failureRedirect: '/login',
                                  failureFlash: true })
);

/* GET sign-up page. */
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error')
 
  res.render('signup/index',{ 
    messages: messages,
    hasErrors: messages.length > 0, layout: 'signup/layout.hbs'
   })
});

/* Post sign-up page. */
// Xử lý thông tin khi có người đăng ký
router.post('/signup', 
[
  check('email', 'Your email is not valid').isEmail(),
  check('password', 'Your password must be at least 5 characters').isLength({ min: 5 })
  ],
  (function (req, res, next) {

  var messages = req.flash('error');
  const result= validationResult(req);
  var errors=result.errors;
  if (!result.isEmpty()) {
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    res.render('signup/index',{
      messages: messages,
      hasErrors: messages.length > 0, layout: 'signup/layout.hbs'
    });
  }else{
     next();
  }
  }),
  passport.authenticate('local.signup', { successRedirect: '/login',
                                  failureRedirect: '/signup',
                                  failureFlash: true })
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Chuyển hướng nếu chưa đăng nhập
}

// 2. Xử lý đăng xuất
router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    // Optionally, you can clear or reset session variables here
    // For example: req.session.user = null;
    res.redirect('/'); // Redirect after logout
  });
});

// 3. Trang chính yêu cầu xác thực
router.get('/user', ensureAuthenticated, function(req, res){
  res.render('user/index', { layout: 'user/layout.hbs' });
});

module.exports = router;