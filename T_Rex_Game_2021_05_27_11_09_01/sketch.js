var trex ,trex_running, trex_col;
var cloudimg, cloud
var ground, groundimg, invisibleground;
var obstacles, o1,o2,o3,o4,o5,o6
var score
var obstaclesgroup, cloudsgroup
var PLAY = 1 
var END = 0
var gamestate = PLAY
var diesound, jumpsound, checkpointsound
var restart, gameover 



function preload () {
  // Loading animation and image
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_col = loadAnimation ("trex_collided.png")
 
  cloudimg = loadImage("cloud.png")
  groundimg = loadImage("ground2.png")
 
  o1 = loadImage ("obstacle1.png")
  o2 = loadImage ("obstacle2.png")
  o3 = loadImage ("obstacle3.png")
  o4 = loadImage ("obstacle4.png")
  o5 = loadImage ("obstacle5.png")
  o6 = loadImage ("obstacle6.png")

  restart = loadImage ("restart.png")
  gameover = loadImage ("gameOver.png")
  
  diesound = loadSound ("die.mp3")
  checkpointsound = loadSound ("checkPoint.mp3")
  jumpsound = loadSound ("jump.mp3")
}

function setup(){
    createCanvas(600,200)

    //Creating T-Rex sprite + T-Rex animation
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    trex.addAnimation("collided", trex_col)
    trex.setCollider ("rectangle",0,0, 110,100)  
  
    // Creating ground Sprite
    ground = createSprite(300,190,600,20);
    ground.addImage("ground", groundimg) 
    invisibleground = createSprite (300,195,600,10)
    invisibleground.visible = false
  
    obstaclesgroup = new Group ();
    cloudsgroup = new Group ();
  
    score = 0 
    trex.debug = true
  
 
  
}

function spawnclouds () {
    if (frameCount%120 == 0){
      //creating cloud sprite
    cloud = createSprite(550,60,20,50);
    cloud.y = Math.round (random (0,70))
    cloud.addImage("cloud", cloudimg)
    cloud.velocityX = -3
    cloud.scale = 0.8
    //Making Trex above Clouds
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    // setting lifetime for clouds
    cloud.lifetime = 200
    cloudsgroup.add(cloud)
    }
  
  
}


function spawnobstacles (){
  if (frameCount%60 == 0) {
    obstacles = createSprite(605,172,20,45)
    obstacles.velocityX = - (8 + score/200)
    
    var rand = Math.round (random (1,6))
    switch (rand) {
      case 1: obstacles.addImage("o1", o1);
        break
      case 2: obstacles.addImage("o2", o2);
        break
      case 3: obstacles.addImage("o3", o3);
        break
      case 4: obstacles.addImage("o4", o4);
        break
      case 5: obstacles.addImage("o5", o5);
        break
      case 6: obstacles.addImage("o6", o6);
        break
      default: break
    }
      obstacles.scale = 0.5 
      obstacles.lifetime = 123 
     
      obstaclesgroup.add(obstacles)
  }
  
  
}
  
  
  
function reset (){
  gamestate = PLAY
  cloudsgroup.destroyEach()
  obstaclesgroup.destroyEach()
  score = 0 
  
}


function draw(){ 
    background("white")
  
    text("Score:  "+ score, 500, 50)
    
  
    if (gamestate == PLAY) {
    trex.changeAnimation("running")
    
    ground.velocityX = - (5 + score/200)
    
    score = score + Math.round(frameCount/240)
    
      // Adding 'Jump'
    if(keyDown("space") && trex.y > 135) {
      trex.velocityY = -12;
      jumpsound.play ()
      }
     
    //scrolling
      if(ground.x < 0) {
      ground.x = ground.width/2}
    
    if (obstaclesgroup.isTouching(trex)) {
      gamestate = END
      diesound.play ()
    }
    
    if (score%100 == 0 && score > 0) {
      checkpointsound.play ()
    }
    
    spawnclouds();
    spawnobstacles();
    
    
  }
  
 
  
  else if (gamestate == END) {
    ground.velocityX = 0
    cloudsgroup.setVelocityXEach (0)
    obstaclesgroup.setVelocityXEach (0)
    
    cloudsgroup.setLifetimeEach(-1)
    obstaclesgroup.setLifetimeEach(-1)
    
    trex.changeAnimation ("collided")
    
    text("Press 'Space' to Restart",250,100 )
    
    if (keyDown("space")){
      reset ()
    }
    
  }
  
    
  
  
  
    
  
    // Adding gravity to the T-Rex
    trex.velocityY = trex.velocityY + 0.9

    trex.collide(invisibleground);

  
  
  
  
   
    drawSprites();
    
}