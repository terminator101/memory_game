/////////////////
// Main function that will create the memory game
/////////////////
var memoryGame = function(){
	/*let defaults = {
		blockerState  : "hide",
		cardsHolder	  : $("#cardsHolder"),
		rematchButton : $("#rematchGame"),
		resultDialog  : $('#result')
	}*/
	this.theDialog = '';
	this.currentPlayerId = 0;
	this.blockerState = "hide";

	//set the cards
	this.cardArray = [];
	this.currentPlayerElement = $("#currentPlayer");
	this.cardsHolder 		  = $("#cardsHolder");
	this.playerHolderElement  = $("#playerHolder");
	this.rematchButton 		  = $("#rematchGame");
	this.resetButton 		  = $("#resetGame");
	this.resultDialog 	      = $('#result');
	this.resultContainer      = $('#resultContainer');

	this.playerEntryContainer 	= $("#playerEntryContainer");
	this.finalDialogContainer 	= $("#finalContainer");

	this.previouslyFlippedCards = [];

	this.gameOver 		   = false;
	this.arrayForRandom    = [];
	this.numberOfPairs     = null;
	this.totalScore 	   = 0;
	this.firstValue 	   = "empty";
	this.secondValue 	   = "empty";
	this.firstId 		   = "";
	this.secondId 		   = "";
	this.firstArrayItemId  = "";
	this.secondArrayItemId = "";

	this.setRematchButton();
	this.setResetButton();
	
	return this;
};


//Not backwards compatible
//memoryGame.prototype.setParamethers = function(numberOfCards,gameTheme, {players = [], contaierId} = {} ){
memoryGame.prototype.setParamethers = function(numberOfCards,gameTheme, players, contaierId){
	var that = this;
	that.numberOfCards = numberOfCards;
	that.setGameTheme(gameTheme);
	that.playerArray = players;
	that.contaierId = contaierId;
};

memoryGame.prototype.createDialog = function(){
	var that = this;
	that.theDialog = new dialog('playerEntry',that);
	that.theDialog.addDialogElements();
	that.theDialog.execute();
	$('#result').hide();
};

memoryGame.prototype.execute = function(){
	var that = this;
	that.createCards();
	that.storePlayers(that.playerArray);
	that.addToPlayerContainer(that.contaierId);
	that.start();
};

memoryGame.prototype.start = function(){
	var that = this;
	that.playerArray[0].setPlayerAsCurrent();
	that.displayCurrentPlayer(that.playerArray[0]);
	that.createTurn("current");
}

memoryGame.prototype.setGameTheme = function(gameTheme){
	var that = this;
	switch(gameTheme){
	case "Cats":
		this.cardImagesArray = ['DSC00634.jpg','DSC00645.jpg','DSC01100.jpg','DSC01324.jpg','DSC01673.jpg',
	                    	'DSC01674.jpg','DSC01679.jpg','DSC01688.jpg','DSC01745.jpg','DSC01775.jpg',
	                    	'DSC01807.jpg','DSC02011.jpg','DSC02067.jpg','DSC02081.jpg','DSC02092.jpg',
	                    	'DSC02093.jpg','DSC02185.jpg','DSC02204.jpg','DSC02223.jpg','DSC02229.jpg'];
	    this.placeholderImage = "DSC02429.jpg";
		break;
	case "Grampa dog":
		this.cardImagesArray = ['IMG_0754.jpg','IMG_0766.jpg','IMG_0784.jpg','IMG_0796.jpg','IMG_0749.jpg',
							'IMG_0812.jpg','IMG_0843.jpg','IMG_0713.jpg','IMG_3866.jpg','IMG_0903.jpg',
							'IMG_6094.jpg','IMG_6425.jpg','Grampa-on-chair.jpg','IMG_0663.jpg','IMG_0696.jpg',
							'IMG_0705.jpg','IMG_0710.jpg','IMG_0848.jpg','IMG_0850.jpg','IMG_0748.jpg'];
		this.placeholderImage = "IMG_0711.jpg";
		break;
	}
};

