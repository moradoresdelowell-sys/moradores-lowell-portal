// Debug completo
console.log('=== DEBUG ANÚNCIOS ===');
console.log('Firebase carregado?', typeof firebase !== 'undefined');
console.log('Firestore carregado?', typeof db !== 'undefined');

// Teste simples primeiro
async function testarFirebase() {
    try {
        const teste = await db.collection('anuncios').limit(1).get();
        console.log('✅ Firebase conectado, documentos encontrados:', teste.size);
    } catch (error) {
        console.error('❌ Erro Firebase:', error);
    }
}

// Chama o teste
testarFirebase();

// Verifica se está logado como admin
if (!localStorage.getItem('adminLogado')) {
    window.location.href = 'login-admin.html';
}

// Faz login no Firebase com o usuário admin
async function loginFirebaseAdmin() {
    try {
        // Login com o usuário admin que você criou
        await firebase.auth().signInWithEmailAndPassword('admin@moradoresdelowell.com', 'Admin2024!');
        console.log('✅ Admin logado no Firebase');
    } catch (error) {
        console.error('❌ Erro login Firebase:', error);
        alert('Erro ao conectar com o banco de dados');
    }
}

// Faz login ao carregar a página
loginFirebaseAdmin();

// Configura o formulário
document.getElementById('formAnuncio').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const mensagemDiv = document.getElementById('mensagem');
    const btnSubmit = document.querySelector('.btn-cadastrar');
    
    try {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Cadastrando...';
        
        const anuncio = {
            titulo: document.getElementById('titulo').value,
            categoria: document.getElementById('categoria').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value || 'Grátis',
            contato: document.getElementById('contato').value,
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            ativo: true
        };
        
        console.log('📤 Enviando anúncio:', anuncio);
        
        // Salva no Firebase
        await db.collection('anuncios').add(anuncio);
        
        console.log('✅ Anúncio cadastrado!');
        
        mensagemDiv.className = 'mensagem sucesso';
        mensagemDiv.textContent = 'Anúncio cadastrado com sucesso!';
        mensagemDiv.style.display = 'block';
        
        document.getElementById('formAnuncio').reset();
        
        setTimeout(() => {
            mensagemDiv.style.display = 'none';
        }, 3000);
        
    } catch (error) {
        console.error('❌ Erro completo:', error);
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.textContent = 'Erro: ' + error.message;
        mensagemDiv.style.display = 'block';
        
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Cadastrar Anúncio';
    }
});