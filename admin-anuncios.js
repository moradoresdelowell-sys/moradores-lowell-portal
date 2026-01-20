// Verifica se está logado
if (!localStorage.getItem('adminLogado')) {
    window.location.href = 'login-admin.html';
}

// Configura o formulário
document.getElementById('formAnuncio').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const mensagemDiv = document.getElementById('mensagem');
    
    try {
        // Pega os dados do formulário
        const anuncio = {
            titulo: document.getElementById('titulo').value,
            categoria: document.getElementById('categoria').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value || 'Grátis',
            contato: document.getElementById('contato').value,
            dataCadastro: new Date().toISOString(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            destaque: false
        };
        
        console.log('Cadastrando anúncio:', anuncio);
        
        // Salva no Firebase
        const docRef = await db.collection('anuncios').add(anuncio);
        
        console.log('Anúncio cadastrado com ID:', docRef.id);
        
        // Mostra mensagem de sucesso
        mensagemDiv.className = 'mensagem sucesso';
        mensagemDiv.textContent = 'Anúncio cadastrado com sucesso!';
        mensagemDiv.style.display = 'block';
        
        // Limpa o formulário
        document.getElementById('formAnuncio').reset();
        
        // Esconde mensagem após 3 segundos
        setTimeout(() => {
            mensagemDiv.style.display = 'none';
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.textContent = 'Erro ao cadastrar anúncio: ' + error.message;
        mensagemDiv.style.display = 'block';
    }
});