//Player functions
//Not backwards compatible
//memoryGame.prototype.storePlayers = function(playerArray = []){
memoryGame.prototype.storePlayers = function(playerArray){
	var that = this;
	//Set the players
	that.playerArray = playerArray;
	//Set the first player as current
};

memoryGame.prototype.setRematchButton = function(){
	var that = this;
	that.rematchButton.click(function(){
		that.resultDialog.hide();
		that.rematch();
	});
};

memoryGame.prototype.rematch = function(){
	var that = this;
	logAction("rematch");
	that.clearResults();
	that.resetScores();
	that.resetCurrentPlayer();
	that.gameOver = false;

	that.createCards();
	that.start();
};

memoryGame.prototype.setResetButton = function(){
	var that = this;
	that.resetButton.click(function(){
		that.resultDialog.hide();
		that.reset();
	});
};

memoryGame.prototype.reset = function(){
	var that = this;
	logAction("reset");
	that.clearResults();
	that.resetScores();
	that.resetCurrentPlayer();
	that.gameOver = false;
	
	//If the dialog has been created, reset the players
	if (that.theDialog != '') {
		that.theDialog.resetPlayers();
	} else {
		that.createDialog();
	};
	that.theDialog.showDialog();
	that.playerHolderElement.empty();
};

memoryGame.prototype.addToPlayerContainer = function(containerId){
	var that = this;
	for (var i = 0 ; i < that.playerArray.length; i++) {
		var playerId   = that.playerArray[i].getPlayerId();
		var playerName = that.playerArray[i].getPlayerName();

		var container = that.createContainer(playerId,playerName,that.playerArray.length);
		container.appendTo(containerId);
	}
};

memoryGame.prototype.createContainer = function(playerId,playerName,numberOfPlayers){
	var that = this;
	var cssClass = that.setContainerClass(numberOfPlayers);

	var container = jQuery('<div/>', {
		id: "player" + playerId + "container",
		"class": "playercontainer " + "player" + playerId + "color " + cssClass
	});
	var text = jQuery('<span/>', {
		id: "player" + playerId + "label",
		"class": "playerlabel",
		html: playerName
	});
	var theScoreHolder = jQuery('<input/>', {
		type: "text",
		readonly: "readonly",
		"class": "playerscore",
		id: "player" + playerId + "score",
		value: 0
	});

	text.appendTo(container);
	theScoreHolder.appendTo(container);
	return container;
};

memoryGame.prototype.setContainerClass = function(numberOfPlayers){
	var cssClass;
	switch(numberOfPlayers){
	case 1:
		cssClass = "col-lg-12";
		break;
	case 2:
		cssClass = "col-md-6";
		break;
	case 3:
		cssClass = "col-sm-4";
		break;
	case 4:
		cssClass = "col-sm-3";
		break;
	}
	return cssClass;
};


//Card functions
memoryGame.prototype.createCards = function(){
	var that = this;
	//get the number of pairs be dividing the number of cards
	that.numberOfPairs = that.numberOfCards / 2;
	//randomize the the image array to ensure that the images are always random
	that.cardImagesArray = randomizeArray(that.cardImagesArray);

	//generate 2 cards that will use the same image
	for(var i = 0; i < that.numberOfPairs; i++){
		//put each card into an array
		that.cardArray.push(theCardFirst = new card(i,i + "a",that.cardImagesArray[i],that.placeholderImage));
		that.cardArray.push(theCardSecond = new card(i,i + "b",that.cardImagesArray[i],that.placeholderImage));
	}
	
	//randomize the array that holds the cards to ensure that they are all over the board
	that.cardArray = randomizeArray(that.cardArray);
	
	for(var i = 0; i < that.numberOfCards; i++){
		//append each card element to the  board
		that.cardArray[i].getElement().appendTo(that.cardsHolder);
		//append each card object to the array
		that.cardArray[i].setArrayItemId(i);
		that.setOnClick(that.cardArray[i].getPlaceholder(), i, that.numberOfCards);
	}
};

