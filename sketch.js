let backgroundImage;
let scaledBackgroundImageWidth;
let x1 = 0;
let x2;
let scrollSpeed = 5;
let thiefImage1;
let thiefImage2;

function preload() {
  backgroundImage = loadImage('Images/background.png');
  thiefImage1 = loadImage("Images/Thief Animation 1.png");
  thiefImage2 = loadImage("Images/Thief Animation 2.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
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

class Thief {
  constructor() {
    this.size = 50;
    this.x = 50;
    this.y = height-this.size-100;
    this.vy = 0;
    this.gravity = 0.8;
    show() {
      image(thiefImage1, this.x, this.y, this.size, this.size);
    }
  }
}