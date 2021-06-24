var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var isGameStart=false;
var level=0;

$(document).keydown(function () {
//if(isGameStart===false){
if(!isGameStart){

  $("#level-title").text("Level "+level);
  isGameStart=true;
  nextSequence();
}
});

$(".btn").click(function () {
  var userChosenColor=$(this).attr("id");
  playsound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkPattern(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  playsound(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);
}


function playsound(name) {
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); }, 100);
}

function checkPattern(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     if(gamePattern.length===userClickedPattern.length)
      {
    //  console.log("ok");

        setTimeout(function () {
        nextSequence(); }, 2000);

      }
  }
 else{
    //console.log("gameover",level);
    $("#level-title").text("Game Over, Press any key to Start Again");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
     }, 200);
    startAgain();
  }
}

function startAgain() {
  level=0;
 isGameStart=false;
 gamePattern=[];
}
