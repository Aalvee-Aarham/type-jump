var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.style.background = "#cccc00";
var rect = /** @class */ (function () {
    function rect(color, xpos, ypos, height, width, letter) {
        if (letter === void 0) { letter = null; }
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
    rect.prototype.draw = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.xpos, this.ypos, this.height, this.width);
        if (this.letter) {
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "#FFF";
            context.font = '20px serif';
            context.fillText(this.letter, this.xpos + this.height / 2, this.ypos + this.width / 2);
        }
    };
    rect.prototype.update = function () {
        this.draw(context);
        var speed = 1;
        this.ypos += speed;
    };
    return rect;
}());
var words = ["mamoni", "kemon", "hoyeche", "game ki", "Moja?"];
var rects = [];
var letter_rects = [];
for (var i_1 = 0; i_1 < 100; i_1++) {
    if (i_1 % 2 === 0) {
        var my_rect = new rect("#ff0000", 100, 500 - i_1 * 75, 200, 25);
    }
    else {
        var my_rect = new rect("#0000ff", 600, 500 - i_1 * 75, 200, 25);
    }
    rects.push(my_rect);
    rects[i_1].draw(context);
}
var letter_index = 0;
for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var letters = word.split("");
    for (var index = 0; index < letters.length; index++) {
        var letter = letters[index];
        var xposplus = index * 30;
        if (i % 2 === 0) {
            var letter_box = new rect("#000", 100 + xposplus, 500 - i * 75, 25, 25, letter);
        }
        else {
            var letter_box = new rect("#000", 600 + xposplus, 500 - i * 75, 25, 25, letter);
        }
        letter_rects.push(letter_box);
        letter_rects[letter_index].draw(context);
        letter_index++;
    }
}
console.log(letter_rects);
var pushdown = function (yposs) {
    var id = requestAnimationFrame(function () { pushdown(yposs); });
    context.clearRect(0, 0, 900, 600);
    for (var i_2 = 0; i_2 < rects.length; i_2++) {
        rects[i_2].update();
    }
    for (var i_3 = 0; i_3 < letter_rects.length; i_3++) {
        letter_rects[i_3].update();
    }
    if (rects[1].ypos === yposs[1] + 76) {
        console.log("wpw");
        cancelAnimationFrame(id);
    }
};
window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        var yposs = rects.map(function (rec) { return rec.ypos; });
        pushdown(yposs);
    }
});
function Controller(sentence, keyindex, refs) {
    var text = sentence.split("");
    var length = text.length - 1;
    var score = 0;
    var misspelled_chars = 0;
    var startTime;
    var endTime;
    var nextKey;
    var currentKey;
    useEffect(function () {
        var nextKeyindex = 1;
        gsap.to(refs.current[keyindex].current, 1, { backgroundColor: "#0000ff" });
        document.addEventListener("keydown", function (event) {
            function moveToNextKey(color, correct) {
                if (event.key === text[0]) {
                    startTime = new Date();
                }
                if (keyindex === length) {
                    endTime = new Date();
                    var total_time = -startTime.getTime() + endTime.getTime();
                    console.log(total_time);
                }
                keyindex++;
                nextKeyindex++;
                gsap.to(currentKey, 1, { backgroundColor: color });
                gsap.to(nextKey, 1, { backgroundColor: "#0000ff" });
                if (correct) {
                    score++;
                }
                if (!correct) {
                    misspelled_chars++;
                }
                console.log("score: " + score + " and incorrect: " + misspelled_chars);
            }
            if (nextKeyindex < length + 1) {
                nextKey = refs.current[nextKeyindex].current;
            }
            if (keyindex < length + 1) {
                currentKey = refs.current[keyindex].current;
            }
            var charCode = event.keyCode;
            var correct = event.key === text[keyindex];
            var wrong = event.key != text[keyindex];
            if ((charCode > 31 && charCode < 255) || charCode === 8) {
                if (correct) {
                    moveToNextKey("#00ff00", correct);
                }
                else if (charCode === 8) {
                    console.log("pressed backSpace");
                    keyindex--;
                    nextKeyindex--;
                    gsap.to(currentKey, 1, { backgroundColor: "#ffffff" });
                    gsap.to(refs.current[keyindex].current, 1, { backgroundColor: "#0000ff" });
                }
                else if (wrong) {
                    moveToNextKey("#ff0000", wrong);
                }
            }
        });
    }, []);
}
