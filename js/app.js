$(document).ready(function() {

  var gameStarted = false;

  var interval;

  var timeOutMouseDown
  var timeOutMouseUp;
  var clicker = $('#container');

  clicker.mousedown(function(){

    gameStarted = true;

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){
        console.log("GOING UP");
        helicopter.yPos-=1;
        drawCharacter();
    }, 10);

    return false;
  });

  clicker.mouseup(function(){

    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      console.log("GOING DOWN");
      helicopter.yPos+=1;
      drawCharacter();
    }, 10);

    return false;
  });

  /*
    Board
      - Attributes
        - width
        -height
        ...
      - Behaviours
        - ...
  */

  var board = {
    width: $("#container").width(),
    height: $("#container").height(),
  }


    /*
      Helicopter
        - Attributes
          - xPos
          - yPos
          - width
          -height
          ...
        - Behaviours
          - move down
          - move up
    */

    var helicopter = {
      // start at half board height
      xPos: 50,
      yPos: (board.height / 2) - ($("#character").height() / 2),
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
