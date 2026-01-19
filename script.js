// Menu hamburguer
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

hamburguer.addEventListener('click', function() {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', function() {
    hamburguer.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburguer.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Rádio play button
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', function() {
    if (this.textContent === '▶ PLAY') {
        this.textContent = '⏸ PAUSE';
    } else {
        this.textContent = '▶ PLAY';
    }
});