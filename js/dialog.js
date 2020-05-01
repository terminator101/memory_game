//The Dialog Object
var dialog = function(dialogContainerId,theMemoryGame){
	if (theMemoryGame !== undefined) {
		this.theMemoryGame = theMemoryGame;
	} else {
		this.theMemoryGame = undefined;
	}
	this.playerArrayNumber 		= 0;
	this.computerNameArray 		= [
									"Vulcan Raven",
									"Revolver Ocelot",
									"Big Boss",
									"Sniper Wolf",
									"The Sorrow"
									];
	this.cardThemeArray 		= [
									{value: "Grampa dog", class: ""},
									{value: "Cats", class: ""},
									{value: "Cute animals", class: ""}
								];
	this.cardPlaceholderArray 	= [
									"placeholder_blue.jpg",
									"placeholder_brown.jpg",
									"placeholder_gray.jpg",
									"placeholder_green.jpg",
									"placeholder_orange.jpg",
									"placeholder_purple.jpg",
									"placeholder_red.jpg",
								];
	this.playerArray 			= [];
	this.leftMargin 			= 650;
	this.playerNumber 			= 1;
	this.cardNumberOptionsArray = [
									{value: 12, class: ""},
									{value: 18, class: ""},
									{value: 24, class: ""},
									{value: 30, class: "d-none d-sm-block"},
									{value: 36, class: "d-none d-xl-block"}
								];
	this.defaultNumberOfCards 	= 24;
	this.defaultTheme 			= "Grampa dog";
	this.cardSelectionIncrement = 6;
	this.dialogElement 			= jQuery("#" + dialogContainerId);
	this.cardNumberContainer 	= jQuery("#cardNumberContainer");
	this.gameThemeContainer 	= jQuery("#gameThemeContainer");
	this.playerInputContainer 	= jQuery("#playerInputContainer");
	this.playerButtonContainer 	= jQuery("#playerButtonContainer");
	this.startGameButton		= jQuery("#startGame");
	this.addComputerButtonId	= "addComputer";
	this.addHumanButtonId		= "addPlayer";
	this.computerDifficulties	= ["player","computer normal","computer hard"];
	this.defaultDifficulty		= this.computerDifficulties[0];
	this.debug 					= false;
	
	return this;
};

dialog.prototype.execute = function(){
	var that = this;
	that.addDialogFunctionality();
	var dialogElement = that.getDialogElement();
	return dialogElement;
};

dialog.prototype.addDialogElements = function(){
	var that = this;
	//Create a heading
	var cardNumberlabel = jQuery('<label/>',{
		for: "numberOfCards",
		html: "&nbsp; Pick the Number of cards in the game:"
	});
	//Create a container for the drop down menu
	that.selectorContainer = jQuery('<select/>', {
		id: "numberOfCards",
		class: "form-control"
	});

	var gameThemelabel = jQuery('<label/>',{
		for: "gameTheme",
		html: "&nbsp; Pick the theme:"
	});

	that.themeDropDown = jQuery('<select/>', {
		id: "gameTheme",
		class: "form-control"
	}); 

	//Create button for adding a player
	var addHumanButton = that.createAddPlayerButton("human");
	var addComputerButton = that.createAddPlayerButton("computer");

	//that.populateArrayWithNumbers(that.minimumNumberOfOptions,that.maximumNumberOfCards,that.cardSelectionIncrement);

	if (that.debug == true) {
		cardNumberOptionArray.push(6);
		that.defaultNumberOfCards = 6;
	}

	//Populate the number of cards drop down menu
	that.populateDropDown(that.selectorContainer,that.cardNumberOptionsArray,that.defaultNumberOfCards);

	//Populate the theme drop down menu
	that.populateDropDown(that.themeDropDown,that.cardThemeArray,that.defaultTheme);

	//Add the label to the card number container
	cardNumberlabel.appendTo(that.cardNumberContainer);
	//Add the selector to the container
	that.selectorContainer.appendTo(that.cardNumberContainer);

	//Add the label to the game theme container
	gameThemelabel.appendTo(that.gameThemeContainer);
	//Add the selector to the container
	that.themeDropDown.appendTo(that.gameThemeContainer);
	
	//Add a first player
	that.addPlayer(that.playerNumber,that.playerArrayNumber,"");

	//Add focus on the number of cards drop down
	addFocusToInput("#numberOfCards");
	
	addHumanButton.appendTo(that.playerButtonContainer);
	addComputerButton.appendTo(that.playerButtonContainer);

};

dialog.prototype.getDialogElement = function(){
	var that = this;
	return that.dialogElement;
};

