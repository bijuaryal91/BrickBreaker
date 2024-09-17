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

// Control Variables
let rightPressed = false;
let leftPressed = false;

// Brick Properties
let brickRowCount = 10;
let brickColumnCount = Math.floor((canvas.width + 10) / (70 + 10));
let brickWidth = 70;
let brickHeight = 15;
let brickPadding = 10;
let brickOffsetTop = 55;
let brickOffsetLeft = 10;

let bricks = [];
// Creating bricks
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;
let lives = 3; //Total Lives Available

// Function to draw bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#FF6347";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#CD5C5C";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
// Powerups properties
let powerUps = [];
const powerUpTypes = ["life", "paddle", "extraBall", "tripleBall"];
const powerUpWidth = 20;
const powerUpHeight = 20;
const powerUpFallSpeed = 2;

// Function for collision detection
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        balls.forEach((ball) => {
          // Check for collision with the brick
          if (
            ball.x + ballRadius > b.x &&
            ball.x - ballRadius < b.x + brickWidth &&
            ball.y + ballRadius > b.y &&
            ball.y - ballRadius < b.y + brickHeight
          ) {
            ball.dy = -ball.dy; // Reverse ball direction
            b.status = 0; // Mark brick as broken
            score++;

            // Randomly drop a power-up
            if (Math.random() < 0.1) {
              dropPowerUp(b.x + brickWidth / 2, b.y + brickHeight);
            }

            // check if all bricks are broken
            const allBricksBroken = bricks.every((column) => {
              column.every((brick) => (brick.status = 0));
            });
            if (allBricksBroken) {
              alert("YOU WIN! CONGRATULATIONS!");
              document.location.reload();
            }
          }
        });
      }
    }
  }
}

// function to drop PowerUp
function dropPowerUp(x, y) {
  const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
  powerUps.push({ x: x, y: y, type: type });
}

// Function to draw powerups
function drawPowerUps() {
  powerUps.forEach((powerUp, index) => {
    ctx.font = "20px Arial";
    ctx.fillStyle =
      powerUp.type === "life"
        ? "green"
        : powerUp.type === "paddle"
        ? "blue"
        : powerUp.type === "extraBall"
        ? "orange"
        : "purple"; // For tripleBall;

    ctx.fillText(
      powerUp.type === "life"
        ? "❤️"
        : powerUp.type === "paddle"
        ? "🛶"
        : powerUp.type === "extraBall"
        ? "⚽"
        : "X3",
      powerUp.x,
      powerUp.y
    );

    // Move the power-up down
    powerUp.y += powerUpFallSpeed;

    // remove power-up if it falls below the canvas
    if (powerUp.y > canvas.height) {
      powerUps.splice(index, 1);
    }
  });
}

// Function to collect power-ups
function collectPowerUps() {
  powerUps.forEach((powerUp, index) => {
    if (
      powerUp.x < paddleX + paddleWidth &&
      powerUp.x + powerUp.width > paddleX &&
      powerUp.y + powerUpHeight > canvas.height - paddleHeight
    ) {
      // Collect the powerup
      if (powerUp.type === "life") {
        lives++;
      } else if (powerUp.type === "paddle") {
        paddleWidth += 30; //Increase paddle size by 30 px
        setTimeout(() => {
          paddleWidth -= 30; //Reset paddle size after 5 second
        }, 5000);
      } else if (powerUp.type === "extraBall") {
        // Add extra ball
        balls.push({ x: balls[0].x, y: balls[0].y, dx: 4, dy: -4 });
      } else if (powerUp.type === "tripleBall") {
        //Add two extra balls for triple ball powerup
        balls.push({ x: balls[0].x, y: balls[0].y, dx: 4, dy: -4 });
        balls.push({ x: balls[0].x, y: balls[0].y, dx: -4, dy: -4 });
      }
      powerUps.splice(index, 1); // Remove the collected powerup
    }
  });
}

// Gameloop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  balls.forEach(drawBall);
  drawPaddle();
  drawPowerUps();
  collectPowerUps();

  // Calls the draw function recursively
}

draw();
