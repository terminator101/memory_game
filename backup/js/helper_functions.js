$(document).ready(function(){
	//getJson();
	new dialog();
	//var newCard = new card("1a","0","DSC00634.jpg");
	//newCard.Element.appendTo('#cardsHolder');
	
	
	//getUiqueRandoms();
	//alert(generateRandom(4));
	//createDialog();
	//createCards("40");
	//cardArray[1].Object.checkState();
});

var getJson = function(){

	$.getJSON('http://www.andrejdeveloper.com/wp-json/wp/v2/media',function(data){
		alert(data);
	});
	//jQuery.get('http://www.andrejdeveloper.com/wp-json/wp/v2/media', function(data) {
   //console.log(data)
   //process text file line by line
	//var $link = jQuery( 'link[rel="http://www.andrejdeveloper.com/wp-json/wp/v2/media"]' );
	//var obj = JSON.parse($link);
	//alert(obj);
	//var api_root = $link.attr( 'href' );
};


var addElementToContainerById = function(theElement,theContainerId){
	var container = $("#" + theContainerId);
	theElement.appendTo(container);
}
/*var playerCounter = 0;
var computerNameArray = ["CPU1","CPU2","CPU3"];

//Create label, and input for a player
var addPlayer = function(number,type){
	var container = jQuery('<div />', {
		"class": "player" + number + "color"
	});
	var label = jQuery('<span/>',{
		html: "Player " + (number + 1) + " Name: <br />"
	});
	var input = jQuery('<input/>', {
		id: "player" + number,
		type: "text",
		maxlength: 10
	});
	var checkbox = jQuery('<input/>', {
		id: "computer" + number,
		type: "checkbox",
		value: "computer",
	});
	if(type == "computer"){
		checkbox.prop( "checked", true );
		input.prop("value", computerNameArray[playerCounter - 1]);
	};
	var checkboxLabel = jQuery('<span/>',{
		html: "Computer"
	});
	//Add the label to each container
	label.appendTo(container);
	//Add the input to each container
	input.appendTo(container);
	
	checkboxLabel.appendTo(container);
	checkbox.appendTo(container);
	playerCounter++;
	//Add the containers to the p[layerEntry div
	return container;
};

//display the initial dialog
var createDialog = function(){

	//var first = [];
	var leftMargin = 650;
	var playerNum = 0;
	var playerArray = [];
	
	var cardNumberlabel = jQuery('<span/>',{
		html: "Pick the Number of cards in the game:"
	});
	var selectorContainer = jQuery('<select/>', {
		id: "numberOfCards"
	});
	var addPlayerButton = jQuery('<input/>', {
		id: "addPlayer",
		type: "button",
		value: "Add Player",
		click: function(){
			if(playerCounter < 4){
				var newPlayer = addPlayer(playerCounter,"player");
		    	newPlayer.appendTo($("#playerInputContainer"));
			}
	    },
	});
	var addComputerButton = jQuery('<input/>', {
		id: "addComputer",
		type: "button",
		value: "Add Computer",
		click: function(){
			if(playerCounter < 4){
				var newPlayer = addPlayer(playerCounter,"computer");
				newPlayer.appendTo($("#playerInputContainer"));
			}
	    },
	});
	
	populateDropDown(selectorContainer,40);
	
	//var textValue = "12";
	
	//Add the text value to the input
	//textValue.appendTo(input);
	
	//Add the label to the container
	cardNumberlabel.appendTo($("#cardNumberContainer"));
	//Add the options to the selector
	//input.appendTo(selectorContainer);
	//Add the selector to the container
	selectorContainer.appendTo($("#cardNumberContainer"));
	
	var firstPlayer = addPlayer(playerCounter,"");
	firstPlayer.appendTo($("#playerInputContainer"));
	
	addPlayerButton.appendTo($("#playerButtonContainer"));
	addComputerButton.appendTo($("#playerButtonContainer"));
	
	//generate 4 inputs to allow 4 players to play
	for (var i = 0; i < 4; i++){
		containers[i] = addPlayer(i,"");
		containers[i].appendTo($("#playerEntry"));
			containers[i] = jQuery('<div/>', {
				"class": "player" + i + "color"
		});
		var label = jQuery('<span/>',{
			html: "Player " + (i + 1) + " Name: <br />"
		});
		var input = jQuery('<input/>', {
			id: "player" + i,
			type: "text",
			maxlength: 10
		});
		var checkbox = jQuery('<input/>', {
			id: "computer" + i,
			type: "checkbox",
			value: "computer"
		});
		var checkboxLabel = jQuery('<span/>',{
			html: "Computer"
		});
		//Add the label to each container
		label.appendTo(containers[i]);
		//Add the input to each container
		input.appendTo(containers[i]);
		
		checkboxLabel.appendTo(containers[i]);
		checkbox.appendTo(containers[i]);
		//Add the containers to the p[layerEntry div
		containers[i].appendTo($("#playerEntry"));
	}
	
	$(function() {
		$( "#playerEntry" ).dialog({
			 modal: true,
			 minWidth: 380,
			 buttons: {
				 Ok: function() {
					 playerNum = checkNumberPlayers();
					 closeOrNot(playerNum,this);
				 }
				,
				//Still need to work on this
				//Restart: function() {
				// $( this ).dialog( "close" );
				 //restartGame();
			 	//}
			 },
			 open: function() {
			    $("#playerEntry").keypress(function(e) {
			      if (e.keyCode == $.ui.keyCode.ENTER) {
			    	 playerNum = checkNumberPlayers();
			    	 closeOrNot(playerNum,this);
			      }
			    });
			  },
			 //Function that happens before the dialog is closed
			 beforeClose: function( event, ui ) {},
			 //function that happens after the dialog is closed
			 close: function(event, ui) {
				var numberOfCards = getValue('numberOfCards');
				if (numberOfCards%2 == 0){
					//loop through the number of players
					for(var i = 0; i < playerNum; i++){
						//Create new player
						playerArray[i] = new player(i,$("#player" + i).val(),$("#computer" + i).prop('checked'));
						
						playerArray[i].Object.setPlayerCssClass("player" + i + "color");
						//Add the player Element to the container
						playerArray[i].Element.appendTo('#playersContainer');
						//Add the name of the player to a label
						$("#player" + i + "label").append($("#player" + i).val());
						leftMargin -= (i * 2 * 20);
					}
					$('#playersContainer').css("margin-left", leftMargin + "px");
					//console.log(playerArray);
					new memoryGame(playerArray,getValue('numberOfCards'));
					//Set the first player as current
					
					//playerArray[0].Object.setPlayerAsCurrent();
					
					//displayCurrentPlayer(playerArray[currentPlayerId].Name);
					//createCards(getValue('numberOfCards'));
				} else {
					alert("The number of cards must be even!");
					return;
				}
			}
		});
	});
};*/

