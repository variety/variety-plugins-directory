var express = require('express');
var plugins = require('variety-plugins-searcher')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  plugins.all()
    .then(function(data){
      res.render('index', { plugins: data});
    })
    .fail(function(err){
      res.render('error', { 'message':'Failed to load plugin details' , error: err});
    })
    .done();
});

module.exports = router;
