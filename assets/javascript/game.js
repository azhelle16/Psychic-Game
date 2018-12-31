/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

var gamePiece = {
	wordToGuess : "",
	wordSpace : "",
	totalWins : 0,
	totalLoss : 0,
	totalGames : 0,
	guessedLetters : [],
	wordBank : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
				"r","s","t","u","v","w","x","y","z"],
	pickRandomLetter : function() {

		/*
 		 #######################################################################
 		 #
		 #  FUNCTION NAME : pickRandomLetter
		 #  AUTHOR        : Maricel Louise Sumulong
		 #  DATE          : December 29, 2018 PST
		 #  MODIFIED BY   : 
		 #  REVISION DATE :
		 #  REVISION #    : 
		 #  DESCRIPTION   : 
		 #  PARAMETERS    : none
		 #
 		 #######################################################################
		*/

		var index = Math.floor(Math.random() * ((gamePiece.wordBank.length - 1) - 0) + 0);
		gamePiece.wordToGuess = gamePiece.wordBank[index];
		for (var i = 0; i < gamePiece.wordToGuess.length; i++) {
			if (gamePiece.wordToGuess[i] == " ") {
				gamePiece.wordSpace += " "
			} else {
				gamePiece.wordSpace += "*"	
		  	}
		}
		document.getElementById("guessLetterHere").innerHTML = gamePiece.wordSpace;

	},
	listenToKeyStrokes : function(event) {

		/*
		 #######################################################################
		 #
		 #  FUNCTION NAME : listenToKeyStrokes
		 #  AUTHOR        : Maricel Louise Sumulong
		 #  DATE          : December 30, 2018 PST
		 #  MODIFIED BY   : 
		 #  REVISION DATE : 
		 #  REVISION #    : 
		 #  DESCRIPTION   : Listens to user key inputs
		 #  PARAMETERS    : key code event
		 #
		 #######################################################################
		*/

		if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {

			var glet = String.fromCharCode(event.keyCode)

			var indexes = gamePiece.getAllIndexes(gamePiece.wordToGuess, glet)
			var tempArr = gamePiece.wordSpace.split("")
			if (indexes.length != 0) {
				for (var k = 0; k < indexes.length; k++) {
					tempArr[indexes[k]] = glet;
				}
				gamePiece.wordSpace = tempArr.join("");
				document.getElementById("guessLetterHere").innerHTML = gamePiece.wordSpace;
			} else {
				if (gamePiece.guessedLetters.indexOf(glet) != -1) {
					document.getElementById("existsAudio").play();
					return false
				}
				gamePiece.guessedLetters.push(glet)
				document.getElementById("guessLettersHere").innerHTML = gamePiece.guessedLetters.join(" ")
				//update guess remaining values
				var grem = document.getElementById("gRem").innerHTML - 1;
				document.getElementById("gRem").innerHTML = grem;
		  	  }
		 
			//change color for guesses
			var guessRem = document.getElementById("gRem").innerHTML;
			var gr = document.getElementById("gRem")
			if (guessRem > 5  && guessRem < 10) {
				gr.style.color = "#999900";
			} else if (guessRem <= 5) {
				gr.style.color = "red";
		  	  }

			//check if there's still guess remaining
			if (document.getElementById("gRem").innerHTML == 0) {
				gamePiece.resetValues();
				gamePiece.totalLoss += 1;
				document.getElementById("totalLoss").innerHTML = gamePiece.totalLoss;
				document.getElementById("wrongAudio").play();
				gamePiece.pickRandomLetter();
				gamePiece.totalGames += 1;
				document.getElementById("gamesPlayed").innerHTML = gamePiece.totalGames;
			}
			
		 	//check if word is already guessed
			var isGuessed = gamePiece.checkLetterStatus(gamePiece.wordSpace);

			if (isGuessed) {
				gamePiece.totalWins += 1;
            	document.getElementById("totalWins").innerHTML = gamePiece.totalWins;
            	document.getElementById("correctAudio").play();
            	gamePiece.resetValues();
            	gamePiece.pickRandomLetter();
            	gamePiece.totalGames += 1;
            	document.getElementById("gamesPlayed").innerHTML = gamePiece.totalGames;
			}
		
		} else {
			return false
	      }

	},
	getAllIndexes : function(arr, val) {

		/*
		 #######################################################################
		 #
		 #  FUNCTION NAME : getAllIndexes
		 #  AUTHOR        : 
		 #  DATE          : 
		 #  MODIFIED BY   : 
		 #  REVISION DATE : 
		 #  REVISION #    : 
		 #  DESCRIPTION   : returns array consisting of indexes where the given input occurs
		 #  PARAMETERS    : array, letter to look up
		 #
		 #######################################################################
		*/

   		var indexes = [], i = -1;
    	while ((i = arr.indexOf(val, i+1)) != -1){
        	indexes.push(i);
    	}
    	return indexes;
	
	},
	checkLetterStatus : function() {

		/*
		 #######################################################################
		 #
		 #  FUNCTION NAME : checkLetterStatus
		 #  AUTHOR        : Maricel Louise Sumulong
		 #  DATE          : December 30, 2018 PST
		 #  MODIFIED BY   : 
		 #  REVISION DATE : 
		 #  REVISION #    : 
		 #  DESCRIPTION   : checks whether the letter is already guessed
		 #  PARAMETERS    : none
		 #
		 #######################################################################
		*/

		if (gamePiece.wordSpace == gamePiece.wordToGuess) {
			return 1
		} else {
			return 0
		  }

	},
	resetValues : function() {

		/*
		 #######################################################################
		 #
		 #  FUNCTION NAME : resetValues
		 #  AUTHOR        : Maricel Louise Sumulong
		 #  DATE          : December 30, 2018 PST
		 #  MODIFIED BY   : 
		 #  REVISION DATE : 
		 #  REVISION #    : 
		 #  DESCRIPTION   : resets the values when the user guesses it or the remaining numbers are up
		 #  PARAMETERS    : none
		 #
		 #######################################################################
		*/

		gamePiece.wordSpace = "";
		document.getElementById("guessLettersHere").innerHTML = ""
		document.getElementById("gRem").innerHTML = 15;
		gamePiece.guessedLetters = [];
		document.getElementById("gRem").style.color = "green";

	},
	reset : function() {

		/*
		 #######################################################################
		 #
		 #  FUNCTION NAME : reset
		 #  AUTHOR        : Maricel Louise Sumulong
		 #  DATE          : December 30, 2018 PST
		 #  MODIFIED BY   : 
		 #  REVISION DATE : 
		 #  REVISION #    : 
		 #  DESCRIPTION   : resets the whole game
		 #  PARAMETERS    : none
		 #
		 #######################################################################
		*/

		gamePiece.wordSpace = "";
		document.getElementById("guessLettersHere").innerHTML = ""
		document.getElementById("gRem").innerHTML = 15;
		gamePiece.guessedLetters = [];
		document.getElementById("totalWins").innerHTML = 0;
		document.getElementById("totalLoss").innerHTML = 0;
		document.getElementById("gamesPlayed").innerHTML = 0;
		gamePiece.pickRandomLetter();
		document.getElementById("gRem").style.color = "green";
	
	}

}

window.onload = function() {
	gamePiece.pickRandomLetter();
}

window.onkeypress = function(event) {
	gamePiece.listenToKeyStrokes(event);
}	

