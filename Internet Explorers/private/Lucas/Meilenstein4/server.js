/*
 * app.js
 * 
 * This file is part of the Internet Explorers NodeJS server.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 03. June 2016
 */
 
var players = require("./JSON/players.json");


var hostname = '127.0.0.1'; 
var port = 100; 

var express = require('express'); 
var app = express(); 

var cors = require('express-cors') 
var bodyParser = require('body-parser'); 
var _ = require("underscore");

app.use(bodyParser.json()); 
app.use(cors()); 

app.use('/', express.static(__dirname));
app.use('/public', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js')); 
app.use('/img', express.static(__dirname + '/img'));

app.get('/api/players', (req, res) => {
	var query = req.params.favorites || "false";
	if(req.query.favorites === 'true'){
		var filtered = _.where(players, {"favorit": true});
		res.json(200, filtered);
	} else {
		res.json(200, players);
	}

});

app.post('/api/players', (req, res) => {
	if(req.body) {
		return res.json(200, { "message": "Spieler wurde erfolgreich gespeichert" });
	} else {
		res.json(404, { "message": "Empty body is not allowed." });
	}
});

app.delete('/api/players/:id', (req, res) => {
	var filtered = filter(players, function(o) {
		return !(o.id === req.params.id);
	});
	players = filtered;
	res.end();
});

app.put('/api/players/:id', (req, res) => {
	var messagetext = "Spieler mit der ID " + req.params.id + " wurde erfolgreich geupdatet";
	return res.json(200, { "message": messagetext });
});

app.listen(port, hostname, function () { 
	console.log(`Listening to http//: ${hostname}:${port}/`); 
 }); 
