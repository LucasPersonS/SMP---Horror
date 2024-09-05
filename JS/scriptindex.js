let pressTimer;
const buildUpSound = document.getElementById('buildUpSound');

function startPress() {
    const button = document.getElementById('startButton');
    const intro = document.querySelector('.intro');
    const header = document.querySelector('header');
    const introContent = document.querySelector('.intro-content');
    button.classList.add('hold-fill');
    intro.classList.add('hold-shake');
    header.classList.add('hold-shake');
    introContent.classList.add('hold-shake');
    buildUpSound.play();
    introVideo.play();
    pressTimer = setTimeout(() => {
        window.location.href = '01.html';
    }, 5500); 
}

function endPress() {
    const button = document.getElementById('startButton');
    const intro = document.querySelector('.intro');
    const header = document.querySelector('header');
    const introContent = document.querySelector('.intro-content');
    clearTimeout(pressTimer);
    button.classList.remove('hold-fill');
    intro.classList.remove('hold-shake');
    header.classList.remove('hold-shake');
    introContent.classList.remove('hold-shake');
    buildUpSound.pause();
    buildUpSound.currentTime = 0;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const introSound = document.getElementById('introSound');
    introSound.play();
});

