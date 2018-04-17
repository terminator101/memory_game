//the player object
//Accepts the id of the player, name, and type
var player = function(theId,theName,isComputer){
	this.theId = theId;
	this.name = theName;
	this.avatar;
	this.playerType = 'player';
	this.score = 0;
	this.playerState = "";
	this.playerCssClass = "";
	
	var container = jQuery('<div/>', {
		id: "player" + this.theId + "container",
		"class": "playercontainer " + "player" + theId + "color"
	});
	var text = jQuery('<span/>', {
		id: "player" + this.theId + "label",
		"class": "playerlabel"
	});
	var theScoreHolder = jQuery('<input/>', {
		type: "text",
		readonly: "readonly",
		"class": "playerscore",
		id: "player" + this.theId + "score",
		value: 0
	});
	if(isComputer == true){
		this.playerType = 'computer';
	};
	
	text.appendTo(container);
	theScoreHolder.appendTo(container);
	return {Element: container, Name: this.name, Score: this.score, Object: this};
};

player.prototype.setPlayerCssClass = function(theClass){
	var that = this;
	that.playerCssClass = theClass;
};

player.prototype.getPlayerCssClass = function(){
	var that = this;
	return that.playerCssClass;
};

//The the player as the one whose 
player.prototype.setPlayerAsCurrent = function(){
	var that = this;
	that.playerState = "current";
};

//The the player as the one whose 
player.prototype.setPlayerAsPrevious = function(){
	var that = this;
	that.playerState = "previous";
};

getCurrentPlayer = function(thePlayerArray){
	for (var i=1; i<thePlayerArray; i++){
		if(thePlayerArray[i].playerState = "current"){
			return thePlayerArray[i];
		}
	}
};

player.prototype.getPlayerName = function(){
	var that = this;
	return that.name;
};

player.prototype.getPlayerType = function(){
	var that = this;
	return that.playerType;
};

//Get the state of the player
player.prototype.getPlayerState = function(){
	var that = this;
	return that.playerState;
};

//Get the state of the player
player.prototype.getPlayerId = function(){
	var that = this;
	return that.theId;
};

player.prototype.getPlayerScore = function(){
	var that = this;
	return that.score;
};

player.prototype.increasePlayerScore = function(){
	var that = this;
	that.score += 1;
};

/*player.prototype.goNext = function(thePlayerId,thePlayerArray){
	var that = this;
	if (that.playerState = "current"){
		that.setPlayerAsPrevious();
	}
	thePlayerArray[currentPlayerId].setPlayerAsPrevious();
	thePlayerArray[currentPlayerId + 1].setPlayerAsCurrent();
	//alert "Current player state: " + thePlayerArray[currentPlayerId + 1].Object.getPlayerState();
	if (currentPlayerId < (playerArray.length - 1)){
		currentPlayerId += 1;
		//openRandom();
		//alert(cardArray[1].Element);
	}
	else {
		currentPlayerId = 0;
	}
	//alert("test" + playerArray[currentPlayerId].Name );
	displayCurrentPlayer(playerArray[currentPlayerId].Name);
};*/