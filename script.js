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