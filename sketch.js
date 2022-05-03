kaboom({
  scale: 2,
  background: [30,30,30],
})

//load player
const player = add([
  rect(32,64), 
  pos(64,0), 
  body(), 
  area() 
])

//sprites
loadSprite("fred","fred.png", {
    sliceY: 3,
    anims: {
      idle: {from: 0,
             to: 2,
            speed: 10,
            loop:true},
    }
})

//test platform
const levelConfig = {
  width: 32,
  height: 32,
  pos: vec2(32,32),
    "w": () => [
    "wall",
    rect(32,32),
    area(),
    solid()
  ],
    "m": () => [
    "wall",
    rect(32,32),
    color(200,200,200),
    area(),
    solid()
  ],
    "z": () => [
    "fallbox",
    rect(32,32),
    color(255,0,0),
    area(),
    opacity(0.1),
    
  ],
      "f": () => [
    "fred",
    sprite("fred",{
          anim: "idle",
    }),
    area(),
    solid(),
    body()
  ],
      "b": () => [
    "border",
    rect(32,32),
    color(0,200,200),
    area(),
    opacity(0.1),
    
  ],
}

const levels = [
[
  "m               m          z",
  "w               w          z",
  "m  bf  b       wm          z",
  "w   wmw        mw          z",
  "mwmwmwmwmwm  wmwm          z",
  "wmwmwmwmwmw  mwmwmw      mwz",
  "zzzzzzzzzzzzzzzzzzzzzzzzzzzz",
  ],
]

addLevel(levels[0],levelConfig)

 // player movement
  player.onUpdate(() => {
  camPos(player.pos.x,player.pos.y)})
  onKeyPress("x",() =>{
   if (player.isGrounded() == true)
    player.jump(500)
  })
  onKeyDown("right",() => {
    player.move(300,0)
  })
  onKeyDown("left",() => {
    player.move(-300,0)
  })
 player.onCollide("fallbox",() => {
   player.pos.x = 64
   player.pos.y = 0
 })

//test enemy movement
let fMov = 30

  onUpdate("fred",(f) => {
    f.move(fMov,0)
  })
 onCollide("fred","border",(f,b) => {
   fMov *= -1
       if(fMov == 30){
      f.flipX(false)
    }
    else if(fMov == -30){
      f.flipX(true)
    }
 })
