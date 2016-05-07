/*
 * createTable.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 06. May 2016
 */

function ladeTabelle(param) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://139.59.134.26/api/players' + param);
	xhr.responseType = 'json';
	xhr.onload = function(e) {
		var data = xhr.response;
		
		if(data != null) {
			// Alte Werte löschen
			while(document.getElementById('players').rows.length > 2) {
				document.getElementById('players').deleteRow(2);
			}
			
			// Neue Werte schreiben
			for(varia = 0; i < data.length; i++) {
				var nummer = i + 2;
				
                var tr = document.getElementById('players').insertRow(nummer);
                var tdName = document.createElement('td');
                var tdVerein = document.createElement('td');
                var tdCoach = document.createElement('td');
				var tdPosition = document.createElement('td');
				var tdNummer = document.createElement('td');
				var tdJahr = document.createElement('td');
				
                tdName.innerHTML = data[i].name;
				tdVerein.innerHTML = data[i].club;
				tdCoach.innerHTML = data[i].coach;
				tdPosition.innerHTML = data[i].position;
				tdNummer.innerHTML = data[i].number;
				tdJahr.innerHTML = data[i].year;
                
				tr.appendChild(tdName);
				tr.appendChild(tdVerein);
				tr.appendChild(tdCoach);
				tr.appendChild(tdPosition);
				tr.appendChild(tdNummer);
				tr.appendChild(tdJahr);
			}
		}
	};
	xhr.send(null);
}
