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
    }, 5);

    return false;
  });

  $('#container').mouseup(function(){

    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      console.log("GOING DOWN");
      helicopter.yPos+=1;
      drawCharacter();
    }, 5);

    return false;
  });

  var board = {
    width: $("#container").width(),
    height: $("#container").height(),
    top:
    bottom:
    left:
    right:
  }

  var helicopter = {
    // start at half board height
    xPos: 50,
    yPos: (board.height / 2) - ($("#character").height() / 2),
  }

  var obsticle = {
    width: 60,
    height: 150,

    // random between top of board and (boardheight - height of the obstacle.)

    posYStart:
  }



    /*
      Draws the character
    */

    function drawCharacter(){
      $("#character").css({"left": helicopter.xPos + "px",
                  "top": helicopter.yPos + "px"
                });
    }

    drawCharacter();


});
