// ADMIN PAINEL - NAVEGAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    
    // Função para carregar conteúdo dinamicamente
    function loadContent(page) {
        const contentArea = document.getElementById('content-area');
        
        // Remove conteúdo anterior
        contentArea.innerHTML = '';
        
        // Carrega nova página
        switch(page) {
            case 'anuncios':
                loadAnuncios();
                break;
            case 'classificados':
                loadClassificados();
                break;
            case 'empregos':
                loadEmpregos();
                break;
            case 'noticias':
                loadNoticias();
                break;
            case 'comercio':
                loadComercio();
                break;
            case 'alertas':
                loadAlertas();
                break;
            case 'radio':
                loadRadio();
                break;
            case 'config':
                loadConfig();
                break;
            default:
                loadDashboard();
        }
    }
    
    // Função para carregar dashboard inicial
    function loadDashboard() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="dashboard">
                <h2>Dashboard - Resumo do Sistema</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Anúncios</h3>
                        <p class="number" id="count-anuncios">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>Classificados</h3>
                        <p class="number" id="count-classificados">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>Empregos</h3>
                        <p class="number" id="count-empregos">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>Notícias</h3>
                        <p class="number" id="count-noticias">0</p>
                    </div>
                </div>
            </div>
        `;
        updateCounts();
    }
    
    // Funções para carregar cada seção
    function loadAnuncios() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Anúncios</h2>
                <button class="btn-add" onclick="showAddForm('anuncios')">+ Adicionar Novo Anúncio</button>
                <div id="anuncios-list" class="items-list"></div>
            </div>
        `;
        loadAnunciosList();
    }
    
    function loadClassificados() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Classificados</h2>
                <button class="btn-add" onclick="showAddForm('classificados')">+ Adicionar Novo Classificado</button>
                <div id="classificados-list" class="items-list"></div>
            </div>
        `;
        loadClassificadosList();
    }
    
    function loadEmpregos() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Empregos</h2>
                <button class="btn-add" onclick="showAddForm('empregos')">+ Adicionar Nova Vaga</button>
                <div id="empregos-list" class="items-list"></div>
            </div>
        `;
        loadEmpregosList();
    }
    
    function loadNoticias() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Notícias</h2>
                <button class="btn-add" onclick="showAddForm('noticias')">+ Adicionar Nova Notícia</button>
                <div id="noticias-list" class="items-list"></div>
            </div>
        `;
        loadNoticiasList();
    }
    
    function loadComercio() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Comércio Local</h2>
                <button class="btn-add" onclick="showAddForm('comercio')">+ Adicionar Novo Comércio</button>
                <div id="comercio-list" class="items-list"></div>
            </div>
        `;
        loadComercioList();
    }
    
    function loadAlertas() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Gerenciar Alertas</h2>
                <button class="btn-add" onclick="showAddForm('alertas')">+ Adicionar Novo Alerta</button>
                <div id="alertas-list" class="items-list"></div>
            </div>
        `;
        loadAlertasList();
    }
    
    function loadRadio() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Configurar Rádio Online</h2>
                <form id="radio-config-form">
                    <div class="form-group">
                        <label>URL da Stream:</label>
                        <input type="text" id="radio-url" placeholder="http://stream.exemplo.com:8000/radio.mp3">
                    </div>
                    <div class="form-group">
                        <label>Nome da Rádio:</label>
                        <input type="text" id="radio-name" placeholder="Rádio Moradores">
                    </div>
                    <button type="submit" class="btn-save">Salvar Configurações</button>
                </form>
            </div>
        `;
        loadRadioConfig();
    }
    
    function loadConfig() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="content-section">
                <h2>Configurações do Sistema</h2>
                <p>Configurações gerais do portal...</p>
            </div>
        `;
    }
    
    // Event listeners para os menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadContent(page);
            
            // Remove active de todos e adiciona no atual
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Carrega dashboard inicial
    loadDashboard();
});

// Funções auxiliares
function showAddForm(type) {
    alert(`Formulário para adicionar ${type} será implementado`);
}

function loadAnunciosList() {
    // Implementar carregamento dos anúncios
    document.getElementById('anuncios-list').innerHTML = '<p>Carregando anúncios...</p>';
}

function loadClassificadosList() {
    document.getElementById('classificados-list').innerHTML = '<p>Carregando classificados...</p>';
}

function loadEmpregosList() {
    document.getElementById('empregos-list').innerHTML = '<p>Carregando empregos...</p>';
}

function loadNoticiasList() {
    document.getElementById('noticias-list').innerHTML = '<p>Carregando notícias...</p>';
}

function loadComercioList() {
    document.getElementById('comercio-list').innerHTML = '<p>Carregando comércios...</p>';
}

function loadAlertasList() {
    document.getElementById('alertas-list').innerHTML = '<p>Carregando alertas...</p>';
}

function loadRadioConfig() {
    // Carregar configurações existentes
}

function updateCounts() {
    // Atualizar contagens do dashboard
}