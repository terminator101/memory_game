/////////////////
// Main function that will create the memory game
/////////////////
var memoryGame = function(playerArray,numberOfCards,gameTheme){
	//Set the players
	this.playerArray = playerArray;
	this.currentPlayerId = 0;
	this.blockerState = "hide";
	
	//set the cards
	this.cardArray = [];
	//this.flippedCardArray = [];
	this.previouslyFlippedCards = [];

	if (gameTheme == "cats") {
		this.cardImagesArray = ['DSC00634.jpg','DSC00645.jpg','DSC01100.jpg','DSC01324.jpg','DSC01673.jpg',
	                    	'DSC01674.jpg','DSC01679.jpg','DSC01688.jpg','DSC01745.jpg','DSC01775.jpg',
	                    	'DSC01807.jpg','DSC02011.jpg','DSC02067.jpg','DSC02081.jpg','DSC02092.jpg',
	                    	'DSC02093.jpg','DSC02185.jpg','DSC02204.jpg','DSC02223.jpg','DSC02229.jpg'];
	    this.placeholderImage = "DSC02429.jpg";
	} else
	if (gameTheme == "grampa"){
		this.cardImagesArray = ['IMG_0754.jpg','IMG_0766.jpg','IMG_0784.jpg','IMG_0796.jpg','IMG_0749.jpg',
								'IMG_0812.jpg','IMG_0843.jpg','IMG_0713.jpg','IMG_3866.jpg','IMG_0903.jpg',
								'IMG_6094.jpg','IMG_6425.jpg','Grampa-on-chair.jpg','IMG_0663.jpg','IMG_0696.jpg',
								'IMG_0705.jpg','IMG_0710.jpg','IMG_0848.jpg','IMG_0850.jpg','IMG_0748.jpg'];
		this.placeholderImage = "IMG_0711.jpg";
	}
	this.arrayForRandom = [];
	this.numberOfPairs = null;
	this.numberOfCards = numberOfCards;
	this.totalScore = 0;
	this.firstValue = "empty";
	this.secondValue = "empty";
	this.firstId = "";
	this.secondId = "";
	this.firstArrayItemId = "";
	this.secondArrayItemId = "";
	
	this.storePlayers();
	//create the cards
	this.createCards();
	//this.goComputer();
	this.createTurn("current");
	return this;
};

//Player functions
memoryGame.prototype.storePlayers = function(){
	var that = this;
	//Set the first player as current
	that.playerArray[0].Object.setPlayerAsCurrent();
	that.displayCurrentPlayer(that.playerArray[0]);
};

//Get the current player
memoryGame.prototype.getCurrentPlayerId = function(){
	var that = this;
	for (var i=0; i< that.playerArray.length; i++){
		//console.log(that.playerArray[i].Object.getPlayerState());
		if(that.playerArray[i].Object.getPlayerState() == "current"){
			return that.playerArray[i].Object.getPlayerId();
		};
	}
};

//Display the current player
memoryGame.prototype.displayCurrentPlayer = function(playerObject){
	//console.log(playerObject.getPlayerName());
	var name = playerObject.Object.getPlayerName();
	var cssClass = playerObject.Object.getPlayerCssClass();
	$("#currentPlayer").text(name);
	$("#currentPlayer").attr( "class", cssClass );
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
		that.cardArray[i].Element.appendTo('#cardsHolder');
		//append each card object to the array
		that.cardArray[i].Object.setArrayItemId(i);
		that.setOnClick(that.cardArray[i].Object.getPlaceholder(), i, that.numberOfCards);
	}
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
	//console.log("This ID has been picked: " + theArrayItemId);
	
	//that.previouslyFlippedCards.push(theArray[theArrayItemId]);
	//var list;
	//for(var i = 0; i < that.previouslyFlippedCards.length; i++){
	//	list =+ i;
		//list =+ that.previouslyFlippedCards[i].Object.getId() + ",";
	//};
	//console.log(theArrayItemId);
	//console.log("_________________");
	//console.log("Array Length:" + that.flippedCardArray.length);
	//console.log("Curret Id: " + that.cardArray[theArrayItemId].Object.getId());
	//console.log(that.flippedCardArray.length);
	console.log("Array item id: " +theArrayItemId);
	theArray[theArrayItemId].Object.setPreviouslyOpened();
	
	if (that.firstValue == "empty"){
		//first card has been picked so save its value
		that.firstValue = theArray[theArrayItemId].Object.getValue();
		//save its Id
		that.firstId = theArrayItemId;
		//hide the placeholder for first card, and show the image
		theArray[theArrayItemId].Object.hideElement("placeholder");
		theArray[theArrayItemId].Object.showElement("hiddenImage");
	} 
	else
	if (that.secondValue == "empty"){
		//second card has been picked so save its value
		that.secondValue = theArray[theArrayItemId].Object.getValue();
		//save its Id
		that.secondId = theArrayItemId;
		//hide the placeholder for second card, and show the image
		theArray[theArrayItemId].Object.hideElement("placeholder");
		theArray[theArrayItemId].Object.showElement("hiddenImage");
		
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
			theArray[that.firstId].Object.hideElement("hiddenImage");
			theArray[that.firstId].Object.showElement("placeholder");
			theArray[that.secondId].Object.hideElement("hiddenImage");
			theArray[that.secondId].Object.showElement("placeholder");
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
		},1500);
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
			theArray[that.firstId].Object.hideElement("card");
			theArray[that.secondId].Object.hideElement("card");
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
			that.increaseScore();
			that.createTurn("current");
			
			//console.log('Length of open: ' + that.flippedCardArray.length);
			//allow the user to click on cards once again
			that.toggleBlocker();
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
		that.playerArray[that.currentPlayerId].Object.setPlayerAsPrevious();
		that.currentPlayerId += 1;
		that.playerArray[that.currentPlayerId].Object.setPlayerAsCurrent();
	} else {
		that.currentPlayerId = 0;
		that.playerArray[0].Object.setPlayerAsCurrent();
	}
	that.displayCurrentPlayer(that.playerArray[that.currentPlayerId]);
	//alert(that.playerArray[that.currentPlayerId].Object.getPlayerType());
	that.createTurn("current");
	
};

