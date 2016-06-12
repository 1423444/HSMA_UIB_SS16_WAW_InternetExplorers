/*
 * app.js
 * 
 * This file is part of the Internet Explorers NodeJS server.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 11. June 2016
 */

var hostname = 'localhost'; 
var port = 80;

var players = require('./JSON/players.json');

const express = require('express'); 
const app = express();

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


// Dynamisch erzeugte Infos
app.get('/api/players', (req, res) => {
	let query = req.query.favorites || 'false';
	let search = req.query.search || 'false';
	let regex = /^[A-Z]+$/;
	
	if(search !== 'false') {
		if(search.length === 1 && search.match(regex)) {
			let filtered = players.filter(o => o.name.charAt(0) === search);
			res.status(200).json(filtered);
		} else {
			res.status(404).json({ 'message': 'Ungültige Suchanfrage' });
		}
	} else if(query === 'true'){
		let filtered = _.filter(players, {favorit: true});
		res.status(200).json(filtered);
	} else if(query === 'false'){
		res.status(200).json(players);
	} else {
		res.status(404).json({ 'message': 'Es ist ein Fehler aufgetreten' });
	}
});

app.post('/api/players', (req, res) => {
	if(req.body) {
		res.status(200).json({ 'message': 'Spieler wurde erfolgreich gespeichert' }); 
	} else {
		res.status(404).json({ 'message': 'Leerer Body ist nicht erlaubt' }); 
	}
});

app.delete('/api/players/:id', (req, res) => {
	let filtered = players.filter(o => o.id !== req.params.id)
	players = filtered;
	res.end();
});

app.put('/api/players/:id', (req, res) => {
	let filtered = players.filter(o => o.id === req.params.id)
		if (filtered.length === 1) {
			res.status(200).json({ 'message': 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet' });
		}
		else {
			res.status(404).json({ 'message': 'Spieler mit dieser ID existiert nicht' });
		}			
});

// Chat
const io = require('socket.io').listen(server);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});