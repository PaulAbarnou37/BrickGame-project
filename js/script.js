var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var isActive = true; 

var startBtn = document.getElementById('startBtn');
var canvasContent = document.getElementById('myBlock');

var nizarsFace = new Image();
nizarsFace.src = "./img/lucas-face.png";

var faces = document.getElementsByClassName("face-box");


var intro = new Audio("./img/intro-music.mp3");
var gameOverMusic = new Audio("./img/inception.mp3");



var gameOver = {
    drawMe : function gameOver() {
        ctx.rect(0,0,720,480)
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.font = "50px 'Press Start 2P', cursive";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", 145, 250); 
        gameOverMusic.play();         
    }
}

var restartGame = {
    drawMe : function gameOver() {
        ctx.font = "25px 'Press Start 2P', cursive";
        ctx.fillStyle = "black";
        ctx.fillText("Restart", 145, 300);          
    }
}





for( var i = 0; i < faces.length; i++ ) {
    faces[i].onclick = function() {
        for( var j = 0; j < faces.length; j++ ){
            faces[j].classList.remove("face-style");
        };
        nizarsFace.src = this.querySelector("img").src;
        this.classList.add("face-style");
    }
}





function initialize (){

    startBtn.style.display = 'none';
    canvasContent.style.display = 'none';

    intro.play();



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
var paddleWidth = 140;
var paddleX = (canvas.width-paddleWidth)/2;
rightPressed = false;
leftPressed = false;
var paddleHalf = paddleWidth/2;



function drawNizar (){
   ctx.drawImage(nizarsFace, x - 32 , y - 45, 65, 90);
};


var score = 0;
var playing = false;
var startButton;



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
    if (isActive){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawNizar();
  drawBricks();
  collisionDetection();
  drawScore();
};
  if(x + dx + 20  > canvas.width - ballRadius || x + dx - 15 - ballRadius < 0) {
    dx = -dx;
} else {x += dx};
if(y + dy - 30 < ballRadius) {
  dy = -dy ;
} else if(y + dy > canvas.height-ballRadius) {
  if(x > paddleX && x < paddleX + paddleHalf) {
      if (dx = 2){
          dx = -dx;
          dy = -dy * 1.07;
      } else if (dx = -2){
    dy = -dy * 1.07;
    }
  } else if (x > paddleX + paddleHalf && x <  paddleX + paddleWidth){
      if (dx = -2){
    dy = -dy * 1.07;
    dx = -dx;
    } else if (dx = 2){
        dy = -dy * 1.07;
    }
  }
  else {
    
    isActive = false;
    gameOver.drawMe();
    restartGame.drawMe();

      
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
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        
                        document.location.reload();
                    }
                }
            }
        };
    };
};



function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 75, 20);
}


setInterval(draw, 10);
};