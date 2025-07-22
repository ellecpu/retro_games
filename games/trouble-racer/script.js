// Select the canvas and set up the context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tryAgainButton = document.getElementById("tryAgainButton");

// Canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let player = { x: 175, y: 500, width: 50, height: 80, speed: 5 };
let obstacles = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from local storage
let isGameOver = false;

// Key press handling
let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Reset game
function resetGame() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore); // Save high score to local storage
  }

  player = { x: 175, y: 500, width: 50, height: 80, speed: 5 };
  obstacles = [];
  score = 0;
  isGameOver = false;
  tryAgainButton.style.display = "none";
  updateGame();
}

// Draw player car
function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = "blue";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
    ob.y += 4; // Move obstacle down

    // Remove obstacle if off screen
    if (ob.y > canvas.height) {
      obstacles.splice(obstacles.indexOf(ob), 1);
      score++;
    }

    // Check collision
    if (ob.x < player.x + player.width &&
        ob.x + ob.width > player.x &&
        ob.y < player.y + player.height &&
        ob.y + ob.height > player.y) {
      isGameOver = true;
    }
  });
}

// Generate random obstacles
function generateObstacles() {
  if (Math.random() < 0.02) {
    const obstacleWidth = Math.random() * 80 + 20;
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x: obstacleX, y: -50, width: obstacleWidth, height: 30 });
  }
}

// Update player position
function updatePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
  if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed; // Move up
  if (keys["ArrowDown"] && player.y + player.height < canvas.height) player.y += player.speed; // Move down
}

// Update the game
function updateGame() {
  if (isGameOver) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore); // Save high score to local storage
    }

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 40);
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2 - 80, canvas.height / 2 + 80);
    tryAgainButton.style.display = "block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  updatePlayer();
  generateObstacles();

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`High Score: ${highScore}`, 10, 50);

  requestAnimationFrame(updateGame);
}

// Try Again button click handler
tryAgainButton.addEventListener("click", resetGame);

// Start the game
updateGame();
