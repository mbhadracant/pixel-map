var zoom = 1.00;
var zMin = 1;
var zMax = 9.00;
var sensativity = 0.005;
var tX, tY;

var boardSize = 10;
var pixelSize = 600 / boardSize;
var pixels = [];


function setup() {
  var canvas = createCanvas(600,600);
  canvas.parent('sketch');
  rectMode(CENTER);
  tX = width/2;
  tY = height/2;
  noStroke();
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      pixels.push(new Pixel((i * pixelSize) + pixelSize/2, (j * pixelSize) + pixelSize/2, i, j));
    }
  }
}

function draw() {
  cursor(CROSS)
  background(50);
  translate(tX,tY);
  fill(0);
  scale(zoom);

  if (mouseIsPressed) {
    onMouseHold();
  }

  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    fill(pixel.col);
    pixel.onHover();
    rect(pixel.x - width/2, pixel.y - height/2, pixelSize, pixelSize);
  }
}


function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  return false;
}

var x1, y1;
function mousePressed() {
  x1 = mouseX;
  y1 = mouseY;
}


function onMouseHold() {
    tX += (mouseX - x1) * 0.05;
    tY += (mouseY - y1) * 0.05;
    cursor(MOVE);
}
