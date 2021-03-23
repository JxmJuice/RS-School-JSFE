const pianoKey=document.querySelectorAll(".piano-key");
const piano=document.querySelector(".piano");

function keyDown(el)
{
    const key=document.querySelector(`div[data-code="${el.code}"]`);
    const audio=document.querySelector(`audio[data-code="${el.code}"]`);
    if(!audio){
        return;
    }
    if(event.repeat){
        return;
    }
    audio.currentTime=0;
    audio.play();
    key.classList.add("piano-key-active");
} 

function keyUp(el){
    const key=document.querySelector(`div[data-code="${el.code}"]`);
    key.classList.remove("piano-key-active");
}

window.addEventListener("keydown",keyDown);
window.addEventListener("keyup",keyUp);



function mouseOver(el)
{
    el.target.classList.add("piano-key-active");
    el.target.classList.add("piano-key-active-pseudo"); 
    const audio=document.querySelector(`audio[data-code="${el.target.getAttribute('data-code')}"]`);
    audio.currentTime=0;
    audio.play();
}

function mouseOut(el){
    el.target.classList.remove("piano-key-active");
    el.target.classList.remove("piano-key-active-pseudo");
}

function end(el)
{
    pianoKey.forEach(el=>{
        el.removeEventListener("mousedown",mouseOver);
        el.removeEventListener("mouseup",mouseOut);
    });
    el.target.classList.remove("piano-key-active");
    el.target.classList.remove("piano-key-active-pseudo");
    piano.removeEventListener("mouseover",mouseOver);
    piano.removeEventListener("mouseout",mouseOut);
}

function click(el)
{

    el.target.classList.add("piano-key-active");
    el.target.classList.add("piano-key-active-pseudo");
    piano.addEventListener("mouseover",mouseOver);
    piano.addEventListener("mouseout",mouseOut);
    const audio=document.querySelector(`audio[data-code="${el.target.getAttribute('data-code')}"]`);
    audio.currentTime=0;
    audio.play();
}
piano.addEventListener("mousedown",click,false);
window.addEventListener("mouseup",end);

const notes=document.querySelector(".btn-notes");
const letters=document.querySelector(".btn-letters");

function lettersButton()
{
    notes.classList.remove("btn-active");
    letters.classList.add("btn-active");
    pianoKey.forEach(el=>{
        el.classList.add("piano-key-letter");
    });
}

function notesButton()
{
    letters.classList.remove("btn-active");
    notes.classList.add("btn-active");
    pianoKey.forEach(el=>{
        el.classList.remove("piano-key-letter");
    });
    pianoKey.forEach(el=>{
        el.classList.add("piano-key-remove-mouse");
    });
}

notes.addEventListener("click", notesButton);
letters.addEventListener("click",lettersButton);

const fullscreen=document.querySelector(".openfullscreen");

function fullscr()
{
    if (!document.fullscreenElement)
        document.documentElement.requestFullscreen();
    else if(document.exitFullscreen)
        document.exitFullscreen();
}

fullscreen.addEventListener("click",fullscr)