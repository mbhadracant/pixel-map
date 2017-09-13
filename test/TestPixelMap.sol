pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PixelMap.sol";

contract TestPixelMap {
  PixelMap pixelMap = PixelMap(DeployedAddresses.PixelMap());

  function testUserCanSetPixel() {
    uint returnedIndex = pixelMap.setPixel(255,0,0,50);
    uint expected = 50;

    Assert.equal(returnedIndex, expected, "Index returned should be 50");
  }

  function testGettingAPixel() {
    uint256 r;
    uint256 g;
    uint256 b;
    address owner;

    pixelMap.setPixel(255,255,255,10);
    (r,g,b, owner) = pixelMap.getPixel(10);

    Assert.equal(r, 255, "red value");
    Assert.equal(g, 255, "green value");
    Assert.equal(b, 255, "yellow value");
    Assert.equal(owner, this, "owner");
  }
}
