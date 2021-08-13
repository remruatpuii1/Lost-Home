const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg1,floor;
var rh,rhi,rhj,rhr,rhh,rhd;
var lrhi,lrhj,lrhr,lrhh;
var zm,zma,zmd,zmw,zmGroup;
var zf,zfa,zfd,zfw,zfGroup;
var el,el1,l,l1,l2,l3,l4,l5,elGroup;
var spike,s1,spikeGroup;
var fx,fx1,fx2,fx3;
var peach,ph1,peachGroup;
var score = 0;
var vis = 255;
var count = 0;
var gameState = "play";
var num=0;
var hearts=[];
function preload()
{
  // Loading up the images & animations 
  bg1 = loadImage("bg.jpg");

  ph1 = loadImage("peach.png");

  el1 = loadImage("Ui/extra_l.png");
  l1 = loadImage("Ui/life.png");

  s1 = loadAnimation("lw/lw1.png","lw/lw2.png","lw/lw3.png","lw/lw4.png","lw/lw5.png");

  fx1 = loadSound("s/jump.wav");
  fx2 = loadSound("s/heart.wav");
  fx3 = loadSound("s/gameover.wav");

  rhi = loadAnimation("redhat/Idle (1).png","redhat/Idle (2).png",
  "redhat/Idle (3).png","redhat/Idle (4).png","redhat/Idle (5).png",
  "redhat/Idle (6).png","redhat/Idle (7).png","redhat/Idle (8).png",
  "redhat/Idle (9).png","redhat/Idle (10).png");

  rhj = loadAnimation("redhat/Jump (1).png","redhat/Jump (2).png",
  "redhat/Jump (3).png","redhat/Jump (4).png","redhat/Jump (5).png",
  "redhat/Jump (6).png","redhat/Jump (7).png","redhat/Jump (8).png",
  "redhat/Jump (9).png","redhat/Jump (10).png","redhat/Jump (11).png",
  "redhat/Jump (12).png");

  rhr = loadAnimation("redhat/Run (1).png","redhat/Run (2).png",
  "redhat/Run (3).png","redhat/Run (4).png","redhat/Run (5).png",
  "redhat/Run (6).png","redhat/Run (7).png","redhat/Run (8).png");

  rhh = loadAnimation("redhat/Hurt (1).png","redhat/Hurt (2).png",
  "redhat/Hurt (3).png","redhat/Hurt (4).png","redhat/Hurt (5).png",
  "redhat/Hurt (6).png","redhat/Hurt (7).png","redhat/Hurt (8).png");

  rhd = loadAnimation("redhat/Dead (1).png","redhat/Dead (2).png",
  "redhat/Dead (3).png","redhat/Dead (4).png","redhat/Dead (5).png",
  "redhat/Dead (6).png","redhat/Dead (7).png","redhat/Dead (8).png",
  "redhat/Dead (9).png","redhat/Dead (10).png");

  lrhi = loadAnimation("lhat/Idle (1).png","lhat/Idle (2).png","lhat/Idle (3).png",
  "lhat/Idle (4).png","lhat/Idle (5).png","lhat/Idle (6).png","lhat/Idle (7).png",
  "lhat/Idle (8).png","lhat/Idle (9).png","lhat/Idle (10).png");

  lrhj = loadAnimation("lhat/Jump (1).png","lhat/Jump (2).png","lhat/Jump (3).png",
  "lhat/Jump (4).png","lhat/Jump (5).png","lhat/Jump (6).png","lhat/Jump (7).png",
  "lhat/Jump (8).png","lhat/Jump (9).png","lhat/Jump (10).png","lhat/Jump (11).png",
  "lhat/Jump (12).png");

  lrhr = loadAnimation("lhat/Run (1).png","lhat/Run (2).png","lhat/Run (3).png",
  "lhat/Run (4).png","lhat/Run (5).png","lhat/Run (6).png","lhat/Run (7).png",
  "lhat/Run (8).png");

  lrhh = loadAnimation("lhat/Hurt (1).png","lhat/Hurt (2).png","lhat/Hurt (3).png",
  "lhat/Hurt (4).png","lhat/Hurt (5).png","lhat/Hurt (6).png","lhat/Hurt (7).png",
  "lhat/Hurt (8).png");

  zma = loadAnimation("zm/Attack (1).png","zm/Attack (2).png","zm/Attack (3).png",
  "zm/Attack (4).png","zm/Attack (5).png","zm/Attack (6).png","zm/Attack (7).png",
  "zm/Attack (8).png");

  zmd = loadAnimation("zm/Dead (1).png","zm/Dead (2).png","zm/Dead (3).png",
  "zm/Dead (4).png","zm/Dead (5).png","zm/Dead (6).png","zm/Dead (7).png",
  "zm/Dead (8).png","zm/Dead (9).png","zm/Dead (10).png","zm/Dead (11).png",
  "zm/Dead (12).png");

  zmw = loadAnimation("zm/Walk (1).png","zm/Walk (2).png","zm/Walk (3).png",
  "zm/Walk (4).png","zm/Walk (5).png","zm/Walk (6).png","zm/Walk (7).png",
  "zm/Walk (8).png","zm/Walk (9).png","zm/Walk (10).png");

  zfa = loadAnimation("zf/Attack (1).png","zf/Attack (2).png","zf/Attack (3).png",
  "zf/Attack (4).png","zf/Attack (5).png","zf/Attack (6).png","zf/Attack (7).png",
  "zf/Attack (8).png");

  zfd = loadAnimation("zf/Dead (1).png","zf/Dead (2).png","zf/Dead (3).png","zf/Dead (4).png",
  "zf/Dead (5).png","zf/Dead (6).png","zf/Dead (7).png","zf/Dead (8).png","zf/Dead (9).png",
  "zf/Dead (10).png","zf/Dead (11).png","zf/Dead (12).png");
  
  zfw = loadAnimation("zf/Walk (1).png","zf/Walk (2).png","zf/Walk (3).png","zf/Walk (4).png",
  "zf/Walk (5).png","zf/Walk (6).png","zf/Walk (7).png","zf/Walk (8).png","zf/Walk (9).png",
  "zf/Walk (10).png",);

}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  rh = createSprite(450,500,30,30);
  rh.addAnimation("idle",rhi);
  rh.scale=0.350;

  floor = createSprite(1,600,2500,10);
  floor.visible=false;

  for(i=0;i<=2;i++){
  hearts[i] = createSprite(70*(i+1),50,10,10);
  hearts[i].addImage("life",l1);
  hearts[i].scale=0.1;
  }

  spikeGroup = new Group();
  zmGroup = new Group();
  zfGroup = new Group();
  peachGroup = new Group();
  elGroup = new Group();

}

