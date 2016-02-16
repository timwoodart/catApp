var fs = require('fs');
var async = require('async');
var express = require('express');
var mustache = require('mustache');
var TEMPLATE_PATH = './app/views/index.mustache';
var catApi = require('./app/services/catApi.js');

var app = express();

app.get('/*', function(req, res) {
  var template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  async.series({
    cat: function(callback) {
      var cat = catApi.getCat(function(err, body) {
        callback(err, body)
      });
    }
  }, function(err, results) {
    if (!err && results.cat) {
      html = renderHtml(template,  {title: 'Most Awesome Cat', body: results.cat});
    } else {
      html = renderHtml(template, {title: "Cat API is down", body: '<h1>' + err + '</h1>'});
    }
    res.send(html);
  });

});

app.listen(8000, function() {
  console.log('app running at http://localhost:8000');
});

function renderHtml(template, data) {
  return mustache.to_html(template, data);
}
