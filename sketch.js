var playerPaddle, computerPaddle, ball, edges;
var gameState;
var computerScore, playerScore;

function setup(){
  playerPaddle = createSprite(360, 200, 10, 70);
  computerPaddle = createSprite(60, 200, 10, 70);
  ball = createSprite(200,200,10,10);
  
  hit_sound = loadSound("hit.mp3");
  ball_image = loadImage("ball.png");
  player_image = loadImage("player.png")
  player_kick = loadImage("player_kick.png")
  player_fall = loadImage("player_fall.png") 
  wall_hit = loadSound("wall_hit.mp3")
  
  
  playerPaddle.addImage(player_image);
  computerPaddle.addImage(player_image);
  ball.addImage(ball_image);
  
  
  edges = createEdgeSprites(); 
  gameState = "serve"; 
  
  computerScore = 0;
  playerScore = 0;
}

function draw(){
  background("white");
  
  text(computerScore, 180, 20);
  text(playerScore, 220, 20);
  
  if(gameState === "serve"){
    text("Press Space to Serve", 150,200);
  }
  
  if(ball.isTouching(edges[2]) || ball.isTouching(edges[3]))
  {wall_hit.play();}
  
  if(ball.isTouching(playerPaddle) || ball.isTouching(computerPaddle))
  {hit_sound.play();}
  
  
  if(keyDown("space") && gameState === "serve"){
    gameState = "play";
    playerPaddle.addImage(player_image);
    computerPaddle.addImage(player_image);
    serveball(4,4);
  }
  
  if(keyDown("up")){
    playerPaddle.y = playerPaddle.y - 6;
  }
  
  if(keyDown("down")){
    playerPaddle.y = playerPaddle.y + 6;
  }
  
  if(keyDown("w")){
    computerPaddle.y = computerPaddle.y - 6;
  }
  
  if(keyDown("s")){
    computerPaddle.y = computerPaddle.y + 6;
  }
  //playerPaddle.y = mouseY;
  //computerPaddle.y = ball.y;
  
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  

  if(ball.x > 400 || ball.x < 0){
    if(ball.x > 400){
      computerScore = computerScore  + 1;
      playerPaddle.addImage(player_fall);
    }
    
    if(ball.x < 0){
      playerScore = playerScore + 1;
      computerPaddle.addImage(player_fall);

    }
    resetball();
    gameState = "serve";
  }
  drawnet(20);
  
  if(playerScore==5 || computerScore==5){
    gameState = "over";
    text("Game Over", 170,160);
    text("Press 'r' to restart",150,180);
  }
  
  if(keyDown("r") && gameState === "over"){
    gameState = "serve";
    computerScore = 0;
    playerScore= 0;  
  }
  
  
  
  
  drawSprites();
  
  
  
}

function drawnet(num){
  for(var i=0; i<num; i++){
    line(200, 20*i, 200, 10+20*i);
  }
}

function serveball(xvel, yvel){
  ball.velocityX = xvel;
  ball.velocityY = yvel ;
}


function resetball(){    
    ball.velocityX = 0;
    ball.velocityY = 0;
    
    ball.x = 200;
    ball.y = 200;
}



