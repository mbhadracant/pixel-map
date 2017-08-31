function Pixel(x , y, i, j) {
  this.x = x;
  this.y = y;
  this.i = i;
  this.j = j;
  this.col = color(Math.floor(random(250)), Math.floor(random(250)), Math.floor(random(250)));

  this.onHover = function() {
    if(mouseX > this.x && mouseY > this.y && mouseX < this.x + pixelSize && mouseY < this.y + pixelSize) {
      fill(this.col.levels[0] + 30,this.col.levels[1] + 30,this.col.levels[2] + 30);
      $(".point").html("X: " + this.i + " Y: " + this.j);
      $(".r").html("R: " + this.col.levels[0]);
      $(".g").html("G: " + this.col.levels[1]);
      $(".b").html("B: " + this.col.levels[2]);
    }
  }
}
