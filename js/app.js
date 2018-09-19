$(document).ready(function() {

  var interval;

  var timeOutMouseDown;
  var timeOutMouseUp;

  var timeOutAnimateCharacter = setInterval(animateSprite,50);
  var spriteCounter = 1;

  var score = 0;
  var best = 0;

  var restart = false;

  var level = 1;

  var tunnel;

  heliSound = new sound("sound/helicopter-hovering-01.mp3");
  crashSound = new sound("sound/explosion.mp3");

  $('#container').mousedown(function(){

    clearInterval(timeOutMouseUp);

    timeOutMouseDown = setInterval(function(){

      heliSound.play();

        colider();

        if (level == 3){
          helicopter.yPos-=3;
        } else{
          helicopter.yPos-=2;
        }


        drawCharacter();
        updateObstacle();

        // if tunnel exists

        if (tunnelExists()){
          drawTunnel();
          checkTunnel();
        } else {
          tunnel = new Tunnel();
        }


        score++;
        checkLevel();
        $("#score").html("Score: " + score);
        $("#level").html("Level: " + level);

    }, 10);

    return false;
  });

  $('#container').mouseup(function(){

    clearInterval(timeOutMouseDown);

    timeOutMouseUp = setInterval(function(){
      colider();

      if (level == 3){
        helicopter.yPos+=3;
      } else{
        helicopter.yPos+=2;
      }

      drawCharacter();
      updateObstacle();

      // if tunnel exists

      if (tunnelExists()){
        drawTunnel();
        checkTunnel();
      }
      else {
        tunnel = new Tunnel();
      }

      score++;
      checkLevel();
      $("#score").html("Score: " + score);
      $("#level").html("Level: " + level);

    }, 10);

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

    this.topWidth = Math.floor((Math.random() * 300) + 20);
    this.bottomWidth = Math.floor((Math.random() * 300) + 20);

    this.topHeight = Math.floor((Math.random() * 70) + 1);
    this.bottomHeight = this.topHeight;

    this.topxPos = 700 - $("#tunnelTop").width();

    this.topyPos = 0;

    this.bottomxPos = 700 - $("#tunnelBottom").width();
    this.bottomyPos = 500 - this.bottomHeight;



    // set properties
  }

  function drawTunnel(){

    // draw top and bottom

    $("#tunnelTop").css({"left": tunnel.topxPos + "px",
                        "top": tunnel.topyPos + "px",
                        "width": tunnel.topWidth + "px",
                        "height": tunnel.topHeight + "px",
                      });

    $("#tunnelBottom").css({"left": tunnel.bottomxPos + "px",
                        "top": tunnel.bottomyPos + "px",
                        "width": tunnel.bottomWidth + "px",
                        "height": tunnel.bottomHeight + "px",
                      });

    tunnel.topxPos-=2;
    tunnel.bottomxPos-=2;

  }

  function checkTunnel(){

    if (tunnel.topxPos <= 0) {
      $("#tunnelTop").hide();
      $("#tunnelTop").remove();
    }

    if(tunnel.bottomxPos <= 0){
      $("#tunnelBottom").hide();
      $("#tunnelBottom").remove();
    }
  }

  function tunnelExists(){
    if (!($("#tunnelTop").length === 0 && $("#tunnelBottom").length == 0)){
      return true;
    }

    return false;
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
          obstacle.xPos-=3;
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
          heliSound.stop();
          crashSound.play();
          restartGame();
    }

    if (tunnelExists()) {
      // Check for top tunnel collisions

      var lefttt = $("#tunnelTop").offset().left;
      var toptt = $("#tunnelTop").offset().top;
      var righttt = lefttt + $("#tunnelTop").width();
      var bottomtt = toptt + $("#tunnelTop").height();

      if (((rightch >= lefttt) && !(leftch >= righttt)) && (((bottomch <= bottomtt) && (bottomch >= toptt)) || ((topch >= toptt) && (topch <= bottomtt)))
      ){
            // restart the game
            restart = true;
            heliSound.stop();
            crashSound.play();
            restartGame();
      }

      // Check for bottom tunnel collisions

      var leftbt = $("#tunnelBottom").offset().left;
      var topbt = $("#tunnelBottom").offset().top;
      var rightbt = leftbt + $("#tunnelBottom").width();
      var bottombt = topbt + $("#tunnelBottom").height();

      if (((rightch >= leftbt) && !(leftch >= rightbt)) && (((bottomch <= bottombt) && (bottomch >= topbt)) || ((topch >= topbt) && (topch <= bottombt)))
      ){
            // restart the game
            restart = true;
            heliSound.stop();
            crashSound.play();
            restartGame();
      }

    }




  }

  function restartGame(){
    if (restart == true) {
      clearInterval(timeOutMouseUp);
      clearInterval(timeOutMouseDown);

      // set best score

      if (score > best) {
          best = score;
          $("#best").html("Best: " + best);
      }
      // Reset game


      score = -1;
      level = 1;

      helicopter.xPos = 80;
      helicopter.yPos = (board.height / 2) - ($("#character").height() / 2);

      obstacle.xPos = board.width - $("#obstacle").width();

       obstacle.yPos = Math.floor(Math.random() * (board.height - $("#obstacle").height()));

       $("#tunnelTop").remove();
       $("#tunnelBottom").remove();
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

  //drawTunnel();
  drawCharacter();
  drawObstacle();
  animateSprite();

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


});
