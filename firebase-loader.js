// Carregador de dados do Firebase - VERSÃO COMPLETA
async function carregarDadosFirebase() {
    try {
        console.log("Iniciando carregamento do Firebase...");
        
        // Carregar anúncios
        const anunciosRef = firebase.firestore().collection('anuncios');
        const anunciosSnapshot = await anunciosRef.where('ativo', '==', true).get();
        
        const anuncios = [];
        anunciosSnapshot.forEach(doc => {
            anuncios.push({ id: doc.id, ...doc.data() });
        });
        
        // Carregar vagas
        const vagasRef = firebase.firestore().collection('vagas');
        const vagasSnapshot = await vagasRef.where('ativo', '==', true).get();
        
        const vagas = [];
        vagasSnapshot.forEach(doc => {
            vagas.push({ id: doc.id, ...doc.data() });
        });
        
        // Carregar estabelecimentos
        const estabRef = firebase.firestore().collection('estabelecimentos');
        const estabSnapshot = await estabRef.where('ativo', '==', true).get();
        
        const estabelecimentos = [];
        estabSnapshot.forEach(doc => {
            estabelecimentos.push({ id: doc.id, ...doc.data() });
        });
        
        // Carregar noticias
        const noticiasRef = firebase.firestore().collection('noticias');
        const noticiasSnapshot = await noticiasRef.where('ativo', '==', true).get();
        
        const noticias = [];
        noticiasSnapshot.forEach(doc => {
            noticias.push({ id: doc.id, ...doc.data() });
        });
        
        console.log("Dados carregados:", { anuncios: anuncios.length, vagas: vagas.length, estabelecimentos: estabelecimentos.length, noticias: noticias.length });
        
        // Renderizar os dados
        renderizarAnuncios(anuncios);
        renderizarVagas(vagas);
        renderizarEstabelecimentos(estabelecimentos);
        renderizarNoticias(noticias);
        
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        // Backup: carrega dados simulados se der erro
        carregarDadosSimuladosBackup();
    }
}

// Função para renderizar anúncios
function renderizarAnuncios(anuncios) {
    const container = document.getElementById('anunciosGrid');
    if (!container) return;
    
    if (anuncios.length === 0) {
        container.innerHTML = '<p>Nenhum anúncio encontrado.</p>';
        return;
    }
    
    container.innerHTML = anuncios.map(anuncio => `
        <div class="anuncio-card" data-categoria="${anuncio.categoria}">
            <div class="anuncio-header">
                <span class="categoria-tag">${anuncio.categoria}</span>
                <small>${formatarData(anuncio.data)}</small>
            </div>
            ${anuncio.imagem ? `<img src="${anuncio.imagem}" alt="${anuncio.titulo}" class="anuncio-imagem">` : ''}
            <h3 class="anuncio-title">${anuncio.titulo}</h3>
            <p class="anuncio-descricao">${anuncio.descricao}</p>
            ${anuncio.preco ? `<p class="anuncio-price">${anuncio.preco}</p>` : ''}
            <div class="anuncio-contato">
                <i class="fas fa-phone"></i> ${anuncio.telefone}
            </div>
            <div class="anuncio-actions">
                <button class="btn-primary" onclick="compartilharAnuncio('${anuncio.id}')">
                    <i class="fas fa-share"></i> Compartilhar
                </button>
                <button class="btn-whats" onclick="abrirWhatsApp('${anuncio.telefone}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
            </div>
        </div>
    `).join('');
}

// Função para renderizar vagas
function renderizarVagas(vagas) {
    const container = document.getElementById('vagasList');
    if (!container) return;
    
    if (vagas.length === 0) {
        container.innerHTML = '<p>Nenhuma vaga encontrada.</p>';
        return;
    }
    
    container.innerHTML = vagas.map(vaga => `
        <div class="vaga-card">
            <div class="vaga-info">
                <h3>${vaga.titulo}</h3>
                <p><strong>${vaga.empresa}</strong></p>
                <p>${vaga.descricao}</p>
                <div class="vaga-details">
                    <span class="vaga-detail"><i class="fas fa-map-marker-alt"></i> ${vaga.local}</span>
                    <span class="vaga-detail"><i class="fas fa-clock"></i> ${vaga.tipo}</span>
                    ${vaga.experiencia === 'sem-experiencia' ? '<span class="vaga-detail"><i class="fas fa-star"></i> Sem Experiência</span>' : ''}
                    ${vaga.ingles === 'nao-necessario' ? '<span class="vaga-detail"><i class="fas fa-check"></i> Sem Inglês</span>' : ''}
                </div>
                <p class="vaga-salary">${vaga.salario}</p>
            </div>
            <div class="vaga-actions">
                <button class="btn-primary" onclick="candidatarVaga('${vaga.id}')">
                    <i class="fas fa-paper-plane"></i> Candidatar
                </button>
                <button class="btn-whats" onclick="compartilharVaga('${vaga.id}')">
                    <i class="fab fa-whatsapp"></i> Compartilhar
                </button>
            </div>
        </div>
    `).join('');
}

