var canvas;
var canvasContext;
var ballX = 50;

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  setInterval(drawCanvas, 50);
  drawCanvas();
}

function drawCanvas(){
  ballX = ballX + 5;
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(225,210,200,200);
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(ballX,100,10,10);
}
