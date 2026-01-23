// Configuração Firebase - Moradores de Lowell
const firebaseConfig = {
    apiKey: "AIzaSyACxtgupeUfltzuZPK7MnVl7hMfz21q4K4",
    authDomain: "moradoresdelowell-543d3.firebaseapp.com",
    projectId: "moradoresdelowell-543d3",
    storageBucket: "moradoresdelowell-543d3.firebasestorage.app",
    messagingSenderId: "248930823442",
    appId: "1:248930823442:web:610ab36aa30f7c567517cb"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Configuração do Firestore
db.settings({ timestampsInSnapshots: true });

// Estrutura das Coleções
const collections = {
    anuncios: db.collection('anuncios'),
    vagas: db.collection('vagas'),
    estabelecimentos: db.collection('estabelecimentos'),
    noticias: db.collection('noticias'),
    usuarios: db.collection('usuarios'),
    aluguel: db.collection('aluguel')
};

// Funções Auxiliares
function getDestaquePriority(destaque) {
    switch(destaque) {
        case 'premium': return 3;
        case 'destaque': return 2;
        default: return 1;
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Funções de Dados
async function getAnuncios(categoria = '', destaque = '') {
    let query = collections.anuncios.orderBy('destaquePriority', 'desc').orderBy('createdAt', 'desc');
    
    if (categoria) {
        query = query.where('categoria', '==', categoria);
    }
    
    if (destaque) {
        query = query.where('destaque', '==', destaque);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function getVagas(tipo = '') {
    let query = collections.vagas.orderBy('destaquePriority', 'desc').orderBy('createdAt', 'desc');
    
    if (tipo) {
        query = query.where('tipo', '==', tipo);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function getEstabelecimentos(categoria = '') {
    let query = collections.estabelecimentos.orderBy('destaquePriority', 'desc').orderBy('nome');
    
    if (categoria) {
        query = query.where('categoria', '==', categoria);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function getNoticias(limit = null) {
    let query = collections.noticias.orderBy('data', 'desc');
    
    if (limit) {
        query = query.limit(limit);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function getAluguel(tipo = '', preco = '') {
    let query = collections.aluguel.orderBy('destaquePriority', 'desc').orderBy('createdAt', 'desc');
    
    if (tipo) {
        query = query.where('tipo', '==', tipo);
    }
    
    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    
    // Filtrar por preço no cliente
    if (preco) {
        const [min, max] = preco.split('-').map(p => parseFloat(p));
        results = results.filter(item => {
            if (max) {
                return item.preco >= min && item.preco <= max;
            } else {
                return item.preco >= min;
            }
        });
    }
    
    return results;
}

// Funções de Admin
async function createAnuncio(data) {
    const destaquePriority = getDestaquePriority(data.destaque || 'gratis');
    return await collections.anuncios.add({
        ...data,
        destaquePriority,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function createVaga(data) {
    const destaquePriority = getDestaquePriority(data.destaque || 'gratis');
    return await collections.vagas.add({
        ...data,
        destaquePriority,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function createEstabelecimento(data) {
    const destaquePriority = getDestaquePriority(data.destaque || 'gratis');
    return await collections.estabelecimentos.add({
        ...data,
        destaquePriority,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function createNoticia(data) {
    return await collections.noticias.add({
        ...data,
        data: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function createAluguel(data) {
    const destaquePriority = getDestaquePriority(data.destaque || 'gratis');
    return await collections.aluguel.add({
        ...data,
        destaquePriority,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Autenticação
async function loginAdmin(email, senha) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        // Verificar se é admin
        const userDoc = await collections.usuarios.doc(user.uid).get();
        if (userDoc.exists && userDoc.data().role === 'admin') {
            return { success: true, user: userDoc.data() };
        } else {
            await auth.signOut();
            throw new Error('Usuário não tem permissão de administrador');
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Exportar funções
window.firebaseUtils = {
    getAnuncios,
    getVagas,
    getEstabelecimentos,
    getNoticias,
    getAluguel,
    createAnuncio,
    createVaga,
    createEstabelecimento,
    createNoticia,
    createAluguel,
    loginAdmin,
    formatPrice,
    formatDate
};