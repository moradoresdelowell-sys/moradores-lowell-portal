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
    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Navegação
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            loadSection(section);
            
            // Fechar menu mobile
            nav.classList.remove('active');
        });
    });
    
    // Filtros
    setupFilters();
}

function setupEventListeners() {
    // Modal compartilhamento
    const modal = document.getElementById('shareModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function setupFilters() {
    // Aluguel
    const aluguelTipo = document.getElementById('aluguelTipo');
    const aluguelPreco = document.getElementById('aluguelPreco');
    
    aluguelTipo.addEventListener('change', function() {
        loadAluguel(this.value, aluguelPreco.value);
    });
    
    aluguelPreco.addEventListener('change', function() {
        loadAluguel(aluguelTipo.value, this.value);
    });
    
    // Classificados
    const classificadosCategoria = document.getElementById('classificadosCategoria');
    classificadosCategoria.addEventListener('change', function() {
        loadClassificados(this.value);
    });
    
    // Empregos
    const empregosTipo = document.getElementById('empregosTipo');
    empregosTipo.addEventListener('change', function() {
        loadEmpregos(this.value);
    });
    
    // Guia Comercial
    const guiaCategoria = document.getElementById('guiaCategoria');
    guiaCategoria.addEventListener('change', function() {
        loadGuia(this.value);
    });
}

// Navegação
function loadSection(sectionName) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Atualizar link ativo
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Carregar dados da seção
        loadSectionData(sectionName);
    }
}

function loadSectionData(sectionName) {
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
    }
}

// Carregar Dados
async function loadInicio() {
    try {
        // Carregar anúncios premium
        const premiumAds = await firebaseUtils.getAnuncios('', 'premium');
        displayPremiumAds(premiumAds);
        
        // Carregar últimas notícias
        const latestNews = await firebaseUtils.getNoticias(3);
        displayLatestNews(latestNews);
    } catch (error) {
        console.error('Erro ao carregar dados da página inicial:', error);
    }
}

async function loadAluguel(tipo = '', preco = '') {
    try {
        const aluguelList = document.getElementById('aluguelList');
        aluguelList.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
        
        const items = await firebaseUtils.getAluguel(tipo, preco);
        displayAluguel(items);
    } catch (error) {
        console.error('Erro ao carregar aluguéis:', error);
    }
}

async function loadClassificados(categoria = '') {
    try {
        const classificadosList = document.getElementById('classificadosList');
        classificadosList.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
        
        const items = await firebaseUtils.getAnuncios(categoria);
        displayClassificados(items);
    } catch (error) {
        console.error('Erro ao carregar classificados:', error);
    }
}

async function loadEmpregos(tipo = '') {
    try {
        const empregosList = document.getElementById('empregosList');
        empregosList.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
        
        const items = await firebaseUtils.getVagas(tipo);
        displayEmpregos(items);
    } catch (error) {
        console.error('Erro ao carregar empregos:', error);
    }
}

async function loadGuia(categoria = '') {
    try {
        const guiaList = document.getElementById('guiaList');
        guiaList.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
        
        const items = await firebaseUtils.getEstabelecimentos(categoria);
        displayGuia(items);
    } catch (error) {
        console.error('Erro ao carregar guia comercial:', error);
    }
}

async function loadNoticias() {
    try {
        const noticiasList = document.getElementById('noticiasList');
        noticiasList.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
        
        const items = await firebaseUtils.getNoticias();
        displayNoticias(items);
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

// Funções de Display
function displayPremiumAds(items) {
    const container = document.getElementById('premiumAds');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum anúncio premium no momento.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createAdCard(item);
        container.appendChild(card);
    });
}

function displayAluguel(items) {
    const container = document.getElementById('aluguelList');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum imóvel encontrado.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createAluguelCard(item);
        container.appendChild(card);
    });
}

function displayClassificados(items) {
    const container = document.getElementById('classificadosList');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum classificado encontrado.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createClassificadoCard(item);
        container.appendChild(card);
    });
}

function displayEmpregos(items) {
    const container = document.getElementById('empregosList');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma vaga encontrada.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createEmpregoCard(item);
        container.appendChild(card);
    });
}

function displayGuia(items) {
    const container = document.getElementById('guiaList');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum estabelecimento encontrado.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createGuiaCard(item);
        container.appendChild(card);
    });
}

function displayNoticias(items) {
    const container = document.getElementById('noticiasList');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma notícia encontrada.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createNoticiaCard(item);
        container.appendChild(card);
    });
}

