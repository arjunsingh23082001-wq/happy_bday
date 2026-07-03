/* ==========================================
   CONFETTI.JS
   Simple Canvas Confetti Animation
========================================== */

const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

let confettiPieces = [];
let confettiAnimation = null;

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const colors = [
    "#ff4d6d",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#9b5de5",
    "#ffffff",
    "#ff8fab",
    "#90e0ef"
];

class Confetti {

    constructor() {

        this.x = Math.random() * confettiCanvas.width;
        this.y = -20;

        this.size = 6 + Math.random() * 10;

        this.speedY = 2 + Math.random() * 5;

        this.speedX = -2 + Math.random() * 4;

        this.rotation = Math.random() * 360;

        this.rotationSpeed = -10 + Math.random() * 20;

        this.color = colors[Math.floor(Math.random() * colors.length)];

    }

    update() {

        this.y += this.speedY;
        this.x += this.speedX;

        this.rotation += this.rotationSpeed;

    }

    draw() {

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.fillStyle = this.color;

        ctx.fillRect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );

        ctx.restore();

    }

}

function animateConfetti() {

    ctx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    confettiPieces.forEach((piece) => {

        piece.update();

        piece.draw();

    });

    confettiPieces = confettiPieces.filter((piece) => {

        return piece.y < confettiCanvas.height + 50;

    });

    if (confettiPieces.length > 0) {

        confettiAnimation = requestAnimationFrame(
            animateConfetti
        );

    } else {

        cancelAnimationFrame(confettiAnimation);

    }

}

function startConfetti() {

    confettiPieces = [];

    for (let i = 0; i < 250; i++) {

        confettiPieces.push(
            new Confetti()
        );

    }

    animateConfetti();

}

function stopConfetti() {

    confettiPieces = [];

    ctx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    cancelAnimationFrame(confettiAnimation);

}