//Get the current player
memoryGame.prototype.getCurrentPlayerId = function(){
	var that = this;
	for (var i=0; i< that.playerArray.length; i++){
		if(that.playerArray[i].getPlayerState() == "current"){
			return that.playerArray[i].getPlayerId();
		};
	}
};

//Display the current player
memoryGame.prototype.displayCurrentPlayer = function(playerObject){
	var that = this;
	var name = playerObject.getPlayerName();
	var cssClass = playerObject.getPlayerCssClass();
	that.currentPlayerElement.text(name);
	that.currentPlayerElement.attr( "class", cssClass );
};

//Add on clikk event to a card
memoryGame.prototype.setOnClick = function(triggerElement,arrayItemId,totalElements){
	var that = this;
	$(triggerElement).click(function(){
		that.checkCardState(that.cardArray,arrayItemId);
		//alert(triggerElement);
		//loop through all elements
		/*for (var i = 0; i < totalElements; i++){
			//current element in the array has been found so work with it
			if (currentNumber === i){
				//highlight or remove the highlight from the heading that was clicked on, and hide or show the slide element belonging to it
				that.checkCardState(currentNumber);
				//setActiveHidden(triggerElementArray[currentNumber],targetElementArray[currentNumber]);
			}
			f//all other elements will have either highlight removed or will be hidden
			else {
				//remove highlight from all other heading elements
				hideRemovehighlight(triggerElementArray[i],"heading");
				//hide all other slide elements
				hideRemovehighlight(targetElementArray[i],"slide");
			}
		}*/
	});
};

//check the state of a card
memoryGame.prototype.checkCardState = function(theArray,theArrayItemId){
	
	var that = this;
	
	//that.previouslyFlippedCards.push(theArray[theArrayItemId]);
	//var list;
	//for(var i = 0; i < that.previouslyFlippedCards.length; i++){
	//	list =+ i;
		//list =+ that.previouslyFlippedCards[i].Object.getId() + ",";
	//};
	theArray[theArrayItemId].setPreviouslyOpened();
	
	if (that.firstValue == "empty"){
		//first card has been picked so save its value
		that.firstValue = theArray[theArrayItemId].getValue();
		//save its Id
		that.firstId = theArrayItemId;
		//hide the placeholder for first card, and show the image
		theArray[theArrayItemId].hideElement("placeholder");
		theArray[theArrayItemId].showElement("hiddenImage");
	} 
	else
	if (that.secondValue == "empty"){
		//second card has been picked so save its value
		that.secondValue = theArray[theArrayItemId].getValue();
		//save its Id
		that.secondId = theArrayItemId;
		//hide the placeholder for second card, and show the image
		theArray[theArrayItemId].hideElement("placeholder");
		theArray[theArrayItemId].showElement("hiddenImage");
		
		//make sure that a card can't be picked twice
		if (that.firstId != that.secondId){
			//compare the values of the two cards
			that.compareCardValues(theArray);
			//reset the global value
			that.firstValue = "empty";
			that.secondValue = "empty";
		}
		else {
			that.secondValue = "empty";
		}
	} 
	/*if (that.flippedCardArray.length == 0){
		that.flippedCardArray.push(theArray[theArrayItemId]);
		that.firstValue = that.flippedCardArray[0].Object.getValue();
		that.firstId = that.flippedCardArray[0].Object.getId();
		//that.firstArrayItemId = that.flippedCardArray[0].Object.getArrayItemId();
		//alert(theArrayItemId);
		//console.log("First: " + theArrayItemId);
		that.flippedCardArray[0].Object.hideElement("placeholder");
		that.flippedCardArray[0].Object.showElement("hiddenImage");	
	} 
	else 
	if (that.flippedCardArray.length == 1 && (theArray[theArrayItemId].Object.getId() != that.firstId)){
		that.flippedCardArray.push(theArray[theArrayItemId]);
		that.secondValue = that.flippedCardArray[1].Object.getValue();
		that.secondId = that.flippedCardArray[1].Object.getId();
		//that.secondArrayItemId = that.flippedCardArray[1].Object.getArrayItemId();
		//console.log(theArrayItemId + "||");
		//console.log("Second: " + theArrayItemId);
		that.flippedCardArray[1].Object.hideElement("placeholder");
		that.flippedCardArray[1].Object.showElement("hiddenImage");
		
		that.compareCardValues(theArray);
	}*/
};