function draw() 
{
  background(bg1,windowWidth,windowHeight); 
  textSize(20);
  text("Score: "+score,width-150,50);
  Engine.update(engine);
  rh.collide(floor);
 
  if(gameState === "play")
  {
    rh.velocityY += 0.8;
    
  if(keyDown("right_arrow"))
  {
    rh.addAnimation("idle",rhr);
    rh.velocityX =6;
    rh.x +=5;
  }

  if(keyDown("left_arrow") && rh.x>10)
  {
    rh.addAnimation("idle",lrhr);
    rh.velocityX =-6;
    rh.x -=5;
  }

  if(keyDown("space") && rh.y>450 && rh.velocityX +6 )
  {
    rh.addAnimation("idle",rhj);
      rh.velocityY = -18;
      fx1.play();
  }
  
  if(keyDown("space") && rh.y>450 && rh.velocityX -6 )
  {
    rh.addAnimation("idle",lrhj);
      rh.velocityY = -18;
      fx1.play();
  }

  if(spikeGroup.isTouching(rh) || zmGroup.isTouching(rh) || zfGroup.isTouching(rh))
  {
    fx3.play();
    gameState="Life";
  }
  if(peachGroup.isTouching(rh))
  {
    score +=10;
    peachGroup.destroyEach();
  }

  if(elGroup.isTouching(rh))
  {
    score +=10;
    if(num===0)
    {
        var len=hearts.length;
        console.log(len);
        hearts[len+1]= createSprite(70*len,50,10,10);
        hearts[len+1].addImage("life",l1);
        hearts[len+1].scale=0.1;
        num=1;
      }
    else if(num===1){
      var len=hearts.length;
      console.log(len);
      hearts[len+1]= createSprite(70*len,50,10,10);
      hearts[len+1].addImage("life",l1);
      hearts[len+1].scale=0.1;
      }
      elGroup.destroyEach();
    }
  
  createSpikes();
  randomHearts();
  zombieBoy();
  zombieGirl();
  createPeach();
  }

else if(gameState==="Life")
{
  rh.velocityY += 0.8;
    
  if(keyDown("right_arrow"))
  {
    rh.addAnimation("idle",rhr);
    rh.velocityX =6;
    rh.x +=5;
  }

  if(keyDown("left_arrow") && rh.x>10)
  {
    rh.addAnimation("idle",lrhr);
    rh.velocityX =-6;
    rh.x -=5;
  }

  if(keyDown("space") && rh.y>450 && rh.velocityX +6 )
  {
    rh.addAnimation("idle",rhj);
      rh.velocityY = -18;
      fx1.play();
  }
  
  if(keyDown("space") && rh.y>450 && rh.velocityX -6 )
  {
    rh.addAnimation("idle",lrhj);
      rh.velocityY = -18;
      fx1.play();
  }

  if(peachGroup.isTouching(rh))
  {
    score +=10;
    peachGroup.destroyEach();
  }

  if(elGroup.isTouching(rh))
  {
    score +=10;
    if(num===0)
    {
        var len=hearts.length;
        hearts[len+1]= createSprite(70*len,50,10,10);
        hearts[len+1].addImage("life",l1);
        hearts[len+1].scale=0.1;
        num=1;
      }
    else if(num===1){
      var len=hearts.length;
      hearts[len+1]= createSprite(70*len,50,10,10);
      hearts[len+1].addImage("life",l1);
      hearts[len+1].scale=0.1;
      }
      elGroup.destroyEach();
    }
  

  if(rh.isTouching(zmGroup) || rh.isTouching(zfGroup) || rh.isTouching(spikeGroup))
  {
  count+=1;
  console.log(count);
  if(count===1)
  {
    l3.destroy();
    push();
    vis -=5;
    tint(255,vis);
    image(l1,190,30,45,45);
    pop();
  }
}
    if(rh.isTouching(zmGroup) || rh.isTouching(zfGroup) || rh.isTouching(spikeGroup))
  {
    count+=1;
    console.log(count);
   if(count===2)
  {
    l2.destroy();
    push();
    vis -=5;
    tint(255,vis);
    image(l1,150,30,45,45);
    pop();

  }
  }

  if(rh.isTouching(zmGroup) || rh.isTouching(zfGroup) || rh.isTouching(spikeGroup))
{
  count+=1;
  console.log(count);
 if(count===3)
  {
    l.destroy();
    push();
    vis -=5;
    tint(255,vis);
    image(l1,100,30,45,45);
    pop();
    fx3.play();
    gameState="End";
  }
}
  
  createSpikes();
  randomHearts();
  zombieBoy();
  zombieGirl();
  createPeach();
  
}

else if (gameState==="End")
{
  rh.addAnimation("idle",rhd);
  rh.velocityX=0;
  zmGroup.destroyEach();
  zfGroup.destroyEach();
  spikeGroup.destroyEach();
  peachGroup.destroyEach();
  peachGroup.setVelocityYEach = 0;
  zmGroup.setVelocityXEach = 0;
  zfGroup.setVelocityXEach = 0;
  textSize(50);
  text("Game Over",400,350);
}

  drawSprites();

} 

