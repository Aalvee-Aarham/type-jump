"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.style.backgroundImage = 'url("river.png")';
canvas.style.backgroundRepeat = "no-repeat";
canvas.style.backgroundSize = "cover";
var img = new Image();
var lily_pad = new Image();
lily_pad.src = "lilypad.svg"; // var jumpIMG = new Image;
// jumpIMG.src ="./jump.gif"
// var leftIMG = new Image;
// leftIMG.src ="./left.gif"

img.src = "frog.gif";

var frog =
/*#__PURE__*/
function () {
  function frog(xpos, ypos) {
    _classCallCheck(this, frog);

    this.xpos = xpos;
    this.ypos = ypos;
  }

  _createClass(frog, [{
    key: "draw",
    value: function draw(context, img) {
      // context.fillStyle ="#f505c9"
      // context.fillRect(this.xpos, this.ypos, this.height, this.width);
      context.clearRect(this.xpos - 60, this.ypos - 60, 200, 100);
      context.drawImage(img, this.xpos - 35, this.ypos - 30);
    }
  }, {
    key: "jump",
    value: function jump(left) {
      if (left) {
        img.src = "jump.gif";
        this.draw(context, img);
        this.xpos += 4;
        this.ypos -= 0;
      } else {
        img.src = "left.gif";
        this.draw(context, img);
        this.xpos -= 4;
        this.ypos -= 0;
      }
    }
  }]);

  return frog;
}();

var rect =
/*#__PURE__*/
function () {
  function rect(color, xpos, ypos, height, width) {
    var letter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, rect);

    this.color = color;
    this.xpos = xpos;
    this.ypos = ypos;
    this.height = height;
    this.width = width;
    this.letter = letter;

    if (this.letter) {
      this.ypos = ypos - 30;
    }
  }

  _createClass(rect, [{
    key: "drawlily",
    value: function drawlily(context) {
      context.drawImage(lily_pad, this.xpos - 10, this.ypos);
    }
  }, {
    key: "draw",
    value: function draw(context) {
      var colorr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!colorr) {
        null;
      } else {
        context.fillStyle = colorr;
        context.fillRect(this.xpos, this.ypos, this.height, this.width);
      }

      if (this.letter) {
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#def";
        context.font = '30px poppins';
        context.fillText(this.letter, this.xpos + this.height / 2, this.ypos + this.width / 2);
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.letter) {
        this.drawlily(context);
      } else {
        this.draw(context);
      }

      var speed = 1;
      this.ypos += speed;
    }
  }, {
    key: "changecolor",
    value: function changecolor(colorr) {
      // context.clearRect(this.xpos,this.ypos,this.width,this.height)
      this.draw(context, colorr);
    }
  }]);

  return rect;
}();

var sentence = "This game is still in development mode.The ending of the game is not decided yet.please email me a review of this game.";
var words = sentence.split(" ");
var word = "sssss";
var n = 0;
var word_ch_num = words.map(function (word) {
  n = n + word.length;
  return n - 1;
});
var rects = [];
var letter_rects = [];

var _loop = function _loop(_i) {
  if (_i % 2 === 0) {
    my_rect = new rect("#AA0000", 350, 500 - _i * 75, 200, 25);
  } else {
    my_rect = new rect("#1122ff", 650, 500 - _i * 75, 200, 25);
  }

  rects.push(my_rect);
  lily_pad.addEventListener("load", function (e) {
    rects[_i].drawlily(context);
  });
};

for (var _i = 0; _i < 100; _i++) {
  var my_rect;
  var my_rect;

  _loop(_i);
}

var letter_index = 0;

for (var i = 0; i < words.length; i++) {
  var _word = words[i];

  var _letters = _word.split("");

  for (var index = 0; index < _letters.length; index++) {
    var letter = _letters[index];
    var xposplus = index * 30;
    var ii = i + 1;

    if (ii % 2 === 0) {
      var letter_box = new rect("#000", 350 + xposplus, 500 - ii * 75, 30, 40, letter);
    } else {
      var letter_box = new rect("#000", 650 + xposplus, 500 - ii * 75, 30, 40, letter);
    }

    letter_rects.push(letter_box);
    letter_rects[letter_index].draw(context);
    letter_index++;
  }
}

var letters = letter_rects.map(function (rect) {
  return rect.letter;
});

var pushdown = function pushdown(yposs) {
  var id = requestAnimationFrame(function () {
    pushdown(yposs);
  });
  context.clearRect(0, 0, 900, 600);

  for (var _i2 = 0; _i2 < rects.length; _i2++) {
    rects[_i2].update();
  }

  for (var _i3 = 0; _i3 < letter_rects.length; _i3++) {
    letter_rects[_i3].update();
  }

  toad.jump(left);

  if (rects[1].ypos === yposs[1] + 75) {
    cancelAnimationFrame(id);
    window.addEventListener("keydown", typing);

    if (!left) {
      img.src = "./sitleft.gif";
    } else {
      img.src = "./sit.gif";
    }

    toad.draw(context, img);
    letter_rects[currentkey_index].changecolor("#1122ff");
  } else {
    window.removeEventListener("keydown", typing);
  }

  context.clearRect(0, 0, 900, 240);
};

var left = false;
var toad = new frog(420, 460);
letter_rects[0].changecolor("#1122ff");
img.addEventListener("load", function (e) {
  toad.draw(context, img);
  context.clearRect(0, 0, 900, 240);
});
var currentkey_index = 0;
window.addEventListener("keydown", typing);

function typing(event) {
  var current_letter = letter_rects[currentkey_index];

  if (event.keyCode > 31 && event.keyCode < 255 || event.keyCode === 8) {
    if (word_ch_num.includes(currentkey_index)) {
      var yposs = rects.map(function (rec) {
        return rec.ypos;
      });
      left = !left;
      pushdown(yposs, left);
      console.log("down");
    }

    if (event.key === current_letter.letter) {
      currentkey_index++;
      current_letter.changecolor("#007700");
      letter_rects[currentkey_index].changecolor("#1122ff");
    }

    if (event.key != current_letter.letter) {
      currentkey_index++;
      current_letter.changecolor("#AA0000");
      letter_rects[currentkey_index].changecolor("#1122ff");
    }
  }
}