//compare the card values
memoryGame.prototype.compareCardValues = function(theArray){
	var that = this;
	//prevent the user from clicking on more than two cards
	that.toggleBlocker();
	//that.displayBlocker("show");
	//console.log(that.firstValue + "||" + that.secondValue);
	if (that.firstValue != that.secondValue){
		//the values do not match so wait 1500 milliseconds and then show the placeholders
		setTimeout(function(){
			theArray[that.firstId].hideElement("hiddenImage");
			theArray[that.firstId].showElement("placeholder");
			theArray[that.secondId].hideElement("hiddenImage");
			theArray[that.secondId].showElement("placeholder");
			//that.firstArrayItemId
			//for(var i=0;i < that.flippedCardArray.length; i++){
			//	that.flippedCardArray[i].Object.hideElement("hiddenImage");
			//	that.flippedCardArray[i].Object.showElement("placeholder");
			//}
			//that.flippedCardArray = [];
			if (that.playerArray.length > 1){
				//there are multiple players so switch to the next one
				that.createTurn("next");
				//that.goNextPlayer();
			} else {
				that.createTurn("current");
			}
			
			//console.log('Length of open: ' + that.flippedCardArray.length);
			//allow the user to click on cards once again
			that.toggleBlocker();
			//that.displayBlocker("hide");
		},1700);
	}
	else 
	if (that.firstValue == that.secondValue){
		//the values match so wait 500 milliseconds and then hide the images and increase score
		
		setTimeout(function(){
			//for(var i=0;i < that.flippedCardArray.length; i++){
				//that.flippedCardArray[i].Object.hideElement("card");
				
				//that.cardArray.splice(that.flippedCardArray[i].Object.getArrayItemId, 1);
				//that.flippedCardArray.splice(i, 1);
			//}
			theArray[that.firstId].hideElement("card");
			theArray[that.secondId].hideElement("card");
			//theArray[that.firstId].Object.removeCard();
			//theArray[that.secondId].Object.removeCard();
			/*for(var i=0; i < that.cardArray.length; i++){
				switch(that.cardArray[i].Object.getValue()){
				case that.firstValue:
				case that.secondValue:
					that.cardArray.splice(i, 1);
				}
			}*/
			
			//that.cardArray.splice(that.secondId, 1);
			//Both first and second values match so increase the score for the current player
			var result = that.increaseScore();
			if (result !== false) {
				that.createTurn("current");
			}
			that.toggleBlocker();
			//console.log('Length of open: ' + that.flippedCardArray.length);
			//allow the user to click on cards once again
			
			//that.displayBlocker("hide");
		},500);
	}
	//alert("test");
	
	
};

memoryGame.prototype.goNextPlayer = function(){
	var that = this;
	//Get the current player
	that.currentPlayerId = that.getCurrentPlayerId();

	//set the current player as previous
	if (that.currentPlayerId < (that.playerArray.length - 1)){

		that.playerArray[that.currentPlayerId].setPlayerAsPrevious();
		that.currentPlayerId += 1;
		that.playerArray[that.currentPlayerId].setPlayerAsCurrent();
	} else {
		that.currentPlayerId = 0;
		that.playerArray[0].setPlayerAsCurrent();
		//that.playerArray[that.playerArray.length - 1].Object.setPlayerAsPrevious();
	}
	that.displayCurrentPlayer(that.playerArray[that.currentPlayerId]);
	that.createTurn("current");
	
};

