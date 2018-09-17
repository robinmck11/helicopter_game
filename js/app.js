$(document).ready(function() {

  var gameStarted = false;

  var interval;

  var timeOutMouseDown
  var timeOutMouseUp;

  $('#container').mousedown(function(){

    gameStarted = true;

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){
        console.log("GOING UP");
        helicopter.yPos-=1;
        drawCharacter();
        updateObstacle();
    }, 5);

    return false;
  });

  $('#container').mouseup(function(){

    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      console.log("GOING DOWN");
      helicopter.yPos+=1;
      drawCharacter();
      updateObstacle();
    }, 5);

    return false;
  });

  var board = {
    width: $("#container").width(),
    height: $("#container").height(),
    // top: $("#container").offset().top,
    // left: $("#container").offset().left,
    // right: $("#container").offset().left + $("#container").width(),
    // bottom: this.top + this.height,
  }

  var helicopter = {
    // start at half board height
    xPos: 50,
    yPos: (board.height / 2) - ($("#character").height() / 2),
  }

  var obstacle = {

    width : $("#obstacle").width(),
    height : $("#obstacle").height(),

    // random between top of board and (boardheight - height of the obstacle.)

    xPos : board.width - $("#obstacle").width(),

    // Calculate y start

     yPos : Math.floor(Math.random() * (board.height - $("#obstacle").height())),

  }

  function drawObstacle(){
    $("#obstacle").css({"left": obstacle.xPos + "px",
                        "top": obstacle.yPos + "px"
                       });
  }

  function updateObstacle(){
    obstacle.xPos-=1;
    drawObstacle();
  }

    /*
      Draws the character
    */

  function drawCharacter(){
      $("#character").css({
        "left": helicopter.xPos + "px",
        "top": helicopter.yPos + "px"
      });
    }

  drawCharacter();
  drawObstacle();
  // console.log(Math.floor(Math.random() * (board.height - obstacle.height)));
  console.log(obstacle.xPos);


});
