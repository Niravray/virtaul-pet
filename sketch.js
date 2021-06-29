//Create variables here
var dog,happyImg;
var dogImage;
var database;
var foodS,foodStock;

function preload()
{
	//load images here
  dogImage = loadImage ("images/dogImg.png");
  happyImg = loadImage ("images/happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500,500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
}


function draw() {  
  background("green")
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyImg);
    
  }

  drawSprites();
  //add styles here
  fill ("lightBlue");
  stroke ("white");
  text("Food remaining: "+foodS,170,200);
  textSize(13);
  text("note: press up arrow key to feed the dog",130,10,300,20);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x=0
  } 
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

  
}