memoryGame.prototype.createTurn = function(type){
	var that = this;
	switch(type){
	case "current":
		if(that.playerArray[that.currentPlayerId].Object.getPlayerType() == 'computer'){
			console.log("Computer Turn");
			//that.displayBlocker("show");
			that.goComputer();
		} else {
			console.log("Human Turn");
		}
		break;
	case "next":
		that.goNextPlayer();
		break;
	case "end":
		break;
	}
};

memoryGame.prototype.SetPossibleCardArray = function(){
	var that = this;
	var possibleCardNumbers = [];
	
	for(var i=0; i<that.cardArray.length; i++){
		//console.log(that.cardArray[i].Object.getArrayItemId());
		if(that.cardArray[i].Object.getCardState() == "possible"){
		//	console.log(that.cardArray[i].Object.getArrayItemId());
			possibleCardNumbers.push(that.cardArray[i].Object.getArrayItemId());
		}
		//console.log(possibleCardNumbers[i]);
	}
	return possibleCardNumbers;
};

//Create array that will hold all possible and previously unopened cards
memoryGame.prototype.setPossibleAndUnopenedCardArray = function(){
	var that = this;
	var possibleAndUnopenedCardNumbers = [];
	
	for(var i=0; i<that.cardArray.length; i++){
		if(that.cardArray[i].Object.getCardState() == "possible" && that.cardArray[i].Object.getPreviouslyOpened() == false){
			possibleAndUnopenedCardNumbers.push(that.cardArray[i].Object.getArrayItemId());
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
			if (possibleCardNumbers[m] == that.cardArray[i].Object.getArrayItemId()){
				//See if the matched card has been previously opened
				if(that.cardArray[i].Object.getPreviouslyOpened() == true){
					possiblePairs.push(that.cardArray[i].Object);
				}
			}
		}
	}
	return possiblePairs;
};

memoryGame.prototype.preparePossibleCardMatches = function(possibleCardNumbers){
	var that = this;
	//Get all the cards that are an option as well as all previously opened cards
	var previousAndPossibleCards = that.findPreviousAndPossibleCards(possibleCardNumbers);
	//Find the first two previously opened cards that have the same value
	var openTheseCards = that.findMatch(previousAndPossibleCards);
	
	if(openTheseCards == false){
		console.log("No match");
		return false;
	} else {
		var matchedCards = [];
		for(var i = 0; i<openTheseCards.length; i++){
			matchedCards.push(openTheseCards[i]);
		}
		return matchedCards;
	}
};

memoryGame.prototype.findMatch = function(previousCardArray){
	
	var randomNumber = generateRandom(2);
	console.log(randomNumber);
	var makeMistake = false;
	
	if(randomNumber == 1){
		makeMistake = true;
	};
	
	var openTheseCardsArray = [];
	//Find out if the card array item id matches the one in the previous cards array
	for(var m=0; m<previousCardArray.length; m++){
		//For each item in the previous card array, loop through the the previous card array
		for(var p=0; p<previousCardArray.length; p++){
			
			if(makeMistake == true){
				if(previousCardArray[p].getArrayItemId() != previousCardArray[m].getArrayItemId()){
					openTheseCardsArray.push(previousCardArray[p],previousCardArray[m]);
					return openTheseCardsArray;
				}
			} else {
				//If a value matches the current card, but the Id is different, 
				if(previousCardArray[p].getValue() == previousCardArray[m].getValue() && previousCardArray[p].getArrayItemId() != previousCardArray[m].getArrayItemId()){
					openTheseCardsArray.push(previousCardArray[p],previousCardArray[m]);
					return openTheseCardsArray;
				}
			}
		}
	}
	return false;
};

