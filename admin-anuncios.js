// SISTEMA ADMIN - ANÚNCIOS
document.addEventListener('DOMContentLoaded', function() {
    console.log("Admin de anúncios carregado!");
    carregarAnunciosAdmin();
    configurarFormulario();
});

// Configurar formulário
function configurarFormulario() {
    const form = document.getElementById('formAnuncio');
    const imagemInput = document.getElementById('imagem');
    const preview = document.getElementById('previewImagem');
    
    // Preview da imagem
    imagemInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Salvar anúncio
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const anuncio = {
            titulo: document.getElementById('titulo').value,
            categoria: document.getElementById('categoria').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value || 'Grátis',
            telefone: document.getElementById('telefone').value,
            imagem: preview.src || '',
            data: new Date(),
            ativo: true,
            visualizacoes: 0
        };
        
        try {
            // Salva no Firebase
            await db.collection('anuncios').add(anuncio);
            
            alert('✅ Anúncio publicado com sucesso!');
            form.reset();
            preview.style.display = 'none';
            carregarAnunciosAdmin(); // Recarrega lista
            
        } catch (error) {
            console.error('Erro:', error);
            alert('❌ Erro ao publicar anúncio!');
        }
    });
}

// Carregar anúncios do admin
async function carregarAnunciosAdmin() {
    try {
        const snapshot = await db.collection('anuncios')
            .orderBy('data', 'desc')
            .get();
            
        const anuncios = [];
        snapshot.forEach(doc => {
            anuncios.push({ id: doc.id, ...doc.data() });
        });
        
        renderizarListaAdmin(anuncios);
        
    } catch (error) {
        console.error('Erro ao carregar:', error);
    }
}

// Renderizar lista pro admin
function renderizarListaAdmin(anuncios) {
    const container = document.getElementById('listaAnuncios');
    
    if (anuncios.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Nenhum anúncio cadastrado ainda.</p>';
        return;
    }
    
    container.innerHTML = anuncios.map(anuncio => `
        <div class="anuncio-admin-item">
            <div>
                <strong>${anuncio.titulo}</strong>
                <br><small>${anuncio.categoria} - ${formatarData(anuncio.data)}</small>
                <br><small>Status: ${anuncio.ativo ? '✅ Ativo' : '❌ Inativo'}</small>
            </div>
            <div>
                <button class="btn-excluir" onclick="excluirAnuncio('${anuncio.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Excluir anúncio
async function excluirAnuncio(id) {
    if (confirm('Tem certeza que quer excluir este anúncio?')) {
        try {
            await db.collection('anuncios').doc(id).delete();
            alert('Anúncio excluído com sucesso!');
            carregarAnunciosAdmin();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir anúncio!');
        }
    }
}

// Função auxiliar
function formatarData(timestamp) {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
}