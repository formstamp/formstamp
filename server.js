var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.post('/', function(req, res) {
  var body = {
    name: 'Joe',
    gender: { id: 'M', label: 'Male' },
    age: { id: 21, label: 21 },
    likesToEat: [ { id: 'meat', label: 'meat' }],
    $error: {
      name: ['Bad name!', 'Too short!'],
      gender: ['Too young!'],
      age: ["He's too old!"]
    }
  };
  res.send(body);
});


app.listen(parseInt(process.argv[2]) || 17405);
