var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-10;
var dx = 2;
var dy = -2;
var ballRadius = 10;

function drawBall (){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
  ctx.fillStyle = "#42a7f4";
  ctx.fill();
  ctx.closePath();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if(x + dx > canvas.width-10 || x + dx < 0) {
    dx = -dx;
} else {x += dx};
  if(y + dy > canvas.height-10 || y + dy < 0) {
    dy = -dy;
} else {y += dy};

}
setInterval(draw, 10);