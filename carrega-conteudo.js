// Debug primeiro
console.log('Firebase carregado?', typeof firebase !== 'undefined');
console.log('Firestore carregado?', typeof db !== 'undefined');

// Carrega anúncios do Firebase
async function carregarAnuncios() {
    try {
        console.log('Iniciando carregamento de anúncios...');
        
        const anunciosSnapshot = await db.collection('anuncios')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(10)
            .get();
        
        console.log('Anúncios encontrados:', anunciosSnapshot.size);
        
        let anunciosHTML = '';
        
        if (anunciosSnapshot.empty) {
            anunciosHTML = '<p class="sem-anuncios">Nenhum anúncio cadastrado ainda.</p>';
        } else {
            anunciosSnapshot.forEach((doc) => {
                const anuncio = doc.data();
                anunciosHTML += `
                    <div class="anuncio-card" data-categoria="${anuncio.categoria}">
                        <h3>${anuncio.titulo}</h3>
                        <p class="categoria"><span class="cat-badge">${anuncio.categoria}</span></p>
                        <p class="descricao">${anuncio.descricao}</p>
                        <p class="preco"><strong>${anuncio.preco}</strong></p>
                        <p class="contato"><i class="fas fa-phone"></i> ${anuncio.contato}</p>
                        <p class="data"><small>${anuncio.dataExibicao}</small></p>
                    </div>
                `;
            });
        }
        
        document.getElementById('anunciosGrid').innerHTML = anunciosHTML;
        console.log('Anúncios carregados com sucesso!');
        
    } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
        document.getElementById('anunciosGrid').innerHTML = '<p class="erro-carregar">Erro ao carregar anúncios.</p>';
    }
}

// Carrega notícias para a home (abaixo dos destaques)
async function carregarNoticiasHome() {
    try {
        console.log('Iniciando carregamento de notícias para home...');
        
        const noticiasSnapshot = await db.collection('noticias')
            .where('ativo', '==', true)
            .orderBy('data', 'desc')
            .limit(6) // Limitar às 6 últimas notícias para home
            .get();
        
        console.log('Notícias encontradas para home:', noticiasSnapshot.size);
        
        let noticiasHTML = '';
        
        if (noticiasSnapshot.empty) {
            noticiasHTML = '<p class="sem-noticias">Nenhuma notícia publicada ainda.</p>';
        } else {
            noticiasSnapshot.forEach((doc) => {
                const noticia = doc.data();
                const data = noticia.data ? new Date(noticia.data.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível';
                
                noticiasHTML += `
                    <div class="noticia-card-home" onclick="window.location.href='noticia.html?id=${doc.id}'">
                        ${noticia.imagem ? `<img src="${noticia.imagem}" alt="${noticia.titulo}" class="noticia-imagem-home">` : ''}
                        <div class="noticia-conteudo-home">
                            ${noticia.categoria ? `<span class="noticia-categoria-home">${noticia.categoria}</span>` : ''}
                            <h3 class="noticia-titulo-home">${noticia.titulo || 'Título não disponível'}</h3>
                            <p class="noticia-resumo-home">${noticia.resumo || noticia.conteudo?.substring(0, 150) + '...' || 'Conteúdo não disponível'}</p>
                            <div class="noticia-meta-home">
                                <span class="noticia-data-home">
                                    <i class="fas fa-calendar"></i>
                                    ${data}
                                </span>
                                ${noticia.autor ? `
                                <span class="noticia-autor-home">
                                    <i class="fas fa-user"></i>
                                    ${noticia.autor}
                                </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        document.getElementById('noticiasGridHome').innerHTML = noticiasHTML;
        console.log('Notícias da home carregadas com sucesso!');
        
    } catch (error) {
        console.error('Erro ao carregar notícias da home:', error);
        document.getElementById('noticiasGridHome').innerHTML = '<p class="erro-carregar">Erro ao carregar notícias.</p>';
    }
}

// Quando clicar em "Classificados"
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('a[href="#classificados"]')?.addEventListener('click', function() {
        console.log('Clicou em classificados');
        setTimeout(carregarAnuncios, 300);
    });
});

// Carregar notícias automaticamente quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticiasHome();
});

