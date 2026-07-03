/* ==========================================
   Birthday Surprise Website
   Part 1
========================================== */

// ---------- DOM ELEMENTS ----------

const screens = document.querySelectorAll(".screen");

const loadingScreen = document.getElementById("loadingScreen");
const giftScreen = document.getElementById("giftScreen");
const gameScreen = document.getElementById("gameScreen");
const galleryScreen = document.getElementById("galleryScreen");
const letterScreen = document.getElementById("letterScreen");
const finalScreen = document.getElementById("finalScreen");

const playMusicBtn = document.getElementById("playMusic");
const openGiftBtn = document.getElementById("openGift");
const giftBox = document.getElementById("giftBox");

const bgMusic = document.getElementById("bgMusic");

const heartsContainer = document.getElementById("hearts-container");
const sparkleContainer = document.getElementById("sparkle-container");


// ---------- APP ----------

window.addEventListener("load", () => {

    setTimeout(() => {

        switchScreen(giftScreen);

    }, 2500);

});


// ---------- SCREEN SWITCH ----------

function switchScreen(target){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    target.classList.add("active");

}


// ---------- PLAY MUSIC ----------

playMusicBtn.addEventListener("click",()=>{

    bgMusic.volume = 0.45;

    bgMusic.play()
        .then(()=>{

            playMusicBtn.innerHTML="🎵 Music Playing";

            playMusicBtn.disabled=true;

        })
        .catch(()=>{

            alert("Tap again to allow music.");

        });

});


// ---------- GIFT ANIMATION ----------

openGiftBtn.addEventListener("click",()=>{

    giftBox.style.transform="scale(1.25) rotate(15deg)";

    giftBox.innerHTML="🎉";

    createBurstHearts();

    setTimeout(()=>{

        switchScreen(gameScreen);

    },1800);

});


// ---------- FLOATING HEARTS ----------

function spawnHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"%";

    heart.style.fontSize=(20+Math.random()*30)+"px";

    heart.style.animationDuration=(8+Math.random()*8)+"s";

    heartsContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },16000);

}

setInterval(spawnHeart,400);


// ---------- HEART BURST ----------

function createBurstHearts(){

    for(let i=0;i<35;i++){

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="fixed";

        heart.style.left="50%";

        heart.style.top="50%";

        heart.style.fontSize=(18+Math.random()*22)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="9999";

        const x=(Math.random()-0.5)*700;
        const y=(Math.random()-0.5)*700;

        heart.animate(

            [

                {
                    transform:"translate(0,0) scale(0.5)",
                    opacity:1
                },

                {
                    transform:`translate(${x}px,${y}px) scale(1.5)`,
                    opacity:0
                }

            ],

            {

                duration:1500,
                easing:"ease-out"

            }

        );

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },1500);

    }

}


// ---------- SPARKLES ----------

function spawnSparkle(){

    const sparkle=document.createElement("div");

    sparkle.className="sparkle";

    sparkle.style.left=Math.random()*100+"%";

    sparkle.style.top=Math.random()*100+"%";

    sparkle.style.animationDuration=(1+Math.random()*2)+"s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },3000);

}

setInterval(spawnSparkle,180);


// ---------- BALLOON ANIMATION ----------

const balloonContainer=document.getElementById("balloonContainer");

function releaseBalloons(){

    balloonContainer.style.bottom="0";

}


// ---------- OPEN GIFT EXTRA ----------

giftBox.addEventListener("mouseenter",()=>{

    giftBox.style.transform="scale(1.1) rotate(-8deg)";

});

giftBox.addEventListener("mouseleave",()=>{

    giftBox.style.transform="scale(1)";

});


// ---------- AFTER GIFT ----------

openGiftBtn.addEventListener("click",()=>{

    releaseBalloons();

});


// ---------- PLACEHOLDERS ----------
// These will be completed in Part 2

function startGame(){

    console.log("Game starts...");

}

function showGallery(){

    console.log("Gallery");

}

function showLetter(){

    console.log("Letter");

}

function finishSurprise(){

    console.log("Finished");

}
/* ==========================================
   PART 2 - HEART GAME
========================================== */

const gameArea = document.getElementById("gameArea");
const scoreLabel = document.getElementById("score");
const timerLabel = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const startGameBtn = document.getElementById("startGame");

let score = 0;
let timeLeft = 10;
let gameRunning = false;

let timerInterval = null;
let heartInterval = null;

/* -------------------------
   START GAME
------------------------- */

startGameBtn.addEventListener("click", startGame);

function startGame() {

    if (gameRunning) return;

    gameRunning = true;

    score = 0;
    timeLeft = 10;

    scoreLabel.textContent = score;
    timerLabel.textContent = timeLeft;
    progressFill.style.width = "0%";

    startGameBtn.disabled = true;
    startGameBtn.innerHTML = "Game Running...";

    gameArea.innerHTML = "";

    spawnGameHeart();

    heartInterval = setInterval(() => {

        spawnGameHeart();

    }, 450);

    timerInterval = setInterval(() => {

        timeLeft--;

        timerLabel.textContent = timeLeft;

        if (timeLeft <= 0) {

            finishGame();

        }

    }, 1000);

}

/* -------------------------
   SPAWN HEART
------------------------- */

function spawnGameHeart() {

    if (!gameRunning) return;

    const heart = document.createElement("div");

    heart.className = "gameHeart";

    heart.innerHTML = "😺";

    const x = Math.random() * (gameArea.clientWidth - 60);
    const y = Math.random() * (gameArea.clientHeight - 60);

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.onclick = function () {

        score++;

        scoreLabel.textContent = score;

        const progress = Math.min((score / 5) * 100, 100);

        progressFill.style.width = progress + "%";

        heart.remove();

        if (score >= 5) {

            finishGame(true);

        }

    };

    gameArea.appendChild(heart);

    setTimeout(() => {

        if (heart.parentNode) {

            heart.remove();

        }

    }, 1200);

}

