var cache = require('memory-cache');
var Q = require('q');

var getOrLoad = function(key, loadPromise, time) {
  var data = cache.get(key);
  if(data !== null) {
    return Q.resolve(data);
  } else {
    return Q(loadPromise())
      .then(function(data) {
        cache.put(key, data, time ||  2 * 60 * 60 * 1000); // defaults to 2 hours cache timeout
        return Q.resolve(data);
      });
  }
};

module.exports = {
  get:getOrLoad,
};