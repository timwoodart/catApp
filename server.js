var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Up and running');
});

app.listen(8000, function() {
  console.log('app running at http://localhost:8000');
});