//The computer turn
memoryGame.prototype.goComputer = function(){
	var that = this;
	var possibleCardNumbers = that.SetPossibleCardArray();
	
	//Make sure that there are any possible cards left
	if(possibleCardNumbers != 0 || possibleCardNumbers != NULL){
		
		var openCardOne = that.preparePossibleCardMatches(possibleCardNumbers);
		
		if(openCardOne == false){
			var uniqueAndUnopenedCardNumbers = that.setPossibleAndUnopenedCardArray();
			that.openRandomCard(uniqueAndUnopenedCardNumbers,uniqueAndUnopenedCardNumbers.length);
		} else {
			that.checkCardState(that.cardArray,openCardOne[0].getArrayItemId());
		}
		
		//that.compareCardValues();
		setTimeout(function(){
			possibleCardNumbers = that.SetPossibleCardArray();
			//that.findPreviousAndPossibleCards(possibleCardNumbers);
			//var openCardTwo = that.preparePossibleCardMatches(possibleCardNumbers);
			if(openCardOne == false){
				var uniqueAndUnopenedCardNumbers = that.setPossibleAndUnopenedCardArray();
				that.openRandomCard(uniqueAndUnopenedCardNumbers,uniqueAndUnopenedCardNumbers.length);
				//var openCardTwo = that.preparePossibleCardMatches(possibleCardNumbers);
			}
			else {
				that.checkCardState(that.cardArray,openCardOne[1].getArrayItemId());
			}
			//console.log("Possible Card Numbers:" + possibleCardNumbers);
			//that.checkCardState(possibleCards,that.cardArray.length - 1);
			//that.openRandomCard(possibleCardNumbers,possibleCardNumbers.length);
		},1500);
	};
};

memoryGame.prototype.increaseScore = function(){
	var that = this;
	
	that.playerArray[that.currentPlayerId].Object.increasePlayerScore();
	that.increaseTotalScore();
	that.createTurn("end");
	$("#player" + that.currentPlayerId + "score").val(that.playerArray[that.currentPlayerId].Object.getPlayerScore());
	if (that.totalScore == that.numberOfPairs){ 
		that.createResult();
	};
};

memoryGame.prototype.increaseTotalScore = function(){
	var that = this;
	that.totalScore++;
};

//Open a random card
memoryGame.prototype.openRandomCard = function(possibleCardsArray,maxRange){
	var that = this;
	var randomNumber = Math.floor(Math.random() * maxRange);
	var random = possibleCardsArray[randomNumber];
	console.log("Random Number Picked: " + randomNumber);
	that.checkCardState(that.cardArray,random);
};

//display the final result
memoryGame.prototype.createResult = function(){
	var that = this;
	var playerArrayWithHighestScore = that.getPlayersWithHighestScores();
	var displayText = '';
	if(playerArrayWithHighestScore.length == 1){
		displayText = playerArrayWithHighestScore[0].Object.getPlayerName() + " is the winner!!";
	} else {
		displayText = "It's a tie for the win between <strong>" + playerArrayWithHighestScore[0].Object.getPlayerName() + "</strong> and ";
		for(var i = 1; i < playerArrayWithHighestScore.length; i++){
			displayText += "<strong>" + playerArrayWithHighestScore[i].Object.getPlayerName() + "</strong>";
		};
		
	}
	var resultText = jQuery('<div/>', {
		html: "Game Over <br />" + displayText
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
};

memoryGame.prototype.getPlayersWithHighestScores = function(){
	var that = this;
	var highestScore = 0;
	var playerArrayWithHighestScore = [];
	//Loop through all of the players to find one with the highest score
	for(var i=0; i<that.playerArray.length; i++){
		if (that.playerArray[i].Object.getPlayerScore() >= highestScore){
			highestScore = that.playerArray[i].Object.getPlayerScore();
		};
	};
	//Loop through all of the players once again, but this time add all of the players with the highest score to an array
	for(var i=0; i<that.playerArray.length; i++){
		if (that.playerArray[i].Object.getPlayerScore() == highestScore){
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
	var playerType = that.playerArray[that.currentPlayerId].Object.getPlayerType();
	var state = that.getBlockerState();
	if(state == "show" && playerType != 'computer'){
		$("#blocker").detach();
		that.setBlockerState("hide");
	} else 
	if(state == "hide"){
		blocker.appendTo("body");
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
memoryGame.prototype.displayBlocker = function(state){
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
};