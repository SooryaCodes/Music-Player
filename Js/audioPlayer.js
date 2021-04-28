/*
Getting Needed Elements
----------------------------------------------------------------------------------
*/

//Container
let container = document.querySelector(".container");

//Control Elemets
let playBtn = document.querySelector(".ri-play-fill");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

//Volume Elements
let volumeBtn = document.querySelector(".volume-btn");
let volumeContainer = document.querySelector(".volume-container");

//Audio Info Elements
let author = document.getElementById("author");
let album = document.getElementById("album");
let image = document.getElementById("image");

//Repeat Element
let repeatBtn = document.querySelector(".repeat-btn");

// Audio Elements
let currentTimeElem = document.getElementById("currentTime");
let durationElem = document.getElementById("duration");
/*
Variables
----------------------------------------------------------------------------------
*/
let isPlaying = false;

let defaultAudioIndex = 0;

let repeat = false;

let musicStopped = false;
/*
Volume Range
----------------------------------------------------------------------------------
*/
volumeSldr = new mdc.slider.MDCSlider(
  document.querySelector(".mdc-slider.volume")
);
volumeSldr.root.addEventListener("MDCSlider:change", (e) =>
  changeVolume(e.detail.value)
);

/*
Music Seek Range
----------------------------------------------------------------------------------
*/
musicSldr = new mdc.slider.MDCSlider(
  document.querySelector(".mdc-slider.music")
);
musicSldr.root.addEventListener("MDCSlider:change", (e) =>
  console.log(e.detail.value)
);

/*
All Music
*/
let allMusic = [
  {
    author: "SID SRIRAM",
    album: "Yaen Ennai Pirindhaai",
    image: "Assets/Images/yennai_pirindal.jpg",
    audio: "Assets/Music/Yean-Ennai-Pirindhaai-MassTamilan.org.mp3",
  },
  {
    author: "SID SRIRAM",
    album: "Maruvaarthai Pesathe",
    image: "Assets/Images/maruvaarthai-pesathe.jpg",
    audio:
      "Assets/Music/Maruvaarthai Mp3 Song From Enai Noki Paayum Thota Movie.mp3",
  },
  {
    author: "SID SRIRAM",
    album: "Maate Vinadhuga",
    image: "Assets/Images/taxiwaala-songs-download-vijay-devarakonda.jpg",
    audio: "Assets/Music/Maate Vinadhuga - SenSongsMp3.Co.mp3",
  },
  {
    author: "SID SRIRAM",
    album: "Po Urave",
    image: "Assets/Images/crop_480x480_1540609611_2238949.jpg",
    audio: "Assets/Music/Po-Urave.mp3",
  },

  {
    author: "BILLIE EILISH",
    album: "Don't Smile At Me",
    image: "Assets/Images/Lovely.jpeg",
    audio: "Assets/Music/yt1s.com - Billie Eilish Khalid  lovely.mp3",
  },
  {
    author: "WITT LOWRY",
    album: "Into Your Arms",
    image: "Assets/Images/Into arms (1).jpg",
    audio:
      "Assets/Music/yt1s.com - Witt Lowry  Into Your Arms feat Ava Max Official Music Video.mp3",
  },
];

/*
Audio
*/
let music;

/*
Functions
----------------------------------------------------------------------------------
*/

/*
To Display Audio Info
*/
const showAudioInfo = (data) => {
  console.log(data);
  //Music
  music = new Audio(data.audio);

  //Author
  author.innerHTML = data.author;

  //Album
  album.innerHTML = data.album;

  //Image
  image.src = data.image;

  /*
Audio On Loaded Meta Data (To Display Duration)
----------------------------------------------------------------------------------
*/
  music.addEventListener("loadedmetadata", showDuration);

  /*
Move Music Sldier
*/
  music.addEventListener("timeupdate", moveMusicSlider);
};

/*
To Display Duration
*/
const showDuration = () => {
  let musicDuration = (music.duration / 60).toString().split("");
  durationElem.innerHTML = `${musicDuration[0]}:${musicDuration[2]}${musicDuration[3]}`;
};
/*
To Stor Or Repeat Music
*/
const stopRepeatMusic = () => {
  if (!repeat) {
    isPlaying = false;
    playBtn.classList.replace("ri-pause-fill", "ri-play-fill");
    musicStopped = true;
  } else {
    nextPrevSong("next");
  }
};

