// Initialize canvas and context
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// set canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Ball Properties
let ballRadius = 10;
let balls = [{ x: canvas.width / 2, y: canvas.height - 30, dx: 4, dy: -4 }];
const maxBallSpeed = 8; //Maximum Speed of Ball

// Paddle Properties
let paddleHeight = 15;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 10; //Speed of the paddle

// Function to draw Paddle
function drawPaddle() {
  let gradient = ctx.createLinearGradient(
    paddleX,
    canvas.height - paddleHeight,
    paddleX + paddleWidth,
    canvas.height
  );
  gradient.addColorStop(0, "#1E90FF");
  gradient.addColorStop(1, "#00BFFF");
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

// Function to draw balls
function drawBall(ball) {
  let gradient = ctx.createRadialGradient(
    ball.x,
    ball.y,
    5,
    ball.x,
    ball.y,
    ballRadius
  );
  gradient.addColorStop(0, "#FF5733");
  gradient.addColorStop(1, "#C70039");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

// Gameloop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(drawBall);
  drawPaddle();

  // Calls the draw function recursively
}

draw();
