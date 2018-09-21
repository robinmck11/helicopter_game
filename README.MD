# Helicopter Game

[Play here!](https://robinmck11.github.io/helicopter_game/index.html)

## About
The game is based on what is considered to be one of the first and most addicting flash games on the internet. The aim is simple, to survive for as long as possible by avoiding obstacles.

## Instructions

**Mouse Down:** Move Up
**Mouse UP:** Move Down

## Tasks (In no particular order)

* Score System
  * Current and best
* Obstacles moving towards the character
* Character
  * Animate
  * Movement up and down when events triggered
* Levels
  * Level 1 - Standard difficulty
  * Level 2 - Medium difficulty - Increase height and speed of obstacle. Change colour of obstacle
  * Level 3 - Hardest difficulty - Increase height and speed of obstacle. Increase speed of character. Change colour of obstacle.
  * Level 4 - Increase speed of obstacle and change its colour. Increase speed of character.

## Screenshots

Screenshot showing button prompting the user to start the game.

![screen shot 2018-09-20 at 13 40 52](https://user-images.githubusercontent.com/24536293/45818989-21755f00-bcdb-11e8-93ad-59adea32b27e.png)

Screen shot showing an ongoing game.

![screen shot 2018-09-20 at 13 41 17](https://user-images.githubusercontent.com/24536293/45818890-e6732b80-bcda-11e8-88e0-08833bba0402.png)

## Issues Encountered

### MouseDown and MouseUp Event Handlers

The issue was that the game would restart on mouseUp. This was due to the mouseDown Event being active when a collision was detected. The solution was to call the jquery function off() to remove the event handler. The event handler was re-added when the start button was again pressed.

### Tunnel Object

The problem was that the tunnel would appear off screen when moving right to left. The solution was to make the tunnel the same colour as the background of the page. A better proposed solution would be to create an array of objects of smaller widths and add them to the right side of the container one after the other, and remove them one by one when they reach the left side of the page. This would be best implemented using a queue data structure.