// Função para renderizar estabelecimentos
function renderizarEstabelecimentos(estabelecimentos) {
    const container = document.getElementById('estabelecimentosList');
    if (!container) return;
    
    if (estabelecimentos.length === 0) {
        container.innerHTML = '<p>Nenhum estabelecimento encontrado.</p>';
        return;
    }
    
    container.innerHTML = estabelecimentos.map(est => `
        <div class="estabelecimento-card" onclick="verEstabelecimento('${est.id}')">
            <h4>${est.nome}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${est.endereco}</p>
            <p><i class="fas fa-phone"></i> ${est.telefone}</p>
            <p><i class="fas fa-clock"></i> ${est.horario}</p>
            <div class="estrela-avaliacao">
                ${renderizarEstrelas(est.avaliacao)}
            </div>
            ${est.whatsapp ? '<i class="fab fa-whatsapp text-success"></i> WhatsApp' : ''}
        </div>
    `).join('');
}

// Função para renderizar noticias
function renderizarNoticias(noticias) {
    const container = document.getElementById('noticiasGrid');
    if (!container) return;
    
    if (noticias.length === 0) {
        container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
    }
    
    container.innerHTML = noticias.map(noticia => `
        <div class="noticia-card ${noticia.urgencia === 'alta' ? 'urgente' : ''}" data-categoria="${noticia.categoria}">
            <div class="noticia-header">
                <span class="categoria-tag">${getCategoriaNoticia(noticia.categoria)}</span>
                <small>${formatarData(noticia.data)}</small>
            </div>
            <h3 class="noticia-title">${noticia.titulo}</h3>
            <p class="noticia-conteudo">${noticia.conteudo}</p>
            <div class="noticia-footer">
                <small>Por: ${noticia.autor}</small>
                <button class="btn-primary" onclick="compartilharNoticia('${noticia.id}')">
                    <i class="fas fa-share"></i> Compartilhar
                </button>
            </div>
        </div>
    `).join('');
}

// Função backup caso dê erro
function carregarDadosSimuladosBackup() {
    console.log("Carregando dados simulados como backup...");
    
    // Dados simulados de backup
    const anunciosSimulados = [
        {
            titulo: "Aluguel de quarto em Lowell",
            descricao: "Quarto mobiliado em área tranquila, próximo ao transporte público",
            preco: "$650/mês",
            categoria: "aluguel",
            telefone: "(978) 555-0123",
            data: new Date(),
            ativo: true
        }
    ];
    
    renderizarAnuncios(anunciosSimulados);
    console.log("Dados simulados carregados como backup");
}

// Funções auxiliares
function renderizarEstrelas(avaliacao) {
    const estrelasCheias = Math.floor(avaliacao);
    const temMeiaEstrela = avaliacao % 1 !== 0;
    let html = '';
    
    for (let i = 0; i < estrelasCheias; i++) {
        html += '<i class="fas fa-star" style="color: #ffc107;"></i>';
    }
    if (temMeiaEstrela) {
        html += '<i class="fas fa-star-half-alt" style="color: #ffc107;"></i>';
    }
    for (let i = estrelasCheias + (temMeiaEstrela ? 1 : 0); i < 5; i++) {
        html += '<i class="far fa-star" style="color: #ddd;"></i>';
    }
    return html;
}

function getCategoriaNoticia(categoria) {
    const categorias = {
        urgentes: 'Urgente',
        eventos: 'Eventos',
        imigracao: 'Imigração',
        oportunidades: 'Oportunidades'
    };
    return categorias[categoria] || categoria;
}

function formatarData(timestamp) {
    if (!timestamp) return 'Recente';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando carregamento de dados...");
    carregarDadosFirebase();
});