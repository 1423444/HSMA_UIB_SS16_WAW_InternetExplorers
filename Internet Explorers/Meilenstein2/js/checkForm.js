/*
 * checkForm.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 8.Mai 2016
 */

function isText(eingabe) {
	var rueckgabewert = true;
	
	if(eingabe.length == 0) {
		rueckgabewert = false;
	} else {
		for(var i = 0; i < eingabe.length; i++) {
			var zeichen = eingabe.charCodeAt(i);
			if(!(zeichen >= 65 && zeichen <= 122)) {
				rueckgabewert = false;
			}
		}
	}
   
	return rueckgabewert;
}

function checkRueckennummer(eingabe) {
	
	// Eingabe keine Zahl
	if(isNaN(eingabe)) {
		rueckgabewert = false;
	}
	
	// Wertebereich prüfen
	if(!(eingabe >= 4 && eingabe <= 15)) {
		rueckgabewert = false;
	}
	
	return rueckgabewert;
}
	
function checkGeburtsjahr(eingabe) {
	var rueckgabewert = true;
	
	// Jahr ermitteln
	var datum = new Date();
	var jahr = datum.getFullYear();
	
	// Wertebereich prüfen
	if(!(eingabe >= 0 && eingabe <= jahr)) {
		rueckgabewert = false;
	}
	return rueckgabewert;
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