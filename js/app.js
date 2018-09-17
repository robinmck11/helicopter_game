$(document).ready(function() {

  var interval;

  var timeOutMouseDown;
  var timeOutMouseUp;

  $('#container').mousedown(function(){

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){

        colider();
        helicopter.yPos-=1;
        drawCharacter();
        updateObstacle();
    }, 5);

    return false;
  });

  $('#container').mouseup(function(){
    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      colider();
      helicopter.yPos+=1;
      drawCharacter();
      updateObstacle();
    }, 5);

    return false;
  });

  var board = {
    width: $("#container").width(),
    height: $("#container").height(),
    left: $("#container").offset().left,
  }

  var helicopter = {
    // start at half board height
    xPos: 80,
    yPos: (board.height / 2) - ($("#character").height() / 2),
  }

  var obstacle = {

    width : $("#obstacle").width(),
    height : $("#obstacle").height(),

    xPos : board.width - $("#obstacle").width(),

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

  function colider(){

    // Character

    var leftch = $("#character").offset().left;
    var topch = $("#character").offset().top;
    var rightch = $("#character").offset().left + $("#character").width();
    var bottomch = $("#character").offset().top + $("#character").height();


    // Obstacle

    var leftob = $("#obstacle").offset().left;
    var topob = $("#obstacle").offset().top;
    var rightob = $("#obstacle").offset().left + $("#obstacle").width();
    var bottomob = $("#obstacle").offset().top + $("#obstacle").height();


    if (helicopter.yPos <= 0 || helicopter.yPos >= board.height - $("#character").height()
        || ( (rightch == leftob) && (bottomch < bottomob) && (topch > topob) )) {
          // restart the game
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
