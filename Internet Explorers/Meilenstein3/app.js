/*
 * app.js
 * 
 * This file is part of the Internet Explorers NodeJS server.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 02. June 2016
 */
 
'use strict';

var players = require('./JSON/players.json');

var restify = require('restify');

var server = restify.createServer({
	name: 'InternetExplorers'
});

var underscore = require("underscore");
var where = require("lodash.where");

server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.queryParser());

server.get('/api/players', (req, res) => {
	var query = req.params.favorites || 'false';

	if(query === 'true'){
		var filtered = where(players, {favorit: true});
		res.json(200, filtered);
	} else if(query === 'false'){
		res.json(200, players);
	} else {
		res.json(404, { "message": "FAIL" });
	}
});

server.post('/api/players', (req, res) => {
	if(req.body) {
		return res.json(200, { "message": "Spieler wurde erfolgreich gespeichert" });
	}

	res.json(404, { "message": "Empty body is not allowed." });
});

server.listen(process.argv[2], () => {
 console.log(`${server.name} is listening at ${server.url}`);
});