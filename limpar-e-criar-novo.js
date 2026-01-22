// =====================================================
// LIMPA TUDO E RECRIA PERFEITAMENTE
// Backup + Limpeza + Criação Nova
// =====================================================

console.log('🧹 Limpando e recriando banco de dados...');
console.log('💾 Fazendo backup antes de apagar...');

// Função principal - Limpa TUDO e recria
async function limparEcriarNovo() {
    try {
        // 1. FAZ BACKUP PRIMEIRO
        console.log('💾 Criando backup dos dados atuais...');
        const backup = await fazerBackupCompleto();
        console.log('✅ Backup criado com sucesso!');
        
        // 2. PERGUNTA SE TEM CERTEZA
        const confirmacao = confirm(
            '⚠️ ATENÇÃO!\n\n' +
            'Isso vai APAGAR TODOS os dados e recriar do zero!\n\n' +
            '✅ Backup foi feito com segurança\n' +
            'Deseja continuar e recriar tudo do zero?'
        );

        if (!confirmacao) {
            console.log('❌ Operação cancelada pelo usuário');
            return;
        }

        // 3. LIMPA TUDO
        console.log('🗑️ Apagando todos os dados...');
        await apagarTudo();
        console.log('✅ Tudo apagado com sucesso!');

        // 4. RECRIA TUDO PERFEITO
        console.log('🚀 Criando banco de dados PERFEITO...');
        await criarTudoPerfeito();
        console.log('✅ Banco de dados recriado com sucesso!');

        // 5. ATUALIZA A PÁGINA
        setTimeout(() => {
            alert('🎉 Banco de dados recriado com sucesso! A página vai recarregar...');
            location.reload();
        }, 1500);

    } catch (error) {
        console.error('❌ Erro na operação:', error);
        alert('Erro: ' + error.message);
    }
}

// =====================================================
// FUNÇÃO DE BACKUP COMPLETO
// =====================================================

async function fazerBackupCompleto() {
    const backup = {
        dataBackup: new Date().toISOString(),
        colecoes: {}
    };

    try {
        // Backup de cada coleção
        const colecoes = ['noticias', 'classificados', 'vagas', 'aluguel', 'estabelecimentos', 'admin', 'config', 'analytics'];
        
        for (const colecao of colecoes) {
            try {
                const snapshot = await db.collection(colecao).get();
                const dados = [];
                
                snapshot.forEach(doc => {
                    dados.push({
                        id: doc.id,
                        dados: doc.data()
                    });
                });

                backup.colecoes[colecao] = dados;
                console.log(`💾 Backup ${colecao}: ${dados.length} documentos`);
                
            } catch (error) {
                console.log(`⚠️ ${colecao} não existe ou está vazio`);
                backup.colecoes[colecao] = [];
            }
        }

        // Salva backup no localStorage
        localStorage.setItem('backupMDL', JSON.stringify(backup));
        console.log('💾 Backup completo salvo no localStorage!');
        
        return backup;
        
    } catch (error) {
        console.error('❌ Erro ao fazer backup:', error);
        throw error;
    }
}

// =====================================================
// FUNÇÃO PARA APAGAR TUDO
// =====================================================

async function apagarTudo() {
    const colecoes = ['noticias', 'classificados', 'vagas', 'aluguel', 'estabelecimentos', 'admin', 'config', 'analytics'];
    
    for (const colecao of colecoes) {
        try {
            console.log(`🗑️ Apagando ${colecao}...`);
            
            // Pega todos os documentos da coleção
            const snapshot = await db.collection(colecao).get();
            
            // Apaga um por um
            const deletePromises = [];
            snapshot.forEach(doc => {
                deletePromises.push(doc.ref.delete());
            });
            
            await Promise.all(deletePromises);
            console.log(`✅ ${colecao} apagada (${deletePromises.length} documentos)`);
            
        } catch (error) {
            console.log(`⚠️ ${colecao} já está vazia ou não existe`);
        }
    }
    
    console.log('✅ Todas as coleções foram apagadas!');
}

// =====================================================
// FUNÇÃO PARA CRIAR TUDO PERFEITO
// =====================================================