memoryGame.prototype.createTurn = function(type){
	var that = this;
	switch(type){
	case "current":
		if(that.playerArray[that.currentPlayerId].getPlayerType() == 'computer'){
			logAction("Computer Turn");
			that.goComputer();
		} else {
			logAction("Human Turn");
		}
		break;
	case "next":
		that.goNextPlayer();
		break;
	case "end":
		break;
	}
};

///////////////////////////////////////
// Computer AI Start
///////////////////////////////////////

//The computer turn
memoryGame.prototype.goComputer = function(){
	var that = this;

	//Make sure that a person cannot affect the computer turn
	that.toggleBlocker();

	//Create array that will hopd all possible cards
	var possibleCardNumbers = that.SetPossibleCardArray();

	var randomNumber = generateRandom(2);
	var makeMistake = false;
	
	if(randomNumber == 1){
		makeMistake = true;
	};

	//Make sure that there are any possible cards left
	if(possibleCardNumbers.length != 0){
		
		//create array that will hold all matched cards from the possible cards
		var openCards = that.createMatchingCardsArray(possibleCardNumbers);
		
		//There weren't any matches found so open a random card
		if(openCards == false){
			var uniqueAndUnopenedCardNumbers = that.setPossibleAndUnopenedCardArray();
			if (uniqueAndUnopenedCardNumbers.length != 0) {
				that.openRandomCard(uniqueAndUnopenedCardNumbers,uniqueAndUnopenedCardNumbers.length);
			} else {
				that.openRandomCard(possibleCardNumbers,possibleCardNumbers.length)
			}
		} else {
			that.checkCardState(that.cardArray,openCards[0].getArrayItemId());
		}
		
		//that.compareCardValues();
		setTimeout(function(){
			possibleCardNumbers = that.SetPossibleCardArray();
			//that.findPreviousAndPossibleCards(possibleCardNumbers);
			//var openCardTwo = that.createMatchingCardsArray(possibleCardNumbers);
			if(openCards == false || makeMistake == true){
				var uniqueAndUnopenedCardNumbers = that.setPossibleAndUnopenedCardArray();
				if (uniqueAndUnopenedCardNumbers.length != 0) {
					that.openRandomCard(uniqueAndUnopenedCardNumbers,uniqueAndUnopenedCardNumbers.length);
				} else {
					that.openRandomCard(possibleCardNumbers,possibleCardNumbers.length)
				}
			}
			else {
				that.checkCardState(that.cardArray,openCards[1].getArrayItemId());
			}
			//console.log("Possible Card Numbers:" + possibleCardNumbers);
			//that.checkCardState(possibleCards,that.cardArray.length - 1);
			//that.openRandomCard(possibleCardNumbers,possibleCardNumbers.length);
		},1700);
	} else {
		logAction("No possible cards left");
	}
};


//Create array that will hold all possible cards
memoryGame.prototype.SetPossibleCardArray = function(){
	var that = this;
	var possibleCardNumbers = [];
	
	//Loop through all of the cards
	for(var i=0; i<that.cardArray.length; i++){
		//A card has been found with state set as possible so add it to an array
		if(that.cardArray[i].getCardState() == "possible"){
			possibleCardNumbers.push(that.cardArray[i].getArrayItemId());
		}
	}
	return possibleCardNumbers;
};

memoryGame.prototype.createMatchingCardsArray = function(possibleCardNumbers){
	var that = this;
	//Get all the cards that are an option as well as all previously opened cards
	var previousAndPossibleCards = that.findPreviousAndPossibleCards(possibleCardNumbers);

	//Find the first two previously opened cards that have the same value
	var openTheseCards = that.findMatch(previousAndPossibleCards);
	
	if(openTheseCards == false){
		logAction("No match");
		return false;
	} else {
		var matchedCards = [];
		for(var i = 0; i<openTheseCards.length; i++){
			matchedCards.push(openTheseCards[i]);
		}
		return matchedCards;
	}
};

