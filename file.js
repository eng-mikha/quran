let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let aboutbtn = document.querySelector(".story")

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name : 'سورة يوسف',
        music : 'audio/12 يوسف.m4a'
    },
    {
        name : 'سورة الرعد',
        music : 'audio/13 الرعد.m4a'
    },
    {
        name : 'سورة إبراهيم',
        music : 'audio/14 ابراهيم.m4a'
    },
    {
        name : 'سورة مريم',
        music : 'audio/19 مريم.mp3'
    },
    {
        name : 'سورة طه',
        music : 'audio/20 طه.m4a'
    },
    {
        name : 'سورة الفرقان',
        music : 'audio/25 الفرقان.mp3'
    },
    {
        name : 'سورة لقمان',
        music : 'audio/31 لقمان.m4a'
    },
    {
        name : 'سورة الرحمن',
        music : 'audio/55 الرحمن.mp3'
    },
    {
        name : 'سورة الواقعة',
        music : 'audio/56 الواقعة.m4a'
    },
    {
        name : 'سورة الحديد',
        music : 'audio/57 الحديد.mp3'
    },
    {
        name : 'سورة المجادلة',
        music : 'audio/58 المجادلة.mp3'
    },
    {
        name : 'سورة الحشر',
        music : 'audio/59 الحشر.mp3'
    },
    {
        name : 'سورة الممتحنة',
        music : 'audio/60 الممتحنة.mp3'
    },
    {
        name : 'سورة الصف',
        music : 'audio/61 الصف.mp3'
    },
    {
        name : 'سورة الجمعة',
        music : 'audio/62 الجمعة.mp3'
    },
    {
        name : 'سورة المنافقون',
        music : 'audio/63 المنافقون.mp3'
    },
    {
        name : 'سورة التغابن',
        music : 'audio/64 التغابن.mp3'
    },
    {
        name : 'سورة الطلاق',
        music : 'audio/65 الطلاق.mp3'
    },
    {
        name : 'سورة التحريم',
        music : 'audio/66 التحريم.mp3'
    },
    {
        name : 'سورة الملك',
        music : 'audio/67 الملك.mp3'
    },
    {
        name : 'سورة القلم',
        music : 'audio/68 القلم.mp3'
    },
    {
        name : 'سورة الحاقة',
        music : 'audio/69 الحاقة.mp3'
    },
    {
        name : 'سورة الجن',
        music : 'audio/72 الجن.m4a'
    },
    {
        name : 'سورة القيامة',
        music : 'audio/75 القيامة.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    // random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// my try

const sora = [
    {
        name : 'يوسف',
        music : 'audio/12 يوسف.m4a'
    },
    {
        name : 'الرعد',
        music : 'audio/13 الرعد.m4a'
    },
    {
        name : 'إبراهيم',
        music : 'audio/14 ابراهيم.m4a'
    },
    {
        name : 'مريم',
        music : 'audio/19 مريم.mp3'
    },
    {
        name : 'طه',
        music : 'audio/20 طه.m4a'
    },
    {
        name : 'الفرقان',
        music : 'audio/25 الفرقان.mp3'
    },
    {
        name : 'لقمان',
        music : 'audio/31 لقمان.m4a'
    },
    {
        name : 'الرحمن',
        music : 'audio/55 الرحمن.mp3'
    },
    {
        name : 'الواقعة',
        music : 'audio/56 الواقعة.m4a'
    },
    {
        name : 'الحديد',
        music : 'audio/57 الحديد.mp3'
    },
    {
        name : 'المجادلة',
        music : 'audio/58 المجادلة.mp3'
    },
    {
        name : 'الحشر',
        music : 'audio/59 الحشر.mp3'
    },
    {
        name : 'الممتحنة',
        music : 'audio/60 الممتحنة.mp3'
    },
    {
        name : 'الصف',
        music : 'audio/61 الصف.mp3'
    },
    {
        name : 'الجمعة',
        music : 'audio/62 الجمعة.mp3'
    },
    {
        name : 'المنافقون',
        music : 'audio/63 المنافقون.mp3'
    },
    {
        name : 'التغابن',
        music : 'audio/64 التغابن.mp3'
    },
    {
        name : 'الطلاق',
        music : 'audio/65 الطلاق.mp3'
    },
    {
        name : 'التحريم',
        music : 'audio/66 التحريم.mp3'
    },
    {
        name : 'الملك',
        music : 'audio/67 الملك.mp3'
    },
    {
        name : 'القلم',
        music : 'audio/68 القلم.mp3'
    },
    {
        name : 'الحاقة',
        music : 'audio/69 الحاقة.mp3'
    },
    {
        name : 'الجن',
        music : 'audio/72 الجن.m4a'
    },
    {
        name : 'القيامة',
        music : 'audio/75 القيامة.mp3'
    },
];

// active-surah

let i = 1 ;

let allsurah = document.querySelector(".allsurah");
while (i<=24) {
    var s = document.createElement(`div`);
    s.textContent = sora[i-1].name;
    s.setAttribute('class',`su surah${i}`);
    allsurah.appendChild(s);

    
    
    i++;
};


function sorahNum(num) {
    var surah = document.querySelector(`.surah${num}`);
    
    surah.addEventListener("click", function() {
        curr_track.src = music_list[num-1].music; 
        track_name.textContent = music_list[num-1].name;
        if(isPlaying = true){
            curr_track.play();
            wave.classList.add('loader');
            playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
    });
};

for(let i = 1; i<=24 ; i++) {
    sorahNum(i);
}

function navigate() {
    window.location.href = "about.html"; // ضع رابط الصفحة هنا
}

function navigateOne() {
    window.location.href = "#read"; // ضع رابط الصفحة هنا
}

function navigateTwo() {
    window.location.href = "#listen"; // ضع رابط الصفحة هنا
}
