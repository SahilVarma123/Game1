const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const rows = canvasSize / box;
const cols = canvasSize / box;

let score = 0;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "";
let ball = {
  x: Math.floor(Math.random() * cols) * box,
  y: Math.floor(Math.random() * rows) * box
};

// Load sounds
const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");
const bgMusic = document.getElementById("bgMusic");

// Ensure background music starts
bgMusic.volume = 0.3;
bgMusic.play();

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw ball (red)
  ctx.fillStyle = "red";
  ctx.fillRect(ball.x, ball.y, box, box);

  // Draw snake (green)
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff00" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Game Over
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    collision(head, snake)
  ) {
    clearInterval(game);
    bgMusic.pause();
    gameOverSound.play();
    alert("Game Over! Your score: " + score);
    return;
  }

  // Eat Ball
  if (head.x === ball.x && head.y === ball.y) {
    score++;
    eatSound.play();
    document.getElementById("score").textContent = "Score: " + score;

    // Generate new ball
    ball = {
      x: Math.floor(Math.random() * cols) * box,
      y: Math.floor(Math.random() * rows) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function collision(head, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

let game = setInterval(draw, 150);
