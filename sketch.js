let backgroundImage;
let scaledBackgroundImageWidth;
let x1 = 0;
let x2;
let scrollSpeed = 5;
let thiefImage1;
let thiefImage2;
let thief;
let policeImages = [];
let collectible1;
let collectible2;
let groundY;
let score = 0;
let myFont;
let level = 1;
let hpValue = 3;
let hpString = `❤️❤️💔`;
let emojiFont;

function preload() {
  myFont = loadFont(`font.ttf`);
  emojiFont = loadFont('emoji.ttf');
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
  brokenHeart = loadImage('Images/broken heart.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
  groundY = height-250;
  thief = new Thief();
  collectible1 = new Money(width + 100, groundY + 100);
  collectible2 = new Money(width - scaledBackgroundImageWidth/2, groundY - 200);
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
  collectible1.update();
  collectible2.update();
  collectible1.show();
  collectible2.show();
  showScore();
  showLevel();
  showHP();
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

function showScore () {
  textSize(36);
  textAlign(LEFT);
  fill (255);
  textFont(myFont);
  text(`Score: ${score}`, 50, 50);
}

function showLevel() {
  textSize(36);
  fill(255);
  textFont(myFont);
  textAlign(CENTER);
  text(`Level: ${level}`, width/2, 50);
}

function showHP() {
  textSize(36);
  textFont(emojiFont);
  textAlign(RIGHT);
  text(hpString, width - 50, 50);
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
  constructor(startX, startY) {
    this.spriteHeight = 30;
    this.spriteWidth = 30;
    this.x = startX;
    this.y = startY;
    this.currentImage = diamond;
    this.type = "coin";
  }

  update() {
    this.x -= scrollSpeed;
    if (this.x <= -scaledBackgroundImageWidth) {
      this.x = scaledBackgroundImageWidth-scrollSpeed;
      this.restart();
    }
  }

  show() {
    image(this.currentImage, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
  changeType() {
    let randomNumber = random(0, 100);
    if (randomNumber <= 70) {
      this.type = "coin";
      this.currentImage = coin;
      this.spriteWidth = 60;
      this.spriteHeight = 60;
    }
    else if (randomNumber <= 95) {
      this.type = "money";
      this.currentImage = money;
      this.spriteWidth = 50;
      this.spriteHeight = 50;
    }
    else {
      this.type = "diamond";
      this.currentImage = diamond;
      this.spriteWidth = 30;
      this.spriteHeight = 30;
    }
  }
  restart() {
    this.changeType();
    this.y = random(groundY - 200, groundY + 100);
  }
}