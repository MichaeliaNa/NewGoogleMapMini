const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const request = require('request');
const express = require('express');

const app = express();
const PORT_NUM = 8080;
const SSL_NUM = 8443;
var GOOGLE_API_KEY = 'AIzaSyCnjHGp7ASdYvTQhDRG2otqpH78Y95yS2Q';
const NEARBY_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const options = {
	cert : fs.readFileSync('./lets/fullchain.pem'),
	key : fs.readFileSync('./lets/privkey.pem')
};

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/templates/mymap.html'));

});
app.get('/nearby_search', function(req, nearby_res){
	var radius = req.query.radius || 250;
	var key = req.query.key || GOOGLE_API_KEY;
	console.log(req.query.key);
	console.log(req.query.location);
	console.log(req.query.type);
	console.log(radius);
	var params = {
		'key' : key,
		'location' : req.query.location,
		'type' : req.query.type,
		'radius' : radius
	};
	var options = {
		url : NEARBY_SEARCH_URL,
		qs : params
	};
	request(options, function(err, res, body){
		if(res.statusCode == 200){
			nearby_res.json(body);
		}else{
			console.log(err);
		}
	});
});
app.use('/mymap', express.static(__dirname));

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

