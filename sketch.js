kaboom({
  scale: 1.5,
  background: [30,30,30],
})

//load player
const player = add([
  rect(32,64), 
  pos(0,0), 
  body(), 
  area() 
])

//test platform
add([
  rect(256,64),
  pos(0,320),
  area(),
  solid(),
  color(0,0,0)
])

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

