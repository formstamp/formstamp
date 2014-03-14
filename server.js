var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(parseInt(process.argv[2]) || 17405);
