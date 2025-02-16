var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;
var started = false;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    var randomChosenButton = $("#" + randomChosenColor);

    gamePattern.push(randomChosenColor);
    randomChosenButton.fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    var currentLevel = userClickedPattern.length;
    checkAnswer(currentLevel);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(event) {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
        console.log("success");
        if (currentLevel === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}