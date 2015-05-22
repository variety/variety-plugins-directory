var express = require('express');
var plugins = require('variety-plugins-searcher')
var router = express.Router();
var marked = require('marked');
var cache = require('../lib/cache');

router.get('/*', function(req, res, next) {
  var pluginName = req.url.substring(1);
  cache.get('details/' + pluginName, function(){return plugins.getDetails(pluginName);})
  .then(function(data){
    res.render('details', {plugin: data, md: marked});
  })
  .fail(function(err){
    res.render('error', { 'message':'Failed to load plugin details' , error: err});
  })
  .done();
});

module.exports = router;
