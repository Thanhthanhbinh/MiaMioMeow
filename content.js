// function onload() {
//     const pet = document.createElement('img');
//     const text = document.createElement('h1');
//     text.innerText="HELJLSJFOWEJO"
//     pet.src ='./idle_animation.gif';
//     pet.classList.add('pet');
//     document.body.appendChild(pet);
//     document.body.appendChild(text);
//     console.log("it ran!")
// }
// window.addEventListener('load', onload);
var pet = document.createElement('img');
var imgURL = chrome.runtime.getURL("./idle_animation1.gif");
pet.classList.add('pet');
pet.onclick = function() { meow()};
pet.onmouseover = function() { pur()};

pet.setAttribute('id','figur_1')
pet.src = imgURL;
document.body.appendChild(pet);

figur_1.onmousedown = function (e) {
    var figur_1 = document.getElementById("figur_1");

    var left = parseInt( window.getComputedStyle(figur_1).getPropertyValue("left") );
    var top = parseInt( window.getComputedStyle(figur_1).getPropertyValue("top") );
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    document.onmousemove = function (e) {
        var dx = mouseX - e.clientX;
        var dy = mouseY - e.clientY;

        figur_1.style.left = left - dx + "px";
        figur_1.style.top = top - dy + "px";
    };
};

figur_1.onmouseup = function () {
    document.onmousemove = null;
};
function meow() {
    var myAudio = new Audio(chrome.runtime.getURL('./cat_purr.mp3'));
    myAudio.play();
}
function pur() {
    // var myAudio = new Audio(chrome.runtime.getURL('./hover_pur.mp3'));
    // myAudio.play();
}