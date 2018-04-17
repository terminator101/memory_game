/*
   Author:   Andrej Harant
   Date:     January 10, 2014

   Filename: card.js
*/

//the card object. Requires the value and the Id of the card
var card = function(value,theId,theFile,placeholderImage){
	//the value is hidden by default
	var displayValue = false;
	//Set the default placeholder images
	this.placeholderImage = placeholderImage;
	//The default array ID is 0
	this.arrayId = 0;
	//the default state of a card. The states are: possible, open or removed
	this.cardState = 'possible';
	
	this.previouslyOpened = false;
	//the value of the card that is used to match two cards. Can be different from the ID
	this.value = value;
	//The unique ID of the card, used to determine how many cards are there
	this.theId = theId;
	//Place where the images are uploaded
	//this.imageSrc = "http://andrejdeveloper.com/wp-content/uploads/";
	this.imageSrc = "file:///C:/Users/Andrej/Desktop/web/memory_game/pictures/";
	
	//placeholder image that gets displayed when the card is flipped over
	this.placeholder = this.createImage(this.theId + "placeholder","placeholder",this.placeholderImage);
	
	this.placeholderId = "#" + this.theId + "placeholderimg";
	//image that gets displayed when you flip a card
	this.theImage = this.createImage(this.theId,"card image",theFile);
	
	//display the value of the card, used for debugging
	if (displayValue == true){
		displayValue = '<div style="position:absolute;width:20px;height:20px;background-color:white;">' + this.value + '</div>';
	}
	else {
		debug = "";
	}
	
	//generate the div that holds the card object
	this.output = jQuery('<div/>', {
		//assign it a class
		"class": "basecard initcard",
		//assign it an id
		id: "card" + this.theId,
		//assign the value to the card
		html: displayValue,
		//event listener for clicking on the card
	    /*click: function(){
	    	if (this.cardState != "open"){
	    		//check the state
	    		that.checkState();
	    	}
	    },*/
	    //make sure nothing happens if a person double clicks
	    dblclick: ""
	});
	//append the placeholder to the card
	this.placeholder.appendTo(this.output);
	//append the image to the output and hide it
	this.theImage.appendTo(this.output).hide();
	//return output;
	return {Element: this.output, Id: this.theId, Object: this, State: this.state};
};

//create the image that the card wil hold. 
//Uses the unique ID of the card that gets assigned to the element, 
//value of the card, used as the alt text,
//Name of of the image file that has the card image
card.prototype.createImage = function(theId,theValue,theFile){
	var that = this;
	//Initially, no image is created
	var theImage = null;
	//If the label is placeholder, create one
	if(theValue == "placeholder"){
		theImage = jQuery('<img/>', {
			id: theId + "img",
			alt: theValue,
			src: that.imageSrc + theFile//,
			//Only the placeholder can be clicked on
			//click: function(){
			//	that.checkState();
			//}
		});
	//The value is not a placeholder so create an actual card
	} else {
		theImage = jQuery('<img/>', {
			id: theId + "img",
			alt: theValue,
			src: that.imageSrc + theFile
		});
	}
	return theImage;
};

//used to show the specified element, either the hidden image or placeholder
card.prototype.showElement = function(theType){
	var that = this;
	var theId = that.theId;
	switch (theType){
	case "hiddenImage":
		that.setCardState("open");
		$("#" + theId + "img").show();
		//cardArray[theId].Object.getState();
		break;
	case "placeholder":
		that.setCardState("possible");
		$("#" + theId + "placeholderimg").show();
	}
};

card.prototype.getPlaceholder = function(){
	var that = this;
	return that.placeholderId;
};

//Get the state of the card
card.prototype.getCardState = function(){
	var that = this;
	return that.cardState;
};

card.prototype.getValue = function(){
	var that = this;
	return that.value;
};

card.prototype.getId = function(){
	var that = this;
	return that.theId;
};

//card.prototype.removeCard = function(){
//	var that = this;
//	that.removed = true;
//};

card.prototype.isRemoved = function(){
	return that.removed;
};

//set the state of the card. Its either flipped(the image is visible) or none
card.prototype.setCardState = function(theState){
	var that = this;
	switch (theState){
	case "possible":
	case "open":
	case "removed":
		that.cardState = theState;
		break;
	default:
		that.cardState = "possible";
	}
};

