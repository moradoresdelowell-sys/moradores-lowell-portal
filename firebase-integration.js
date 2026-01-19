// Função para carregar anúncios do Firebase
async function carregarAnuncios() {
  try {
    const anunciosRef = db.collection('anuncios');
    const snapshot = await anunciosRef.where('ativo', '==', true).get();
    
    const anuncios = [];
    snapshot.forEach(doc => {
      anuncios.push({ id: doc.id, ...doc.data() });
    });
    
    return anuncios;
  } catch (error) {
    console.error("Erro ao carregar anúncios:", error);
    return [];
  }
}

// Função para carregar vagas do Firebase
async function carregarVagas() {
  try {
    const vagasRef = db.collection('vagas');
    const snapshot = await vagasRef.where('ativo', '==', true).get();
    
    const vagas = [];
    snapshot.forEach(doc => {
      vagas.push({ id: doc.id, ...doc.data() });
    });
    
    return vagas;
  } catch (error) {
    console.error("Erro ao carregar vagas:", error);
    return [];
  }
}

// Função para carregar estabelecimentos
async function carregarEstabelecimentos() {
  try {
    const estabRef = db.collection('estabelecimentos');
    const snapshot = await estabRef.where('ativo', '==', true).get();
    
    const estabelecimentos = [];
    snapshot.forEach(doc => {
      estabelecimentos.push({ id: doc.id, ...doc.data() });
    });
    
    return estabelecimentos;
  } catch (error) {
    console.error("Erro ao carregar estabelecimentos:", error);
    return [];
  }
}

// Função para carregar noticias
async function carregarNoticias() {
  try {
    const noticiasRef = db.collection('noticias');
    const snapshot = await noticiasRef.where('ativo', '==', true).get();
    
    const noticias = [];
    snapshot.forEach(doc => {
      noticias.push({ id: doc.id, ...doc.data() });
    });
    
    return noticias;
  } catch (error) {
    console.error("Erro ao carregar noticias:", error);
    return [];
  }
}

// Função para formatar data do Firebase
function formatarDataFirebase(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('pt-BR');
}