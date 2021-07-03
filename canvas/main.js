const canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")
canvas.style.backgroundImage ='url("river.png")'
canvas.style.backgroundRepeat ="no-repeat"
canvas.style.backgroundSize = "cover"
var img = new Image;
var lily_pad = new Image;
lily_pad.src = "lilypad.svg"
// var jumpIMG = new Image;
// jumpIMG.src ="./jump.gif"
// var leftIMG = new Image;
// leftIMG.src ="./left.gif"
img.src = "frog.gif"

class frog{
    constructor(xpos,ypos){
        this.xpos = xpos
        this.ypos = ypos
    }
    draw(context,img){
        // context.fillStyle ="#f505c9"
        // context.fillRect(this.xpos, this.ypos, this.height, this.width);
        context.clearRect(this.xpos-60,this.ypos-60,200,100)
        context.drawImage(img, this.xpos-35,this.ypos-30);
    }
    jump(left){
        
        if (left) {
            img.src = "jump.gif"
            this.draw(context,img)
            this.xpos += 4
            this.ypos -= 0
        } else {
            img.src ="left.gif"
            this.draw(context,img)
            this.xpos -= 4
            this.ypos -= 0
        }
        
        
    }
    
}


class rect{
    constructor(color,xpos,ypos,height,width,letter=null){
        this.color = color
        this.xpos = xpos
        this.ypos = ypos
        this.height = height
        this.width = width
        this.letter = letter
        if (this.letter) {
            this.ypos = ypos-30
        }
        
    }
    drawlily(context){
        context.drawImage(lily_pad, this.xpos-10,this.ypos);
    }
    draw(context,colorr=null){
        if(!colorr){
            null
        }
        else{
          context.fillStyle = colorr
          context.fillRect(this.xpos, this.ypos, this.height, this.width);
        }
        if (this.letter) {
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillStyle = "#def";
            context.font = '30px poppins';
            context.fillText(this.letter, this.xpos+this.height/2, this.ypos+this.width/2)
        }
    }
    update(){
        if (!this.letter) {
            this.drawlily(context)
            
        } else {
            
            this.draw(context)
        }
        
        let speed = 1
        this.ypos += speed  
    }
    changecolor(colorr){
        // context.clearRect(this.xpos,this.ypos,this.width,this.height)
        this.draw(context,colorr)
    }
    
}

const sentence = "This game is still in development mode.The ending of the game is not decided yet.please email me a review of this game."
const words = sentence.split(" ")
const word = "sssss"
let n = 0
const word_ch_num = words.map((word)=>{
    n=n+ word.length
    return (n-1)
})
const rects = []
const letter_rects = []


for (let i = 0; i < 100; i++) {
    if (i % 2===0) {
        var my_rect = new rect("#AA0000",350,500 -i*75,200,25)
    } else {
        var my_rect = new rect("#1122ff",650,500 -i*75,200,25)
    }
    
    rects.push(my_rect)
    lily_pad.addEventListener("load",e=>{rects[i].drawlily(context)})
    
}
let letter_index = 0
for (var i = 0; i < words.length; i++) {
    const word = words[i]
    const letters = word.split("")
    for (let index = 0; index < letters.length; index++) {
        
        var letter = letters[index]
        var xposplus = index*30
        let ii = i+1
        
        if (ii % 2===0) {
            var letter_box = new rect("#000",350+xposplus,500 - ii*75,30,40,letter)
        } 
        else  {
            var letter_box = new rect("#000",650+xposplus,500 - ii*75,30,40,letter)
        }
        
        
        letter_rects.push(letter_box)
        letter_rects[letter_index].draw(context)
        letter_index++
    }}
    const letters = letter_rects.map(rect=>rect.letter)
    
    let pushdown = (yposs)=>{
        const id=requestAnimationFrame(()=>{pushdown(yposs)})
        context.clearRect(0,0,900,600)
        for (let i = 0; i < rects.length; i++) {
            rects[i].update()
        }
        for (let i = 0; i < letter_rects.length; i++) {
            letter_rects[i].update()
            
        }
        
        toad.jump(left)
        if (rects[1].ypos===yposs[1]+75) {
            cancelAnimationFrame(id)
            window.addEventListener("keydown",typing)
            if (!left) {
                
                img.src ="./sitleft.gif"
            } else {
                
                img.src ="./sit.gif"
            }
            toad.draw(context,img)
            letter_rects[currentkey_index].changecolor("#1122ff")
        }
        else{

            window.removeEventListener("keydown",typing)
        }
        context.clearRect(0,0,900,240)
    }
    let left = false
    let toad = new frog(420,460)
    letter_rects[0].changecolor("#1122ff")
    img.addEventListener("load",e=> {toad.draw(context,img)
    
        context.clearRect(0,0,900,240)
    })
    
    let currentkey_index = 0 
    window.addEventListener("keydown",typing)
    
        
    function typing(event) {
        
    
        let current_letter = letter_rects[currentkey_index]
        if ((event.keyCode > 31 && event.keyCode < 255) || event.keyCode===8) {
            if (word_ch_num.includes(currentkey_index)) {
                const yposs = rects.map((rec)=>rec.ypos)
                left = !left
                pushdown(yposs,left)
                console.log("down")
                
            }
            if (event.key===current_letter.letter) {
                currentkey_index++
                current_letter.changecolor("#007700")
                letter_rects[currentkey_index].changecolor("#1122ff")
            }
            if(event.key!=current_letter.letter){
                
                currentkey_index++
                current_letter.changecolor("#AA0000")
                letter_rects[currentkey_index].changecolor("#1122ff")
                
            }
            
            
            
        }}