var express = require('express');
var app = express();

app.use(express.static('bower_components'));
app.use(express.static('build'));
app.use(express.static('demo'));

app.post('/', function(req, res) {
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
});


app.listen(17405);

