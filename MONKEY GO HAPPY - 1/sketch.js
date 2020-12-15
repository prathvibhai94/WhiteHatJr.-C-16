var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var invisibleGround;
var back, backImage;
var monkey , monkey_running, MGroup;
var B1, B3, B6;
var O1, O2;
var BGroup, obstacleGroup;
var retry, retryButton ;

function preload(){
  backImage = loadImage("PLAY.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  B1 = loadImage("1-banana.png"); 
  B3 = loadImage("3-banana.png");
  B6 = loadImage("6-banana.png");
  O1 = loadImage("O1.png");
  O2 = loadImage("O2.png");
  retryButton = loadImage("retry.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  BGroup = new Group;
  MGroup = new Group;
  obstacleGroup = new Group;
  retryGroup = new Group;

  back = createSprite(windowWidth/2, windowHeight/2);
  back.addImage('backPLAY', backImage);
  back.scale = 1;

  monkey = createSprite(250, 650);
  monkey.addAnimation('monkey_is_running',monkey_running);
  monkey.scale = 0.5;
  MGroup.add(monkey);
  monkey.debug = true;
  monkey.setCollider("circle", 0, 0, 300);

  invisibleGround = createSprite(windowWidth/2,950,windowWidth,10);
  invisibleGround.visible = false;
}

function draw() {
  background('wight');

  if(gameState === PLAY) {
    back.visible = true;
    monkey.visible = true;
    
    retryGroup.destroyEach();

    back.velocityX = -10;

    spawnBanana();
    spawnObstacle();

    if(keyWentDown("space") && monkey.y >= 600) {
      monkey.y = monkey.y -600;
    }

    if (back.x < 0){
      back.x = back.width/2;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);

    if(MGroup.isTouching(BGroup)) {
      BGroup.destroyEach();
      score = score + 1;
    }

    if(MGroup.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }
  
  if(gameState === END) {
    background("black");

    back.visible = false;
    monkey.visible = false;
    obstacleGroup.destroyEach();

    text("GAME OVER", windowWidth/2, windowHeight/2, textSize(72), fill("red"), stroke("blue"));
    text('Score: ' + score, windowWidth/2, windowHeight/2 + 82, fill('red'), stroke('blue'), textSize(50));

    retry = createSprite(50, 50);
    retry.scale = 0.5;
    retry.addImage("retry", retryButton);
    retryGroup.add(retry);

    if (mousePressedOver(retry)) {
      gameState = PLAY;
      score = 0;
      obstacleGroup.destroyEach();
    }
  }

  drawSprites();

  text('Score: ' + score, 1820, 40, fill('red'), stroke('wight'), textSize(20));
}

function spawnBanana() {
  if(frameCount % 300 === 0) {
    var banana = createSprite(1800, 150);
    banana.velocityX = -10;
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: banana.addImage(B1);
              banana.scale = 0.15;
              break;
      case 2: banana.addImage(B3);
              banana.scale = 0.04;
              break;
      case 3: banana.addImage(B6);
              banana.scale = 0.1;
              break;
      default: break;
    }
    
    banana.lifetime = 325;
    BGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(2800, 920);
    obstacle.velocityX = -10;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(O1);
              obstacle.scale = 0.15;
              obstacle.setCollider("circle", -20, 0, 50);
              break;
      case 2: obstacle.addImage(O2);
              obstacle.scale = 0.075;
              obstacle.debug = true;
              obstacle.setCollider("circle", -20, 0, 50);
              break;
      default: break;
    }
    
    obstacle.lifetime = 325;
    obstacleGroup.add(obstacle);
  }
}