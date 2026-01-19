// Carregador de dados do Firebase
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
        
        console.log("Dados carregados:", { anuncios, vagas, estabelecimentos, noticias });
        
        // Renderizar os dados
        renderizarAnuncios(anuncios);
        renderizarVagas(vagas);
        renderizarEstabelecimentos(estabelecimentos);
        renderizarNoticias(noticias);
        
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        // Se der erro, carrega dados simulados como backup
        carregarDadosSimulados();
    }
}

// Funções para renderizar (vou te mandar separado)
function renderizarAnuncios(anuncios) {
    const container = document.getElementById('anunciosGrid');
    if (!container) return;
    
    container.innerHTML = anuncios.map(anuncio => `
        <div class="anuncio-card">
            <div class="anuncio-header">
                