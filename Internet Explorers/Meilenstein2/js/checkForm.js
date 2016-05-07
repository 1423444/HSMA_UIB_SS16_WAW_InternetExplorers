/*
 * checkForm.js
 * 
 * This file is part of the Internet Explorers site.
 * Written by
 *   Johannes Heiler
 *   Lucas Kneis
 *   Tobias Juenemann
 * 
 * Last updated: 30. April 2016
 */

function isText(eingabe) {
	var rueckgabewert = true;
	var laengeEingabe = eingabe.length;
	
	if(laengeEingabe == 0) {
		rueckgabewert = false;
	} else {
		
		for(var i = 0; i < laengeEingabe; i++) {
			var zeichen = eingabe.charCodeAt(i);
			if(!(zeichen >= 65 && zeichen <= 122)) {
				rueckgabewert = false;
			}
		}
	}
   
	return rueckgabewert;
}

function checkVorname() {
	var eingabe = document.getElementsByName("vorname")[0].value;
	return isText(eingabe);
}

function checkNachname() {
var eingabe = document.getElementsByName("name")[0].value;
	
	return isText(eingabe);
}

function checkVerein() {
	var eingabe = document.getElementsByName("verein")[0].value;
	
	return isText(eingabe);
}

function checkHeadcoach() {
	var eingabe = document.getElementsByName("hcoach")[0].value;
	
	return isText(eingabe);
}

function checkAssistantcoach() {
	var eingabe = document.getElementsByName("acoach")[0].value;
	
	return isText(eingabe);
}

function checkRueckennummer() {
	var eingabe = document.getElementsByName("number")[0].value;
	var rueckgabewert = true;
	
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

function checkGeburtsjahr() {
	var eingabe = document.getElementsByName("jahr")[0].value;
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
	var rueckgabewert = true;
	
	if(checkVorname() == false) {
		rueckgabewert = false;
	}
	if(checkNachname() == false) {
		rueckgabewert = false;
	}
	if(checkVerein() == false) {
		rueckgabewert = false;
	}
	if(checkHeadcoach() == false) {
		rueckgabewert = false;
	}
	if(checkAssistantcoach() == false) {
		rueckgabewert = false;
	}
	if(checkRueckennummer() == false) {
		rueckgabewert = false;
	}
	if(checkGeburtsjahr() == false) {
		rueckgabewert = false;
	}
	
	if(rueckgabewert == false) {
		alert('Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben!');
	}
	
	return rueckgabewert;
}