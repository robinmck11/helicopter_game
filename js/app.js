/*
  Helicopter
    - Attributes
      - xPos
      - yPos
    - Behaviours
      - move down
      - move up
*/

var helicopter = {

  // start at half height
  xPos: 100,
  yPos: $("#container").height(),

  getxPos: function(){
    return xPos;
  },

  getyPos: function(){
    return this.yPos;

  },

  setxPos: function(){

  },

  setyPos: function(){

  },
}

console.log(helicopter.getyPos());
