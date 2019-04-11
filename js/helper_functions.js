jQuery(document).ready(function(){

	var game = new memoryGame();
		//Show the dialog that will set the initial values
		game.createDialog();

});

var logAction = function(message,value){
	//Used for debugging
	/*console.log(message);
	if (value != undefined) {
		console.log(value);
	};*/
};

var getJson = function(){

	//set up for future development
	jQuery.getJSON('http://www.andrejdeveloper.com/wp-json/wp/v2/media',function(data){
		alert(data);
	});
};


//unused for now
var addElementToContainerById = function(theElement,theContainerId){
	var container = jQuery("#" + theContainerId);
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
};

//Check if the dialog can be closed
var closeOrNot = function(playerNum,element){
	if (playerNum > 0){
		 //there is at least one player
		 jQuery( element ).dialog( "close" );
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
	if (jQuery("#" + input ).val() !== ""){
		return true;
	}
	else {
		return false;
	}
};

//get the value of a input field
var getValue = function(inputId,suppliedValue) {
	if (suppliedValue == undefined) {
		suppliedValue = false;
	};
	var value = jQuery( inputId ).val();
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

//Focus the cursor on a given element id
var addFocusToInput = function(inputId){
	jQuery(inputId).focus();
};