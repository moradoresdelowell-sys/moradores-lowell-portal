// Estado Global
let currentSection = 'inicio';
let currentUser = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSection('inicio');
    setupEventListeners();
    checkAuthState();
});

// Funções de Inicialização
function initializeApp() {
    console.log('Inicializando app...');
    
    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Navegação - Garantir que os links funcionem
    setupNavigation();
    
    // Filtros
    setupFilters();
}

function setupNavigation() {
    // Selecionar todos os links de navegação
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    console.log('Configurando navegação para', navLinks.length, 'links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            console.log('Link clicado:', href);
            
            if (href && href.startsWith('#')) {
                const section = href.substring(1);
                console.log('Mudando para seção:', section);
                
                // Fechar menu mobile se estiver aberto
                const nav = document.getElementById('nav');
                if (nav) nav.classList.remove('active');
                
                // Carregar a seção
                loadSection(section);
            }
        });
    });
}

function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Modal compartilhamento
    const modal = document.getElementById('shareModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function setupFilters() {
    console.log('Configurando filtros...');
    
    // Aluguel
    const aluguelTipo = document.getElementById('aluguelTipo');
    const aluguelPreco = document.getElementById('aluguelPreco');
    
    if (aluguelTipo) {
        aluguelTipo.addEventListener('change', function() {
            loadAluguel(this.value, aluguelPreco?.value || '');
        });
    }
    
    if (aluguelPreco) {
        aluguelPreco.addEventListener('change', function() {
            loadAluguel(aluguelTipo?.value || '', this.value);
        });
    }
    
    // Classificados
    const classificadosCategoria = document.getElementById('classificadosCategoria');
    if (classificadosCategoria) {
        classificadosCategoria.addEventListener('change', function() {
            loadClassificados(this.value);
        });
    }
    
    // Empregos
    const empregosTipo = document.getElementById('empregosTipo');
    if (empregosTipo) {
        empregosTipo.addEventListener('change', function() {
            loadEmpregos(this.value);
        });
    }
    
    // Guia Comercial
    const guiaCategoria = document.getElementById('guiaCategoria');
    if (guiaCategoria) {
        guiaCategoria.addEventListener('change', function() {
            loadGuia(this.value);
        });
    }
}

// Navegação Principal
function loadSection(sectionName) {
    console.log('Carregando seção:', sectionName);
    
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        console.log('Escondendo seção:', section.id);
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        console.log('Mostrando seção:', sectionName);
        
        // Atualizar link ativo
        updateActiveLink(sectionName);
        
        // Carregar dados da seção
        loadSectionData(sectionName);
    } else {
        console.error('Seção não encontrada:', sectionName);
    }
}

function updateActiveLink(sectionName) {
    // Remover active de todos os links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Adicionar active no link correto
    const activeLink = document.querySelector(`a[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log('Link ativo atualizado para:', sectionName);
    }
}

function loadSectionData(sectionName) {
    console.log('Carregando dados da seção:', sectionName);
    
    switch(sectionName) {
        case 'inicio':
            loadInicio();
            break;
        case 'aluguel':
            loadAluguel();
            break;
        case 'classificados':
            loadClassificados();
            break;
        case 'empregos':
            loadEmpregos();
            break;
        case 'guia':
            loadGuia();
            break;
        case 'noticias':
            loadNoticias();
            break;
        default:
            console.warn('Seção desconhecida:', sectionName);
    }
}

// Carregar Dados das Seções
async function loadInicio() {
    console.log('Carregando página inicial...');
    try {
        // Carregar anúncios premium
        const premiumAds = await firebaseUtils.getAnuncios('', 'premium');
        displayPremiumAds(premiumAds);
        
        // Carregar últimas notícias
        const latestNews = await firebaseUtils.getNoticias(3);
        displayLatestNews(latestNews);
        
        console.log('Página inicial carregada com sucesso');
    } catch (error) {
        console.error('Erro ao carregar dados da página inicial:', error);
    }
}

async function loadAluguel(tipo = '', preco = '') {
    console.log('Carregando aluguéis...', {tipo, preco});
    try {
        const container = document.getElementById('aluguelList');
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
            
            const items = await firebaseUtils.getAluguel(tipo, preco);
            displayAluguel(items);
        }
    } catch (error) {
        console.error('Erro ao carregar aluguéis:', error);
    }
}

async function loadClassificados(categoria = '') {
    console.log('Carregando classificados...', categoria);
    try {
        const container = document.getElementById('classificadosList');
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
            
            const items = await firebaseUtils.getAnuncios(categoria);
            displayClassificados(items);
        }
    } catch (error) {
        console.error('Erro ao carregar classificados:', error);
    }
}

async function loadEmpregos(tipo = '') {
    console.log('Carregando empregos...', tipo);
    try {
        const container = document.getElementById('empregosList');
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
            
            const items = await firebaseUtils.getVagas(tipo);
            displayEmpregos(items);
        }
    } catch (error) {
        console.error('Erro ao carregar empregos:', error);
    }
}

async function loadGuia(categoria = '') {
    console.log('Carregando guia comercial...', categoria);
    try {
        const container = document.getElementById('guiaList');
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
            
            const items = await firebaseUtils.getEstabelecimentos(categoria);
            displayGuia(items);
        }
    } catch (error) {
        console.error('Erro ao carregar guia comercial:', error);
    }
}

async function loadNoticias() {
    console.log('Carregando notícias...');
    try {
        const container = document.getElementById('noticiasList');
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
            
            const items = await firebaseUtils.getNoticias();
            displayNoticias(items);
        }
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

// [RESTO DO CÓDIGO PERMANECE IGUAL - Funções de display, criar cards, etc.]

// Adicionar CSS adicional para debugging
const debugCSS = `
<style>
/* Debug - remover em produção */
.nav a {
    cursor: pointer !important;
}

.section {
    min-height: 500px;
    border: 1px solid transparent;
}

.section.active {
    border: 2px solid #28a745; /* Verde para debug */
}

.nav a:hover {
    background: rgba(220, 53, 69, 0.1) !important;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', debugCSS);