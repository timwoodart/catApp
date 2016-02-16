var fs = require('fs');
var async = require('async');
var express = require('express');
var mustache = require('mustache');
var _request = require('request');
var TEMPLATE_PATH = './app/views/index.mustache';

var app = express();

app.get('/*', function(req, res) {
  var template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  async.series({
    cat: function(callback) {
      _request('http://thecatapi.com/api/images/get?format=html', function(err, res, body) {
        if (!err && res.statusCode == 200) {
          callback(null, body);
        } else {
          callback(err);
        }
      })
    }
  }, function(err, results) {
    console.log(results)
  });

  var html = renderHtml(template, {title: 'Mustache Template', body: 'Hello World'});
  res.send(html);
});

app.listen(8000, function() {
  console.log('app running at http://localhost:8000');
});

function renderHtml(template, data) {
  return mustache.to_html(template, data);
}
