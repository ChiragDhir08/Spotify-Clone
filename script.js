//Initialise the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
{songName:"G.O.A.T",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
{songName:"Clash",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
{songName:"Navi Navi Yaari",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
{songName:"Peed",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
{songName:"Born To Shine",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
{songName:"Whiskey",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
{songName:"Track Suit",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
{songName:"Habit",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"}
]
//giving name to the song
songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
//handle play/pause/click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//update seekbar
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
//if we change our progressBar manually
myProgressBar.addEventListener('change',()=>{
audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    })
}

//changing the play pause buttons present in the lists
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex=parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
})
//when we tap on next button in bottom bar
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>8){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
//when we tap on previous button in bottom bar
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=8;
    }
    else{
        songIndex-=1;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
