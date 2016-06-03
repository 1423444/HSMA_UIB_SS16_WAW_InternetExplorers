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

var players = require("./JSON/players.json");

var restify = require("restify");

var server = restify.createServer({
	name: "InternetExplorers"
});

var filter = require("lodash.filter");

server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.queryParser());

server.get("/api/players", (req, res) => {
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

server.post("/api/players", (req, res) => {
	if(req.body) {
		return res.json(200, { "message": "Spieler wurde erfolgreich gespeichert" });
	} else {
		res.json(404, { "message": "Empty body is not allowed." });
	}
});

server.delete("/api/players:id", (req, res) => {
	var filtered = filter(players, function(o) {
		return !o.id === req.params.id;
	});
	players = filtered;
});

/*
//id muss noch eingefuegt werden
server.put("/api/players/:id", (req, res) => {
	if(req.body) {
		return res.json(200, { "message": "Spieler mit der ID ???? wurde erfolgreich geupdatet" });
	} 
});
*/

server.listen(process.argv[2], () => {
 console.log(`${server.name} is listening at ${server.url}`);
});