//used to hide the specified element , either the hidden image, the placeholder, or the card itself
card.prototype.hideElement = function(theType){
	var that = this;
	var theId = that.theId;
	switch (theType){
	case "hiddenImage":
		//the card image was set to be hidden so change the card state to possible
		that.setCardState("possible");
		$("#" + theId + "img").hide();
		break;
	case "placeholder":
		//the placeholder was set to be hidden so change the card state to open
		that.setCardState("open");
		$("#" + theId + "placeholderimg").hide();
		break;
	case "card":
		//The whole card has been removed to set the state as removed
		that.setCardState("removed");
		$("#" + theId + "img").hide();
	}
};

card.prototype.setArrayItemId = function(theId){
	var that = this;
	that.arrayId = theId;
};

card.prototype.displayArrayItemId = function(){
	var that = this;
	var arrayItemDisplayId = '<div style="position:absolute;width:20px;height:20px;background-color:white;">' + that.arrayId + '</div>';
	arrayItemDisplayId.appendTo(this.output);
};

card.prototype.getArrayItemId = function(){
	var that = this;
	return that.arrayId;
};

card.prototype.setPreviouslyOpened = function(){
	var that = this;
	that.previouslyOpened = true;
};

card.prototype.getPreviouslyOpened = function(){
	var that = this;
	return that.previouslyOpened;
};

//blocker used to prevent interaction with a card
/*card.prototype.blockCard = function(theId){
	
};*/

//check the state of a card
/*card.prototype.checkState = function(){
	var that = this;
	
	//see if first or a second card has been picked
	if (firstValue == "empty"){
		//first card has been picked so save its value and id
		firstValue = this.value;
		firstId = this.theId;
		//hide the placeholder for first card, and show the image
		that.hideElement(firstId,"placeholder");
		that.showElement(firstId,"hiddenImage");
	}
	else
	if (secondValue == "empty"){
		//second card has been picked so save its value and id
		secondValue = this.value;
		secondId = this.theId;
		//hide the placeholder for the second card, and show the image
		that.hideElement(secondId,"placeholder");
		that.showElement(secondId,"hiddenImage");
		
		//make sure that a card can't be picked twice
		if (firstId != secondId){
			//compare the values of the two cards
			that.compareValues();
			//reset the global value
			firstValue = "empty";
			secondValue = "empty";
		}
		else {
			secondValue = "empty";
		}
	};	
};*/

//compare the card values
/*card.prototype.compareValues = function(){
	var that = this;
	
	//prevent the user from clicking on more than two cards
	displayBlocker("show");

	//check if the two card values match
	if (firstValue != secondValue){
		//the values do not match so wait 1500 milliseconds and then show the placeholders
		setTimeout(function(){
			that.hideElement(firstId, "hiddenImage");
			that.showElement(firstId, "placeholder");
			
			that.hideElement(secondId, "hiddenImage");
			that.showElement(secondId, "placeholder");
			
			if (playerArray.length > 1){
				//there are multiple players so switch to the next one
				goNext();
			}
			//allow the user to click on cards once again
			displayBlocker("hide");
		},1500);
	}
	else 
	if (firstValue == secondValue){
		//the values match so wait 500 milliseconds and then hide the images and increase score
		
		setTimeout(function(){
			that.hideElement(firstId,"card");
			that.hideElement(secondId, "card");

			increaseScore(currentPlayerId);
			
			//allow the user to click on cards once again
			displayBlocker("hide");
		},500);
	}
};*/

/*var goNext = function(){
	//alert (playerArray[currentPlayerId].Object.getPlayerState());
	if (currentPlayerId < (playerArray.length - 1)){
		currentPlayerId += 1;
	}
	else {
		currentPlayerId = 0;
	}
	displayCurrentPlayer(playerArray[currentPlayerId].Name);
};*/

//increase the score for the current player
/*var increaseScore = function(id){
	var point = 1;
	playerArray[id].Score += point;
	totalScore++;
	$("#player" + id + "score").val(playerArray[id].Score);
	if (totalScore == numberOfPairs){ 
		createResult();
	};
};*/



/*$(document).ready(function(){
	
	//alert(generateRandom(4));
	createDialog();
	//createCards("40");
	//cardArray[1].Object.checkState();
});*/

//The default number of pairs. Uses the length of the card image array
//var numberOfPairs = cardImagesArray.length;

//The total number of cards.
//var numberOfCards = numberOfPairs * 2;

//Image used for cards that are flipped over
//var placeholderImage = "DSC02429.jpg";
//var totalScore = 0;
/*var firstValue = "empty";
var secondValue = "empty";
var firstId = "";
var secondId = "";

//Place where the images are uploaded
//var imageSrc = "http://andrejdeveloper.com/wp-content/uploads/";

//Array used to hold the players
var playerArray = [];

//The ID of the player that is first
var currentPlayerId = 0;

//the minimum number of cards that can be displayed on the page
var minimumNumberOfCards = 4;*/