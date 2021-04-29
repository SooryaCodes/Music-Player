/*
----------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------
Variables
----------------------------------------------------------------------------------
*/
let isPlaying = false;

let defaultAudioIndex = 0;

let repeat = false;

let musicStopped = false;

let skipValue = 0;

/*
----------------------------------------------------------------------------------
Material Io
----------------------------------------------------------------------------------
*/

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
musicSldr.root.addEventListener("MDCSlider:change", (e) => {
  skipMusicTimeWithClick(e.detail.value);
});

/*
----------------------------------------------------------------------------------
All Music
----------------------------------------------------------------------------------
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
    audio: "Assets/Music/Maruvaarthai Pesathey - Masstamilan.In.mp3",
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
let music = document.getElementById("audio");

/*
----------------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------------
*/

/*
To Display Audio Info
----------------------------------------------------------------------------------
*/
const showAudioInfo = (data) => {
  //Music
  music.src = data.audio;

  //Author
  author.innerHTML = data.author;

  //Album
  album.innerHTML = data.album;

  //Image
  image.src = data.image;
};

/*
To Display Duration
----------------------------------------------------------------------------------
*/
/*
To Stor Or Repeat Music
----------------------------------------------------------------------------------
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
To Skip Music With Key
*/
const skipMusicTimeWithKey = (skipValue) => {
  let currentTime = music.currentTime + skipValue;
  let duration = music.duration;
  let incValue = (currentTime / duration) * 100;
  let currentMinute = parseInt(currentTime / 60);
  let currentSeconds = parseInt(currentTime % 60);
  music.currentTime = currentTime;

  // Moving Slider
  musicSldr.inputs[0].value = incValue;
  musicSldr.trackActive.style.transform = `scaleX(${incValue / 100})`;
  if (incValue === 100) {
    musicSldr.thumbs[0].style.transform = `translateX(307.5px)`;
  } else {
    musicSldr.thumbs[0].style.transform = `translateX(${incValue * 3}px)`;
  }

  //Setting Duration and Current Ti me
  currentSeconds < 10
    ? (currentTime = `${currentMinute}:0${currentSeconds}`)
    : (currentTime = `${currentMinute}:${currentSeconds}`);
  currentTimeElem.innerHTML = currentTime;
};

/*
To Skip Music With Click
*/
const skipMusicTimeWithClick = (sliderValue) => {
  let currentTime = music.currentTime;
  let duration = music.duration;
  let incValue = sliderValue;

  currentTime = (incValue * duration) / 100;

  console.log(currentTime);

  music.currentTime = currentTime;

  //Setting Duration and Current Time

  let currentMinute = parseInt(currentTime / 60);
  let currentSeconds = parseInt(currentTime % 60);

  currentSeconds < 10
    ? (currentTime = `${currentMinute}:0${currentSeconds}`)
    : (currentTime = `${currentMinute}:${currentSeconds}`);
  currentTimeElem.innerHTML = currentTime;
};

/*
To Move Music Slider
----------------------------------------------------------------------------------
*/
const moveMusicSlider = () => {
  let currentTime = music.currentTime;
  let duration = music.duration;
  let incValue = (currentTime / duration) * 100;

  let currentMinute = parseInt(music.currentTime / 60);
  let currentSeconds = parseInt(music.currentTime % 60);

  // Moving Slider
  musicSldr.inputs[0].value = incValue;
  musicSldr.trackActive.style.transform = `scaleX(${incValue / 100})`;
  if (incValue > 60) {
    musicSldr.thumbs[0].style.transform = `translateX(${incValue * 3.1}px)`;
  } else {
    musicSldr.thumbs[0].style.transform = `translateX(${incValue * 3}px)`;
  }

  //Setting Duration and Current Time

  currentSeconds < 10
    ? (currentTime = `${currentMinute}:0${currentSeconds}`)
    : (currentTime = `${currentMinute}:${currentSeconds}`);
  currentTimeElem.innerHTML = currentTime;
};

/*
To Play And Pause Music
----------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------
*/
const showVolume = () => {
  volumeContainer.classList.toggle("active");
};

/*
To Change Volume Icons According to Volume Level
----------------------------------------------------------------------------------
*/
const changeVolume = (value) => {
  // Setting Volume
  if (music.volume === value) {
    value = 100;
  }
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
  if (volumeContainer.classList[1]) {
    setTimeout(() => {
      volumeContainer.classList.remove("active");
    }, 1000);
  }
};

/*
To Play Next Song
----------------------------------------------------------------------------------
*/
const nextPrevSong = (status) => {
  if (status === "next") {
    defaultAudioIndex = defaultAudioIndex + 1;
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
----------------------------------------------------------------------------------
Event Listeners
----------------------------------------------------------------------------------
*/

/*
Window On Load (To Display Music Info)
----------------------------------------------------------------------------------
*/
window.addEventListener("load", () => {
  showAudioInfo(allMusic[defaultAudioIndex]);
  changeVolume(100);
});

/*
Play Pause Listener Button
----------------------------------------------------------------------------------
*/
playBtn.addEventListener("click", playPauseMusic);

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

/*
----------------------------------------------------------------------------------
Keyboard Listeners
----------------------------------------------------------------------------------
*/

/*
Play Pause 
----------------------------------------------------------------------------------
*/
document.addEventListener("keypress", (e) =>
  e.code === "Space" ? playPauseMusic() : ""
);

/*
Skip Forward
----------------------------------------------------------------------------------
*/
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    skipMusicTimeWithKey(5);
  } else if (e.code === "ArrowLeft") {
    skipMusicTimeWithKey(-5);
  }
});

/*
Skip To A Time
----------------------------------------------------------------------------------
*/

/*
Next and Prev Song 
*/
let keysPressed = [];
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;
  if (keysPressed["Shift"] && event.key == "N") {
    nextPrevSong("next");
  } else if (keysPressed["Shift"] && event.key == "P") {
    nextPrevSong("prev");
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

/*
Repeat Music
----------------------------------------------------------------------------------
*/
document.addEventListener("keydown", (e) =>
  e.code === "KeyR" ? repeatMusic() : ""
);

/*
Mute Music
----------------------------------------------------------------------------------
*/
document.addEventListener("keydown", (e) =>
  e.code === "KeyM" ? changeVolume(0) : ""
);

/*
Move Music Sldier
----------------------------------------------------------------------------------
*/
music.addEventListener("timeupdate", () => {
  //Move Music Slider
  moveMusicSlider();

  /*
  Audio On Loaded Meta Data (To Display Duration)
  ----------------------------------------------------------------------------------
  */
  music.addEventListener("loadeddata", () => {
    // Setting Duration
    let durationMinute = parseInt(music.duration / 60);
    let durationSeconds = parseInt(music.duration % 60);
    duration = `${durationMinute}:${durationSeconds}`;
    durationElem.innerHTML = duration;
  });
});