function displayLatestNews(items) {
    const container = document.getElementById('latestNews');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhuma notícia no momento.</p>';
        return;
    }
    
    items.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${item.titulo}</h4>
            <div class="date">${firebaseUtils.formatDate(item.data)}</div>
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''}
            <p>${item.resumo || item.conteudo.substring(0, 150) + '...'}</p>
            <button class="btn" onclick="shareItem('noticia', '${item.id}', '${item.titulo}')">
                Compartilhar
            </button>
        `;
        container.appendChild(newsItem);
    });
}

// Criar Cards
function createAdCard(item) {
    const card = document.createElement('div');
    card.className = `card ${item.destaque}`;
    
    card.innerHTML = `
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-description">${item.descricao}</p>
        <div class="card-price">${firebaseUtils.formatPrice(item.preco)}</div>
        <div class="card-contact">
            <a href="https://wa.me/${item.whatsapp}" class="btn btn-success" target="_blank">
                WhatsApp
            </a>
            <button class="btn" onclick="shareItem('anuncio', '${item.id}', '${item.titulo}')">
                Compartilhar
            </button>
        </div>
        ${item.destaque === 'premium' ? '<div class="premium-badge">⭐ PREMIUM</div>' : ''}
    `;
    
    return card;
}

function createAluguelCard(item) {
    const card = document.createElement('div');
    card.className = `card ${item.destaque}`;
    
    card.innerHTML = `
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-description">${item.descricao}</p>
        <p><strong>Tipo:</strong> ${item.tipo}</p>
        <p><strong>Endereço:</strong> ${item.endereco}</p>
        <div class="card-price">${firebaseUtils.formatPrice(item.preco)}/mês</div>
        <div class="card-contact">
            <a href="https://wa.me/${item.whatsapp}" class="btn btn-success" target="_blank">
                WhatsApp
            </a>
            <button class="btn" onclick="shareItem('aluguel', '${item.id}', '${item.titulo}')">
                Compartilhar
            </button>
        </div>
        ${item.destaque === 'premium' ? '<div class="premium-badge">⭐ PREMIUM</div>' : ''}
    `;
    
    return card;
}

function createClassificadoCard(item) {
    const card = document.createElement('div');
    card.className = `card ${item.destaque}`;
    
    card.innerHTML = `
        <h3 class="card-title">${item.titulo}</h3>
        <p class="card-description">${item.descricao}</p>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        ${item.preco > 0 ? `<div class="card-price">${firebaseUtils.formatPrice(item.preco)}</div>` : '<div class="card-price">Grátis</div>'}
        <div class="card-contact">
            <a href="https://wa.me/${item.whatsapp}" class="btn btn-success" target="_blank">
                WhatsApp
            </a>
            <button class="btn" onclick="shareItem('classificado', '${item.id}', '${item.titulo}')">
                Compartilhar
            </button>
        </div>
        ${item.destaque === 'premium' ? '<div class="premium-badge">⭐ PREMIUM</div>' : ''}
    `;
    
    return card;
}

function createEmpregoCard(item) {
    const card = document.createElement('div');
    card.className = `card ${item.destaque}`;
    
    card.innerHTML = `
        <h3 class="card-title">${item.cargo}</h3>
        <p class="card-description">${item.descricao}</p>
        <p><strong>Empresa:</strong> ${item.empresa}</p>
        <p><strong>Tipo:</strong> ${item.tipo}</p>
        <p><strong>Salário:</strong> ${firebaseUtils.formatPrice(item.salario)}</p>
        <div class="card-contact">
            <a href="https://wa.me/${item.whatsapp}" class="btn btn-success" target="_blank">
                Candidatar
            </a>
            <button class="btn" onclick="shareItem('emprego', '${item.id}', '${item.cargo}')">
                Compartilhar
            </button>
        </div>
        ${item.destaque === 'premium' ? '<div class="premium-badge">⭐ PREMIUM</div>' : ''}
    `;
    
    return card;
}

function createGuiaCard(item) {
    const card = document.createElement('div');
    card.className = `card ${item.destaque}`;
    
    card.innerHTML = `
        <h3 class="card-title">${item.nome}</h3>
        <p class="card-description">${item.descricao}</p>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        <p><strong>Endereço:</strong> ${item.endereco}</p>
        <p><strong>Telefone:</strong> ${item.telefone}</p>
        <div class="card-contact">
            <a href="https://wa.me/${item.whatsapp}" class="btn btn-success" target="_blank">
                WhatsApp
            </a>
            <button class="btn" onclick="shareItem('estabelecimento', '${item.id}', '${item.nome}')">
                Compartilhar
            </button>
        </div>
        ${item.destaque === 'premium' ? '<div class="premium-badge">⭐ PREMIUM</div>' : ''}
    `;
    
    return card;
}

function createNoticiaCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 15px;">` : ''}
        <h3 class="card-title">${item.titulo}</h3>
        <div class="date">${firebaseUtils.formatDate(item.data)}</div>
        <p class="card-description">${item.conteudo}</p>
        <button class="btn" onclick="shareItem('noticia', '${item.id}', '${item.titulo}')">
            Compartilhar
        </button>
    `;
    
    return card;
}

// Compartilhamento
function shareItem(type, id, title) {
    const url = `${window.location.origin}${window.location.pathname}#${type}-${id}`;
    const modal = document.getElementById('shareModal');
    
    window.shareData = {
        url: url,
        title: title,
        type: type
    };
    
    modal.style.display = 'block';
}

function shareWhatsApp() {
    if (window.shareData) {
        const text = `Confira este(a) ${window.shareData.type}: ${window.shareData.title}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.shareData.url)}`);
    }
}

function shareFacebook() {
    if (window.shareData) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.shareData.url)}`);
    }
}

function copyLink() {
    if (window.shareData) {
        navigator.clipboard.writeText(window.shareData.url).then(function() {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Autenticação
function checkAuthState() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            currentUser = user;
            // Verificar se é admin
            db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                if (doc.exists && doc.data().role === 'admin') {
                    // Usuário é admin
                    console.log('Admin logado:', user.email);
                }
            });
        } else {
            currentUser = null;
        }
    });
}

// Atualizações em Tempo Real
function setupRealtimeUpdates() {
    // Anúncios Premium
    collections.anuncios.where('destaque', '==', 'premium')
        .onSnapshot(function(snapshot) {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            displayPremiumAds(items);
        });
    
    // Notícias
    collections.noticias.orderBy('data', 'desc').limit(3)
        .onSnapshot(function(snapshot) {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            displayLatestNews(items);
        });
}

// Iniciar atualizações em tempo real após carregar a página
setTimeout(setupRealtimeUpdates, 2000);