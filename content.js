
class Animal {
    constructor() {
        this.animationLink = {
            "sleep":"./sleeping_animation.gif",
            "sit":"./idle_animation1.gif",
            "walk":"./walking_animation.gif",
            "stand": "./idle_animation.gif"}
        this.state = "sleep";
        this.animation = this.animationLink[this.state];
        this.animal = document.createElement('img'); 
        this.animal.classList.add('pet');
        this.setUp()

        this.animal.onclick = () => {
            this.meow();
            this.changeState()
        };
        this.animal.onmouseover = () => { this.pur()};
        this.animal.onmouseup = () => {
            document.onmousemove = null;
        };
        this.animal.onmousedown = (e) => {this.dragging(e)}
        // console.log("created")

    } 
    getAnimal() {
        return this.animal
    }
    start () {
        
        document.body.appendChild(this.animal);
        window.setInterval(() => {
            if(this.state == "walk" || this.state == "stand") {
                this.move()
            }}, 1000)
    }

    move() {
        this.state = "walk"
        this.setUp()
        let width = screen.width;
        var direction = ["left","right","idle"]
        var walked = true
        var chosenDirection = direction[Math.floor(Math.random() * direction.length)];
        var left = parseInt( window.getComputedStyle(this.animal).getPropertyValue("left") );
        var right = parseInt( window.getComputedStyle(this.animal).getPropertyValue("right") );
        if (chosenDirection == "left"){
            if (this.animal.style.left != "0"){
                
                this.animal.style.transform = "scaleX(-1)"; 
                
                this.animal.style.left = left + 30 + "px"
            }else{
                walked = false
            }   
        }else if (chosenDirection == "right"){
            if (this.animal.style.right != "0"){
                
                this.animal.style.transform = "scaleX(1)"; 
                
                this.animal.style.right = right + 30 + "px"
                

            }  else{
                walked = false
            } 
        }else{
            walked = false
        }
        if (!walked){
            this.state = "stand"
            this.setUp()
        }
        
    }
    changeState() {
        if (this.state == "sleep"){
            this.state = "walk"
        }else 
        if (this.state == "walk" || this.state == "stand"){
            this.state = "sit"
        }else
        if (this.state == "sit"){
            this.state = "walk"
        }
        // console.log(this.state)

        this.setUp()
    }
    setUp() {
        this.animation = this.animationLink[this.state]
        var imgURL = chrome.runtime.getURL(this.animation);
        this.animal.src = imgURL;
    }
    dragging(e) {
        var left = parseInt( window.getComputedStyle(this.animal).getPropertyValue("left") );
        var top = parseInt( window.getComputedStyle(this.animal).getPropertyValue("top") );
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        document.onmousemove = (e) => {
            var dx = mouseX - e.clientX;
            var dy = mouseY - e.clientY;

            this.animal.style.left = left - dx + "px";
            this.animal.style.top = top - dy + "px";
        };
    }
    meow() {
        var myAudio = new Audio(chrome.runtime.getURL('./cat_purr.mp3'));
        myAudio.volume = 0.2;

        myAudio.play();
    }
    pur() {
        var myAudio = new Audio(chrome.runtime.getURL('./hover_pur.mp3'));
        myAudio.volume = 0.2;

        myAudio.play();
    }
}


const cat = new Animal()
// console.log(cat.getAnimal())

cat.start()



// var pet = document.createElement('img');
// var imgURL = chrome.runtime.getURL("./idle_animation1.gif");
// pet.classList.add('pet');
// pet.onclick = function() { meow()};
// pet.onmouseover = function() { pur()};

// pet.src = imgURL;
// document.body.appendChild(pet);

// pet.onmousedown = function (e) {

//     var left = parseInt( window.getComputedStyle(pet).getPropertyValue("left") );
//     var top = parseInt( window.getComputedStyle(pet).getPropertyValue("top") );
//     var mouseX = e.clientX;
//     var mouseY = e.clientY;

//     document.onmousemove = function (e) {
//         var dx = mouseX - e.clientX;
//         var dy = mouseY - e.clientY;

//         pet.style.left = left - dx + "px";
//         pet.style.top = top - dy + "px";
//     };
// };

// this.animal.onmouseup = function () {
//     document.onmousemove = null;
// };