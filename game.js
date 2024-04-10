const colors = ['red', 'blue', 'green', 'yellow'];

let pattern = [];
let clickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function () {
    let colorChoosed = $(this).attr("id");
    clickedPattern.push(colorChoosed);
    playSound(colorChoosed);
    animatingClick(colorChoosed);
    checkAnswer(clickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (pattern[currentLevel] == clickedPattern[currentLevel]) {
        if (clickedPattern.length === pattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

function nextSequence() {
    clickedPattern = [];
    level++;
    $('h1').text('Level ' + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = colors[randomNumber];
    pattern.push(randomChosenColour);

    let i = 0;
    function flashPattern() {
        if (i < pattern.length) {
            $("#" + pattern[i]).fadeOut(100).fadeIn(100, function () {
                playSound(pattern[i]);
                i++;
                flashPattern(); // Chama-se a si mesmo recursivamente
            });
        }
    }
    flashPattern();

    // for (i = 0; i < pattern.length; i++) {
    //     $("#" + pattern[i]).fadeOut(100).fadeIn(100);
    // }
    // playSound(randomChosenColour);
};

function playSound(name) {
    const sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
};

function animatingClick(name) {
    $('.' + name).addClass('pressed');
    setTimeout(() => {
        $('.' + name).removeClass('pressed');
    }, 100);
};

function startOver() {
    level = 0;
    pattern = [];
    started = false;
}