// Carrega anúncios do Firebase
async function carregarAnuncios() {
    try {
        const snapshot = await db.collection('classificados')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(10)
            .get();

        let html = '';
        snapshot.forEach(doc => {
            const a = doc.data();
            html += `
                <div class="anuncio-card">
                    <h3>${a.titulo}</h3>
                    <p class="categoria">${a.categoria}</p>
                    <p>${a.descricao}</p>
                    <p><strong>${a.preco}</strong></p>
                    <p>📞 ${a.telefone}</p>
                    <small>${a.dataExibicao}</small>
                </div>`;
        });

        document.getElementById('anunciosGrid').innerHTML = html || '<p>Nenhum anúncio.</p>';
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('anunciosGrid').innerHTML = '<p>Erro ao carregar.</p>';
    }
}

// Carrega notícias para home
async function carregarNoticiasHome() {
    try {
        const snapshot = await db.collection('noticias')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(6)
            .get();

        let html = '';
        snapshot.forEach(doc => {
            const n = doc.data();
            html += `
                <div class="noticia-card-home">
                    ${n.imagem ? `<img src="${n.imagem}">` : ''}
                    <div class="noticia-conteudo-home">
                        <h3>${n.titulo}</h3>
                        <p>${n.resumo}</p>
                        <small>${n.dataExibicao}</small>
                    </div>
                </div>`;
        });

        document.getElementById('noticiasGridHome').innerHTML = html || '<p>Nenhuma notícia.</p>';
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Inicia ao carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticiasHome();
    document.querySelector('a[href="#classificados"]')?.addEventListener('click', carregarAnuncios);
});