dialog.prototype.populateArrayWithNumbers = function(startOption,endOption,increment){
	var that = this;
	var theArray = [];
	for (var i = startOption; i < (endOption + increment); i = i+increment){
		theArray.push(i);
	}
	return theArray;
};

//Get the array number of the player
dialog.prototype.getPlayerArrayNumber = function(){
	var that = this;
	return that.playerArrayNumber;
};

//Increment the number of players
dialog.prototype.increasePlayerNumber = function(){
	var that = this;
	return that.playerNumber++;
};

//Retrieve the player number
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

//
dialog.prototype.addDialogFunctionality = function(){
	var that = this;
	jQuery(function() {
		jQuery( that.startGameButton ).click(function(){
			that.closeOrNot();
		});
	});
};

dialog.prototype.findPLayer = function(number){
	var that = this;
	var playerName;
	if (name == undefined) {
		name = false;
	}
	if (!name) {
		playerName = jQuery("#player" + number).val();
	} else {
		playerName = name;
	}
	return playerName;
}

dialog.prototype.setNumberOfCards = function(number){
	if (number == undefined) {
		number = false;
	}
	if (number !== false) {
		return number
	} else {
		var numberOfCards = getValue( '#numberOfCards' );
		if (numberOfCards == undefined) {
			return false;
		}
	}
}

dialog.prototype.storePlayersCreateGame = function(){
	var that = this;
	var numberOfCards = getValue( '#numberOfCards' );
	var gameTheme = getValue('#gameTheme');

	var placeholder = "placeholder_blue.jpg";

	var playerNumber = that.getPlayerNumber();

	if (numberOfCards%2 == 0){

		//loop through the number of players
		for(var i = 0; i < playerNumber; i++){
			var playerName = jQuery("#player" + i).val();
			//Make sure that a player is created only when the name is not null
			if(playerName != ""){
				//Create new player
				that.playerArray[i] = new player(i,jQuery("#player" + i).val(),jQuery("#computer" + i).prop('checked'));
				
				that.playerArray[i].setPlayerCssClass("player" + i + "color");
			}
		}
		var game;
		if (that.theMemoryGame == undefined) {
			//If a memory game has not been created, create one
			game = new memoryGame();
		} else {
			game = that.theMemoryGame;
		};
		game.setParamethers(numberOfCards,gameTheme, placeholder, that.playerArray, '#playerHolder')
		game.execute();
	} else {
		alert("The number of cards must be even!");
		return;
	}
};

dialog.prototype.showDialog = function(){
	var that = this;
	that.dialogElement.show();
};

dialog.prototype.hideDialog = function(){
	var that = this;
	that.dialogElement.hide();
};

dialog.prototype.resetPlayers = function(){
	var that = this;
	that.playerInputContainer.empty();
	that.playerArrayNumber = 0;
	that.playerNumber = 1;
	//Add a first player
	that.addPlayer(that.playerNumber,that.playerArrayNumber,"");
}

//Check if the dialog can be closed
dialog.prototype.closeOrNot = function(){
	var that = this;
	var name = that.getFirstPlayerName();

	if (name !== false){
		 //there is at least one player
		that.storePlayersCreateGame();
		//Close the dialog
		that.hideDialog();
	 }
	 else {
		 alert ("Player 1 must have a name!");
		 return false;
	 }
};

dialog.prototype.getFirstPlayerName = function(){
	var that = this;
	//Check the element with player0 id
	var name = jQuery("#player0").val();

	//if the name is not in the array, return false
	if (name == undefined || name == '') {
		return false;
	} else {
		return name;
	}
};

dialog.prototype.createAddPlayerButton = function(playerType){
	var that = this;
	var theId, theValue;
	switch(playerType){
	case "human":
		theId = that.addHumanButtonId;
		theValue = "Player";
		theClass = "btn-success";
		break;
	case "computer":
		theId = that.addComputerButtonId;
		theValue = "Computer";
		theClass = "btn-danger";
		break;
	}
	var addPlayerButton = jQuery('<button />', {
		id: theId,
		type: "button",
		value: "Add " + theValue,
		class: "btn " + theClass,
		role: "button",
		autocomplete: "off",
		html: "Add " + theValue,
		click: function(){
			//console.log("clicked:" + theId);
			var playerNumber = that.getPlayerNumber();
			if ( playerNumber <= 3 ) {
				that.increasePlayerArrayNumber();
				that.increasePlayerNumber();
				var playerArrayNumber = that.getPlayerArrayNumber();
				var playerNumber = that.getPlayerNumber();

				if(playerArrayNumber <= 3){
					that.addPlayer(playerNumber,playerArrayNumber,playerType);
			    	if (playerType == "human") {
			    		var playerInputId = "#player" + playerArrayNumber;
			    		addFocusToInput(playerInputId);
			    	}
				} else {
					jQuery('#' + that.addHumanButtonId).addClass( "disabled" );
					jQuery('#' + that.addComputerButtonId).addClass( "disabled" );
				}
			}
			
		},
	});
	return addPlayerButton;
}

