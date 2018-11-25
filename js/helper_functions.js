$(document).ready(function(){

	var game = new memoryGame();
		game.createDialog();

});

var logAction = function(message,value){
	/*console.log(message);
	if (value != undefined) {
		console.log(value);
	};*/
};

var getJson = function(){

	$.getJSON('http://www.andrejdeveloper.com/wp-json/wp/v2/media',function(data){
		alert(data);
	});
};


var addElementToContainerById = function(theElement,theContainerId){
	var container = $("#" + theContainerId);
	theElement.appendTo(container);
}

//randomize an array
var randomizeArray = function(theArray){
	var currentIndex = theArray.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle
	while (0 !== currentIndex) {
	
		// Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
	
		// And swap it with the current element
		temporaryValue = theArray[currentIndex];
		theArray[currentIndex] = theArray[randomIndex];
		theArray[randomIndex] = temporaryValue;
	}
	return theArray;
};

//Generate a random number
var generateRandom = function(range){
	var random = Math.floor((Math.random() * range) + 1);
	return random;
};

//Open a random card
var openRandom = function(maxRange,theArray){
	var random = generateRandom(cardArray.length);
	cardArray[random].Object.checkState();
	//console.log(theObject);
	//theObject.checkState();
};

//Check if the dialog can be closed
var closeOrNot = function(playerNum,element){
	if (playerNum > 0){
		 //there is at least one player
		 $( element ).dialog( "close" );
	 }
	 else {
		 alert ("Player one must have a name!");
	 }
};

//check the number of players
var checkNumberPlayers = function(){
	var counter = 0;
	for (var i = 0; i < 4; i++){
		if (checkInput("player" + i) == true){
			counter++;
		}else{
			return counter;
		}
	}
	return counter;
};

//check if the input field is empty
var checkInput = function(input) {
	if ($("#" + input ).val() !== ""){
		return true;
	}
	else {
		return false;
	}
};

//get the value of a input field
var getValue = function(input,suppliedValue) {
	if (suppliedValue == undefined) {
		suppliedValue = false;
	};
	var value = $("#" + input ).val();
	if (value !== "" || value !== undefined){
		return value;
	}
	else {
		if (suppliedValue != false) {
			return suppliedValue;
		}
		return false;
	}
};

var addFocusToInput = function(inputId){
	$(inputId).focus();
};

//Remove 
var removeChildNodes = function(ElementID){
	var element = document.getElementById(ElementID);
	if (element.hasChildNodes()) {
		element.removeChild(element.firstChild);
	}
};

var restartGame = function(){
	cardArray = [];
	playerArray = [];
	$( "#playerEntry" ).dialog( "destroy" );
	removeChildNodes("playerEntry");
	removeChildNodes("currentPlayer");
	removeChildNodes("cardsHolder");
	removeChildNodes("playerHolder");
	
	createDialog();
};