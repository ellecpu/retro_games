//Game state enum
const gameStates = { START: 0, RUN: 1, GAME_OVER: 2 };

//Get elements form DOM
const target = document.getElementById("target");
const innerTimer = document.getElementById("inner-timer");
const scoreText = document.getElementById("score");
const infoText = document.getElementsByTagName("h1")[0];
const retryText = document.getElementById("retry");
const highscoreText = document.getElementById("highscore");
const uploadButton = document.getElementById("upload-button");
const backButton = document.getElementById("back-button");

//Declaration of variables
const targetTime = 100;
let gameState = gameStates.START;
let score;
let lastClickTime;

//Function running once every millisecond.
//Updates the timer and checks if the player fails.
setInterval(function() {
		if(gameState === gameStates.RUN) {
			timeRemaining = Math.floor((new Date().getTime() - lastClickTime) * 0.1);
			innerTimer.style.width = timeRemaining + "%";
			innerTimer.style.height = timeRemaining + "%";
			
			//Game is over if the timer runs out
			if(timeRemaining >= targetTime){
				setGameOver();
			}
		}
}, 1);

//Function called from HTML
//Adds 1 to score and updates position on target
function hitTarget() {
	
	//Initialization of gameplay
	if(gameState != gameStates.RUN){
		gameState = gameStates.RUN;
		infoText.innerHTML = "";
		retryText.innerHTML = "";
		highscoreText.innerHTML = "";
		uploadButton.style.display = "none";
		backButton.style.display = "none";
		score = 0;
	}
	
	//New random position
	target.style.left = Math.floor(Math.random() * (document.documentElement.clientWidth - 70)) + 35 + "px";
	target.style.bottom = Math.floor(Math.random() * (document.documentElement.clientHeight - 150)) + 75 + "px";
	
	//Updates score
	score++;
	scoreText.innerHTML = score;
	
	//Resets timer
	lastClickTime = new Date().getTime();
}

//Gives GAME OVER and handles high score and cookie
function setGameOver() {
	
	//Gives player GAME OVER
	gameState = gameStates.GAME_OVER;
	infoText.innerHTML = "GAME OVER";
	retryText.innerHTML = "Click the dot to retry";
	
	//Compares last high score from cookie with current score
	//Updates the cookie if new high score
	const lastHighscore = getCookie("highscore");
	if(lastHighscore === "") {
		setCookie("highscore", score, 30);
		highscoreText.innerHTML = "New high-score!";
		uploadButton.style.display = "block";
	}
	else {
		let lastHighscoreInt = parseInt(lastHighscore);
		if(score > lastHighscoreInt) {
			setCookie("highscore", score, 30);
			highscoreText.innerHTML = "New high-score!";
			uploadButton.style.display = "block";
		}
		else {
			highscoreText.innerHTML = "High-score: " + lastHighscoreInt;
		}
	}
	
	//GAME OVER screen-styling
	backButton.style.display = "block";
	target.style.left = "50%";
	target.style.bottom = "50%";
	innerTimer.style.width = "0%";
	innerTimer.style.height = "0%";
}