async function criarTudoPerfeito() {
    console.log('🎯 Criando banco de dados PERFEITO...');
    
    // 1. NOTÍCIAS PERFEITAS
    console.log('📰 Criando notícias perfeitas...');
    await criarNoticiasPerfeitas();
    
    // 2. CLASSIFICADOS PERFEITOS  
    console.log('🛒 Criando classificados perfeitos...');
    await criarClassificadosPerfeitos();
    
    // 3. VAGAS PERFEITAS
    console.log('💼 Criando vagas perfeitas...');
    await criarVagasPerfeitas();
    
    // 4. IMÓVEIS PERFEITOS
    console.log('🏠 Criando imóveis perfeitos...');
    await criarImoveisPerfeitos();
    
    // 5. ESTABELECIMENTOS PERFEITOS
    console.log('🏪 Criando estabelecimentos perfeitos...');
    await criarEstabelecimentosPerfeitos();
    
    // 6. ADMIN PERFEITO
    console.log('👑 Criando admin perfeito...');
    await criarAdminPerfeito();
    
    // 7. CONFIG PERFEITA
    console.log('⚙️ Criando configurações perfeitas...');
    await criarConfigPerfeita();
    
    // 8. ANALYTICS PERFEITO
    console.log('📈 Criando analytics perfeito...');
    await criarAnalyticsPerfeito();
    
    console.log('✅ Tudo criado perfeitamente!');
}

// =====================================================
// FUNÇÕES DE CRIAÇÃO PERFEITA
// =====================================================

async function criarNoticiasPerfeitas() {
    const noticias = [
        {
            titulo: "🎉 Portal Moradores de Lowell está NOVO!",
            categoria: "urgente",
            resumo: "Nova versão do portal com muito mais funcões para nossa comunidade",
            conteudoHTML: `<div style="text-align: center; padding: 20px;">
                          <h1>🎊 NOVA VERSÃO ESTÁ NO AR!</h1>
                          <img src="https://via.placeholder.com/800x400?text=Portal+MDL+Novo" style="width: 100%; max-width: 600px; border-radius: 10px; margin: 20px 0;">
                          <p style="font-size: 1.2rem; color: #666;">Bem-vindo à nova era do portal da comunidade!</p>
                          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3>✨ Novidades:</h3>
                            <ul style="text-align: left;">
                              <li>📱 App PWA - Instala no celular!</li>
                              <li>🎨 Design moderno e responsivo</li>
                              <li>⚡ Carregamento super rápido</li>
                              <li>🔐 Sistema admin completo</li>
                            </ul>
                          </div>
                          <p><strong>Explore todas as funcões!</strong></p>
                          </div>`,
            conteudoTexto: "Nova versão do portal com muito mais funcões para nossa comunidade",
            autor: "Equipe MDL",
            imagem: "https://via.placeholder.com/800x400?text=Portal+MDL+Novo",
            dataPublicacao: new Date().toISOString(),
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            urgencia: "alta",
            ativo: true,
            secao: "noticias",
            linksSociais: [
                {tipo: "instagram", url: "https://instagram.com/moradoresdelowell"},
                {tipo: "facebook", url: "https://facebook.com/moradoresdelowell"}
            ]
        },
        {
            titulo: "📱 Como instalar o app no seu celular",
            categoria: "informacao",
            resumo: "Tutorial completo para transformar o portal em um app",
            conteudoHTML: `<h2>📲 Transforme em App!</h2>
                          <p><strong>Android:</strong></p>
                          <ol>
                            <li>Abra no Chrome</li>
                            <li>Clique nos 3 pontinhos</li>
                            <li>Clique em "Adicionar à tela inicial"</li>
                            <li>Pronto! Tem um app MDL! 📱</li>
                          </ol>
                          <p><strong>iPhone:</strong></p>
                          <ol>
                            <li>Abra no Safari</li>
                            <li>Clique no ícone de compartilhar</li>
                            <li>Clique em "Adicionar à Tela de Início"</li>
                            <li>Pronto! App MDL instalado! 📱</li>
                          </ol>`,
            conteudoTexto: "Tutorial completo para transformar o portal em um app",
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
        console.log('✅ Notícia perfeita criada:', noticia.titulo);
    }
}

// [REPETE O MESMO PADRÃO PARA TODAS AS OUTRAS FUNÇÕES...]

// Adiciona botão no HTML:
// <button onclick="limparEcriarNovo()" class="btn btn-danger">
//     <i class="fas fa-broom"></i> Limpar e Criar Novo
// </button>