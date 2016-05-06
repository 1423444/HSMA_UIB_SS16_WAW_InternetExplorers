/*
 * datenEmpfangen.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 30. April 2016
 */

function ladeTabelle() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://139.59.134.26/api/players');
	xhr.responseType = 'json';
	xhr.onload = function(e) {
		var data = xhr.response();
		if(data != null) {
			//console.log(this.response);
			alert(data);
		}
	};
	xhr.send(null);
}
