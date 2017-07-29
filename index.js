const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT_NUM = 8080;
const SSL_NUM = 8443;
var port = process.env.PORT || 8443; 

const options = {
	cert : fs.readFileSync('./lets/fullchain.pem'),
	key : fs.readFileSync('./lets/privkey.pem')
};
//app.use(express.static(__dirname + '/templates'));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/templates/mymap.html'));
});
app.use('/mymap', express.static(__dirname));
// app.use('/js', express.static(__dirname + 'js'));
// app.use('/css', express.static(__dirname + 'css'));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);
httpServer.listen(PORT_NUM, function(){
	console.log('HTTP server listening on port ' + PORT_NUM + ' !');
});
httpsServer.listen(SSL_NUM, function(){
	console.log('HTTPS server listening on port ' + SSL_NUM + ' !');
});

// app.listen(PORT_NUM, function () {
//   console.log('Example app listening on port ' + PORT_NUM + ' !');
// });

