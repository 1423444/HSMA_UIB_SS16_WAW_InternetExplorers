
function checkText(eingabe) {
	//checks if input matches a set of characters
	var letters = /^[A-Za-z]+$/; 
	if(eingabe.value.match(letters)){
		return true;
	} else {
		alert('Please input alphabet characters only')
		return false;
	}
}

function checkBacknumber(eingabe){
	//is Integer
	if(isInteger(eingabe)){
		alert('Please input integer numbers 4-15 only');
		return false;
	}
	//Wertebereich
	if(eingabe<4||eingabe>15){
		alert("Please input integer numbers 4-15 only");
		return false;
	}

	return true;

}

function checkYear(eingabe){
	var text = /^[0-9]+$/;
	//input is not 0
	if(eingabe != 0){
		//input is not empty, only numeric values
		if((eingabe != "") && (!text.test(eingabe))){

			alert("Please enter numeric values only");
			return false;
		}
		//input is only integers
		if(eingabe.length != 4){
			alert("Year enter four-digit numbers only");
		}
		var current = new Date().getFullYear();
		//input is a valid birthyear
		if((eingabe<1900) || (eingabe>current)){
			alert("Please enter a year between 1900 and the current year");
			return false;
		}
		return true;
	}

	function checkAddPlayer(){
	var vorname = document.getElementsByName("vorname")[0].value;
	var nachname = document.getElementsByName("name")[0].value;
	var verein = document.getElementsByName("verein")[0].value;
	var hcoach = document.getElementsByName("hcoach")[0].value;
	var acoach = document.getElementsByName("acoach")[0].value;
	var nummer = document.getElementsByName("number")[0].value;
	var jahr = document.getElementsByName("jahr")[0].value;

	//checks all inputvalues
	if (!checkText(vorname) || !checkText(nachname) || !checkText(verein) || !checkText(hcoach)
		|| !checkText(acoach) || !checkBacknumber(nummer) || !checkYear(jahr)){
				 
		 alert('Your input is invalid at some point! Please check!');
		 
		 return false;
	}
	
	return true;
}

}