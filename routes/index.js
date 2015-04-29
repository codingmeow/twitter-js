var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var renderedTweet = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: renderedTweet } );
});

router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = parseInt(req.params.id);//make sure it's not a string digit.
  var renderedTweet = tweetBank.find( {name: name, id: id} );
  console.log(renderedTweet);
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: renderedTweet } );
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;