# Birds
### A pixijs game
A simple spaceship game but a littlebit reconsidered and wrapped into a specific design.
Instead of ship the main caracter is a colibry, what tries to avoid the flying crazy creatures.
The colibry is able to catch flies that can spit to the bastards so avoid the danger. But eating flies has it's tradeoff: that makes it fat and slow, will be hard to move away from danger. So you have to choose the best tactic, or find the balance between fittness and defending.

## Setting up
- clone repository from https://github.com/Lamap/birds
- npm install
- npm run start-server
- you can see the app running on your localhost:3000

## TODOs - brief backlog
### phase 1
- [x] Particle animation for smoke emittion and explotions
- [ ] First level of spritesheet animations
    - [ ] Wings and propellers
- [ ] Finish game element graphics
    - [ ] Cutting out
    - [ ] Turn some to svg
    - [ ] coloring
- [ ] Add tween library and refine colibry's movement
- [ ] Refine game element collision
- [ ] Add flies
### phase 2
- [ ] Collect and handle of all assets load
    - [ ] to be loaded together
    - [ ] at the beginning
    - [ ] show preloader
- [ ] Second level of animations
  - [ ] Engine smoke
  - [ ] Engine stirrings
  - [ ] Teeth movings
  - [ ] Eyes open/close
- [ ] Cathcing flies
  - [ ] beak opening
  - [ ] getting weight
  - [ ] Count and display catches, available shots
- [ ] Fly shooting, simple hit
- [ ] Explosion on fly hit

### phase 3
 - [ ] Add sounds
    - [ ] wing sounds
    - [ ] engine sounds
    - [ ] fly sound
    - [ ] handle left-right moving
- [ ] Refine smoke and explition effects

## Game characters
### The colibry
![Alt text](/assets/birdy.png "The main character")
* wing snapping
* open it's bake (for catching fly, can catch them only with opened)
* getting & losing weight
* eye move

### Bastard#1
![Alt text](/assets/contraBirds/contra1.png "The bastard 1")
* propeller rotation
* smoke
* engine pistons pounding
* teeth growing, moving

### Bastard#2
![Alt text](/assets/contraBirds/contra2.png "The bastard 2")
* propeller rotation
* smoke
* engine pistons pounding
* teeth growing, moving

### Bastard#3
![Alt text](/assets/contraBirds/contra3.png "The bastard 3")
* propeller rotation
* eye move

### Bastard#4
![Alt text](/assets/contraBirds/contra4.png "The bastard 4")
* propeller rotation
* eye move

### Flies
![Alt text](/assets/contraBirds/fly.png "The small fly")
* wing snapping
