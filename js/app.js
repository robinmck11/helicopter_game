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
      yPos: board.height / 2,

      // Future proofing

      setxPos: function() {
        xPos+=1;
      },

      setyPos: function() {
        yPos+=1;
      },
    }

    console.log(board.width);
    console.log(board.height);

    console.log("Helicopter xposition: " + helicopter.xPos);
    console.log("Helicopter yposition: " + helicopter.yPos);


});
