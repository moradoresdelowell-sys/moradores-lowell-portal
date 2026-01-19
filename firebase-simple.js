// Carregamento simples do Firebase
document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando carregamento...");
    
    // Aguarda Firebase carregar
    setTimeout(() => {
        if (typeof firebase !== 'undefined') {
            carregarDados();
        } else {
            console.error("Firebase não carregado");
            carregarConteudoSimulado();
        }
    }, 1000);
});

async function carregarDados() {
    try {
        // Carrega anúncios
        const anunciosSnapshot = await firebase.firestore().collection('anuncios').where('ativo', '==', true).get();
        const anuncios = [];
        anunciosSnapshot.forEach(doc => anuncios.push(doc.data()));
        
        // Carrega vagas
        const vagasSnapshot = await firebase.firestore().collection('vagas').where('ativo', '==', true).get();
        const vagas = [];
        vagasSnapshot.forEach(doc => vagas.push(doc.data()));
        
        // Renderiza
        renderizarAnuncios(anuncios);
        renderizarVagas(vagas);
        
    } catch (error) {
        console.error("Erro:", error);
        carregarConteudoSimulado();
    }
}

function renderizarAnuncios(anuncios) {
    const container = document.getElementById('anunciosGrid');
    if (!container) return;
    
    container.innerHTML = anuncios.map(anuncio => `
        <div class="anuncio-card">
            <h3>${anuncio.titulo}</h3>
            <p>${anuncio.descricao}</p>
            <p><strong>${anuncio.preco || ''}</strong></p>
            <p>📞 ${anuncio.telefone}</p>
        </div>
    `).join('');
}

function renderizarVagas(vagas) {
    const container = document.getElementById('vagasList');
    if (!container) return;
    
    container.innerHTML = vagas.map(vaga => `
        <div class="vaga-card">
            <h3>${vaga.titulo}</h3>
            <p><strong>${vaga.empresa}</strong></p>
            <p>${vaga.descricao}</p>
            <p><strong>${vaga.salario}</strong></p>
            <p>📍 ${vaga.local}</p>
        </div>
    `).join('');
}

function carregarConteudoSimulado() {
    console.log("Carregando conteúdo simulado...");
    // Conteúdo básico caso dê erro
    document.getElementById('anunciosGrid').innerHTML = '<p>Carregando anúncios...</p>';
    document.getElementById('vagasList').innerHTML = '<p>Carregando vagas...</p>';
}