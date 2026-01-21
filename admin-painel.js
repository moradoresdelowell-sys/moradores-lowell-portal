// Verifica se está logado
if (!localStorage.getItem('adminLogado')) {
    window.location.href = 'admin-login.html';
}

// PAINEL ADMIN - SEM PISCADAS! 
console.log("=== PAINEL ADMIN CARREGADO ===");

// Mostra info do usuário
document.getElementById('adminEmail').textContent = 'Administrador';

// Carrega estatísticas
async function carregarEstatisticas() {
    console.log("Carregando estatísticas...");
    
    try {
        // Anúncios
        const anunciosSnapshot = await db.collection('classificados').where('ativo', '==', true).get();
        document.getElementById('totalAnuncios').textContent = anunciosSnapshot.size;
        
        // Vagas
        const vagasSnapshot = await db.collection('vagas').where('ativo', '==', true).get();
        document.getElementById('totalVagas').textContent = vagasSnapshot.size;
        
        // Aluguel
        const aluguelSnapshot = await db.collection('aluguel').where('ativo', '==', true).get();
        document.getElementById('totalImoveis').textContent = aluguelSnapshot.size;
        
        // Estabelecimentos
        const estabSnapshot = await db.collection('estabelecimentos').where('ativo', '==', true).get();
        document.getElementById('totalEstabelecimentos').textContent = estabSnapshot.size;
        
    } catch (error) {
        console.error("Erro estatísticas:", error);
        // Mostra 0 se der erro
        document.getElementById('totalAnuncios').textContent = '0';
        document.getElementById('totalVagas').textContent = '0';
        document.getElementById('totalImoveis').textContent = '0';
        document.getElementById('totalEstabelecimentos').textContent = '0';
    }
}

// Sair do admin
function sairAdmin() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('adminLogado');
        window.location.href = 'admin-login.html';
    }
}

// Carrega quando abre a página
carregarEstatisticas();