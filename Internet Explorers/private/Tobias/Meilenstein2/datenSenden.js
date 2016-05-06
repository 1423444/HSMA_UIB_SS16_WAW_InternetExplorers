/*
 * datenSenden.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 30. April 2016
 */

function sendForm() {
	if(inputCheck() == true) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://139.59.134.26/api/players', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if(this.status == 200) {
				//console.log(this.response);
				alert(this.response);
			}
		};
		xhr.send(addplayerform);
	}
}