//randomize an array
var randomizeArray = function(theArray){
	//theArray.sort(function()
	//{
	//	return 0.5 - Math.random();
	//});
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

var getUiqueRandoms = function(){
	var theArray = [];
	for(var i = 0; i<10; i++){
		//console.log(generateRandom(10));
		theArray.push(i);	
	};
	//theArray.sort(function () { return Math.random() - 0.5; });
	//for(var i = 0; i<theArray.length; i++){
		//console.log(theArray[i]);
	//};
	//theArray.
	for(var i = 0; i<theArray.length; i++){
		console.log(theArray);
		random = generateRandom(theArray.length - 1);
		console.log("Array Item: " + theArray[random] + " |Number: " + random);
		theArray.splice(random, 1);
		console.log("Array Length: " + theArray.length);
		//console.log(random - 1);
	}
};

//Open a random card
var openRandom = function(maxRange,theArray){
	var random = generateRandom(cardArray.length);
	cardArray[random].Object.checkState();
	//console.log(theObject);
	//theObject.checkState();
};

//populate the drop down menu
//Function moved to dialog.js
/*var populateDropDown = function(selector,totalNumberOfCards) {
	var minimumNumberOfCards = 4;
	var selectedOption = '';
  for (var i = minimumNumberOfCards; i < (totalNumberOfCards + 2); i = i+2){
	  if(i == 12){
		  selectedOption = "selected";  
	  } else {
		  selectedOption = '';
	  }
	  $(selector)
	  .append('<option ' + selectedOption +' value="' + i + '">' + i + '</option>');
  }
};*/

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

//display the final result
/*var createResult = function(){
	var resultText = jQuery('<div/>', {
		html: "Game Over <br />" + playerArray[currentPlayerId].Name + " is the winner!!"
	});
	resultText.appendTo($("#result"));
	$(function() {
		$( "#result" ).dialog({
			 modal: true,
			 buttons: {
				 Ok: function() {
					 $( this ).dialog( "close" );
				 },
				 //Still need to work on this
				 //Restart: function() {
				//	 $( this ).dialog( "close" );
				//	 restartGame();
				 //}
			 }
		});
	});
};*/

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
var getValue = function(input) {
	var value = $("#" + input ).val();
	if (value !== ""){
		return value;
	}
	else {
		return false;
	}
};

var addFocusToInput = function(inputId){
	$(inputId).focus();
};

//display the player who currently has a turn
/*var displayCurrentPlayer = function(name){
	$("#currentPlayer").text(name);
};*/

/*//blocker used to prevent interaction with any of the cards
var displayBlocker = function(state){
	var blocker = jQuery('<div/>', {
		id: "blocker",
	});
	if (state == "show"){
		blocker.appendTo("body");
	}else{
		$("#blocker").detach();
	}
};*/

//create all the cards, requires even number
/*var createCards = function(theNumberOfCards){
	//create the cards only if the number entered is even
	if (theNumberOfCards%2 == 0){
		//get the number of pairs be dividing the number of cards
		numberOfPairs = theNumberOfCards / 2;
		//randomize the the image array to ensure that the images are alwasy random
		cardImagesArray = randomizeArray(cardImagesArray);
		//generate 2 cards that will use the same image
		for(var i = 0; i < numberOfPairs; i++){
			//put each card into an array
			cardArray.push(theCardFirst = new card(i,i + "a"));
			cardArray.push(theCardSecond = new card(i,i + "b"));
		}
		//randomize the array that holds the cards to ensure that they are all over the board
		cardArray = randomizeArray(cardArray);
		
		for(var i = 0; i < theNumberOfCards; i++){
			//append each card element to the  board
			cardArray[i].Element.appendTo('#cardsHolder'); 
			//append each card object to the array
			cardArray[i].Object.setArrayItemId(i);
			
			//cardArray[i].Object.displayArrayItemId();
		}
		
	} else {
		//the number is odd so display alert
		alert("The number of cards must be even!");
		return;
	};
};*/

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
	removeChildNodes("playersContainer");
	
	createDialog();
};