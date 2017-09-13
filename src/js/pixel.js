function Pixel(x, y, i, j, index, address, col) {
  this.x = x;
  this.y = y;
  this.i = i;
  this.j = j;
  this.index = index;
  this.col = col;
  this.address = address;
  this.hover = false;

  this.onHover = function() {
    var offsetX = (600 / zoom);
    offsetX = (600 - offsetX) / 2;
    offsetX = this.x - offsetX;
    offsetX = offsetX * zoom;
    offsetX -= (pixelSize * zoom) / 2;

    var offsetY = (600 / zoom);
    offsetY = (600 - offsetY) / 2;
    offsetY = this.y - offsetY;
    offsetY = offsetY * zoom;
    offsetY -= (pixelSize * zoom) / 2;

    var pSize = zoom * pixelSize;

    if (mouseX - (tX - width / 2) > offsetX && mouseY - (tY - height / 2) > offsetY && mouseX - (tX - width / 2) < offsetX + pSize && mouseY - (tY - height / 2) < offsetY + pSize) {
      fill(this.col.levels[0] + 30, this.col.levels[1] + 30, this.col.levels[2] + 30);
      if (selected.pixel == this) {
        $(".point").html("X: " + this.i + " Y: " + this.j);
        $(".r").html("R: " + selected.originalColor.levels[0]);
        $(".g").html("G: " + selected.originalColor.levels[1]);
        $(".b").html("B: " + selected.originalColor.levels[2]);
      } else {
        $(".point").html("X: " + this.i + " Y: " + this.j);
        $(".r").html("R: " + this.col.levels[0]);
        $(".g").html("G: " + this.col.levels[1]);
        $(".b").html("B: " + this.col.levels[2]);
      }
      this.hover = true;
    } else {
      this.hover = false;
    }
  }

  this.onClick = function() {
    if (selected.pixel) {
      selected.pixel.col = selected.originalColor;
    }
    selected.pixel = this;
    selected.increase = false;
    selected.originalColor = color(this.col.levels[0], this.col.levels[1], this.col.levels[2]);
    $(".pixel-set").show();
  }
}
