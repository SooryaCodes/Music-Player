/*
Getting Needed Elements
----------------------------------------------------------------------------------
*/
let playBtn = document.querySelector('.ri-play-fill');

/*
Variables
----------------------------------------------------------------------------------
*/
let isPlaying = false

/*
Audio
*/
let music = new Audio("Assets/Music/yt1s.com - Billie Eilish Khalid  lovely.mp3")

/*
Functions
----------------------------------------------------------------------------------
*/

/*
To Play And Pause Music
*/
const playPauseMusic = () => {
    /*
    Checking Whether the Music is Playing Or not
    */
    if (!isPlaying) {
        music.play();
        isPlaying = true;
        playBtn.classList.replace("ri-play-fill", "ri-pause-fill")
    } else {
        music.pause();
        isPlaying = false;
        playBtn.classList.replace("ri-pause-fill", "ri-play-fill")
    }
}

/*
Event Listeners
----------------------------------------------------------------------------------
*/

/*
Play Pause Listener Button
*/
playBtn.addEventListener("click", playPauseMusic)

/*
Play Pause Listener Space Bar
*/
document.addEventListener("keydown", (e) => e.code === "Space" ? playPauseMusic() : "")