const express = require('express');
const app = express();
const PORT_NUM = 8080;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT_NUM, function () {
  console.log('Example app listening on port ' + PORT_NUM + ' !');
});
