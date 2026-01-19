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
document.querySelectorAll('.nav-list-hamburguer a').forEach(link => {
    link.addEventListener('click', function() {
        hamburguer.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Player de Rádio do Rodapé
const radioAudio = document.getElementById('radioAudio');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Controle de play/pause
playBtn.addEventListener('click', function() {
    if (radioAudio.paused) {
        radioAudio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        radioAudio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Controle de volume
volumeSlider.addEventListener('input', function() {
    radioAudio.volume = this.value / 100;
});

// Quando o áudio começar a tocar
radioAudio.addEventListener('play', function() {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

// Quando o áudio pausar
radioAudio.addEventListener('pause', function() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
});

// Tenta dar play automaticamente (pode ser bloqueado por navegador)
window.addEventListener('load', function() {
    // Delay pra tentar evitar bloqueio
    setTimeout(function() {
        radioAudio.play().catch(function(error) {
            console.log('Autoplay bloqueado:', error);
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }, 1000);
});