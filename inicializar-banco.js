// =====================================================
// INICIALIZADOR COMPLETO DO BANCO DE DADOS - FIREBASE
// Moradores de Lowell - Portal Digital
// =====================================================

console.log('🚀 Iniciando configuração do banco de dados...');

// Função principal de inicialização
async function inicializarBancoDados() {
    try {
        console.log('📊 Criando coleções e documentos de exemplo...');
        
        // 1. COLEÇÃO: noticias
        console.log('📰 Criando notícias de exemplo...');
        await criarNoticiasExemplo();
        
        // 2. COLEÇÃO: classificados
        console.log('🛒 Criando classificados de exemplo...');
        await criarClassificadosExemplo();
        
        // 3. COLEÇÃO: vagas
        console.log('💼 Criando vagas de emprego...');
        await criarVagasExemplo();
        
        // 4. COLEÇÃO: aluguel
        console.log('🏠 Criando imóveis para aluguel...');
        await criarAluguelExemplo();
        
        // 5. COLEÇÃO: estabelecimentos
        console.log('🏪 Criando estabelecimentos...');
        await criarEstabelecimentosExemplo();
        
        // 6. COLEÇÃO: admin
        console.log('👑 Criando usuário admin...');
        await criarAdminUsuario();
        
        // 7. COLEÇÃO: config
        console.log('⚙️ Criando configurações padrão...');
        await criarConfiguracoesPadrao();
        
        // 8. COLEÇÃO: analytics
        console.log('📈 Criando analytics inicial...');
        await criarAnalyticsInicial();
        
        console.log('✅ Banco de dados inicializado com sucesso!');
        alert('🎉 Banco de dados configurado com sucesso! Agora você pode começar a usar o portal.');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar banco de dados:', error);
        alert('Erro ao configurar banco de dados: ' + error.message);
    }
}

// =====================================================
// FUNÇÕES DE CRIAÇÃO DE DADOS
// =====================================================

