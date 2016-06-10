/*
 * app.js
 * 
 * This file is part of the Internet Explorers NodeJS server.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 07. June 2016
 */

var hostname = 'localhost'; 
var port = 80;

var players = require('./JSON/players.json');

const express = require('express'); 
var app = express();

const cors = require('express-cors') 
const bodyParser = require('body-parser'); 
const _ = require('underscore');

app.use(bodyParser.json()); 
app.use(cors());

var server = app.listen(port, hostname, function () { 
	console.log(`Listening to http//:${hostname}:${port}/`); 
 });

// Statische Dateien ausliefern
app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js')); 
app.use('/img', express.static(__dirname + '/img'));

// Dynamisch erzeugte Infos
app.get('/api/players', (req, res) => {
	var query = req.query.favorites || 'false';
	var search = req.query.search || 'false';
	
	if(search !== 'false') {
		if(search.length === 1) {
			var filtered = _.filter(players, function(o) {
				return o.name.charAt(0) === search;
			});
			res.status(200).json(filtered);
		} else {
			res.status(404).json({ 'message': 'FAIL: No correct value in search!' });
		}
	} else if(query === 'true'){
		var filtered = _.filter(players, {favorit: true});
		res.status(200).json(filtered);
	} else if(query === 'false'){
		res.status(200).json(players);
	} else {
		res.status(404).json({ 'message': 'FAIL' });
	}
});

app.post('/api/players', (req, res) => {
	if(req.body) {
		res.status(200).json({ 'message': 'Spieler wurde erfolgreich gespeichert' }); 
	} else {
		res.status(404).json({ 'message': 'Empty body is not allowed.' }); 
	}
});

app.delete('/api/players/:id', (req, res) => {
	var filtered = _.filter(players, function(o) {
		return !(o.id === req.params.id);
	});
	players = filtered;
	res.end();
});

app.put('/api/players/:id', (req, res) => {
	var messagetext = 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet';
	res.status(200).json({ 'message': messagetext });
});
 
// Chat
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});