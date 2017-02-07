var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var leftPaddleY = 250;
var rightPaddleY = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calculateMousePos(event){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}


window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function(){
    move();
    drawCanvas();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(event){
    var mousePos = calculateMousePos(event);
    leftPaddleY = mousePos.y-(PADDLE_HEIGHT/2);
  });
}

function ballReset(){
  if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = true;
  }

  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;

}
function computerMovement(){
  var rightPaddleYCenter = rightPaddleY + (PADDLE_HEIGHT/2);
  if(rightPaddleYCenter < ballY - 35 ){
    rightPaddleY += 6;
  } else if (rightPaddleYCenter > ballY + 35 ){
    rightPaddleY -= 6;
  }
}

function move(){

  if(showingWinScreen){
    return;
  }

  computerMovement();

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  // left side collision
  if(ballX < 0) {
    if(ballY > leftPaddleY && ballY < leftPaddleY+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (leftPaddleY+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    } else{
      player2Score++;
      ballReset();
    }
  }
  // right side collision
  if(ballX > (canvas.width-PADDLE_WIDTH)) {
    if(ballY > rightPaddleY && ballY < rightPaddleY+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (rightPaddleY+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    } else{
      player1Score++;
      ballReset();
    }
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

  if(showingWinScreen){
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Click to continue", 100,100);
    return;
  }
  //draw paddles
  colourRect(0,leftPaddleY,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
  colourRect((canvas.width-(PADDLE_WIDTH)),rightPaddleY,PADDLE_WIDTH,PADDLE_HEIGHT,'white');

  //draw ball
  colourCircle(ballX, ballY, 10, 'white');

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width-100, 100);

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
