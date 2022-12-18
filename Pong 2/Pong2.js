$(document).ready(function() {

//DATA STRUCTURE
const $pong = $('#pong');
const $player_paddle = $('#player_paddle');
const $aiPaddle = $('#ai_paddle');
const $ball = $('#ball');
const $restart = $('#restart')

//DIRECTION OF BALL
const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

let interval = null;
let aiPaddle = null;
let ball = null;

$pong.mousemove(function (evt) {
    if (!interval) {
        return;
    }
    const top = Math.min(
        $('#pong').height() - $player_paddle.height(), 
        evt.pageY - $pong.offset().top)

        $player_paddle.css({
        top: `${top}px`
    });
});
    
////////////////////////////////////////////////////////
//BALL PHYSICS

function isBallOverlappingWithPlayerPaddle() {
    return $ball.overlaps('#player_paddle').length > 0
}

function isBallOverlappingWithAiPaddle() {
    return $ball.overlaps('#ai_paddle').length > 0
}

function isBallOverlappingWithTop() {
    return ball.top <= 0;
}

function isBallOverlappingWithBottom() {
    return ball.top >= $pong.height() - $ball.height();
}

///////////////////////////////////////////////////////////////
/////BALL UPDATE/////////////////////////////////////////////////

function updateBall() {
    ball.top += ball.speed * Math.sin(ball.angle);
    ball.left += ball.speed * Math.cos(ball.angle);
    $ball.css({
        top: `${ball.top}px`,
        left: `${ball.left}px`
    });

    if (isBallOverlappingWithPlayerPaddle()) {
        if (ball.angle === UP_LEFT) {
            ball.angle = UP_RIGHT;
        } else if (ball.angle === DOWN_LEFT){
            ball.angle = DOWN_RIGHT;
        }
    }
    if (isBallOverlappingWithAiPaddle()) {
        if (ball.angle === UP_RIGHT) {
            ball.angle = UP_LEFT;
        } else if (ball.angle === DOWN_RIGHT){
            ball.angle = DOWN_LEFT;}
        }

    if (isBallOverlappingWithTop()) {
        if (ball.angle === UP_RIGHT) {
            ball.angle = DOWN_RIGHT;
        } else if (ball.angle === UP_LEFT){
            ball.angle = DOWN_LEFT;
        }}
        
    if (isBallOverlappingWithBottom()) {
        if (ball.angle === DOWN_RIGHT) {
            ball.angle = UP_RIGHT;
        } else if (ball.angle === DOWN_LEFT){
            ball.angle = UP_LEFT;
        }
}}

let blueScore = document.getElementById('blue_score').innerHTML;
let redScore = document.getElementById('red_score').innerHTML;

function getWinner () {
    if (ball.left < 0){
        blueScore --;
    } else if (ball.left > $pong.width() - $ball.width()) {
        redScore --;
    }
}

const winner = getWinner();
        if (winner) {
        endGame(winner);
}
    
function endGame(winner) {
        clearInterval(interval);
        interval = null;
        blueScore --
    }

function updateAiPAddle() {
    if (aiPaddle.top >  $pong.height() - $aiPaddle.height()) {
        aiPaddle.direction = -1;
    }
    
    if (aiPaddle.top < 0) {
        aiPaddle.direction = 1;
    }
    
    aiPaddle.top += aiPaddle.direction * aiPaddle.speed;
    $aiPaddle.css({ top: `${aiPaddle.top}px`});
};


function update() {
    updateBall();
    updateAiPAddle();
}

$restart.click(function() {
    init();
});

function init() {
    aiPaddle = {
        direction: 1,
        speed: 3,
        top: 0}

    ball = {
        top: 100,
        left: 350,
        angle: UP_LEFT,
        speed: 3}

    interval = setInterval(update, 2);
}

init();

});