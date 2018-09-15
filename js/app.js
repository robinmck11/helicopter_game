$(document).ready(function() {

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

      // Future proofing

      setxPos: function(value) {
        this.xPos+=value;
      },

      setyPos: function(value) {
        this.yPos+=value;
      },
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
