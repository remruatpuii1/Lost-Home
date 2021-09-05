const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg1,floor;
var rh,rhi,rhj,rhr,rhh,rhd;
var lrhj,lrhr,lrhh;
var zm,zmw,zmGroup;
var zf,zfw,zfGroup;
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

  s1 = loadAnimation("lw/lw2.png","lw/lw3.png","lw/lw4.png","lw/lw5.png");

  fx1 = loadSound("s/jump.wav");
  fx2 = loadSound("s/heart.wav");
  fx3 = loadSound("s/gameover.wav");

  rhi = loadImage("redhat/Idle (1).png");

  rhj = loadAnimation("redhat/Jump (1).png","redhat/Jump (3).png","redhat/Jump (6).png",
  "redhat/Jump (9).png","redhat/Jump (10).png","redhat/Jump (12).png");

  rhr = loadAnimation("redhat/Run (2).png","redhat/Run (3).png","redhat/Run (5).png",
  "redhat/Run (6).png");

  rhh = loadAnimation("redhat/Hurt (1).png","redhat/Hurt (3).png");

  rhd = loadImage("redhat/Dead (10).png");

  lrhj = loadAnimation("lhat/Jump (1).png","lhat/Jump (3).png","lhat/Jump (6).png",
  "lhat/Jump (9).png","lhat/Jump (10).png","lhat/Jump (12).png");

  lrhr = loadAnimation("lhat/Run (2).png","lhat/Run (3).png","lhat/Run (5).png",
  "lhat/Run (6).png");

  lrhh = loadAnimation("lhat/Hurt (1).png","lhat/Hurt (3).png");

  zmw = loadAnimation("zm/Walk (1).png","zm/Walk (4).png","zm/Walk (7).png","zm/Walk (9).png",
  "zm/Walk (10).png");

  zfw = loadAnimation("zf/Walk (1).png","zf/Walk (4).png","zf/Walk (7).png","zf/Walk (9).png",
  "zf/Walk (10).png");

}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  rh = createSprite(450,550,30,30);
  rh.addImage("idle",rhi);
  rh.scale=0.450;
  rh.setCollider("rectangle",0,0,250,400);

  floor = createSprite(1,570,2500,10);
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
  textSize(30);
  text("Score: "+score,width-150,50);
  Engine.update(engine);
  rh.collide(floor);
 
  if(gameState === "play")
  {
    rh.velocityY += 0.8;
    
  if(keyDown("right_arrow"))
  {
    rh.addAnimation("idle",rhr);
    rh.velocityX =8;
    rh.x +=5;
  }

  if(keyDown("left_arrow") && rh.x>10)
  {
    rh.addAnimation("idle",lrhr);
    rh.velocityX =-8;
    rh.x -=5;
  }

  if(keyDown("space") && rh.y>450 && rh.velocityX +8 )
  {
    rh.addAnimation("idle",rhj);
      rh.velocityY = -18;
      fx1.play();
  }
  
  if(keyDown("space") && rh.y>450 && rh.velocityX -8 )
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
    score +=20;
    peachGroup.destroyEach();
  }

  if(elGroup.isTouching(rh))
  {
    score +=10;
    if(num===0)
    {
        var l3=hearts.length+1;
        console.log(l3);
        var fhrt=createSprite(70*l3,50,10,10);
        fhrt.addImage("life",l1);
        fhrt.scale=0.1;
        hearts.push(fhrt);
        num=1;
      }
    else if(num===1){
      var l2=hearts.length+1;
      var thrt=createSprite(70*l2,50,10,10);
      thrt.addImage("life",l1);
      thrt.scale=0.1;
      hearts.push(thrt);
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
    rh.velocityX =8;
    rh.x +=5;
  }

  if(keyDown("left_arrow") && rh.x>10)
  {
    rh.addAnimation("idle",lrhr);
    rh.velocityX =-8;
    rh.x -=5;
  }

  if(keyDown("space") && rh.y>450 && rh.velocityX +8 )
  {
    rh.addAnimation("idle",rhj);
      rh.velocityY = -18;
      fx1.play();
  }
  
  if(keyDown("space") && rh.y>450 && rh.velocityX -8 )
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
        var len=hearts.length+1;
        var nhrt=createSprite(70*len,50,10,10);
        nhrt.addImage("life",l1);
        nhrt.scale=0.1;
        hearts.push(nhrt);
        num=1;
      }
    else if(num===1){
      var len=hearts.length+1;
      var shrt=createSprite(70*len,50,10,10);
        nhrt.addImage("life",l1);
        nhrt.scale=0.1;
        hearts.push(shrt);
      }
      elGroup.destroyEach();
    }
  

  if(rh.isTouching(zmGroup) || rh.isTouching(zfGroup) || rh.isTouching(spikeGroup))
  {
  count+=1;
  console.log(count);
  if(count===1)
  {
    var l=hearts.length;
    hearts[l-1].destroy();
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
    var l=hearts.length;
    hearts[l-1].destroy();
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
    var l=hearts.length;
    hearts[l-1].destroy();
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
  rh.addImage("idle",rhd);
  rh.velocityX=0;
  rh.velocityY=0;
  zmGroup.destroyEach();
  zfGroup.destroyEach();
  spikeGroup.destroyEach();
  peachGroup.destroyEach();
  peachGroup.setVelocityYEach = 0;
  zmGroup.setVelocityXEach = 0;
  zfGroup.setVelocityXEach = 0;
  textSize(70);
  text("Game Over",400,350);
}

  drawSprites();

} 

function createSpikes()
{
  if(frameCount%200===0)
  {
  spike = createSprite(random(10,width-10),540,20,20);
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
  if(frameCount%500===0)//1900
  {
    el = createSprite(random(10,width-10),-50,20,20);
    el.addImage("extra",el1);
    el.velocityY=10;
    el.scale=0.130;
    elGroup.add(el);
    el.lifetime=height/10

  }
}

function zombieBoy()
{
  if(frameCount%400===0)//800
  {
    zm = createSprite(-20,480,10,10);
    zm.addAnimation("zombieBoy",zmw);
    zm.scale=0.40;
    zm.velocityX=(3+frameCount/100);
    zmGroup.add(zm);
    zm.lifetime=width/zm.velocityX;
    zm.setCollider("rectangle",0,0,200,350);
    if(frameCount%800===0)//1600
    {
      zmGroup.destroyEach();
    }
  }
}

function zombieGirl()
{
  if(frameCount%800===0)//1500
  {
    zf = createSprite(width*2,480,10,10);
    zf.addAnimation("zombieGirl",zfw);
    zf.scale=0.40;
    zf.velocityX=(-5+frameCount/100); 
    zfGroup.add(zf);
    zf.lifetime=width/zf.velocityX;
    zf.setCollider("rectangle",0,0,200,350);
    if(frameCount%1600===0)//3000
    {
      zfGroup.destroyEach();
    }
  }

}

function createPeach()
{
  if(frameCount%500===0)//800
  {
  peach = createSprite(random(10,width-10),60,10,10);
  peach.addImage("peach",ph1);
  peach.scale=0.080;
  peach.velocityY=6;
  peachGroup.add(peach);
  peach.lifetime=height/peach.velocityY
  if(frameCount%1000===0)//1600
  {
    peachGroup.destroyEach();
  }
  }

}