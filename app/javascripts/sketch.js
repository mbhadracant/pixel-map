var boardSize = 10;
var pixelSize = 600 / boardSize;
var pixels = [];

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('sketch');
  cursor(HAND);
  noStroke();
  
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      pixels.push(new Pixel(i * pixelSize, j * pixelSize, i, j));
    }
  }
}

function draw() {
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    fill(pixel.col);
    pixel.onHover();
    rect(pixel.x, pixel.y, pixelSize, pixelSize);
  }
}
