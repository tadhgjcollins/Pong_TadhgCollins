$(document).ready(function() {

    /////JQUERY CONSTANTS/////
    const $canvas = $('#canvas');
    const $playerPaddle = $('#playerPaddle');
    const $aiPaddle = $('#aiPaddle');

    /////DIRECTION OF BALL/////
    const upLeft = -3 * Math.PI / 4;
    const upRight = - Math.PI / 4;
    const downLeft = 3 * Math.PI / 4;
    const downRight = Math.PI / 4;


    function updateBallPosition() {
        ball.top += ball.speed * Math.sin(ball.angle);
        ball.left += ball.speed * Math.cos(ball.angle);
        $('#ball').css({
            top: `${ball.top}px`,
            left: `${ball.left}px`
        })
        
    }

    
    function init() {
        ball = {
            top: 250,
            left: 600,
            angle: upLeft,
            speed: 1/11}
            
            interval = setInterval(updateBallPosition, 2);
        }
        
        init();
        
});







////////UNUSED CODE BLOCKS

        // function update() {
        //     updateBallPosition();
            
        // }
