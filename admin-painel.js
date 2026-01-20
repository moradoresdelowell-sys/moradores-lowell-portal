<script>
// Verifica se está logado
if (!localStorage.getItem('adminLogado')) {
    window.location.href = 'login-admin.html';
}
</script>

// PAINEL ADMIN - SEM PISCADAS! 
console.log("=== PAINEL ADMIN CARREGADO ===");

// Verifica login ASSIM que carrega
verificarLogin();

function verificarLogin() {
    console.log("Verificando login...");
    
    const adminUser = localStorage.getItem('adminUser');
    
    if (!adminUser) {
        console.log("❌ Não está logado! Indo pro login...");
        // Garante que vai pro login SEM redirecionamento em loop
        setTimeout(() => {
            window.location.replace('admin-login.html');
        }, 100);
        return;
    }
    
    console.log("✅ Está logado! Prosseguindo...");
    const userData = JSON.parse(adminUser);
    console.log("Usuário:", userData.email);
    
    // Mostra info do usuário
    document.getElementById('adminEmail').textContent = userData.email;
    
    // Carrega os dados
    carregarEstatisticas();
}

// Sair do admin
function sairAdmin() {
    console.log("Saindo do admin...");
    
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('adminUser');
        
        // Garante logout limpo
        if (firebase.auth().currentUser) {
            firebase.auth().signOut().then(() => {
                console.log("Logout Firebase OK");
                window.location.replace('admin-login.html');
            }).catch(error => {
                console.error("Erro logout:", error);
                window.location.replace('admin-login.html');
            });
        } else {
            window.location.replace('admin-login.html');
        }
    }
}

// Carrega estatísticas
async function carregarEstatisticas() {
    console.log("Carregando estatísticas...");
    
    try {
        // Anúncios
        const anunciosSnapshot = await db.collection('anuncios').where('ativo', '==', true).get();
        document.getElementById('totalAnuncios').textContent = anunciosSnapshot.size;
        console.log("Anúncios:", anunciosSnapshot.size);
        
        // Vagas
        const vagasSnapshot = await db.collection('vagas').where('ativo', '==', true).get();
        document.getElementById('totalVagas').textContent = vagasSnapshot.size;
        console.log("Vagas:", vagasSnapshot.size);
        
        // Mostra 0 pras outras (vamos criar depois)
        document.getElementById('totalImoveis').textContent = '0';
        document.getElementById('totalEstabelecimentos').textContent = '0';
        
        console.log("✅ Estatísticas carregadas!");
        
    } catch (error) {
        console.error("Erro estatísticas:", error);
        // Mostra 0 se der erro
        document.getElementById('totalAnuncios').textContent = '0';
        document.getElementById('totalVagas').textContent = '0';
        document.getElementById('totalImoveis').textContent = '0';
        document.getElementById('totalEstabelecimentos').textContent = '0';
    }
}

// Prevencão de loop - Garante que não volta pro painel
setTimeout(() => {
    console.log("Prevenção de loop ativada");
    if (window.location.href.includes('admin-painel.html') && !localStorage.getItem('adminUser')) {
        console.log("Redirecionando pro login...");
        window.location.replace('admin-login.html');
    }
}, 500);