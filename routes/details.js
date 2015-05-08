var express = require('express');
var plugins = require('variety-plugins-searcher')
var router = express.Router();

router.get('/*', function(req, res, next) {
  var pluginName = req.url.substring(1);
  plugins.getDetails(pluginName)
  .then(function(data){
    res.render('details', { plugin: data});
  })
  .fail(function(err){
    res.render('error', { 'message':'Failed to load plugin details' , error: err});
  })
  .done();
});

module.exports = router;
