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
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Function to draw balls
function drawBall() {
  ctx.beginPath();
  ctx.arc(balls[0].x, balls[0].y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
