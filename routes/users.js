var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Account = require('../models/account');

// auth check
function isLoggedIn(req, res, next) {
  // is the user authenticated?
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}
router.use(isLoggedIn);

/* GET users listing. */
router.get('/', function(req, res) {
  Account.find(function(err, users) {
    if (err) res.end(err);
    res.render('users', {
      title: 'Users',
      users: users
    });
  });
});

module.exports = router;
