$(document).ready(function() {
var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };
  
      var canvas = document.getElementById("playfield");
      var ctx = canvas.getContext('2d');
      var x = canvas.width/2;
      var y = canvas.height/2;
      var dx = 2;
      var dy = 3;
      var ballRadius = 10;

      var leftUpPressed = false;
      var leftDownPressed = false;
      var rightUpPressed = false;
      var rightDownPressed = false;

      function downHandler(e) {
         if(e.keyCode == 87) {
            leftUpPressed = true;
         }
         else if (e.keyCode == 83) {
            leftDownPressed = true;
         }
         if (e.keyCode == 38) {
            rightUpPressed = true;
         }
         else if (e.keyCode == 40) {
            rightDownPressed = true;
         }
      }

      function upHandler(e) {
         if (e.keyCode == 87) {
            leftUpPressed = false;
         }
         else if (e.keyCode == 83) {
            leftDownPressed = false;
         }
         if (e.keyCode == 38) {
            rightUpPressed = false;
         }
         else if (e.keyCode == 40) {
            rightDownPressed = false;
         }
      }

      function Ball() {
          ctx.beginPath();
          ctx.arc(x, y, ballRadius, 0, Math.PI*2);
          ctx.fill();
          ctx.fillStyle = "white";
          ctx.closePath();
         
      }
      
      var leftScore = 10;
      var rightScore = 10;

      function Scores() {
         ctx.font = "80px Arial";
         ctx.fillStyle = "white";
         ctx.fillText(leftScore, (canvas.width / 2) - 120, 80);
         ctx.fillText(rightScore, (canvas.width / 2) + 30, 80);
      }

      function collisionsWithLeftPaddle() {
         if ((x - ballRadius) <= 5 + l_PaddleWidth) {
            if (y > l_PaddleY && y < l_PaddleY + l_PaddleHeight)
               dx = -dx;
            else if ((x - ballRadius) <= 0) {
               leftScore--;
            
               x = canvas.width / 2;
               y = canvas.height / 2;
               dx = -dx;
               dy = dy;
         
            //    document.location.reload();
            }
         }
      }

      function gameOver(){
        if (leftScore == 0) {
            alert("Computer Wins!")
        }
        else if (rightScore == 0) {
            alert ("Player Wins")
        }
      }

      function collisionsWithRightPaddle() {
         if ((x + ballRadius) >= canvas.width - (r_PaddleWidth + 5)) {
            if (y > r_PaddleY && y < r_PaddleY + r_PaddleHeight)
               dx = -dx;
            else if (x + ballRadius >= canvas.width) {
               rightScore--;
               
               //alert("Game Over");
               x = canvas.width / 2;
               y = canvas.height / 2;
               dx = -dx;
               dy = dy;
            
               //document.location.reload();
            }
         }
      }

      function computeCollisionsWithWallsAndPaddle() {
         collisionsWithLeftPaddle();
         collisionsWithRightPaddle();
         if (((y - ballRadius) <= 0) || ((y + ballRadius) >= canvas.height)) {
            dy = -dy;
         }
      }

      // For left-hand side player 
      var l_PaddleHeight = 80
      var l_PaddleWidth = 10
      var l_PaddleX = 5;
      var l_PaddleY = canvas.height / 2 - l_PaddleHeight / 2;
      function drawLeftPaddle() {
         ctx.beginPath();
         ctx.rect(l_PaddleX, l_PaddleY, l_PaddleWidth, l_PaddleHeight);
         ctx.fillStyle = "white";
         ctx.fill();
         ctx.closePath();
         if (leftDownPressed && l_PaddleY < canvas.height - l_PaddleHeight) {
            l_PaddleY += 7;
         }
         else if (leftUpPressed && l_PaddleY > 0) {
            l_PaddleY -= 7;
         }
      }

      // For Right-hand side player 
      var r_PaddleHeight = 80
      var r_PaddleWidth = 10
      var r_PaddleX = canvas.width - (r_PaddleWidth + 5);
      var r_PaddleY = canvas.height / 2 - r_PaddleHeight / 2;
      function drawRightPaddle() {
         ctx.beginPath();
         ctx.rect(r_PaddleX, r_PaddleY, r_PaddleWidth, r_PaddleHeight);
         ctx.fillStyle = "white";
         ctx.fill();
         ctx.closePath();
      }

      function dividingLine() {
         ctx.beginPath();
         ctx.rect(canvas.width / 2 - 1, 1, 3, canvas.height/2);
         ctx.fillStyle = "white";
         ctx.fill();
         ctx.closePath();
      }
      
      function draw() {
         gameOver();
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         Scores();
         dividingLine();
         drawLeftPaddle();
         drawRightPaddle();
         Ball();
         computeCollisionsWithWallsAndPaddle();
         x += dx;
         y += dy;
      }

      setInterval(draw, 10);
      document.addEventListener("keydown", downHandler, false);
      document.addEventListener("keyup", upHandler, false);
    });