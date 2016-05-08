/*
 * createTable.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 08. Mai 2016
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
			for(var a = 0; a < data.length; a++) {
				var nummer = a + 2;
				
                var tr = document.getElementById('players').insertRow(nummer);
                var tdName = document.createElement('td');
                var tdVerein = document.createElement('td');
                var tdCoach = document.createElement('td');
				var tdPosition = document.createElement('td');
				var tdNummer = document.createElement('td');
				var tdJahr = document.createElement('td');
				
                tdName.innerHTML = data[a].name;
				tdVerein.innerHTML = data[a].club;
				tdCoach.innerHTML = data[a].coach;
				tdPosition.innerHTML = data[a].position;
				tdNummer.innerHTML = data[a].number;
				tdJahr.innerHTML = data[a].year;
                
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

function changer(type){
	if(type == 'all'){
		ladeTabelle('');
		document.getElementById('all').style.backgroundColor = '#3e8e41';
		document.getElementById('favorites').style.backgroundColor = '#dc143c';
	}
	
	if (type == 'favorites'){
		ladeTabelle('?favorites=true');
		document.getElementById('favorites').style.backgroundColor = '#3e8e41';
		document.getElementById('all').style.backgroundColor = '#dc143c';
	}
}
	
	
	
	
	
