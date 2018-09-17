$(document).ready(function() {

  var gameStarted = false;

  var interval;

  var timeOutMouseDown
  var timeOutMouseUp;

  $('#container').mousedown(function(){

    gameStarted = true;

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){
        helicopter.yPos-=1;
        drawCharacter();
        updateObstacle();
    }, 5);

    return false;
  });

  $('#container').mouseup(function(){

    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
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
    left: $("#container").offset().left,
    // right: $("#container").offset().left + $("#container").width(),
    // bottom: this.top + this.height,
  }

  var helicopter = {
    // start at half board height
    xPos: 80,
    yPos: (board.height / 2) - ($("#character").height() / 2),
  }

  var obstacle = {

    width : $("#obstacle").width(),
    height : $("#obstacle").height(),
    left : $("#obstacle").offset().left,

    // random between top of board and (boardheight - height of the obstacle.)

    xPos : board.width - $("#obstacle").width(),

    // Calculate y start

     yPos : 0,

  }

  function drawObstacle(){
    $("#obstacle").css({"left": obstacle.xPos + "px",
                        "top": obstacle.yPos + "px"
                      });
  }

  function updateObstacle(){

    if (obstacle.xPos <= 0) {
      // reset position of obstacle

      obstacle.xPos = board.width - $("#obstacle").width(),

      obstacle.yPos = Math.floor(Math.random() * (board.height - $("#obstacle").height()))
    }
    else{
      // Update position and draw the obstacle
      obstacle.xPos-=1;
      drawObstacle();

    }
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


});
