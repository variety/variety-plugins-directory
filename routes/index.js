var express = require('express');
var plugins = require('variety-plugins-searcher');
var cache = require('../lib/cache');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  cache.get('all', plugins.all)
    .then(function(data){
      res.render('index', { plugins: data});
    })
    .fail(function(err){
      res.render('error', { 'message':'Failed to load plugin details' , error: err});
    })
    .done();
});

module.exports = router;
