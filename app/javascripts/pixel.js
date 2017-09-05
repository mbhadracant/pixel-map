function Pixel(x , y, i, j) {
  this.x = x;
  this.y = y;
  this.i = i;
  this.j = j;

  this.col = color(Math.floor(random(250)), Math.floor(random(250)), Math.floor(random(250)));

  this.onHover = function() {
    var offsetX = (600/zoom);
    offsetX = (600 - offsetX)/2;
    offsetX = this.x - offsetX;
    offsetX = offsetX * zoom;
    offsetX -= (pixelSize * zoom)/2;

    var offsetY = (600/zoom);
    offsetY = (600 - offsetY)/2;
    offsetY = this.y - offsetY;
    offsetY = offsetY * zoom;
    offsetY -= (pixelSize * zoom)/2;

    var pSize = zoom * pixelSize;

    if(mouseX - (tX - width/2) > offsetX && mouseY - (tY - height/2) > offsetY && mouseX - (tX - width/2) < offsetX + pSize && mouseY - (tY - height/2) < offsetY + pSize) {
      fill(this.col.levels[0] + 30,this.col.levels[1] + 30,this.col.levels[2] + 30);
      $(".point").html("X: " + this.i + " Y: " + this.j);
      $(".r").html("R: " + this.col.levels[0]);
      $(".g").html("G: " + this.col.levels[1]);
      $(".b").html("B: " + this.col.levels[2]);
    }
  }
}
