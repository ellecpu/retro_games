//High score displays info from cookie
const highscoreText = document.getElementById("highscore");
const lastHighscore = getCookie("highscore");
if(lastHighscore != "") {
	highscoreText.innerHTML = "Welcome back!<br><br>High-score: " + lastHighscore;
}
