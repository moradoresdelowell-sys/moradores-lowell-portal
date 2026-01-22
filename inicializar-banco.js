// =====================================================
// INICIALIZADOR INTELIGENTE DO BANCO DE DADOS
// Verifica o que existe e só cria o que falta!
// =====================================================

console.log('🧠 Inicializador Inteligente do Banco de Dados');

// Função principal INTELIGENTE
async function inicializarBancoDados() {
    try {
        console.log('🔍 Verificando o que já existe no banco...');
        
        // Verifica cada coleção individualmente
        const verificacoes = await Promise.all([
            verificarColecao('noticias'),
            verificarColecao('classificados'),
            verificarColecao('vagas'),
            verificarColecao('aluguel'),
            verificarColecao('estabelecimentos'),
            verificarColecao('admin'),
            verificarColecao('config'),
            verificarColecao('analytics')
        ]);

        const resultado = {
            noticias: verificacoes[0],
            classificados: verificacoes[1],
            vagas: verificacoes[2],
            aluguel: verificacoes[3],
            estabelecimentos: verificacoes[4],
            admin: verificacoes[5],
            config: verificacoes[6],
            analytics: verificacoes[7]
        };

        console.log('📊 Resultado da verificação:', resultado);

        // Cria apenas o que está faltando
        let criados = 0;

        if (!resultado.noticias.temDados) {
            console.log('📰 Criando notícias...');
            await criarNoticiasExemplo();
            criados++;
        }

        if (!resultado.classificados.temDados) {
            console.log('🛒 Criando classificados...');
            await criarClassificadosExemplo();
            criados++;
        }

        if (!resultado.vagas.temDados) {
            console.log('💼 Criando vagas...');
            await criarVagasExemplo();
            criados++;
        }

        if (!resultado.aluguel.temDados) {
            console.log('🏠 Criando imóveis...');
            await criarAluguelExemplo();
            criados++;
        }

        if (!resultado.estabelecimentos.temDados) {
            console.log('🏪 Criando estabelecimentos...');
            await criarEstabelecimentosExemplo();
            criados++;
        }

        if (!resultado.admin.temDados) {
            console.log('👑 Criando admin...');
            await criarAdminUsuario();
            criados++;
        }

        if (!resultado.config.temDados) {
            console.log('⚙️ Criando configurações...');
            await criarConfiguracoesPadrao();
            criados++;
        }

        if (!resultado.analytics.temDados) {
            console.log('📈 Criando analytics...');
            await criarAnalyticsInicial();
            criados++;
        }

        if (criados > 0) {
            console.log(`✅ ${criados} coleções foram criadas/atualizadas!`);
            alert(`🎉 Banco de dados atualizado! ${criados} coleções foram criadas com sucesso!`);
        } else {
            console.log('✅ Banco de dados já está completo!');
            alert('ℹ️ O banco de dados já está configurado e completo!');
        }

        // Atualiza a página para mostrar os novos dados
        setTimeout(() => {
            location.reload();
        }, 1500);

    } catch (error) {
        console.error('❌ Erro ao verificar/inicializar banco de dados:', error);
        alert('Erro: ' + error.message);
    }
}

// =====================================================
// FUNÇÃO INTELIGENTE - VERIFICA COLEÇÕES
// =====================================================

async function verificarColecao(nomeColecao) {
    try {
        console.log(`🔍 Verificando coleção: ${nomeColecao}`);
        
        const snapshot = await db.collection(nomeColecao).limit(1).get();
        const temDados = !snapshot.empty;
        const quantidade = snapshot.size;
        
        console.log(`📊 ${nomeColecao}: ${temDados ? 'JÁ TEM DADOS' : 'VAZIA'} (${quantidade} documentos)`);
        
        return {
            nome: nomeColecao,
            temDados: temDados,
            quantidade: quantidade
        };
        
    } catch (error) {
        console.log(`⚠️ Erro ao verificar ${nomeColecao}:`, error);
        // Se der erro, assume que não existe e tenta criar
        return {
            nome: nomeColecao,
            temDados: false,
            quantidade: 0,
            erro: error.message
        };
    }
}

// =====================================================
// FUNÇÕES DE CRIAÇÃO (MESMAS DE ANTES, MAS COM LOGS)
// =====================================================

