var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;


window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function(){
    move();
    drawCanvas();
  }, 1000/framesPerSecond);
  drawCanvas();
}

function move(){
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if(ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if(ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if(ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawCanvas(){
  //create black canvas
  colourRect(0,0,canvas.width,canvas.height,'black');

  //draw left paddle
  colourRect(0,210,10,100,'white');

  //draw ball
  colourCircle(ballX, ballY, 10, 'red');
}

function colourCircle(centerX, centerY, radius, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colourRect(leftX, topY, width, height, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}