function createSpikes()
{
  if(frameCount%200===0)
  {
  spike = createSprite(random(10,width-10),530,20,20);
  spike.addAnimation("spike",s1);
  spike.scale=0.50;
  spikeGroup.add(spike);
  if (frameCount%400===0)
  {
    spikeGroup.destroyEach();
  }
  }
}

function randomHearts()
{
  if(frameCount%400===0)
  {
    el = createSprite(random(10,width-10),-50,20,20);
    el.addImage("extra",el1);
    el.velocityY=10;
    el.scale=0.1;
    elGroup.add(el);

  }
}

function zombieBoy()
{
  if(frameCount%400===0)
  {
    zm = createSprite(-20,480,10,10);
    zm.addAnimation("zombieBoy",zmw);
    zm.scale=0.30;
    zm.velocityX=(3+frameCount/100);
    zfGroup.add(zm);
    if(frameCount%800===0)
    {
      zmGroup.destroyEach();
    }
  }
}

function zombieGirl()
{
  if(frameCount%200===0)
  {
    zf = createSprite(width*2,480,10,10);
    zf.addAnimation("zombieGirl",zfw);
    zf.scale=0.30;
    zf.velocityX=(-3+frameCount/100); 
    zfGroup.add(zf);
    if(frameCount%600===0)
    {
      zfGroup.destroyEach();
    }
  }

}

function createPeach()
{
  if(frameCount%200===0)
  {
  peach = createSprite(random(10,width-10),60,10,10);
  peach.addImage("peach",ph1);
  peach.scale=0.070;
  peach.velocityY=6;
  peachGroup.add(peach);
  if(frameCount%400===0)
  {
    peachGroup.destroyEach();
  }
  }

}