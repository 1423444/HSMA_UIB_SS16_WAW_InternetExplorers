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
 
"use strict";

const players = require("./JSON/players.json");

const restify = require("restify");

const server = restify.createServer({
	name: "InternetExplorers"
});

const filter = require("lodash.filter");

server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.queryParser());

server.get('/api/players', (req, res) => {
	var query = req.params.favorites || "false";
	var search = (typeof req.params.search !== "undefined") || false;
	
	if(search === true) {
		if(req.params.search.length === 1) {
			var filtered = filter(players, function(o) {
				return o.name.charAt(0) === req.params.search;
			});
			res.json(200, filtered);
		} else {
			res.json(404, { "message": "FAIL: No correct value in search!" });
		}
	} else if(query === "true"){
		var filtered = filter(players, {favorit: true});
		res.json(200, filtered);
	} else if(query === "false"){
		res.json(200, players);
	} else {
		res.json(404, { "message": "FAIL" });
	}	
});

server.post('/api/players', (req, res) => {
	if(req.body) {
		return res.json(200, { "message": "Spieler wurde erfolgreich gespeichert" });
	} else {
		res.json(404, { "message": "Empty body is not allowed." });
	}
});

server.del('/api/players/:id', (req, res) => {
	var filtered = filter(players, function(o) {
		return !(o.id === req.params.id);
	});
	players = filtered;
	res.end();
});

server.put('/api/players/:id', (req, res) => {
	var messagetext = "Spieler mit der ID " + req.params.id + " wurde erfolgreich geupdatet";
	return res.json(200, { "message": messagetext });
});

server.listen(process.argv[2], () => {
 console.log(`${server.name} is listening at ${server.url}`);
});