/*
To Move Music Slider
----------------------------------------------------------------------------------
*/
const moveMusicSlider = (event) => {
  let currentTime = music.currentTime;
  let duration = music.duration;
  let incValue = (currentTime / duration) * 100;

  // Moving Slider
  musicSldr.inputs[0].value = incValue;
  musicSldr.trackActive.style.transform = `scaleX(${incValue / 100})`;
  musicSldr.thumbs[0].style.transform = `translateX(${incValue * 3}px)`;

  //Setting Duration and Current Time
  duration = (duration / 60).toString().split("");
  durationElem.innerHTML = `${duration[0]}:${duration[2]}${duration[3]}`;

  currentTime = (currentTime / 60).toString().split("");
  currentTimeElem.innerHTML = `${currentTime[0]}:${currentTime[2]}${currentTime[3]}`;
};

/*
To Play And Pause Music
*/
const playPauseMusic = () => {
  // Checking Whether the Music is Playing Or not
  if (!isPlaying) {
    music.play();
    isPlaying = true;
    playBtn.classList.replace("ri-play-fill", "ri-pause-fill");

    //Movie Music Ranger

    //Listener to set isPlayer false & play button when music ends
    music.addEventListener("ended", stopRepeatMusic);
  } else {
    music.pause();
    isPlaying = false;
    playBtn.classList.replace("ri-pause-fill", "ri-play-fill");
  }
};

/*
To Show Volume Slider
*/
const showVolume = () => {
  volumeContainer.classList.toggle("active");
};

/*
To Change Volume Icons According to Volume Level
*/
const changeVolume = (value) => {
  // Setting Volume
  music.volume = value / 100;

  //Changing Volume Icons
  if (value === 0) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-mute-line");
  } else if (value < 40) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-down-line");
  } else if (value > 40) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-up-line");
  }

  // Hide Volume Controller
  setTimeout(() => {
    volumeContainer.classList.remove("active");
  }, 1000);
};

/*
To Play Next Song
*/
const nextPrevSong = (status) => {
  isPlaying === false ? (isPlaying = true) : "";
  playPauseMusic();
  if (status === "next") {
    defaultAudioIndex = defaultAudioIndex + 1;
    music = new Audio(allMusic[defaultAudioIndex]);
    if (defaultAudioIndex > allMusic.length - 1) {
      defaultAudioIndex = 0;
      showAudioInfo(allMusic[defaultAudioIndex]);
      isPlaying = false;
      playPauseMusic();
    } else {
      showAudioInfo(allMusic[defaultAudioIndex]);
      isPlaying = false;
      playPauseMusic();
    }
  } else {
    defaultAudioIndex = defaultAudioIndex - 1;
    music = new Audio(allMusic[defaultAudioIndex]);
    if (defaultAudioIndex === -1) {
      defaultAudioIndex = allMusic.length - 1;
      showAudioInfo(allMusic[defaultAudioIndex]);
      isPlaying = false;
      playPauseMusic();
    } else {
      showAudioInfo(allMusic[defaultAudioIndex]);
      isPlaying = false;
      playPauseMusic();
    }
  }
};
/*
Repeat Song
----------------------------------------------------------------------------------
*/
const repeatMusic = () => {
  if (!repeat) {
    repeat = true;
    repeatBtn.classList.add("active");
  } else {
    repeat = false;
    repeatBtn.classList.remove("active");
  }
};

/*
Event Listeners
----------------------------------------------------------------------------------
*/

/*
Window On Load (To Display Music Info)
----------------------------------------------------------------------------------
*/
window.addEventListener("load", () =>
  showAudioInfo(allMusic[defaultAudioIndex])
);

/*
Play Pause Listener Button
----------------------------------------------------------------------------------
*/
playBtn.addEventListener("click", playPauseMusic);

/*
Play Pause Listener Space Bar
----------------------------------------------------------------------------------
*/
document.addEventListener("keydown", (e) =>
  e.code === "Space" ? playPauseMusic() : ""
);

/*
Show Volume Controller
----------------------------------------------------------------------------------
*/
volumeBtn.addEventListener("click", showVolume);

/*
Next Music 
----------------------------------------------------------------------------------
*/
nextBtn.addEventListener("click", () => nextPrevSong("next"));

/*
Prev Music 
----------------------------------------------------------------------------------
*/
prevBtn.addEventListener("click", () => nextPrevSong("prev"));

/*
Repeat Music
----------------------------------------------------------------------------------
*/
repeatBtn.addEventListener("click", repeatMusic);