//Create array that will hold all possible and previously unopened cards
memoryGame.prototype.setPossibleAndUnopenedCardArray = function(){
	var that = this;
	var possibleAndUnopenedCardNumbers = [];
	
	for(var i=0; i<that.cardArray.length; i++){
		if(that.cardArray[i].getCardState() == "possible" && that.cardArray[i].getPreviouslyOpened() == false){
			possibleAndUnopenedCardNumbers.push(that.cardArray[i].getArrayItemId());
		}
	}
	return possibleAndUnopenedCardNumbers;
};

memoryGame.prototype.findPreviousAndPossibleCards = function(possibleCardNumbers){
	var that = this;
	var possiblePairs = [];
	
	//Loop through the card array
	for(var i=0; i<that.cardArray.length; i++){
		//Find out if the card array item id matches the one in the possible cards array
		for(var m=0; m<possibleCardNumbers.length; m++){
			//the possible card id matches one in the Card Array
			if (possibleCardNumbers[m] == that.cardArray[i].getArrayItemId()){
				//See if the matched card has been previously opened
				if(that.cardArray[i].getPreviouslyOpened() == true){
					possiblePairs.push(that.cardArray[i]);
				}
			}
		}
	}
	return possiblePairs;
};

memoryGame.prototype.findMatch = function(previousCardArray){
	
	/*var randomNumber = generateRandom(2);
	//console.log(randomNumber);
	var makeMistake = false;
	
	if(randomNumber == 1){
		makeMistake = true;
	};*/
	
	var openTheseCardsArray = [];
	//Find out if the card array item id matches the one in the previous cards array
	for(var m=0; m<previousCardArray.length; m++){
		//For each item in the previous card array, loop through the the previous card array
		for(var p=0; p<previousCardArray.length; p++){
			
			/*if(makeMistake == true){
				if(previousCardArray[p].getArrayItemId() != previousCardArray[m].getArrayItemId()){
					openTheseCardsArray.push(previousCardArray[p],previousCardArray[m]);
					return openTheseCardsArray;
				}
			} else {*/
				//If a value matches the current card, but the Id is different add it to the array of cards that will be opened
				if(previousCardArray[p].getValue() == previousCardArray[m].getValue() && previousCardArray[p].getArrayItemId() != previousCardArray[m].getArrayItemId()){
					openTheseCardsArray.push(previousCardArray[p],previousCardArray[m]);
					return openTheseCardsArray;
				}
			/*}*/
		}
	}
	return false;
};

//Open a random card
memoryGame.prototype.openRandomCard = function(possibleCardsArray,maxRange){
	var that = this;
	var randomNumber = Math.floor((Math.random() * maxRange));
	var random = possibleCardsArray[randomNumber];
	that.checkCardState(that.cardArray,random);
};

///////////////////////////////////////
// Computer AI end
///////////////////////////////////////


memoryGame.prototype.increaseScore = function(){
	var that = this;
	
	that.playerArray[that.currentPlayerId].increasePlayerScore();
	that.increaseTotalScore();
	that.createTurn("end");
	$("#player" + that.currentPlayerId + "score").val(that.playerArray[that.currentPlayerId].getPlayerScore());
	if (that.totalScore == that.numberOfPairs){ 
		that.createResult();
		return false;
	} else {
		return true;
	};
};

memoryGame.prototype.increaseTotalScore = function(){
	var that = this;
	that.totalScore++;
	logAction("Total score increased to:",that.totalScore);
};

