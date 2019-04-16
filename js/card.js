/*
   Author:   Andrej Harant
   Date:     January 10, 2014

   Filename: card.js
*/

//the card object. Requires the value and the Id of the card
var card = function(value,theId,theFile,placeholderImage){
	//the value is hidden by default
	this.displayValue = false;
	//Set the default placeholder images
	this.placeholderImage = placeholderImage;
	//The default array ID is 0
	this.arrayId = 0;
	//the default state of a card. The states are: possible, open or removed
	this.cardState = 'possible';

	this.cardClass = "col-sm-2 col-xs-3 initcard no-padding";

	this.imgClass = "img-responsive card-image";
	
	this.previouslyOpened = false;
	//the value of the card that is used to match two cards. Can be different from the ID
	this.value = value;
	//The unique ID of the card, used to determine how many cards are there
	this.theId = theId;
	//Place where the images are uploaded
	this.imageSrc = "http://andrejdeveloper.com/wp-content/uploads/";
	//this.imageSrc = "file:///C:/Users/Andrej/Desktop/web/memory_game/pictures/";
	
	//placeholder image that gets displayed when the card is flipped over
	this.placeholder = this.createImage(this.theId + "placeholder","placeholder",this.placeholderImage);
	
	this.placeholderId = "#" + this.theId + "placeholderimg";
	//image that gets displayed when you flip a card
	this.theImage = this.createImage(this.theId,"card image",theFile);
	//create the element that will hold the image
	this.output = this.createElement();
	//append the placeholder to the card
	this.placeholder.appendTo(this.output);
	//append the image to the output and hide it
	this.theImage.appendTo(this.output).hide();
	//return output;
	return this;
};

card.prototype.createElement = function(){
	var that = this;
	//display the value of the card, used for debugging
	if (that.displayValue == true){
		that.displayValue = '<div style="position:absolute;width:20px;height:20px;background-color:white;">' + that.value + '</div>';
	}
	
	//generate the div that holds the card object
	var output = jQuery('<div/>', {
		//assign it a class
		"class": that.cardClass,
		//assign it an id
		id: "card" + that.theId,
		//assign the value to the card
		html: that.displayValue,
	    //make sure nothing happens if a person double clicks
	    dblclick: ""
	});
	return output;
};

//create the image that the card will hold. 
//Uses the unique ID of the card that gets assigned to the element, 
//value of the card, used as the alt text,
//Name of of the image file that has the card image
card.prototype.createImage = function(theId,theValue,theFile){
	var that = this;
	//Initially, no image is created
	var theImage = null;
	//If the label is placeholder, create one
	theImage = jQuery('<img/>', {
		id: theId + "img",
		"class": that.imgClass,
		alt: theValue,
		src: that.imageSrc + theFile
	});
	return theImage;
};

card.prototype.getElement = function(){
	var that = this;
	return that.output;
};

//used to show the specified element, either the hidden image or placeholder
card.prototype.showElement = function(theType){
	var that = this;
	var theId = that.theId;
	switch (theType){
	case "hiddenImage":
		that.setCardState("open");
		jQuery("#" + theId + "img").show();
		break;
	case "placeholder":
		that.setCardState("possible");
		jQuery("#" + theId + "placeholderimg").show();
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

//Get the value of the card
card.prototype.getValue = function(){
	var that = this;
	return that.value;
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
		jQuery("#" + theId + "img").hide();
		break;
	case "placeholder":
		//the placeholder was set to be hidden so change the card state to open
		that.setCardState("open");
		jQuery("#" + theId + "placeholderimg").hide();
		break;
	case "card":
		//The whole card has been removed to set the state as removed
		that.setCardState("removed");
		jQuery("#" + theId + "img").detach();
		emptyImage = that.createImage(theId,'removed','empty.jpg');
		emptyImage.appendTo(that.output);
	}
};

//Store the id from the array into the card
card.prototype.setArrayItemId = function(theId){
	var that = this;
	that.arrayId = theId;
};

//Get the array id from the card
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