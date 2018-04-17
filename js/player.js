//the player object
//Accepts the id of the player, name, and type
var player = function(theId,theName,isComputer){
	if (isComputer == undefined) {
		isComputer = false;
	}
	this.theId = theId;
	this.name = theName;
	this.avatar;
	this.playerType = 'player';
	this.score = 0;
	this.playerState = "";
	this.playerCssClass = "";
	
	if(isComputer == true){
		this.playerType = 'computer';
	};
	
	return this;
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

player.prototype.setPlayerScore = function(theScore){
	var that = this;
	that.score = theScore;
}

player.prototype.getPlayerScore = function(){
	var that = this;
	return that.score;
};

player.prototype.increasePlayerScore = function(){
	var that = this;
	that.score += 1;
};