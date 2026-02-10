let backgroundImage;
let scaledBackgroundImageWidth;

function preload() {
  backgroundImage = loadImage('Images/background.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
}

function draw() {
  background(255, 204, 0);
  image(backgroundImage, 0, 0, scaledBackgroundImageWidth, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateBackgroundImageDimensions();
}

function calculateBackgroundImageDimensions() {
  let aspectRatio = backgroundImage.width / backgroundImage.height;
  scaledBackgroundImageWidth = height * aspectRatio;
}