// 1. NOTÍCIAS
async function criarNoticiasExemplo() {
    const noticias = [
        {
            titulo: "Festa Junina 2024 - Moradores de Lowell",
            categoria: "eventos",
            resumo: "Participe da maior festa junina da comunidade brasileira em Lowell!",
            conteudoHTML: `<h2>🎉 Festa Junina 2024 está chegando!</h2>
                          <p>Preparados para a maior celebração da nossa comunidade?</p>
                          <p><strong>Data:</strong> 24 de Junho<br>
                          <strong>Local:</strong> Lowell Common Park<br>
                          <strong>Horário:</strong> 14h às 22h</p>
                          <p>Vai ter quadrilha, comidas típicas, jogos e muita diversão!</p>`,
            conteudoTexto: "Festa Junina 2024 está chegando! Preparados para a maior celebração da nossa comunidade? Data: 24 de Junho, Local: Lowell Common Park",
            autor: "Equipe MDL",
            imagem: "https://via.placeholder.com/600x400?text=Festa+Junina+2024",
            dataPublicacao: new Date().toISOString(),
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            urgencia: "normal",
            ativo: true,
            secao: "noticias",
            linksSociais: [
                {tipo: "instagram", url: "https://instagram.com/moradoresdelowell"},
                {tipo: "facebook", url: "https://facebook.com/moradoresdelowell"}
            ]
        },
        {
            titulo: "Oportunidade de Emprego - Novas Vagas Disponíveis",
            categoria: "oportunidades",
            resumo: "Mais de 20 novas vagas de emprego disponíveis para a comunidade.",
            conteudoHTML: `<h2>💼 Vagas de Emprego Disponíveis</h2>
                          <p>Foram adicionadas 20 novas vagas em diferentes áreas.</p>
                          <p>Confira as oportunidades na seção EMPREGOS do portal.</p>`,
            conteudoTexto: "Mais de 20 novas vagas de emprego disponíveis para a comunidade.",
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

// 2. CLASSIFICADOS
async function criarClassificadosExemplo() {
    const classificados = [
        {
            titulo: "Geladeira Brastemp em Ótimo Estado",
            categoria: "produtos",
            descricao: "Geladeira Brastemp 450L, 2 anos de uso, sem defeitos. Motivo: mudança.",
            preco: "$350",
            telefone: "(978) 555-0123",
            local: "Lowell, MA",
            tipo: "venda",
            fotos: ["https://via.placeholder.com/400x300?text=Geladeira"],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "classificados"
        },
        {
            titulo: "Doação de Roupas Infantis",
            categoria: "doacoes",
            descricao: "Roupas de criança (2-8 anos) em bom estado. Preciso doar urgente.",
            preco: "Grátis",
            telefone: "(978) 555-0456",
            local: "Lowell, MA",
            tipo: "doacao",
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

// 3. VAGAS DE EMPREGO
async function criarVagasExemplo() {
    const vagas = [
        {
            titulo: "Auxiliar de Cozinha",
            empresa: "Restaurante Brasil",
            descricao: "Preparar ingredientes, auxiliar no preparo de pratos, manter área de trabalho limpa. Experiência anterior preferível mas não obrigatória.",
            salario: "$15/hora",
            local: "Lowell, MA",
            horario: "Segunda a Sexta, 9h às 17h",
            beneficios: "Vale transporte, refeição no local",
            requisitos: "Disponibilidade para trabalhar aos finais de semana quando necessário",
            contato: "(978) 555-0789",
            dataLimite: "2024-07-15",
            observacoes: "Enviar mensagem no WhatsApp com currículo",
            fotos: [],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "vagas"
        },
        {
            titulo: "Motorista Delivery",
            empresa: "Transportes Silva",
            descricao: "Entregas locais em Lowell e região. Veículo próprio necessário.",
            salario: "$18/hora + gorjeta",
            local: "Lowell, MA",
            horario: "Flexível",
            beneficios: "Horário flexível, gorjetas",
            requisitos: "CNH válida, veículo próprio",
            contato: "(978) 555-0234",
            dataLimite: "2024-07-30",
            observacoes: "Começar imediatamente",
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

// 4. IMÓVEIS PARA ALUGUEL
async function criarAluguelExemplo() {
    const imoveis = [
        {
            titulo: "Quarto Mobiliado em Área Tranquila",
            tipo: "quarto",
            descricao: "Quarto espaçoso com cama, guarda-roupa, escrivaninha. Acesso a cozinha completa, lavanderia e Wi-Fi. Área residencial tranquila, próximo a transporte público.",
            preco: "650",
            endereco: "123 Main St, Lowell, MA 01851",
            telefone: "(978) 555-0567",
            whatsapp: "(978) 555-0567",
            comodidades: "Wi-Fi, água, luz, gás, lavanderia",
            regras: "Não fumante, sem animais, visitas até 22h",
            disponibilidade: "Disponível imediatamente",
            fotos: ["https://via.placeholder.com/500x400?text=Quarto+Mobiliado"],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "aluguel"
        },
        {
            titulo: "Apartamento 2 Quartos Completo",
            tipo: "apartamento",
            descricao: "Apartamento espaçoso com 2 quartos, sala, cozinha, banheiro. Próximo a mercados e transporte.",
            preco: "1200",
            endereco: "456 Broadway St, Lowell, MA 01852",
            telefone: "(978) 555-0912",
            whatsapp: "(978) 555-0912",
            comodidades: "Wi-Fi, estacionamento",
            regras: "Máximo 4 pessoas, depósito de segurança de $1200",
            disponibilidade: "Disponível a partir de 01/08/2024",
            fotos: ["https://via.placeholder.com/500x400?text=Apartamento+2Q"],
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

// 5. ESTABELECIMENTOS
async function criarEstabelecimentosExemplo() {
    const estabelecimentos = [
        {
            nome: "Mercado Brasil",
            categoria: "mercado",
            descricao: "Produtos brasileiros, frutas, verduras, carnes e muito mais. A maior variedade da região!",
            endereco: "789 Central St, Lowell, MA 01850",
            telefone: "(978) 555-0345",
            whatsapp: "(978) 555-0345",
            email: "contato@mercadobrasil.com",
            horario: "Seg-Sáb: 8h-20h, Dom: 9h-18h",
            website: "https://mercadobrasil.com",
            servicos: "Produtos brasileiros, frutas, verduras, carnes, frios, produtos de limpeza",
            plano: "premium",
            fotos: ["https://via.placeholder.com/600x400?text=Mercado+Brasil"],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "estabelecimentos",
            enderecoMaps: "789 Central St, Lowell, MA 01850",
            whatsappNumero: "9785550345"
        },
        {
            nome: "Salão Beleza Brasil",
            categoria: "salao",
            descricao: "Cabelos, manicure, pedicure, maquiagem. Profissionais qualificados e ambiente acolhedor.",
            endereco: "321 Oak Ave, Lowell, MA 01851",
            telefone: "(978) 555-0678",
            whatsapp: "(978) 555-0678",
            email: "belezabrasil@email.com",
            horario: "Ter-Sáb: 9h-18h",
            website: "@salonbelezabrasil",
            servicos: "Cabelo, manicure, pedicure, maquiagem, sobrancelha",
            plano: "destaque",
            fotos: ["https://via.placeholder.com/600x400?text=Salao+Beleza"],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: "estabelecimentos",
            enderecoMaps: "321 Oak Ave, Lowell, MA 01851",
            whatsappNumero: "9785550678"
        }
    ];

    for (const estab of estabelecimentos) {
        await db.collection('estabelecimentos').add(estab);
        console.log('✅ Estabelecimento criado:', estab.nome);
    }
}

// 6. USUÁRIO ADMIN
async function criarAdminUsuario() {
    const adminData = {
        email: "admin@moradoresdelowell.com",
        nome: "Administrador Principal",
        tipo: "admin",
        ativo: true,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
        ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('admin').doc('admin-principal').set(adminData);
    console.log('✅ Usuário admin criado');
}

// 7. CONFIGURAÇÕES PADRÃO
async function criarConfiguracoesPadrao() {
    const configuracoes = {
        geral: {
            diasExpirarAnuncios: 30,
            itensPorPagina: 20,
            notificacoesEmail: true,
            modoManutencao: false
        },
        seguranca: {
            maxTentativasLogin: 5,
            bloquearIPSuspeitos: true,
            doisFatores: false
        },
        aparencia: {
            tema: "vermelho",
            animacoes: true,
            logoUrl: "logo-moradores.png"
        },
        backup: {
            automatico: true,
            frequencia: "diaria",
            ultimoBackup: null
        },
        analytics: {
            coletarDados: true,
            googleAnalytics: false
        },
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('config').doc('sistema').set(configuracoes);
    console.log('✅ Configurações padrão criadas');
}

// 8. ANALYTICS INICIAL
async function criarAnalyticsInicial() {
    const analytics = {
        visitasTotais: 0,
        visitasHoje: 0,
        usuariosAtivos: 0,
        taxaCrescimento: 0,
        paginasMaisVisitadas: ["home", "noticias", "classificados"],
        dispositivos: {
            desktop: 0,
            mobile: 0,
            tablet: 0
        },
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('analytics').doc('geral').set(analytics);
    console.log('✅ Analytics inicial criado');
}

// =====================================================
// FUNÇÃO PARA EXECUTAR TUDO
// =====================================================

// Adicione um botão no admin-painel.html para executar isso:
// <button onclick="inicializarBancoDados()" class="btn btn-primary">
//     <i class="fas fa-database"></i> Inicializar Banco de Dados
// </button>

// Ou execute automaticamente quando quiser:
// inicializarBancoDados();

console.log('📋 Script de inicialização carregado! Clique no botão para configurar o banco de dados.');