//The Dialog Object
var dialog = function(){
	this.playerArrayNumber = 0;
	this.computerNameArray = ["CPU1","CPU2","CPU3"];
	this.cardThemeArray = ["grampa","cats"];
	this.playerArray = [];
	this.leftMargin = 650;
	this.playerNumber = 1;
	this.minimumNumberOfOptions = 8;
	this.maximumNumberOfCards = 40;
	this.defaultNumberOfCardsSelection = 16;
	this.cardNumberContainer = $("#cardNumberContainer");
	this.playerInputContainer = $("#playerInputContainer");
	this.playerButtonContainer = $("#playerButtonContainer");
	
	//Create a heading
	var cardNumberlabel = jQuery('<span/>',{
		html: "Pick the Number of cards in the game:"
	});
	//Create a container for the drop down menu
	this.selectorContainer = jQuery('<select/>', {
		id: "numberOfCards"
	});

	var gameThemelabel = jQuery('<span/>',{
		html: "Pick the theme:"
	});

	this.themeContainer = jQuery('<select/>', {
		id: "gameTheme"
	}); 

	//Create button for adding a player
	var addPlayerButton = this.createAddPlayerButton();
	var addComputerButton = this.createAddComputerButton();

	var cardNumberOptionArray = this.populateArrayWithNumbers(this.minimumNumberOfOptions,this.maximumNumberOfCards,8);

	//Populate the card drop down menu
	//this.populateDropDown(this.selectorContainer,this.minimumNumberOfOptions,this.maximumNumberOfCards,this.defaultNumberOfCardsSelection,2);
	this.populateDropDown(this.selectorContainer,cardNumberOptionArray,this.defaultNumberOfCardsSelection);
	this.populateDropDown(this.themeContainer,this.cardThemeArray,0);
	
	//Remove any child nodes from the container
	//removeChildNodes(this.cardNumberContainer);

	//Add the label to the container
	cardNumberlabel.appendTo(this.cardNumberContainer);
	
	//Add the selector to the container
	this.selectorContainer.appendTo(this.cardNumberContainer);

	gameThemelabel.appendTo(this.cardNumberContainer);
	this.themeContainer.appendTo(this.cardNumberContainer);
	
	var firstPlayer = this.addPlayer(this.playerNumber,this.playerArrayNumber,"");
	firstPlayer.appendTo(this.playerInputContainer);
	
	var playerInputId = "#player" + this.playerArrayNumber;
	addFocusToInput(playerInputId);
	
	addPlayerButton.appendTo(this.playerButtonContainer);
	addComputerButton.appendTo(this.playerButtonContainer);
	
	this.makeIntoDialog();
	
};

dialog.prototype.populateArrayWithNumbers = function(startOption,endOption,increment){
	var that = this;
	var theArray = [];
	for (var i = startOption; i < (endOption + increment); i = i+increment){
		theArray.push(i);
	}
	return theArray;
};

dialog.prototype.getPlayerArrayNumber = function(){
	var that = this;
	return that.playerArrayNumber;
};

dialog.prototype.increasePlayerNumber = function(){
	var that = this;
	return that.playerNumber++;
};

dialog.prototype.getPlayerNumber = function(){
	var that = this;
	return that.playerNumber;
};

dialog.prototype.increasePlayerArrayNumber = function(){
	var that = this;
	if (that.playerArrayNumber < 4){
		that.playerArrayNumber++;
	}
};

dialog.prototype.decreasePlayerCounter = function(){
	var that = this;
	if (that.playerArrayNumber > 2){
		that.playerArrayNumber--;
	}
};

dialog.prototype.makeIntoDialog = function(){
	var that = this;
	$(function() {
		$( "#playerEntry" ).dialog({
			 modal: true,
			 minWidth: 380,
			 buttons: {
				 Ok: function() {
					 //that.playerNum = that.checkNumberPlayers();
					 that.closeOrNot(this);
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
			    	 //that.playerNum = checkNumberPlayers();
			    	 that.closeOrNot(this);
			      }
			    });
			  },
			 //Function that happens before the dialog is closed
			 beforeClose: function( event, ui ) {}//,
			 //function that happens after the dialog is closed
			 //close: function(event, ui) {
			//	that.storePlayersCreateGame();
			//}
		});
	});
};

dialog.prototype.storePlayersCreateGame = function(){
	var that = this;
	var numberOfCards = getValue('numberOfCards');
	var gameTheme = getValue('gameTheme');
	var playerNumber = that.getPlayerNumber();
	//var playerArrayNumber = that.getPlayerArrayNumber();

	if (numberOfCards%2 == 0){
		//loop through the number of players
		for(var i = 0; i < playerNumber; i++){
			var playerName = $("#player" + i).val();
			//Make sure that a player is created only when the name is not null
			if(playerName != ""){
				//Create new player
				that.playerArray[i] = new player(i,$("#player" + i).val(),$("#computer" + i).prop('checked'));
				
				that.playerArray[i].Object.setPlayerCssClass("player" + i + "color");
				//Add the player Element to the container
				that.playerArray[i].Element.appendTo('#playersContainer');
				//Add the name of the player to a label
				$("#player" + i + "label").append($("#player" + i).val());
				that.leftMargin -= (i * 2 * 20);
			}
		}
		$('#playersContainer').css("margin-left", that.leftMargin + "px");
		
		new memoryGame(that.playerArray,numberOfCards,gameTheme);
		//Set the first player as current
		
		//playerArray[0].Object.setPlayerAsCurrent();
		
		//displayCurrentPlayer(playerArray[currentPlayerId].Name);
		//createCards(getValue('numberOfCards'));
	} else {
		alert("The number of cards must be even!");
		return;
	}
};

