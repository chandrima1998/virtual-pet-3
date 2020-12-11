//Create variables here
var dog,Hdog,database,foodS,foodStock;
var dog1,foodObj;
var x=20;
var TimeJson,Time;
var datetime,hour;
var lastfed,fedTime;
var gameStat;
var changeGameState,readGameState;
var gar,bed,wash;
var currentTime;
var live,b;
function preload()
{
  wash = loadImage("Wash Room.png");
  gar = loadImage("Garden.png");
  bed = loadImage("Bed Room.png");
  dog = loadImage("dogImg1.png");
  Hdog = loadImage("dogImg.png");
  live = loadImage("Living Room.png");
  b = loadImage("Living Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,800);
  
  foodObj = new milk();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  readGameState=database.ref('gameState');
  readGameState.on("value",(data)=>{
    gameStat=data.val();
  })
 
  button=createButton('Feed The Dog');
  buy=createButton('Buy Food');
 
  button.position(640,105);
  buy.position(760,105);
  
  button.mousePressed(feedDog);
  buy.mousePressed(addFoods);
  
  dog1 = createSprite(690,300,30,30);
  dog1.addImage("s",dog);
  dog1.scale=0.3;
  
  
  
  
  
}


function draw() {  
  currentTime=hour();
 
    background(0,20,90);
 
  
  
    foodObj.display();
    fedTime=database.ref('FeedTime');
    fedTime.on("value",(data)=>{
      lastfed=data.val();
    });
  fill(0);
  strokeWeight(1);
  stroke("cyan");
  textSize(25);
  if (lastfed>=12)
  {
    text("Last Fed: " + lastfed%12+"PM",350,30);
  }else if(lastfed===0)
  {
    text("Last Fed: 12 AM",350,30);
  }else {
    text("Last Fed: "+ lastfed + " AM",350,30);
  }

 
 
  if (currentTime===(lastfed+1))
  {
    update("Playing");
    foodObj.garden();
  }else if(currentTime===(lastfed+2))
  {
    update("Sleeping");
    foodPbj.bedroom();
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4))
  {
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  if (gameStat!="Hungry"){
    button.hide();
    buy.hide();
    dog1.remove();
  }else{
    button.show();
    buy.show();
    dog1.addImage(dog);
  }

  drawSprites();
  
  
}

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
    
}

function feedDog(){
  dog1.addImage(Hdog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}
function update(state){
  database.ref('/').update({
      gameState:state
  });
}
function bg(){
  background(b,500,500);

}