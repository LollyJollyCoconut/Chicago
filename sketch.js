let backgroundImage;
let scaledBackgroundImageWidth;
let x1 = 0;
let x2;
let scrollSpeed = 5;
let thiefImage1;
let thiefImage2;
let thief;
let policeImages = [];
let collectible;

function preload() {
  backgroundImage = loadImage('Images/background.png');
  thiefImage1 = loadImage("Images/thief 1.png");
  thiefImage2 = loadImage("Images/thief 2.png");
  policeOfficer1 = loadImage("Images/cop.png");
  policeOfficer2 = loadImage("Images/glock.png");
  policeOfficer3 = loadImage("Images/shotgun.png");
  policeOfficer4 = loadImage("Images/tank.png");
  policeOfficer5 = loadImage("Images/jet.png");
  bullet1 = loadImage("Images/bullet.png");
  bunchaBullets = loadImage("Images/bullets.png");
  heart = loadImage("Images/heart.png");
  bubble = loadImage("Images/bubble.png");
  shield = loadImage("Images/shield.png");
  speed = loadImage("Images/speed.png");
  coin = loadImage("Images/coin.png");
  money = loadImage("Images/$$$.png");
  diamond = loadImage("Images/diamond.png");
  greyCar = loadImage("Images/grey car.png");
  redCar = loadImage("Images/red car.png");
  blueCar = loadImage("Images/blue car.png");
  bus = loadImage("Images/bus.png");
  truck = loadImage("Images/truck.png");
  bike = loadImage("Images/bike.png");
  redGuy = loadImage("Images/red.png");
  blackGuy = loadImage("Images/black.png");
  greenGuy = loadImage("Images/green.png");
  scooter = loadImage("Images/scooter.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
  thief = new Thief();
  collectible = new Money();
}

function draw() {
  background(255, 204, 0);
  image(backgroundImage, x1, 0, scaledBackgroundImageWidth, height);
  image(backgroundImage, x2, 0, scaledBackgroundImageWidth, height);
  x2 -= scrollSpeed;
  x1 -= scrollSpeed;
  if (x1 <= -scaledBackgroundImageWidth) {
    x1 = scaledBackgroundImageWidth-scrollSpeed;
  }
  if (x2 <= -scaledBackgroundImageWidth) {
    x2 = scaledBackgroundImageWidth-scrollSpeed;
  }
  thief.update();
  thief.show();
  collectible.show()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
}

function calculateBackgroundImageDimensions() {
  let aspectRatio = backgroundImage.width / backgroundImage.height;
  scaledBackgroundImageWidth = height * aspectRatio;
  x1 = 0;
  x2 = scaledBackgroundImageWidth;
}
function keyPressed() {
  console.log(keyCode);
  if (keyCode === 32) {
    thief.jump();
  }
}

class Thief {
  constructor() {
    this.spriteHeight = 150;
    this.spriteWidth = 100;
    this.x = 50;
    this.groundY = height - this.spriteHeight - 100
    this.y = this.groundY;
    this.vy = 0;
    this.gravity = 1.5;
    this.currentImage = thiefImage1;
  }
  show() {
    if (this.y == this.groundY) {
      if (frameCount % 10 == 0){
        if (this.currentImage === thiefImage1) {
          this.currentImage = thiefImage2;
        }
        else {
          this.currentImage = thiefImage1;
        }
      }
    }
    image(this.currentImage, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }

  jump() {
    if (this.y == this.groundY) {
      this.vy = -25;
    }
  }
  update() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, this.groundY);
  }
}

class Money {
  constructor() {
    this.spriteHeight = 50;
    this.spriteWidth = 50;
    this.x = width/2;
    this.y = height/2;
    this.currentImage = money;
    this.type = "coin";
  }
  show() {
    image(this.currentImage, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
  changeType() {
    if (this.type == "coin") {
      this.currentImage = coin;
      this.spriteWidth = 60;
      this.spriteHeight = 60;
    }
    else if (this.type == "money") {
      this.currentImage = money;
      tbis.spriteWidth = 50;
      this.spriteHeight = 50;
    }
  }
}