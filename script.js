const player = document.querySelector('.player'),
      btnPlay = document.querySelector('.btn-play'),
      btnPrev = document.querySelector('.btn-prev'),
      btnNext = document.querySelector('.btn-next'),
      performer = document.querySelector('.performer'),
      trackName = document.querySelector('.track'),
      audio = document.querySelector('.audio'),
      progressBox = document.querySelector('.progress-box'),
      progress = document.querySelector('.progress'),
      timeStart = document.querySelector('.time-line__start'),
      timeEnd = document.querySelector('.time-line__end'),
      cover = document.querySelector('.cover__img'),
      btnSrc = document.querySelector('.btn-src__icon'),
      wrapper = document.querySelector('.wrapper');
//массив треков
const tracks = [
    {id: 1, performer: 'MindInABox', track: 'I Knew', link: './assets/audio/MindInABox - I Knew.mp3'},
    {id: 2, performer: 'Third Realm', track: 'Sleeping Beauty', link: './assets/audio/Third Realm - Sleeping Beauty.mp3'},
    {id: 3, performer: 'Velvet Acid Christ', track: 'The Colors of My Sadness', link: './assets/audio/Velvet Acid Christ -The Colors of My Sadness.mp3'},
    {id: 4, performer: 'SIDXKICK', track: 'Боюсь темноты', link: './assets/audio/SIDXKICK - Boyus temnoty.mp3'},
];
//трек по умолчанию
let trackIndex = 0;
//init
function loadSong(track) {
    performer.innerHTML = tracks[trackIndex].performer;
    trackName.innerHTML = tracks[trackIndex].track;
    audio.src = tracks[trackIndex].link;
    cover.src = `./assets/img/cover-${trackIndex + 1}.jpg`;
    wrapper.style.backgroundImage = `url(./assets/img/cover-${trackIndex + 1}.jpg)`;
}
loadSong(tracks[trackIndex]);
//play
function playSong() {
    audio.play();
    player.classList.add('active');
    btnSrc.src = './assets/svg/pause.png';
}
//pause
function pauseSong() {
    audio.pause();
    player.classList.remove('active');
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
    let audioDuration = audio.duration;
    let currentTime = audio.currentTime;
    
    const totalMin = Math.floor(audioDuration / 60);
    const totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`; 
    }
    timeEnd.innerHTML = `${totalMin}:${totalSec}`;


    const currentMin = Math.floor(currentTime / 60);
    const currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`; 
    }
    console.log(currentTime);
    timeStart.innerHTML = `${currentMin}:${currentSec}`;
}
//eventlisteners

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