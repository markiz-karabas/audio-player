const player = document.querySelector('.player'),
      btnPlay = document.querySelector('.btn-play'),
      btnPrev = document.querySelector('.btn-prev'),
      btnNext = document.querySelector('.btn-next'),
      songName = document.querySelector('.song'),
      audio = document.querySelector('.audio'),
      progressBox = document.querySelector('.progress-box'),
      progress = document.querySelector('.progress'),
      cover = document.querySelector('.cover__img'),
      btnSrc = document.querySelector('.btn-src');
//названия треков
const songs = ['MindInABox - I Knew', 'Third Realm - Sleeping Beauty','Velvet Acid Christ - Grey'];
//трек по умолчанию
let songIndex = 0;

//init
function loadSong(song) {
    songName.innerHTML = song;
    audio.src = `./assets/audio/${song}.mp3`;
    cover.src = `./assets/img/cover-${songIndex + 1}.jpg`
}
loadSong(songs[songIndex]);
//play
function playSong() {
    audio.play();
    player.classList.add('active');

}
//pause
function pauseSong() {
    audio.pause();
    player.classList.remove('active');
}
//nextSong
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//prevSong
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
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