//display the final result
memoryGame.prototype.createResult = function(){
	var that = this;
	logAction("result created");
	that.gameOver = true;
	var playerArrayWithHighestScore = that.getPlayersWithHighestScores();
	var displayText = '';
		var winner = playerArrayWithHighestScore[0];
		var winnerName = winner.getPlayerName();
		var winnerColor = winner.getPlayerCssClass();
	if (playerArrayWithHighestScore.length == 1){
		//displayText = `<span class="${winnerColor}">${winnerName}</span> is the winner!!`;
		displayText = '<span class="' + winnerColor + '">' + winnerName + '</span> is the winner!!';
	} else {
		//displayText = `It's a tie for the win between <span class="${winnerColor}">${winnerName}</span> and `;
		displayText = 'It\'s a tie for the win between <span class="' + winnerColor + '">'+ winnerName + '</span> and ';
		for(var i = 1; i < playerArrayWithHighestScore.length; i++){
			var winner = playerArrayWithHighestScore[i];
			var winnerName = winner.getPlayerName();
			var winnerColor = winner.getPlayerCssClass();
			//displayText += `<span class="${winnerColor}">${winnerName}</span>`;
			displayText += '<span class="' + winnerColor + '">' + winnerName + '</span>';
		};
		
	}
	var resultText = jQuery('<div/>', {
		html: displayText
	});
	logAction("game over");
	logAction("---------")
	resultText.appendTo( that.resultContainer );

	that.currentPlayerElement.empty();
	that.currentPlayerElement.removeClass();
	that.destroyCards();
	that.cardsHolder.empty();
	//that.playerHolderElement.empty();

	that.resultDialog.show();
	//that.resultDialog.modal('toggle');
	//that.resultDialog.appendTo( that.finalDialogContainer );
	//$('#result').append( $("#finalContainer") );
	/*$(function() {
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
	});*/
};

memoryGame.prototype.getPlayersWithHighestScores = function(){
	var that = this;
	var highestScore = 0;
	var playerArrayWithHighestScore = [];
	//Loop through all of the players to find one with the highest score
	for(var i=0; i<that.playerArray.length; i++){
		if (that.playerArray[i].getPlayerScore() >= highestScore){
			highestScore = that.playerArray[i].getPlayerScore();
		};
	};
	//Loop through all of the players once again, but this time add all of the players with the highest score to an array
	for(var i=0; i<that.playerArray.length; i++){
		if (that.playerArray[i].getPlayerScore() == highestScore){
			playerArrayWithHighestScore.push(that.playerArray[i]);
		};
	};
	return playerArrayWithHighestScore;
};

//Toggled the blocker depending on its state
memoryGame.prototype.toggleBlocker = function(){
	var that = this;
	var blocker = jQuery('<div/>', {
		id: "blocker",
	});
	var playerType = that.playerArray[that.currentPlayerId].getPlayerType();
	var state = that.getBlockerState();
	if((state == "show" && playerType != 'computer') || that.gameOver == true) {
		$("#blocker").detach();
		that.setBlockerState("hide");
	} else 
	if(state == "hide"){
		blocker.appendTo( that.cardsHolder );
		that.setBlockerState("show");
	}
};

memoryGame.prototype.getBlockerState = function(){
	var that = this;
	return that.blockerState;
};

memoryGame.prototype.setBlockerState = function(state){
	var that = this;
	that.blockerState = state;
};

//blocker used to prevent interaction with any of the cards
/*memoryGame.prototype.displayBlocker = function(state){
	var that = this;
	var playerType = that.playerArray[that.currentPlayerId].Object.getPlayerType();
	var blocker = jQuery('<div/>', {
		id: "blocker",
	});
	alert(state + " " + playerType);
	if (state == "show"){
		blocker.appendTo("body");
	} 
	else 
	if(state == "hide" && playerType == 'player'){
		$("#blocker").detach();
	};
};*/

memoryGame.prototype.destroyCards = function(){
	var that = this;
	/*var contaier = that.cardsHolder;
	for (var i=0; i< that.cardArray.length; i++){
		that.cardArray[i].Element.remove();
	}*/
	//that.cardsHolder.empty();
	that.cardArray.length = 0;
};

memoryGame.prototype.resetScores = function(){
	var that = this;
	that.totalScore = 0;
	for (var i=0; i< that.playerArray.length; i++){
		that.playerArray[i].setPlayerScore(0);
		$("#player" + i + "score").val(0);
	}
};

memoryGame.prototype.clearResults = function(){
	var that = this;
	that.resultContainer.empty();
};

memoryGame.prototype.resetCurrentPlayer = function(){
	var that = this;
	that.currentPlayerId = 0;
};