var _request = require('request');

var catApi = module.exports = {};

catApi.getCat = function (cb) {
  _request('http://thecatapi.com/api/images/get?format=html', function(err, res, body) {
    if (!err && res.statusCode == 200) {
      cb(null, body);
    } else {
      cb(err);
    }
  })
};
