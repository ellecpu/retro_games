const scoreText = document.getElementById("score");
const nameInput = document.getElementById("name");

let highscore = getCookie("highscore");
if(highscore === "") {
	highscore = 0;
}
scoreText.innerHTML = highscore;

function submit() {
	
}
