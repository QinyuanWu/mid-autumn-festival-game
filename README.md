# Space Invaders

An implementation the classic arcade game [Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders)
with the following behavior:

- The tank (player's spaceship) should move right and left at the bottom of the screen when you press the arrow keys.
- The tank should fire missiles straight up from its current position when you press the space bar.
- The invaders (enemy's spaceships) should appear randomly along the top of the screen and move down on a straight vertical trajectory.
- When a missile hits an invader, it destroys it.
- When an invader reaches the bottom of the screen, the game is over.

FlexObject: an object that has the ability to move(not fixed) on the canvas.
FlexImg: an image that has the ability to move on the canvas.
Tank: respond to keyboard input and move left and right.
Invaders: has reachedEnd and alive property to help display them. It also has a 50% chance to jiggle to the left and another 50% of times jiggle to the right by 1 pixel. 