//Check if the dialog can be closed
dialog.prototype.closeOrNot = function(element){
	var that = this;
	//var playerArrayNumber = that.getPlayerArrayNumber();
	//var playerNumber = that.getPlayerNumber();
	if (that.getFirstPlayerName() != ""){
		 //there is at least one player
		that.storePlayersCreateGame();
		//Close the dialog
		 $( element ).dialog( "close" );
	 }
	 else {
		 alert ("Player one must have a name!");
		 return false;
	 }
};

dialog.prototype.getFirstPlayerName = function(){
	var name = $("#player0").val();
	return name;
};

/*dialog.prototype.checkNumberPlayers = function(){
	var counter = 0;
	for (var i = 0; i < 4; i++){
		if (checkInput("player" + i) == true){
			counter++;
		}else{
			return counter;
		}
	}
	return counter;
};*/

dialog.prototype.createAddPlayerButton = function(){
	var that = this;
	var addPlayerButton = jQuery('<input/>', {
		id: "addPlayer",
		type: "button",
		value: "Add Player",
		click: function(){
			that.increasePlayerArrayNumber();
			that.increasePlayerNumber();
			var playerArrayNumber = that.getPlayerArrayNumber();
			var playerNumber = that.getPlayerNumber();
			if(playerArrayNumber <= 3){
				var newPlayer = that.addPlayer(playerNumber,playerArrayNumber,"player");
		    	newPlayer.appendTo($("#playerInputContainer"));
		    	var playerInputId = "#player" + playerArrayNumber;
		    	addFocusToInput(playerInputId);
			}
	    },
	});
	return addPlayerButton;
};

dialog.prototype.createAddComputerButton = function(){
	var that = this;
	var addComputerButton = jQuery('<input/>', {
		id: "addComputer",
		type: "button",
		value: "Add Computer",
		click: function(){
			that.increasePlayerArrayNumber();
			that.increasePlayerNumber();
			var playerArrayNumber = that.getPlayerArrayNumber();
			var playerNumber = that.getPlayerNumber();
			if(playerArrayNumber <= 3){
				var newPlayer = that.addPlayer(playerNumber,playerArrayNumber,"computer");
				newPlayer.appendTo($("#playerInputContainer"));
			}
	    },
	});
	return addComputerButton;
};

//populate the drop down menu
/*dialog.prototype.populateDropDown = function(selector,minimumNumberOfOptions,totalNumberOfOptions,defaultSelection,increment) {
	var selectedOption = '';
for (var i = minimumNumberOfOptions; i < (totalNumberOfOptions + increment); i = i+increment){
	  if(i == defaultSelection){
		  selectedOption = "selected";  
	  } else {
		  selectedOption = '';
	  }
	  $(selector)
	  .append('<option ' + selectedOption +' value="' + i + '">' + i + '</option>');
}
};*/
dialog.prototype.populateDropDown = function(selector,theArray,defaultSelection) {
	var selectedOption = '';
	for (var i = 0; i < (theArray.length); i++){
	  	if(theArray[i] == defaultSelection){
		  	selectedOption = "selected";  
	  	} else {
		  	selectedOption = '';
	  	}
	  	$(selector).append('<option ' + selectedOption +' value="' + theArray[i] + '">' + theArray[i] + '</option>');
	}
};

//Create label, and input for a player
dialog.prototype.addPlayer = function(number, arrayNumber,type){
	var that = this;
	var container = jQuery('<div />', {
		"class": "player" + arrayNumber + "color"
	});
	var label = jQuery('<span/>',{
		html: "Player " + number + " Name: <br />"
	});
	var input = jQuery('<input/>', {
		id: "player" + arrayNumber,
		type: "text",
		maxlength: 10
	});
	var checkbox = jQuery('<input/>', {
		id: "computer" + arrayNumber,
		type: "checkbox",
		value: "computer",
	});
	if(type == "computer"){
		checkbox.prop( "checked", true );
		input.prop("value", that.computerNameArray[that.playerArrayNumber - 1]);
	};
	var checkboxLabel = jQuery('<span/>',{
		html: "&nbsp;Computer"
	});
	//Add the label to each container
	label.appendTo(container);
	//Add the input to each container
	input.appendTo(container);
	//Add the check box label to the container
	checkboxLabel.appendTo(container);
	//Add the check box to the container
	checkbox.appendTo(container);
	//Increase the player counter
	//that.increasePlayerArrayNumber();
	//Add the containers to the playerEntry div
	return container;
};

