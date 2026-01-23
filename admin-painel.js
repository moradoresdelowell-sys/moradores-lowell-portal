// Estado do Painel
let currentAdminSection = 'dashboard';
let currentEditingId = null;
let currentCollection = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    loadDashboard();
    setupAdminEventListeners();
});

// Verificar Autenticação
function checkAdminAuth() {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        // Verificar se é admin
        db.collection('usuarios').doc(user.uid).get().then(function(doc) {
            if (!doc.exists || doc.data().role !== 'admin') {
                window.location.href = 'index.html';
            }
        });
    });
}

// Configurar Event Listeners
function setupAdminEventListeners() {
    // Modal
    const modal = document.getElementById('formModal');
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFormModal();
        }
    });
}

// Dashboard
async function loadDashboard() {
    try {
        // Carregar estatísticas
        const anunciosSnapshot = await collections.anuncios.get();
        const vagasSnapshot = await collections.vagas.get();
        const estabelecimentosSnapshot = await collections.estabelecimentos.get();
        const noticiasSnapshot = await collections.noticias.get();
        
        document.getElementById('totalAnuncios').textContent = anunciosSnapshot.size;
        document.getElementById('totalVagas').textContent = vagasSnapshot.size;
        document.getElementById('totalEstabelecimentos').textContent = estabelecimentosSnapshot.size;
        document.getElementById('totalNoticias').textContent = noticiasSnapshot.size;
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Mostrar Seção
function showSection(section) {
    currentAdminSection = section;
    const content = document.getElementById('adminContent');
    
    switch(section) {
        case 'anuncios':
            loadAnunciosAdmin();
            break;
        case 'vagas':
            loadVagasAdmin();
            break;
        case 'estabelecimentos':
            loadEstabelecimentosAdmin();
            break;
        case 'noticias':
            loadNoticiasAdmin();
            break;
        case 'aluguel':
            loadAluguelAdmin();
            break;
        case 'config':
            loadConfigAdmin();
            break;
        default:
            content.innerHTML = '';
    }
}

// Carregar Anúncios Admin
async function loadAnunciosAdmin() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
    
    try {
        const anuncios = await firebaseUtils.getAnuncios();
        
        let html = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h2>Gerenciar Anúncios</h2>
                    <button class="btn btn-success" onclick="showAnuncioForm()">
                        + Novo Anúncio
                    </button>
                </div>
                
                <div class="admin-list">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Destaque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        anuncios.forEach(anuncio => {
            html += `
                <tr>
                    <td>${anuncio.titulo}</td>
                    <td>${anuncio.categoria}</td>
                    <td>${firebaseUtils.formatPrice(anuncio.preco)}</td>
                    <td>${anuncio.destaque || 'gratis'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editAnuncio('${anuncio.id}')">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('anuncios', '${anuncio.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<div class="error">Erro ao carregar anúncios: ${error.message}</div>`;
    }
}

// Carregar Vagas Admin
async function loadVagasAdmin() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
    
    try {
        const vagas = await firebaseUtils.getVagas();
        
        let html = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h2>Gerenciar Vagas</h2>
                    <button class="btn btn-success" onclick="showVagaForm()">
                        + Nova Vaga
                    </button>
                </div>
                
                <div class="admin-list">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Cargo</th>
                                <th>Empresa</th>
                                <th>Tipo</th>
                                <th>Salário</th>
                                <th>Destaque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        vagas.forEach(vaga => {
            html += `
                <tr>
                    <td>${vaga.cargo}</td>
                    <td>${vaga.empresa}</td>
                    <td>${vaga.tipo}</td>
                    <td>${firebaseUtils.formatPrice(vaga.salario)}</td>
                    <td>${vaga.destaque || 'gratis'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editVaga('${vaga.id}')">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('vagas', '${vaga.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<div class="error">Erro ao carregar vagas: ${error.message}</div>`;
    }
}

// Carregar Estabelecimentos Admin
async function loadEstabelecimentosAdmin() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
    
    try {
        const estabelecimentos = await firebaseUtils.getEstabelecimentos();
        
        let html = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h2>Gerenciar Estabelecimentos</h2>
                    <button class="btn btn-success" onclick="showEstabelecimentoForm()">
                        + Novo Estabelecimento
                    </button>
                </div>
                
                <div class="admin-list">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Telefone</th>
                                <th>Destaque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        estabelecimentos.forEach(estab => {
            html += `
                <tr>
                    <td>${estab.nome}</td>
                    <td>${estab.categoria}</td>
                    <td>${estab.telefone}</td>
                    <td>${estab.destaque || 'gratis'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editEstabelecimento('${estab.id}')">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('estabelecimentos', '${estab.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<div class="error">Erro ao carregar estabelecimentos: ${error.message}</div>`;
    }
}

// Carregar Notícias Admin
async function loadNoticiasAdmin() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
    
    try {
        const noticias = await firebaseUtils.getNoticias();
        
        let html = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h2>Gerenciar Notícias</h2>
                    <button class="btn btn-success" onclick="showNoticiaForm()">
                        + Nova Notícia
                    </button>
                </div>
                
                <div class="admin-list">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        noticias.forEach(noticia => {
            html += `
                <tr>
                    <td>${noticia.titulo}</td>
                    <td>${firebaseUtils.formatDate(noticia.data)}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editNoticia('${noticia.id}')">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('noticias', '${noticia.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<div class="error">Erro ao carregar notícias: ${error.message}</div>`;
    }
}

// Carregar Aluguel Admin
async function loadAluguelAdmin() {
    const content = document.getElementById('adminContent');
    content.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';
    
    try {
        const aluguel = await firebaseUtils.getAluguel();
        
        let html = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h2>Gerenciar Aluguel</h2>
                    <button class="btn btn-success" onclick="showAluguelForm()">
                        + Novo Imóvel
                    </button>
                </div>
                
                <div class="admin-list">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Tipo</th>
                                <th>Preço</th>
                                <th>Destaque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        aluguel.forEach(imovel => {
            html += `
                <tr>
                    <td>${imovel.titulo}</td>
                    <td>${imovel.tipo}</td>
                    <td>${firebaseUtils.formatPrice(imovel.preco)}</td>
                    <td>${imovel.destaque || 'gratis'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editAluguel('${imovel.id}')">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('aluguel', '${imovel.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<div class="error">Erro ao carregar aluguéis: ${error.message}</div>`;
    }
}

// Formulários
function showAnuncioForm(id = null) {
    currentEditingId = id;
    currentCollection = 'anuncios';
    
    let formHtml = `
        <h3>${id ? 'Editar' : 'Novo'} Anúncio</h3>
        <form id="anuncioForm" onsubmit="saveAnuncio(event)">
            <div class="form-group">
                <label>Título:</label>
                <input type="text" name="titulo" required>
            </div>
            
            <div class="form-group">
                <label>Descrição:</label>
                <textarea name="descricao" required></textarea>
            </div>
            
            <div class="form-group">
                <label>Categoria:</label>
                <select name="categoria" required>
                    <option value="">Selecione</option>
                    <option value="produtos">Produtos</option>
                    <option value="doacoes">Doações</option>
                    <option value="servicos">Serviços</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Preço (deixe 0 para doações):</label>
                <input type="number" name="preco" min="0" step="0.01" required>
            </div>
            
            <div class="form-group">
                <label>WhatsApp:</label>
                <input type="text" name="whatsapp" required placeholder="5511999999999">
            </div>
            
            <div class="form-group">
                <label>Nível de Destaque:</label>
                <select name="destaque" required>
                    <option value="gratis">Grátis</option>
                    <option value="destaque">Destaque</option>
                    <option value="premium">Premium</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Imagem (URL):</label>
                <input type="url" name="imagem">
            </div>
            
            <button type="submit" class="btn btn-success">
                Salvar
            </button>
            <button type="button" class="btn btn-secondary" onclick="closeFormModal()">
                Cancelar
            </button>
        </form>
    `;
    
    if (id) {
        // Carregar dados existentes
        collections.anuncios.doc(id).get().then(function(doc) {
            if (doc.exists) {
                const data = doc.data();
                Object.keys(data).forEach(key => {
                    const input = document.querySelector(`[name="${key}"]`);
                    if (input) input.value = data[key];
                });
            }
        });
    }
    
    document.getElementById('formContent').innerHTML = formHtml;
    document.getElementById('formModal').style.display = 'block';
}

// Funções de Salvamento
async function saveAnuncio(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Converter preço para número
    data.preco = parseFloat(data.preco);
    
    try {
        if (currentEditingId) {
            // Atualizar
            await collections.anuncios.doc(currentEditingId).update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Criar
            await firebaseUtils.createAnuncio(data);
        }
        
        closeFormModal();
        loadAnunciosAdmin();
        alert('Anúncio salvo com sucesso!');
    } catch (error) {
        alert('Erro ao salvar anúncio: ' + error.message);
    }
}

// Funções de Exclusão
async function deleteItem(collection, id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        try {
            await db.collection(collection).doc(id).delete();
            alert('Item excluído com sucesso!');
            
            // Recarregar a seção atual
            showSection(currentAdminSection);
        } catch (error) {
            alert('Erro ao excluir item: ' + error.message);
        }
    }
}

// Funções de Modal
function closeFormModal() {
    document.getElementById('formModal').style.display = 'none';
    currentEditingId = null;
    currentCollection = null;
}

// Logout
function logout() {
    auth.signOut().then(function() {
        window.location.href = 'admin-login.html';
    }).catch(function(error) {
        alert('Erro ao fazer logout: ' + error.message);
    });
}

// Adicionar estilos CSS adicionais para o admin
const adminStyles = `
<style>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--light-color);
    padding: 20px;
}

.login-box {
    background: var(--white);
    padding: 40px;
    border-radius: 10px;
    box-shadow: var(--shadow);
    width: 100%;
    max-width: 400px;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-logo {
    height: 80px;
    margin-bottom: 20px;
}

.login-form {
    margin-bottom: 20px;
}

.btn-block {
    width: 100%;
}

.error-message {
    color: var(--primary-color);
    margin-bottom: 15px;
    display: none;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.admin-table th,
.admin-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.admin-table th {
    background: var(--light-color);
    font-weight: bold;
}

.btn-sm {
    padding: 5px 10px;
    font-size: 0.9rem;
    margin-right: 5px;
}

.modal-content.large {
    max-width: 800px;
}

.admin-content {
    margin-top: 30px;
}

.admin-list {
    overflow-x: auto;
}

@media (max-width: 768px) {
    .admin-header {
        flex-direction: column;
        gap: 15px;
    }
    
    .admin-table {
        font-size: 0.9rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', adminStyles);