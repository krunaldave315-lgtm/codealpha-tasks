const songs = [

{
title:"Dream Song",
artist:"Artist One",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
cover:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
},

{
title:"Night Drive",
artist:"Artist Two",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
cover:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
},

{
title:"Future Bass",
artist:"Artist Three",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
cover:"https://images.unsplash.com/photo-1501612780327-45045538702b?w=500"
},

{
title:"Electronic Sky",
artist:"Artist Four",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
cover:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500"
}

];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");
const search = document.getElementById("search");
const volume = document.getElementById("volume");

let songIndex = 0;
let repeat = false;
let shuffle = false;

volume.value = localStorage.getItem("volume") || 1;
audio.volume = volume.value;

function loadSong(index){

title.textContent = songs[index].title;
artist.textContent = songs[index].artist;
cover.src = songs[index].cover;
audio.src = songs[index].src;

highlightSong();
}

function playSong(){
audio.play();
playBtn.innerHTML =
'<i class="fas fa-pause"></i>';
}

function pauseSong(){
audio.pause();
playBtn.innerHTML =
'<i class="fas fa-play"></i>';
}

playBtn.addEventListener("click",()=>{

if(audio.paused){
playSong();
}else{
pauseSong();
}

});

function nextSong(){

if(shuffle){
songIndex =
Math.floor(Math.random()*songs.length);
}
else{
songIndex =
(songIndex + 1) % songs.length;
}

loadSong(songIndex);
playSong();
}

function prevSong(){

songIndex--;

if(songIndex < 0){
songIndex = songs.length - 1;
}

loadSong(songIndex);
playSong();
}

nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

audio.addEventListener("timeupdate",()=>{

const percent =
(audio.currentTime/audio.duration)*100;

progress.style.width =
percent + "%";

currentTime.textContent =
formatTime(audio.currentTime);

duration.textContent =
formatTime(audio.duration);

});

function formatTime(time){

if(isNaN(time)) return "0:00";

let mins = Math.floor(time/60);
let secs = Math.floor(time%60);

return `${mins}:${secs<10?"0":""}${secs}`;
}

progressContainer.addEventListener("click",(e)=>{

const width =
progressContainer.clientWidth;

audio.currentTime =
(e.offsetX/width)*audio.duration;

});

volume.addEventListener("input",()=>{

audio.volume = volume.value;

localStorage.setItem(
"volume",
volume.value
);

});

repeatBtn.addEventListener("click",()=>{

repeat = !repeat;

repeatBtn.style.color =
repeat ? "#00ffff" : "white";

});

shuffleBtn.addEventListener("click",()=>{

shuffle = !shuffle;

shuffleBtn.style.color =
shuffle ? "#00ffff" : "white";

});

audio.addEventListener("ended",()=>{

if(repeat){
playSong();
}
else{
nextSong();
}

});

songs.forEach((song,index)=>{

const li =
document.createElement("li");

li.textContent =
`${song.title} - ${song.artist}`;

li.addEventListener("click",()=>{

songIndex = index;

loadSong(index);

playSong();

});

playlist.appendChild(li);

});

function highlightSong(){

document
.querySelectorAll("#playlist li")
.forEach((item,index)=>{

item.classList.remove("active");

if(index===songIndex){
item.classList.add("active");
}

});

}

search.addEventListener("keyup",()=>{

const value =
search.value.toLowerCase();

document
.querySelectorAll("#playlist li")
.forEach(li=>{

li.style.display =
li.textContent
.toLowerCase()
.includes(value)
? "block"
: "none";

});

});

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

if(audio.paused){
playSong();
}else{
pauseSong();
}

}

if(e.code==="ArrowRight"){
nextSong();
}

if(e.code==="ArrowLeft"){
prevSong();
}

});

loadSong(songIndex);