async function criarNoticiasExemplo() {
    const noticias = [
        {
            titulo: "🎉 Bem-vindo ao Portal Moradores de Lowell!",
            categoria: "informacao",
            resumo: "O novo portal da comunidade brasileira está no ar com muitas funcões!",
            conteudoHTML: `<h2>🎊 Portal está no ar!</h2>
                          <p>Bem-vindo ao novo portal digital da comunidade brasileira em Lowell!</p>
                          <p>Aqui você encontra:</p>
                          <ul>
                            <li>📰 Notícias da comunidade</li>
                            <li>🛒 Classificados e doações</li>
                            <li>💼 Vagas de emprego</li>
                            <li>🏠 Aluguel de imóveis</li>
                            <li>🏪 Guia comercial</li>
                          </ul>
                          <p><strong>Explore todas as funcões!</strong></p>`,
            conteudoTexto: "Bem-vindo ao novo portal digital da comunidade brasileira em Lowell!",
            autor: "Equipe MDL",
            imagem: "https://via.placeholder.com/600x400?text=Bem+Vindo+MDL",
            dataPublicacao: new Date().toISOString(),
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            urgencia: "alta",
            ativo: true,
            secao: "noticias"
        },
        {
            titulo: "Como usar o portal - Tutorial rápido",
            categoria: "informacao",
            resumo: "Aprenda a navegar por todas as funcões do portal",
            conteudoHTML: `<h2>📖 Tutorial rápido</h2>
                          <p>O portal é muito fácil de usar:</p>
                          <p><strong>1.</strong> Use o menu hambúrguer para navegar<br>
                          <strong>2.</strong> Clique nos cards para ver detalhes<br>
                          <strong>3.</strong> Admin - Use o botão +Admin para adicionar conteúdo</p>`,
            conteudoTexto: "Aprenda a navegar por todas as funcões do portal",
            autor: "Equipe MDL",
            dataPublicacao: new Date().toISOString(),
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            urgencia: "normal",
            ativo: true,
            secao: "noticias"
        }
    ];

    for (const noticia of noticias) {
        await db.collection('noticias').add(noticia);
        console.log('✅ Notícia criada:', noticia.titulo);
    }
}

// [REPETE AS MESMAS FUNÇÕES DOS OUTROS EXEMPLOS, MAS COM console.log]

async function criarClassificadosExemplo() {
    const classificados = [
        {
            titulo: "Geladeira Brastemp - Semi Nova",
            categoria: "produtos",
            descricao: "Geladeira em ótimo estado, 450L, motivo: mudança",
            preco: "$350",
            telefone: "(978) 555-0123",
            local: "Lowell, MA",
            tipo: "venda",
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "classificados"
        }
    ];

    for (const classificado of classificados) {
        await db.collection('classificados').add(classificado);
        console.log('✅ Classificado criado:', classificado.titulo);
    }
}

async function criarVagasExemplo() {
    const vagas = [
        {
            titulo: "Auxiliar de Cozinha",
            empresa: "Restaurante Sabor Brasil",
            descricao: "Preparar ingredientes, auxiliar no preparo de pratos",
            salario: "$16/hora",
            local: "Lowell, MA",
            contato: "(978) 555-0789",
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "vagas"
        }
    ];

    for (const vaga of vagas) {
        await db.collection('vagas').add(vaga);
        console.log('✅ Vaga criada:', vaga.titulo);
    }
}

async function criarAluguelExemplo() {
    const imoveis = [
        {
            titulo: "Quarto Individual - Tudo Incluído",
            tipo: "quarto",
            descricao: "Quarto espaçoso, mobiliado, tudo incluído",
            preco: "650",
            endereco: "123 Main St, Lowell, MA",
            telefone: "(978) 555-0567",
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "aluguel"
        }
    ];

    for (const imovel of imoveis) {
        await db.collection('aluguel').add(imovel);
        console.log('✅ Imóvel criado:', imovel.titulo);
    }
}

async function criarEstabelecimentosExemplo() {
    const estabelecimentos = [
        {
            nome: "Mercado Brasil",
            categoria: "mercado",
            descricao: "Produtos brasileiros e latinos",
            endereco: "123 Central St, Lowell, MA",
            telefone: "(978) 555-0345",
            plano: "premium",
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "estabelecimentos"
        }
    ];

    for (const estab of estabelecimentos) {
        await db.collection('estabelecimentos').add(estab);
        console.log('✅ Estabelecimento criado:', estab.nome);
    }
}

async function criarAdminUsuario() {
    const adminData = {
        email: "admin@moradoresdelowell.com",
        nome: "Administrador Principal",
        tipo: "admin",
        ativo: true,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('admin').doc('admin-principal').set(adminData);
    console.log('✅ Admin criado');
}

async function criarConfiguracoesPadrao() {
    const configuracoes = {
        geral: {
            diasExpirarAnuncios: 30,
            itensPorPagina: 20,
            notificacoesEmail: true,
            modoManutencao: false
        },
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('config').doc('sistema').set(configuracoes);
    console.log('✅ Configurações criadas');
}

async function criarAnalyticsInicial() {
    const analytics = {
        visitasTotais: 0,
        visitasHoje: 0,
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('analytics').doc('geral').set(analytics);
    console.log('✅ Analytics criado');
}

// Adiciona ao HTML um botão:
// <button onclick="inicializarBancoDados()" class="btn btn-primary">
//     <i class="fas fa-database"></i> Inicializar Banco
// </button>