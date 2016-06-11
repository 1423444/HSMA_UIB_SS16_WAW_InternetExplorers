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

const bodyParser = require('body-parser'); 
const _ = require('underscore');

app.use(bodyParser.json()); 

app.get('/api/players', (req, res) => {
	var query = req.query.favorites || 'false';
	var search = req.query.search || 'false';
	var regex = /^[A-Z]+$/;
	
	if(search !== 'false') {
		if(search.length === 1 && search.match(regex)) {
			var filtered = _.filter(players, function(o) {
				return o.name.charAt(0) === search;
			});
			res.status(200).json(filtered);
		} else {
			res.status(404).json({ 'message': 'Es wurde kein Spieler gefunden!' });
		}
	} else if(query === 'true'){
		var filtered = _.filter(players, {favorit: true});
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
		res.status(404).json({ 'message': 'Leerer Body ist nicht erlaubt.' }); 
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
	var find = false;
	_.filter(players, function(o) {
		if(o.id === req.params.id) {
			find = true;
			return true;
		}
		else return false;
	});
	if(find) {
		var messagetext = 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet';
		res.status(200).json({ 'message': messagetext });
	} else {
		res.status(404).json({ 'message': 'Spieler mit dieser ID existiert nicht' });
	}
});

app.listen(port, hostname, function () { 
	console.log(`Listening to http//:${hostname}:${port}/`); 
 }); 
