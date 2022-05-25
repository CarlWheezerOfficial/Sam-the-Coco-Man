kaboom({
  scale: 2.5,
  background: [30,30,50],
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
loadSprite("Dirt","Dirt.png", {
})
loadSprite("Grass","Grass.png", {
})
loadSprite("Spikes","Spikes.png", {
})
loadSprite("Gem","Gem.png", {
})
loadSprite("Moon","Moon.png", {
})
loadSprite("Magic","Magic.png", {
})
loadSprite("Orb","Orb.png", {
  sliceX: 3,
  sliceY: 4,
  anims: {
    idle: {
      from: 0,
      to:9,
      speed: 12,
      loop: true}
  }
})
loadSprite("PB","EB.png")

let lvl = 0



scene("game",() => {
const Moon = add([
  sprite("Moon"),
  pos(200,20),
  fixed(),
  z(-1)
])

  for (let i = 0; i < 150; i++) {
    let size = rand(0,2)
    let rot = rand(0,360)
  add([
    rect(size,size),
    pos(rand(0,width()),rand(0,height())),
    color(rand(100,255),(100,255),(100,255)),
    rotate(rot),
    z(-2),
    fixed()
  ])
}

//test platform
const levelConfig = {
  width: 24,
  height: 24,
  pos: vec2(24,24),
    "w": () => [
    "wall",
    sprite("Grass"),
    area(),
    solid()
  ],
    "m": () => [
    "wall",
    sprite("Dirt"),
    area(),
    solid()
  ],
      g: () => [
    "gem",
    sprite("Gem"),
    area(),
  ],
    "z": () => [
    "fallbox",
    sprite("Spikes"),
    area(),
    solid()
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
    sprite("Orb", {
    anim: "idle",
    }),
    area(),
    origin("center")
  ],
}
const levels = [
[
  "z               w             z",
  "m               m             m",
  "m  bf  b       wm             m",
  "m   www  0     mm             m",
  "mwwwmmmwwww  wwmm 0  b f  b  gm",
  "mmmmmmmmmmm  mmmmww   wwww  wwm",
  "mmmmmmmmmmmzzmmmmmmzzzmmmmzzmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  ],
  [
  "z                             z",
  "m                             m",
  "m             w  w b f b      m",
  "m     0   w   m  m  www      gm",
  "m     w   m         mmm    wwwm",
  "mwww  m                    mmmm",
  "mmmm  m                    mmmm",
  "mmmmzzmzzzzzzzzzzzzzzzzzzzzmmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  ],
  [
  "z                  z                       z",
  "m                  m                       m",
  "m                  m  ww                   m",
  "m               z  m   m   w     w         m",
  "m      b f   b  m  mw  mb        f    b    m",
  "m       wwwww   m      mzzzzzzzzzzzzzzz    m",
  "mwww            m      mmmmmmmmmmmmmmmm  g m",
  "mzzzzzzzzzzzzzzzmwwwwwwmmmmmmmmmmmmmmmmwwwwm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  ],
]
addLevel(levels[lvl],levelConfig)


//player
//load player
const player = add([
  sprite("wiz", {
    anim: "idle",
  }), 
  "player",
  pos(64,0), 
  area({width: 12,
       height: 29}),
  body(),  
  origin("center")
])

//magic
let mana = 100
const TempMP = add([
  rect(mana,10),
  pos(10,20),
  color(0,50,200),
  fixed(),
])

let MC = true
onKeyPress("right",() => {
  if((mana-5) >= 0){
  add([
    "bullet",
    sprite("Magic"),
    move(0,200),
    area(),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.width = mana
  ])
  }
})
onKeyPress("left",() => {
  if((mana -5) >= 0){
  add([
    "bullet",
    area(),
    sprite("Magic"),
    move(180,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.width = mana
  ])
  }
})
onKeyPress("down",() => {
  if((mana-5) >= 0){
  add([
    "bullet",
    area(),
    sprite("Magic"),
    move(90,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.mana =  mana
  ])
  }
})
onKeyPress("up",() => {
  if((mana -5 )>= 0){
  add([
    "bullet",
    area(),
    sprite("Magic"),
    move(270,200),
    pos(player.pos.x,player.pos.y),
    mana -= 5,
    TempMP.width = mana
  ])
  }
})
loop(0.5, ()=>{
if(mana < 100){
        mana += 1
    TempMP.width = mana
}
  else{
    mana = 100
    TempMP.width = mana
  }
  })

  onCollide("bullet","wall", (b,w) => {
    destroy(b)
  })

//health and jazz
let PHP = 3
const TempHP = add([
  rect((PHP * 50),10),
  pos(10,8),
  fixed(),
  color(245,20,20)
])
 player.onCollide("fallbox",() => {
   player.pos.x = 64
   player.pos.y = 0
   PHP--
   TempHP.width = PHP * 50
   if(PHP == 0){
     go("ded")
   }
 })
  player.onCollide("orb",(o) => {
  destroy(o)
  PHP = 3
  TempHP.width = PHP * 50
  mana += randi(10,50)
  if(mana > 100){
    mana = 100
  }
  TempMP.width = mana
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

//win
player.onCollide("gem", () => {
if (lvl <= 1){
    lvl++
  go("game")
}
  else{
    go("ween")
  }
})

//enemies
//test enemy movement
let fMov = 30
 onUpdate("fred",(f) => {
    f.move(fMov,0)
   let fire = randi(1,1000)
   if (fire >= 995){
     add([
       sprite("PB"),
       pos(f.pos),
       "poob",
       move(0,200),
       area()
     ])
   }
   if(fire <= 5){
          add([
       sprite("PB"),
       pos(f.pos),
       "poob",
       move(180,200),
            area()
     ])
   }
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
onCollide("player","poob",(p,b) => {
    PHP--
    TempHP.width = PHP * 50
    if(PHP == 0){
     go("ded")
  }
    destroy(b)
  })
onCollide("poob","wall",(p,w) => {
  destroy(p)
})  
  
//enemy collision and drops
onCollide("fred","bullet",(f,o) => {
  destroy(f)
  destroy(o)
  add([
    "orb",
    sprite("Orb", {
    anim: "idle",
    }),
    area(),
    origin("center"),
    pos(f.pos)
  ])
})
})

scene("menu",() => {
  add([
    text("Wiz"),
    pos(width()*0.5,height()*0.25),
    origin("center")
  ])
    add([
    text("Start",{
         size:21
         }),
    pos(width()*0.5,height()*0.50),
    origin("center"),
      area(),
      "butn"
  ])
  
  onClick("butn",() => {
    go("game")
    lvl = 0
  })
})


scene("ded",() => {
  add([
    text("Lose"),
    pos(width()*0.5,height()*0.25),
    origin("center")
  ])
    add([
    text("Menu",{
         size:21
         }),
    pos(width()*0.5,height()*0.50),
    origin("center"),
      area(),
      "butn"
  ])
  onClick("butn",() => {
    go("menu")
  })
})
scene("ween",() => {
  add([
    text("Win"),
    pos(width()*0.5,height()*0.25),
    origin("center")
  ])
    add([
    text("Menu",{
         size:21
         }),
    pos(width()*0.5,height()*0.50),
    origin("center"),
      area(),
      "butn"
  ])
  onClick("butn",() => {
    go("menu")
  })
})


go("menu")
