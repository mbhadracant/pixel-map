pragma solidity ^0.4.4;

contract PixelMap {

  struct Pixel {
        uint r;
        uint g;
        uint b;
        address owner;
    }

  Pixel[100] public pixels;

  function setPixel(uint r, uint g, uint b, uint index) public returns (uint){
    require(r >= 0 && r <= 255);
    require(g >= 0 && g <= 255);
    require(b >= 0 && b <= 255);
    require(index >= 0 && index <= 99);

    pixels[index] = Pixel(r,g,b,msg.sender);

    return index;
  }

  function getPixel(uint index) public returns (uint r, uint g, uint b) {
    return (pixels[index].r, pixels[index].g, pixels[index].b);
  }

}