// Função para carregar outros conteúdos quando necessário
async function carregarAluguel() {
    try {
        const aluguelSnapshot = await db.collection('aluguel')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(12)
            .get();
        
        let aluguelHTML = '';
        
        if (aluguelSnapshot.empty) {
            aluguelHTML = '<p class="sem-imoveis">Nenhum imóvel disponível no momento.</p>';
        } else {
            aluguelSnapshot.forEach((doc) => {
                const imovel = doc.data();
                aluguelHTML += `
                    <div class="imovel-card">
                        <div class="imovel-image">
                            <i class="fas fa-home"></i>
                        </div>
                        <div class="imovel-content">
                            <span class="imovel-tipo">${imovel.tipo}</span>
                            <h3>${imovel.titulo}</h3>
                            <p class="imovel-descricao">${imovel.descricao}</p>
                            <p class="imovel-preco">$${imovel.preco}/mês</p>
                            <p class="imovel-endereco"><i class="fas fa-map-marker-alt"></i> ${imovel.endereco}</p>
                            <div class="imovel-contato">
                                <button class="btn-whats" onclick="abrirWhatsApp('${imovel.whatsapp || imovel.telefone}')">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </button>
                                <button class="btn-ver-mais" onclick="verDetalhesImovel('${doc.id}')">
                                    <i class="fas fa-eye"></i> Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        document.getElementById('aluguelGrid').innerHTML = aluguelHTML;
        
    } catch (error) {
        console.error('Erro ao carregar aluguel:', error);
        document.getElementById('aluguelGrid').innerHTML = '<p class="erro-carregar">Erro ao carregar imóveis.</p>';
    }
}

async function carregarVagas() {
    try {
        const vagasSnapshot = await db.collection('vagas')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(15)
            .get();
        
        let vagasHTML = '';
        
        if (vagasSnapshot.empty) {
            vagasHTML = '<p class="sem-vagas">Nenhuma vaga disponível no momento.</p>';
        } else {
            vagasSnapshot.forEach((doc) => {
                const vaga = doc.data();
                vagasHTML += `
                    <div class="vaga-card">
                        <div class="vaga-info">
                            <h3>${vaga.titulo}</h3>
                            <p><strong>${vaga.empresa}</strong></p>
                            <p>${vaga.descricao}</p>
                            <div class="vaga-details">
                                <span class="vaga-detail"><i class="fas fa-map-marker-alt"></i> ${vaga.local}</span>
                                <span class="vaga-detail"><i class="fas fa-dollar-sign"></i> ${vaga.salario}</span>
                            </div>
                        </div>
                        <div class="vaga-contato">
                            <button class="btn-whats" onclick="abrirWhatsAppVaga('${vaga.contato}')">
                                <i class="fab fa-whatsapp"></i> Candidatar
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        
        document.getElementById('vagasList').innerHTML = vagasHTML;
        
    } catch (error) {
        console.error('Erro ao carregar vagas:', error);
        document.getElementById('vagasList').innerHTML = '<p class="erro-carregar">Erro ao carregar vagas.</p>';
    }
}

async function carregarEstabelecimentos() {
    try {
        const estabSnapshot = await db.collection('estabelecimentos')
            .where('ativo', '==', true)
            .orderBy('dataCadastro', 'desc')
            .limit(20)
            .get();
        
        let estabHTML = '';
        
        if (estabSnapshot.empty) {
            estabHTML = '<p class="sem-estabelecimentos">Nenhum estabelecimento cadastrado.</p>';
        } else {
            estabSnapshot.forEach((doc) => {
                const estab = doc.data();
                estabHTML += `
                    <div class="estabelecimento-card">
                        <h4>${estab.nome}</h4>
                        <p class="categoria"><i class="fas fa-tag"></i> ${estab.categoria}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${estab.endereco}</p>
                        <p><i class="fas fa-phone"></i> ${estab.telefone}</p>
                        ${estab.whatsapp ? `<p><i class="fab fa-whatsapp"></i> ${estab.whatsapp}</p>` : ''}
                        <div class="estab-actions">
                            <button class="btn-whats" onclick="abrirWhatsApp('${estab.whatsapp || estab.telefone}')">
                                <i class="fab fa-whatsapp"></i> Contato
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        
        document.getElementById('estabelecimentosList').innerHTML = estabHTML;
        
    } catch (error) {
        console.error('Erro ao carregar estabelecimentos:', error);
        document.getElementById('estabelecimentosList').innerHTML = '<p class="erro-carregar">Erro ao carregar estabelecimentos.</p>';
    }
}

// Funções auxiliares
function abrirWhatsApp(numero) {
    if (!numero) return;
    const numeroLimpo = numero.replace(/\D/g, '');
    window.open(`https://wa.me/1${numeroLimpo}`, '_blank');
}

function abrirWhatsAppVaga(contato) {
    if (!contato) return;
    const mensagem = encodeURIComponent('Olá, vi sua vaga no portal Moradores de Lowell. Gostaria de mais informações.');
    window.open(`https://wa.me/1${contato.replace(/\D/g, '')}?text=${mensagem}`, '_blank');
}

// Adicionar event listeners para as outras seções
document.addEventListener('DOMContentLoaded', function() {
    // Aluguel
    document.querySelector('a[href="#aluguel"]')?.addEventListener('click', function() {
        setTimeout(carregarAluguel, 300);
    });
    
    // Empregos
    document.querySelector('a[href="#empregos"]')?.addEventListener('click', function() {
        setTimeout(carregarVagas, 300);
    });
    
    // Guia Comercial
    document.querySelector('a[href="#guia"]')?.addEventListener('click', function() {
        setTimeout(carregarEstabelecimentos, 300);
    });
    
    // Notícias (página completa)
    document.querySelector('a[href="#noticias"]')?.addEventListener('click', function() {
        setTimeout(carregarNoticiasCompletas, 300);
    });
});

// Função para carregar todas as notícias na página de notícias
async function carregarNoticiasCompletas() {
    try {
        const noticiasSnapshot = await db.collection('noticias')
            .where('ativo', '==', true)
            .orderBy('data', 'desc')
            .limit(20)
            .get();
        
        let noticiasHTML = '';
        
        if (noticiasSnapshot.empty) {
            noticiasHTML = '<p class="sem-noticias">Nenhuma notícia publicada ainda.</p>';
        } else {
            noticiasSnapshot.forEach((doc) => {
                const noticia = doc.data();
                const data = noticia.data ? new Date(noticia.data.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível';
                
                noticiasHTML += `
                    <div class="noticia-card" onclick="window.location.href='noticia.html?id=${doc.id}'">
                        ${noticia.imagem ? `<img src="${noticia.imagem}" alt="${noticia.titulo}" class="noticia-imagem">` : ''}
                        <div class="noticia-conteudo">
                            ${noticia.categoria ? `<span class="noticia-categoria">${noticia.categoria}</span>` : ''}
                            <h3 class="noticia-titulo">${noticia.titulo || 'Título não disponível'}</h3>
                            <p class="noticia-resumo">${noticia.resumo || noticia.conteudo?.substring(0, 200) + '...' || 'Conteúdo não disponível'}</p>
                            <div class="noticia-meta">
                                <span class="noticia-data">
                                    <i class="fas fa-calendar"></i>
                                    ${data}
                                </span>
                                ${noticia.autor ? `
                                <span class="noticia-autor">
                                    <i class="fas fa-user"></i>
                                    ${noticia.autor}
                                </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        document.getElementById('noticiasGrid').innerHTML = noticiasHTML;
        
    } catch (error) {
        console.error('Erro ao carregar notícias completas:', error);
        document.getElementById('noticiasGrid').innerHTML = '<p class="erro-carregar">Erro ao carregar notícias.</p>';
    }
}