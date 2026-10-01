var idVideo = "M_ONGazIFsg";

const scrVideo = document.getElementById("player");

scrVideo.src = `https://www.youtube.com/embed/${idVideo}?enablejsapi=1&playsinline=1`;



const input = document.getElementById("inputId");

input.addEventListener("submit", (e) => {

e.preventDefault();
const formData = new FormData(input);
var listaForm = [];
for (var obj of formData) {
    listaForm.push(obj);
};         

urlVideo = listaForm[0][1];

var idVideo = urlVideo.split("v=")[1];

scrVideo.src = `https://www.youtube.com/embed/${idVideo}?enablejsapi=1&playsinline=1`;

})

let timer;
let count = 0;
let inicio;
let seconds;
let tempo;



function startCountdown() {

myDisplayer(count);

if (count !== 0) {
    player.pauseVideo();
    clearInterval(timer);
    myDisplayer("Finished!");
    tempo = count;
    count = 0;
    player.seekTo(seconds=inicio);
} else {

    player.playVideo();
    seconds = undefined;
    tempo = undefined;
    inicio = player.getCurrentTime();
    timer = setInterval(function() {
    count++;
    myDisplayer(count);
    }, 1000);          

}       


}


// Function to display any text
function myDisplayer(text) {
let demo = document.getElementById("demo"); 
demo.innerHTML = text;
}        
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && tempo) {
    setTimeout(seekTo, tempo * 1000);
    
}
}


function seekTo() {
player.seekTo(seconds=inicio);
player.pauseVideo();


}

function limparLoop() {

tempo = undefined;
count = 0;
clearInterval(timer);
myDisplayer("Limpado!");        

}              


