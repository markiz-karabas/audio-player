const player = document.querySelector('.player'),
      btnPlay = document.querySelector('.btn-play'),
      btnPrev = document.querySelector('.btn-prev'),
      btnNext = document.querySelector('.btn-next'),
      artist = document.querySelector('.artist'),
      trackName = document.querySelector('.track'),
      audio = document.querySelector('.audio'),
      progressBox = document.querySelector('.progress-box'),
      progress = document.querySelector('.progress'),
      timeStart = document.querySelector('.time-line__start'),
      timeEnd = document.querySelector('.time-line__end'),
      cover = document.querySelector('.cover__img'),
      btnSrc = document.querySelector('.btn-src__icon'),
      wrapper = document.querySelector('.wrapper');
let duration = 0   
//массив треков
const tracks = [
    {id: 1, artist: 'MindInABox', track: 'I Knew', link: './assets/audio/MindInABox - I Knew.mp3'},
    {id: 2, artist: 'Third Realm', track: 'Sleeping Beauty', link: './assets/audio/Third Realm - Sleeping Beauty.mp3'},
    {id: 3, artist: 'Velvet Acid Christ', track: 'The Colors of My Sadness', link: './assets/audio/Velvet Acid Christ -The Colors of My Sadness.mp3'},
    {id: 4, artist: 'SIDXKICK', track: 'Боюсь темноты', link: './assets/audio/SIDXKICK - Boyus temnoty.mp3'},
    {id: 5, artist: 'Бони НЕМ', track: 'Этого мало', link: './assets/audio/Boni Nem - Etogo-malo.mp3'},
];
//трек по умолчанию
let trackIndex = 0;
//init
function loadSong(track) {
    artist.innerHTML = tracks[trackIndex].artist;
    trackName.innerHTML = tracks[trackIndex].track;
    audio.src = tracks[trackIndex].link;
    cover.src = `./assets/img/cover-${trackIndex + 1}.jpg`;
    wrapper.style.backgroundImage = `url(./assets/img/cover-${trackIndex + 1}.jpg)`;
}
loadSong(tracks[trackIndex]);
updateTimeLine();
//play
function playSong() {
    audio.play();
    player.classList.toggle('active');
    btnSrc.src = './assets/svg/pause.png';
}
//pause
function pauseSong() {
    audio.pause();
    player.classList.toggle('active');
    //player.classList.remove('active');
    btnSrc.src = './assets/svg/play.png';
}
//nextSong
function nextSong() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }
    loadSong(tracks[trackIndex]);
    playSong();
}
//prevSong
function prevSong() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }
    loadSong(tracks[trackIndex]);
    playSong();
}
//progress-bar
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function setProgress(event) {
    const widthTotal = this.clientWidth;
    const widthClick = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = widthClick / widthTotal * duration;
}
//updateTimeLine

function updateTimeLine(event) {
    let currentTime = audio.currentTime;
    let audioDuration = audio.duration - audio.currentTime;
    
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`; 
    }
    console.log(audioDuration) //не понимаю почему NaN ???
    timeEnd.innerHTML = `${totalMin}:${totalSec}`;


    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`; 
    }
    
    timeStart.innerHTML = `${currentMin}:${currentSec}`;
}
//eventlisteners
window.addEventListener('load', updateTimeLine);
btnPlay.addEventListener('click', () => {
    
    const isPlaying = player.classList.contains('active');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})
btnNext.addEventListener('click', nextSong);
btnPrev.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress); //прогресс
audio.addEventListener('timeupdate', updateTimeLine);
progressBox.addEventListener('click', setProgress); //перемотка
audio.addEventListener('ended', nextSong); //auto-play