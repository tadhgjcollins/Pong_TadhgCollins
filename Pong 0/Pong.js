$(document).ready(function () {

    // Coordinates of the CENTRE of the player:
    let playerX = 200;
    let playerY = 100;
    let opponentX = 600;
    let opponentY = 100;
  
    // How fast the player is moving in the two dimensions:
    let playerVelocityX = 0;
    let playerVelocityY = 0;
    let opponentVelocityX = 0;
    let opponentVelocityY = 0;
  
    /** Make the DOM show the state of the game as stored in the above
     * variables. */
    function refreshDisplay() {
      // We need to set the "left" CSS property to the distance from the
      // left edge of the container DIV to the left edge of the player
      // DIV.  We have the distance from the left edge of the container
      // DIV to the CENTRE of the player circle.  Compute what we want by
      // subtracting 20, the radius of the player circle.
      const playerLeft = playerX - 180;
      const opponentLeft = opponentX - 20;
  
      // Likewise for the Y direction.
      const playerTop = playerY + 110;
      const opponentTop = opponentY + 110;
  
      // Set the CSS properties to move the player circle.
      $("#player").css("left", `${playerLeft}px`);
      $("#player").css("top", `${playerTop}px`);
      $("#opponent").css("left", `${opponentLeft}px`);
      $("#opponent").css("top", `${opponentTop}px`);
    }
  
    /** Update the state of the player to reflect the fact that one video
     * frame's worth of time has gone by. */
    function updatePlayer() {
      // Move the player according to its velocity in the two dimensions:
      playerX += playerVelocityX;
      playerY += playerVelocityY;
  
      // Has the player hit the top?  We compare to 20 (the radius of the
      // player circle) because when the centre is 20 away from the edge,
      // the circle is about to go out of the playfield.
      if (playerY < 20) {
        // If so, warp back to starting location.
        playerX = 200;
        playerY = 100;
      }
  
      // Has the player hit the right?  The '620' there comes from
      // 'PLAYFIELD_WIDTH - CIRCLE_RADIUS' = 640 - 20.
      if (playerX > 620) {
        // If so, warp back to starting location.
        playerX = 200;
        playerY = 100;
      }
  
      // TODO: Warp to centre if hit bottom or left of playfield.
    }
    function updateOpponent() {
      opponentY += opponentVelocityY;
      if (opponentY < 1) {
        opponentX = 600;
        opponentY = 100;
      }
    }
  
    /** Update the state of the whole game to reflect the fact that one
     * video frame's worth of time has gone by, and update the DOM to
     * reflect any visible changes. */
    function oneFrame() {
      updatePlayer();
      updateOpponent();
      refreshDisplay();
  
      // Request a callback before the next repaint/frame.
      requestAnimationFrame(oneFrame);
    }
  
    /** Respond to a keydown event.  The (human) player can use the arrow
     * keys to set the direction of the in-game player circle. */
    function handleKeydown(event) {
      if (event.key === "ArrowUp") {
        playerVelocityX = 0;
        playerVelocityY = -1;
      } else if (event.key === "ArrowDown") {
        playerVelocityX = 0;
        playerVelocityY = 1;
      }
    }
  
    // Connect event handlers and animation callback.
    $("#playfield").keydown(handleKeydown);
    requestAnimationFrame(oneFrame);

////BOUNCING JS FILE BELOW THIS
    const b = {
		x:300,
		y:30,
		w:15,
		h:15,
		dx:1,
		dy:1,
		speed:1,
		ani:{}
	}

	const ball = $('#ball');
	ball.css({left: `${b.x}px`});
	ball.css({top: `${b.y}px`});

	$(document).on('click', 'button', function(event){
		event.preventDefault();
		b.ani = window.requestAnimationFrame(mover);	
	});

	function mover(){
		b.x += b.dx * b.speed;
		b.y += b.dy * b.speed;

		// console.log("moving");
		
		ball.css({left: `${b.x}px`});
		ball.css({top: `${b.y}px`});

		if(b.x > 640-b.w || b.x < 0){
			b.dx *= -1;
		}

		if(b.y > 480 - b.h || b.y < 0){
			b.dy *= -1;
		}

		b.ani = window.requestAnimationFrame(mover);
		
	}		
	
	console.log("x");
  });