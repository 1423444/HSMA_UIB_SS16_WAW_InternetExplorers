/*
 * checkForm.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 10. Mai 2016
 */

function isText(eingabe) {
	var regex = /^[a-zA-ZäüöÄÜÖ]+$/;
	
	if(eingabe.length == 0) { 
		return false;
	} else {
		if(!eingabe.match(regex)) {
			return false;
			}
		}  
		
	return true;
}
	


function checkRueckennummer(eingabe) {
	
	// Eingabe keine Zahl
	if(isNaN(eingabe)) {
		return false;
	}
	
	// Wertebereich prüfen
	if(!(eingabe >= 4 && eingabe <= 15)) {
		return false;
	}
	
	return true;
}
	
function checkGeburtsjahr(eingabe) {
	
	// Jahr ermitteln
	var datum = new Date();
	var jahr = datum.getFullYear();
	
	// Wertebereich prüfen
	if(!(eingabe >= 0 && eingabe <= jahr)) {
		return false
	}
	
	return true;
}

function inputCheck() {
	
	var vorname = document.getElementsByName("vorname")[0].value;
	var nachname = document.getElementsByName("name")[0].value;
	var verein = document.getElementsByName("verein")[0].value;
	var hcoach = document.getElementsByName("hcoach")[0].value;
	var acoach = document.getElementsByName("acoach")[0].value;
	var nummer = document.getElementsByName("number")[0].value;
	var jahr = document.getElementsByName("jahr")[0].value;
	
	if (!isText(vorname) || !isText(nachname) || !isText(verein) || !isText(hcoach)
		|| !isText(acoach) || !checkRueckennummer(nummer) || !checkGeburtsjahr(jahr)){
				 
		 alert('Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben!');
		 
		 return false;
	}
	
	return true;
}

function sendForm() {
	if(inputCheck() == true) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost/api/players', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if(this.status == 200) {
				alert(this.response);
			}
		};
		xhr.send(addplayerform);
		
		}
}

