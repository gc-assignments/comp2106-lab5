var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/article');

// auth check
function isLoggedIn(req, res, next) {
  // is the user authenticated?
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}
router.use(isLoggedIn);

// set up the GET handler for the main articles page
router.get('/', function(req, res) {
    // use the Article model to retrieve all articles
    Article.find(function (err, articles) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('articles/index', {

                title: 'Articles',
                articles: articles
            });
        }
    });
});

// GET handler for add to display a blank form
router.get('/add', function(req, res) {
    res.render('articles/add', {
        title: 'Add a New Article'
    });
});

// POST handler for add to process the form
router.post('/add', function(req, res) {

    // save a new article using our Article model and mongoose
    Article.create( {
            title: req.body.title,
            content: req.body.content
        }
    );

    // redirect to main articles page
    res.redirect('/articles');
});

// GET handler for edit to show the populated form
router.get('/:id', function(req, res) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Article.findById(id,  function(err, article) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('articles/edit', {
               title: 'Article Details',
               article: article
           });
       }
    });
});

// POST handler for edit to update the article
router.post('/:id', function(req, res) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the article object
    var article = new Article( {
        _id: id,
        title: req.body.title,
        content: req.body.content
    });

    // use mongoose and our Article model to update
    Article.update( { _id: id }, article,  function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/articles');
        }
    });
});

// GET handler for delete using the article id parameter
router.get('/delete/:id', function(req, res) {
   // grab the id parameter from the url
    var id = req.params.id;

    console.log('trying to delete');

    Article.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated articles list
            res.redirect('/articles');
        }
    });
});

module.exports = router;