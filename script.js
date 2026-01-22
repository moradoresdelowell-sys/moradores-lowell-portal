// Menu hambúrguer
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    hamburguer.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// Navegação entre sections
function showSection(targetId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    const target = document.getElementById(targetId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
        window.location.hash = targetId;
    }
}

// Links do menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').substring(1);
        showSection(id);
    });
});

// Carrega section pela URL
window.addEventListener('hashchange', () => {
    const id = window.location.hash.substring(1);
    if (id) showSection(id);
});

// Inicializa
showSection('home');