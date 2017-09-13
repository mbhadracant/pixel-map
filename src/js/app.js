var App = {
  PixelMap: undefined,

  init: function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }

      $.getJSON("PixelMap.json", function(data) {
        var PixelMap = TruffleContract(data);
        PixelMap.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
        App.PixelMap = PixelMap;
        App.createPixels();
      })
  },
  createPixels: function() {
      App.PixelMap.deployed().then(function(instance) {

        var index = 0;
        for (var i = 0; i < boardSize; i++) {
          for (var j = 0; j < boardSize; j++) {
            App.addPixel(instance, i, j, index);
            index++;
          }
        }
      });
  },
  addPixel: function(instance, i, j, index) {
    instance.getPixel.call(index).then(function(data) {
      var r = data[0].toNumber();
      var g = data[1].toNumber();
      var b = data[2].toNumber();
      var address = data[3];
      var pixel = new Pixel((i * pixelSize) + pixelSize/2, (j * pixelSize) + pixelSize/2, i, j, index, address, color(r,g,b));
      pixels.push(pixel);
    });
  },
  setPixel: function(r,g,b,i) {
    App.PixelMap.deployed().then(function(instance) {
      var account = web3.eth.accounts[0];
      return instance.setPixel(r,g,b,i, {from: account});
    }).then(function(t) {
      App.PixelMap.deployed().then(function(instance) {
          pixels[i].col = color(r,g,b);
          selected = {};
          $(".selected").css("border", "1px solid grey");
          $(".pixel-set").hide();
          $(".set-pixel-btn").hide();
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
}

$(document).ready(function() {
  $(".color-palette > div").click(function(elem) {
    $(".selected").css("border", "1px solid grey");
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).css("border", "2px solid black");
    $(".set-pixel-btn").show();
    var rgb = $(".selected").css("background-color");
      $(".set-pixel-btn").css("background-color",rgb);
    if(rgb == 'rgb(255, 255, 0)' || rgb == 'rgb(0, 255, 0)' || rgb == 'rgb(0, 255, 255)') {
      $(".set-pixel-btn").css("color","rgb(0,0,0)");
    } else {
      $(".set-pixel-btn").css("color","rgb(255,255,255)");
    }
  });

  $(".set-pixel-btn").click(function() {
    var rgbString = $(".selected").css("background-color");
    rgbString = rgbString.substring(4, rgbString.length - 1);
    var rgb = rgbString.split(",");
    var r = parseInt(rgb[0].trim());
    var g = parseInt(rgb[1].trim());
    var b = parseInt(rgb[2].trim());
    App.setPixel(r, g, b, selected.pixel.index);
  });
});

$(window).on('load', function () {
     App.init();
});
