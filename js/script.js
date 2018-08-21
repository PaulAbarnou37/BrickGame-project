var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// bricks variable

var brickRowCount = 5;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// ball & Nizar variables
var x = canvas.width/2;
var y = canvas.height-10;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// padding variables
var paddleHeight = 15;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
rightPressed = false;
leftPressed = false;

var nizarsFace = new Image();
function drawNizar (){
   nizarsFace.src = "./img/Nizarsface.png";
   ctx.drawImage(nizarsFace, x - 32 , y - 45, 65, 90);
};





function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
  }
}
};

// ball drawing
function drawBall (){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
  ctx.fill();
  ctx.closePath(); 
};


// paddle drawing
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// movement and get random color everytime it hits the wall
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawNizar();
  drawBricks();
  collisionDetection();
  if(x + dx + 20  > canvas.width - ballRadius || x + dx - 15 - ballRadius < 0) {
    dx = -dx;
} else {x += dx};
if(y + dy - 30 < ballRadius) {
  dy = -dy;
} else if(y + dy > canvas.height-ballRadius) {
  if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
  }
  else {
      alert("GAME OVER");
      document.location.reload();
  }
} else {y += dy};
if(rightPressed && paddleX < canvas.width-paddleWidth) {
  paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
  paddleX -= 7;
}
}






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        };
    };
};

setInterval(draw, 10);