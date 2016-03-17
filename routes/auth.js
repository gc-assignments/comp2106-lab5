var express = require('express');
var router = express.Router();

// add auth package refs
var passport = require('passport');
var Account = require('../models/account');

// GET login - show login form
router.get('/', function(req, res) {
  res.send(req.isAuthenticated());
});

router.get('/login', function(req, res, next) {
    // store the session messages in a local variable
    var messages = req.session.messages || [];

    // clear the session messages
    req.session.messages = [];

    // show the login page and pass in any messages we may have
    res.render('auth/login', {
        title: 'Login',
        // user: req.user,
        messages: messages
    });
});

// POST login - validate user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/articles',
  failureRedirect: '/auth/login',
  failureMessage: 'Invalid Login'
}));

// GET register - show registration form
router.get('/register', function(req, res, next) {
   res.render('auth/register', { title: 'Register' });
});

// POST register - save new user
router.post('/register', function(req, res, next) {
    /* Try to create a new account using our Account model & the form values
    If we get an error display the register form again
    If registration works, store the user and show the articles main page */
  var newAccount = new Account({ username: req.body.username });
  var password = req.body.password;
  Account.register(newAccount, password, function(err, account) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    if (!account) return res.redirect('/');
    req.login(account, function(err) {
      if (err) return next(err);
      return res.redirect('/articles');
    });
  });
});

// make this public
module.exports = router;
