var fs = require('fs');
var express = require('express');
var mustache = require('mustache');
var TEMPLATE_PATH = './app/views/index.mustache';

var app = express();

app.get('/*', function(req, res) {
  var template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  var html = renderHtml(template, {title: 'Mustache Template', body: 'Hello World'});
  res.send(html);
});

app.listen(8000, function() {
  console.log('app running at http://localhost:8000');
});

function renderHtml(template, data) {
  return mustache.to_html(template, data);
}
