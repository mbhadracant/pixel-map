var zoom = 1.00;
var zMin = 1;
var zMax = 9.00;
var sensativity = 0.005;
var tX, tY;

var boardSize = 10;
var pixelSize = 600 / boardSize;
var pixels = [];
var selected = {};

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('sketch');
  rectMode(CENTER);
  tX = width / 2;
  tY = height / 2;
  noStroke();
}

function draw() {
  cursor(CROSS)
  background(50);
  translate(tX, tY);
  fill(0);
  scale(zoom);

  if (mouseIsPressed) {
    onMouseHold();
  }

  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    fill(pixel.col);
    pixel.onHover();
    rect(pixel.x - width / 2, pixel.y - height / 2, pixelSize, pixelSize);
  }

  if ((mouseX > width || mouseX < 0) || (mouseY > height || mouseY < 0)) {
    if (selected.pixel) {
      $(".point").html("X: " + selected.pixel.i + " Y: " + selected.pixel.j);
      $(".r").html("R: " + selected.originalColor.levels[0]);
      $(".g").html("G: " + selected.originalColor.levels[1]);
      $(".b").html("B: " + selected.originalColor.levels[2]);
    }
  }

  if (selected.pixel) {
    var r = selected.pixel.col.levels[0];
    var g = selected.pixel.col.levels[1];
    var b = selected.pixel.col.levels[2];

    if (selected.increase) {
      selected.pixel.col.levels[0] += 2;
      selected.pixel.col.levels[1] += 2;
      selected.pixel.col.levels[2] += 2;
    } else {
      selected.pixel.col.levels[0] -= 2;
      selected.pixel.col.levels[1] -= 2;
      selected.pixel.col.levels[2] -= 2;
    }

    if (r == selected.originalColor.levels[0] + 50) {
      selected.increase = false;
    }
    if (r == selected.originalColor.levels[0] - 50) {
      selected.increase = true;
    }
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
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    tX += (mouseX - x1) * 0.05;
    tY += (mouseY - y1) * 0.05;
    cursor(MOVE);
  }
}

function mouseClicked() {
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    if (pixel.hover && x1 == mouseX && y1 == mouseY) {
      pixel.onClick();
    }
  }
}