/* -------------------------
   FINISH GAME
------------------------- */

function finishGame(playerWon = false) {

    gameRunning = false;

    clearInterval(timerInterval);
    clearInterval(heartInterval);

    gameArea.innerHTML = "";

    startGameBtn.disabled = false;
    startGameBtn.innerHTML = "Play Again ❤️";

    if (playerWon) {

        progressFill.style.width = "100%";

        celebrateWin();

    } else {

        alert("⏰ Time's up! Let's try once more ❤️");

    }

}

/* -------------------------
   WIN CELEBRATION
------------------------- */

function celebrateWin() {

    if (typeof startConfetti === "function") {

        startConfetti();

    }

    createBurstHearts();

    setTimeout(() => {

        switchScreen(galleryScreen);

        animateGallery();

    }, 2500);

}

/* -------------------------
   PHOTO GALLERY
------------------------- */

function animateGallery() {

    const cards = document.querySelectorAll(".photoCard");

    cards.forEach((card, index) => {

        card.style.opacity = 0;

        card.style.transform = "translateY(40px) scale(.9)";

        setTimeout(() => {

            card.style.transition = ".8s";

            card.style.opacity = 1;

            card.style.transform = "translateY(0) scale(1)";

        }, index * 600);

    });

}

/* -------------------------
   CONTINUE BUTTON
------------------------- */

const nextLetterBtn = document.getElementById("nextLetter");

nextLetterBtn.addEventListener("click", () => {

    switchScreen(letterScreen);

    startTyping();

});
/* ==========================================
   PART 3 - LETTER, FINAL SCREEN & REPLAY
========================================== */

const finishBtn = document.getElementById("finishBtn");
const typingContainer = document.getElementById("typingText");

/* -------------------------
   TYPEWRITER EFFECT
------------------------- */

let typingStarted = false;

function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const paragraphs = typingContainer.querySelectorAll("p, h2");

    paragraphs.forEach((element) => {

        element.dataset.original = element.innerHTML;
        element.innerHTML = "";
        element.style.display = "block";

    });

    let current = 0;

    function typeNext() {

        if (current >= paragraphs.length) {

            finishBtn.style.display = "inline-block";

            return;

        }

        typeElement(paragraphs[current], () => {

            current++;
            setTimeout(typeNext, 500);

        });

    }

    typeNext();

}

function typeElement(element, callback) {

    const text = element.dataset.original;
    let i = 0;

    function typing() {

        if (i < text.length) {

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, 25);

        } else {

            callback();

        }

    }

    typing();

}

/* -------------------------
   FINAL SCREEN
------------------------- */

finishBtn.style.display = "none";

finishBtn.addEventListener("click", () => {

    switchScreen(finalScreen);

    floatingCelebration();

});

/* -------------------------
   CELEBRATION
------------------------- */

function floatingCelebration() {

    if (typeof startConfetti === "function") {

        startConfetti();

    }

    createBurstHearts();

    for (let i = 0; i < 50; i++) {

        setTimeout(() => {

            spawnHeart();

        }, i * 100);

    }

}

/* -------------------------
   REPLAY BUTTON
------------------------- */

const replayButton = document.querySelector("#finalScreen button");

if (replayButton) {

    replayButton.addEventListener("click", () => {

        location.reload();

    });

}

/* -------------------------
   AUTO FLOATING HEARTS
------------------------- */

setInterval(() => {

    if (document.hidden) return;

    spawnHeart();

}, 800);

/* -------------------------
   EXTRA SPARKLES
------------------------- */

setInterval(() => {

    if (document.hidden) return;

    spawnSparkle();

}, 500);

/* -------------------------
   MUSIC FADE IN
------------------------- */

bgMusic.addEventListener("play", () => {

    let volume = 0;

    bgMusic.volume = 0;

    const fade = setInterval(() => {

        volume += 0.05;

        if (volume >= 0.5) {

            bgMusic.volume = 0.5;

            clearInterval(fade);

        } else {

            bgMusic.volume = volume;

        }

    }, 200);

});

/* -------------------------
   SCREEN ANIMATIONS
------------------------- */

function showScreen(screen) {

    screens.forEach((item) => {

        item.classList.remove("active");
        item.classList.remove("fadeIn");

    });

    screen.classList.add("active");
    screen.classList.add("fadeIn");

}

/* Override switchScreen with animation */

function switchScreen(target) {

    screens.forEach((screen) => {

        screen.classList.remove("active");
        screen.classList.remove("fadeIn");

    });

    target.classList.add("active");
    target.classList.add("fadeIn");

}

/* -------------------------
   GIFT SHAKE
------------------------- */

giftBox.addEventListener("click", () => {

    giftBox.animate(

        [

            { transform: "rotate(-8deg)" },

            { transform: "rotate(8deg)" },

            { transform: "rotate(-6deg)" },

            { transform: "rotate(6deg)" },

            { transform: "rotate(0deg)" }

        ],

        {

            duration: 700

        }

    );

});

/* -------------------------
   PHOTO HOVER EFFECT
------------------------- */

document.querySelectorAll(".photoCard").forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.08) rotate(0deg)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* -------------------------
   PRELOAD IMAGES
------------------------- */

[
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg"
].forEach((src) => {

    const img = new Image();
    img.src = src;

});

/* -------------------------
   END
------------------------- */

console.log("❤️ Happy Birthday Bibi Ji ❤️");
console.log("Website created with love by Beta Ji.");