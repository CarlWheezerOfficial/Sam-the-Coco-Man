kaboom({
  scale: 2.5,
  background: [30,30,30],
})

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
loadSprite("wiz","Wizrd.png", {
  sliceX: 3,
  sliceY: 4,
  anims: {
    idle: {
      from: 0,
      to:0},
    run: {
      from: 3,
      to:6,
      speed: 12,
      loop: true},
    fall: {
      from: 1,
      to: 2,
      loop: true,
      speed: 12,
    },
    dash: {
      from: 7,
      to: 10,
      speed: 12,
      loop: true},
  }
})

//test platform
const levelConfig = {
  width: 24,
  height: 24,
  pos: vec2(24,24),
    "w": () => [
    "wall",
    rect(24,24),
    area(),
    solid()
  ],
    "m": () => [
    "wall",
    rect(24,24),
    color(200,200,200),
    area(),
    solid()
  ],
    "z": () => [
    "fallbox",
    rect(24,24),
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
    body(),
  ],
      "b": () => [
    "border",
    rect(24,24),
    color(0,200,200),
    area(),
    opacity(0),
    
  ],
        "0": () => [
    "orb",
    rect(10,10),
    color(0,100,200),
    area(),
    opacity(0.5),
    origin("center")
    
  ],
}
const levels = [
[
  "m               m          z",
  "w               w          z",
  "m  bf  b       wm          z",
  "w   wmw  0     mw          z",
  "mwmwmwmwmwm  wmwm          z",
  "wmwmwmwmwmw  mwmwmw      mwz",
  "zzzzzzzzzzzzzzzzzzzzzzzzzzzz",
  ],
]
addLevel(levels[0],levelConfig)


//player
//load player
const player = add([
  sprite("wiz", {
    anim: "idle",
  }), 
  pos(64,0), 
  area({width: 12,
       height: 29}),
  body(),  
  origin("center")
])

//magic
let mana = 100
const TempMP = add([
  text("Mana = 100", {
    size: 10,
    font: "sink"
  }),
  pos(10,30),
  fixed()
])
onKeyPress("right",() => {
  if((mana-5) >= 0){
  add([
    "bullet",
    rect(5,5),
    move(0,200),
    area(),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.text = "Mana = "+ mana
  ])
  }
})
onKeyPress("left",() => {
  if((mana -5) >= 0){
  add([
    "bullet",
    area(),
    rect(5,5),
    move(180,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.text = "Mana = "+ mana
  ])
  }
})
onKeyPress("down",() => {
  if((mana-5) >= 0){
  add([
    "bullet",
    area(),
    rect(5,5),
    move(90,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.text = "Mana = "+ mana
  ])
  }
})
onKeyPress("up",() => {
  if((mana -5 )>= 0){
  add([
    "bullet",
    area(),
    rect(5,5),
    move(270,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.text = "Mana = "+ mana
  ])
  }
})
loop(1, ()=>{
if(mana < 100){
        mana += 1
    TempMP.text = "Mana = "+ mana
}
  else{
    mana = 100
    TempMP.text = "Mana = "+ mana
  }
  })
player.onCollide("orb",(o) => {
  destroy(o)
  mana += randi(10,50)
  if(mana > 100){
    mana = 100
  }
  TempMP.text = "Mana = "+ mana
})

//health and jazz
let PHP = 3
const TempHP = add([
  text("Hp = 3", {
    size: 10,
    font: "sink"
  }),
  pos(10,10),
  fixed()
])
 player.onCollide("fallbox",() => {
   player.pos.x = 64
   player.pos.y = 0
   PHP--
   TempHP.text = "Hp = "+ PHP
 })

// player movement
  player.onUpdate(() => {
  camPos(player.pos.x,player.pos.y)})
  onKeyPress("space",() =>{
   if (player.isGrounded() == true)
    player.jump(500)
    player.play("fall")
  })
  onKeyDown("d",() => {
    player.move(300,0)
  })
  onKeyDown("a",() => {
    player.move(-300,0)
  })
//player anims
  onKeyPress("d",() =>{
      player.flipX(false)
   if (player.isGrounded() == true){
    player.play ("run")
   }
    else{
      player.play("fall")
    }
  })
  onKeyPress("a",() =>{
      player.flipX(true)
   if (player.isGrounded() == true){
    player.play ("run")
   }
   else{
     player.play("fall")
   }   
  })
  onKeyRelease(["a", "d"], () => {
	 if (
	 	!isKeyDown("a")
		&& !isKeyDown("d")
	 ) 
	 if(player.isGrounded == false){
      player.play("fall")
        }
   else{player.play("idle")}
})


//enemies
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

//enemy collision and drops
onCollide("fred","bullet",(f,o) => {
  destroy(f)
  destroy(o)
  add([
        "orb",
    rect(10,10),
    color(0,100,200),
    area(),
    pos(f.pos),
    opacity(0.5),
  ])
})
