// PAINEL ADMIN - CONTROLE TOTAL
document.addEventListener('DOMContentLoaded', function() {
    verificarLogin();
    carregarEstatisticas();
    mostrarInfoUsuario();
});

// Verifica se está logado como admin
function verificarLogin() {
    const adminUser = localStorage.getItem('adminUser');
    
    if (!adminUser) {
        // Não está logado, manda pro login
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Mostra info do usuário
    const userData = JSON.parse(adminUser);
    document.getElementById('adminEmail').textContent = userData.email;
}

// Mostra informações do usuário logado
function mostrarInfoUsuario() {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
        const userData = JSON.parse(adminUser);
        console.log('Admin logado:', userData.nome, '-', userData.email);
    }
}

// Função pra sair
function sairAdmin() {
    if (confirm('Deseja realmente sair do painel administrativo?')) {
        localStorage.removeItem('adminUser');
        firebase.auth().signOut();
        window.location.href = 'admin-login.html';
    }
}

// Carrega estatísticas rápidas
async function carregarEstatisticas() {
    try {
        // Anúncios
        const anunciosSnapshot = await db.collection('anuncios').where('ativo', '==', true).get();
        document.getElementById('totalAnuncios').textContent = anunciosSnapshot.size;
        
        // Vagas
        const vagasSnapshot = await db.collection('vagas').where('ativo', '==', true).get();
        document.getElementById('totalVagas').textContent = vagasSnapshot.size;
        
        // Imóveis (você vai criar essa coleção)
        const imoveisSnapshot = await db.collection('aluguel').where('ativo', '==', true).get();
        document.getElementById('totalImoveis').textContent = imoveisSnapshot.size;
        
        // Estabelecimentos
        const estabSnapshot = await db.collection('estabelecimentos').where('ativo', '==', true).get();
        document.getElementById('totalEstabelecimentos').textContent = estabSnapshot.size;
        
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        // Mostra 0 se der erro
        document.getElementById('totalAnuncios').textContent = '0';
        document.getElementById('totalVagas').textContent = '0';
        document.getElementById('totalImoveis').textContent = '0';
        document.getElementById('totalEstabelecimentos').textContent = '0';
    }
}