//Not used. May be added in the future
dialog.prototype.addComputerDifficulty = function(containerId){
	var that = this;
	/*var difficultyDropDown = jQuery('<div/>', {
		class: 'btn-group',
		html: `<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Small button <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li>test</li>
  </ul>`
	});*/
	var difficultyDropDown = jQuery('<select/>', {
		id: "ai-difficulty-" + containerId,
		class: "form-control"
	});
	that.populateDropDown(difficultyDropDown,that.computerDifficulties,that.defaultDifficulty);
	return difficultyDropDown;
	//difficultyDropDown.appendTo(that.playerButtonContainer);
};

//Populate the drop down menu
dialog.prototype.populateDropDown = function(selector,theArray,defaultSelection) {
	var selectedOption = '';
	for (var option of theArray) {
	  	if(option.value == defaultSelection){
		  	selectedOption = "selected";  
	  	} else {
		  	selectedOption = '';
	  	}
		jQuery(selector).append('<option ' + selectedOption + ' value="' + option.value + '" class="' + option.class + '">' + option.value + '</option>');
	}
};

//Create label, and input for a player
dialog.prototype.addPlayer = function(number, arrayNumber,type){
	var that = this;

	var container = jQuery('<div />', {
		"class": "player" + arrayNumber + "color col pb-1"
	});
	//Label form group
	var labelFormGroupContainer = that.createFormGroupContainer();

	var label = jQuery('<label/>', {
		for: "player" + arrayNumber,
		html: "&nbsp; Player " + number + " Name:"
	});
	label.appendTo(labelFormGroupContainer);

	//Input form group
	var inputFormGroupContainer = that.createFormGroupContainer();

	//Row required to allign the items properly
	var inputRowGroupContainer = jQuery('<div />', {
		"class": "row align-items-center"
	});
	inputRowGroupContainer.appendTo(inputFormGroupContainer);

	var inputContainer = jQuery('<div>', {
		"class": "col"
	});
	//Input field
	var input = jQuery('<input/>', {
		"class":   "form-control",
		id: 	   "player" + arrayNumber,
		type: 	   "text",
		maxlength: 15
	});
	input.appendTo(inputContainer);
	inputContainer.appendTo(inputRowGroupContainer);

	//Checkbox field
	var checkboxContainer = jQuery('<div>', {
		"class": "col"
	});

	var checkboxHolder = jQuery('<div>', {
		"class" : "checkbox"
	});

	var checkbox = jQuery('<input/>', {
		id: "computer" + arrayNumber,
		type: "checkbox",
		value: "computer"
	});
	if(type == "computer" || that.debug == true){
		checkbox.prop( "checked", true );
		input.prop("value", that.pickRandomComputer());
	};
	var checkboxLabel = jQuery('<label/>',{});
	var checkboxText = jQuery('<span/>', {
		html: " Computer"
	});

	//Add checkbox
	checkboxLabel.appendTo(checkboxHolder);
	checkbox.appendTo(checkboxLabel);
	checkboxText.appendTo(checkboxLabel);
	checkboxHolder.appendTo(checkboxContainer);
	checkboxContainer.appendTo(inputRowGroupContainer);

	/*var computerDifficultyContainer = jQuery('<div>', {
		"class": "col-sm-6 no-gutters"
	});

	//Add computer difficulty
	computerDifficulty = that.addComputerDifficulty(arrayNumber);
	computerDifficulty.appendTo(computerDifficultyContainer);
	computerDifficultyContainer.appendTo(inputFormGroupContainer);*/

	//Add each row to the main container
	labelFormGroupContainer.appendTo(container);
	inputFormGroupContainer.appendTo(container);

	/*if (type == "computer") {
		that.addComputerDifficulty();
	}*/
	//Add the containers to the playerEntry div
	container.appendTo(that.playerInputContainer);
	//return container;
};

//pick a random computer name
dialog.prototype.pickRandomComputer = function(){
	var that = this;
	var randomNumber = Math.floor((Math.random() * that.computerNameArray.length));
	var randomName = that.computerNameArray[randomNumber];
	that.computerNameArray.splice(randomNumber,1);
	return randomName;
};

dialog.prototype.createRowContainer = function(){
	var rowContainer = jQuery('<div />', {
		"class": "row"
	});
	return rowContainer;
};

dialog.prototype.createFormGroupContainer = function(){
	var rowContainer = jQuery('<div />', {
		"class": "form-group"
	});
	return rowContainer;
};