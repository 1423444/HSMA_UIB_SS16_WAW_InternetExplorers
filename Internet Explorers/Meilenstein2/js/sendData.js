/*
 * senData.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 10. Mai 2016
 */

function sendForm() {
	if(inputCheck() == true) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://139.59.134.26/api/players', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if(this.status == 200) {
				alert(this.response);
			}
		};
		xhr.send(addplayerform);
		
		}
}

