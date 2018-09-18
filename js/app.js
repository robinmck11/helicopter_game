$(document).ready(function() {

  var interval;

  var timeOutMouseDown;
  var timeOutMouseUp;

  var timeOutAnimateCharacter = setInterval(animateSprite,50);
  var spriteCounter = 1;

  var score = 0;
  var restart = false;

  var level = 1;

  var tunnel = new Tunnel();

  $('#container').mousedown(function(){

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){

        colider();
        helicopter.yPos-=2;
        drawCharacter();
        updateObstacle();
        updateTunnel();
        score++;
        checkLevel();
        $("#score").html("Score: " + score);
        $("#level").html("Level: " + level);

    }, 5);

    return false;
  });

  $('#container').mouseup(function(){
    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      colider();
      helicopter.yPos+=2;
      drawCharacter();
      updateObstacle();
      updateTunnel();
      score++;
      checkLevel();
      $("#score").html("Score: " + score);
      $("#level").html("Level: " + level);

    }, 5);

    return false;
  });

  function animateSprite(){
    if (restart == true) {
      clearInterval(timeOutAnimateCharacter);
    }
    else {
        $("#character").attr("src","images/heli-" + spriteCounter + ".png");
        spriteCounter++;
      }


      if (spriteCounter == 4) {
        spriteCounter = 1;
      }

  }


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



  function Tunnel(){

    $('#container').append('<div id=\'tunnelTop\'></div>');
    $('#container').append('<div id=\'tunnelBottom\'></div>');

    this.topHeight = $("#tunnelTop").height();
    this.bottomHeight = $("#tunnelBottom").height();

    this.topWidth = $("#tunnelTop").width();
    this.bottomWidth = $("#tunnelBottom").width();

    // set properties
  }

  function drawTunnel(){

    // draw all tops and bottoms

    $("#tunnelTop").css({"left": 0 + "px",
                        "top": 0 + "px",
                        "width": tunnel.topWidth + "px"
                      });

    $("#tunnelBottom").css({"left": 0 + "px",
                        "top": board.height - tunnel.bottomHeight + "px",
                        "width": tunnel.bottomWidth + "px"
                      });

  }

  function updateTunnel(){

    tunnel.topWidth--;
    tunnel.bottomWidth--;

    drawTunnel();
  }

  var obstacle = {

    width : $("#obstacle").width(),
    height : $("#obstacle").height(),

    xPos : board.width - $("#obstacle").width(),

    yPos : Math.floor(Math.random() * (board.height - $("#obstacle").height())),

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

      obstacle.yPos = Math.floor(Math.random() * (board.height - $("#obstacle").height()));
    }
    else{
      // Update position and draw the obstacle
      switch (level) {
        case 1:
          obstacle.xPos-=2;
          break;
        case 2:
          obstacle.xPos-=3;
          break;
        case 3:
          obstacle.xPos-=4;
          break;
        default:

      }
      drawObstacle();

    }
  }

  function colider(){

    // Character

    var leftch = $("#character").offset().left;
    var topch = $("#character").offset().top;
    var rightch = leftch + $("#character").width();
    var bottomch = topch + $("#character").height();


    // Obstacle

    var leftob = $("#obstacle").offset().left;
    var topob = $("#obstacle").offset().top;
    var rightob = leftob + $("#obstacle").width();
    var bottomob = topob + $("#obstacle").height();


    if (helicopter.yPos <= 0 || helicopter.yPos >= board.height - $("#character").height()
    || ((rightch >= leftob) && !(leftch >= rightob)) && (((bottomch <= bottomob) && (bottomch >= topob)) || ((topch >= topob) && (topch <= bottomob)))
    ){
          // restart the game
          restart = true;
          restartGame();
          // console.log("COLLIDED");
    }
  }

  function restartGame(){
    if (restart == true) {
      clearInterval(timeOutMouseUp);
      clearInterval(timeOutMouseDown);

      // Reset game

      score = 0;
      level = 1;

      helicopter.xPos = 80;
      helicopter.yPos = (board.height / 2) - ($("#character").height() / 2);

      obstacle.xPos = board.width - $("#obstacle").width();

       obstacle.yPos = Math.floor(Math.random() * (board.height - $("#obstacle").height()));
    }

    restart = false;
  }

  function checkLevel(){

    if (score < 1000){
      $("#obstacle").css({"height":"150",
                          "background-color": "yellow"});
    } else if (score == 1000) {
        level++;
        $("#obstacle").css({"height":"200",
                          "background-color": "orange"});
    } else if (score == 2000){
      level++;
      $("#obstacle").css({"height":"250",
                          "background-color": "red"});
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

  drawTunnel();
  drawCharacter();
  drawObstacle();
  animateSprite();


});
