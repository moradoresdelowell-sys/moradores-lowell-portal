// Sistema de Navegação
class PortalNavigation {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.loadDashboardData();
        this.setupModalHandlers();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                
                // Atualizar link ativo
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navList = document.getElementById('navList');
        
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Fechar menu ao clicar em link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    showSection(sectionId) {
        // Esconder todas as seções
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar seção alvo
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Carregar dados específicos da seção
            this.loadSectionData(sectionId);
        }
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'classificados':
                this.loadClassificados();
                break;
            case 'empregos':
                this.loadEmpregos();
                break;
            case 'guia':
                this.loadEstabelecimentos();
                break;
            case 'noticias':
                this.loadNoticias();
                break;
            case 'radio':
                this.setupRadio();
                break;
        }
    }

    loadDashboardData() {
        // Simular dados do dashboard
        const stats = {
            totalMembers: 2847,
            totalAnuncios: 124,
            totalVagas: 89,
            totalEstabelecimentos: 156
        };

        // Animação dos números
        Object.keys(stats).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                this.animateNumber(element, 0, stats[key], 2000);
            }
        });

        // Carregar atividades recentes
        this.loadRecentActivity();
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toLocaleString('pt-BR');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        requestAnimationFrame(updateNumber);
    }

    loadRecentActivity() {
        const activities = [
            { type: 'anuncio', titulo: 'Aluguel de quarto no centro', tempo: '5 minutos atrás' },
            { type: 'vaga', titulo: 'Vaga para limpeza - $18/hora', tempo: '15 minutos atrás' },
            { type: 'estabelecimento', titulo: 'Novo restaurante brasileiro abriu!', tempo: '1 hora atrás' },
            { type: 'noticia', titulo: 'Culto em português domingo', tempo: '2 horas atrás' }
        ];

        const activityFeed = document.getElementById('activityFeed');
        if (activityFeed) {
            activityFeed.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.titulo}</p>
                        <small>${activity.tempo}</small>
                    </div>
                </div>
            `).join('');
        }
    }

    getActivityIcon(type) {
        const icons = {
            anuncio: 'fa-bullhorn',
            vaga: 'fa-briefcase',
            estabelecimento: 'fa-store',
            noticia: 'fa-newspaper'
        };
        return icons[type] || 'fa-info';
    }

    // Sistema de Classificados
    loadClassificados() {
        const anuncios = [
            {
                id: 1,
                categoria: 'aluguel',
                titulo: 'Quarto para alugar - Lowell',
                descricao: 'Quarto mobiliado em área tranquila, próximo ao transporte público',
                preco: '$650/mês',
                telefone: '(978) 555-0123',
                imagem: 'https://via.placeholder.com/300x200',
                data: new Date()
            },
            {
                id: 2,
                categoria: 'venda',
                titulo: 'Geladeira usada - Excelente estado',
                descricao: 'Geladeira Whirlpool, 2 anos de uso, sem defeitos',
                preco: '$350',
                telefone: '(978) 555-0456',
                imagem: 'https://via.placeholder.com/300x200',
                data: new Date()
            },
            {
                id: 3,
                categoria: 'servicos',
                titulo: 'Serviço de limpeza residencial',
                descricao: 'Limpeza profunda, experiência comprovada, referências disponíveis',
                preco: 'A combinar',
                telefone: '(978) 555-0789',
                imagem: 'https://via.placeholder.com/300x200',
                data: new Date()
            }
        ];

        this.renderAnuncios(anuncios);
    }

    renderAnuncios(anuncios) {
        const container = document.getElementById('anunciosGrid');
        if (!container) return;

        container.innerHTML = anuncios.map(anuncio => `
            <div class="anuncio-card" data-categoria="${anuncio.categoria}">
                <div class="anuncio-header">
                    <span class="categoria-tag">${this.getCategoriaNome(anuncio.categoria)}</span>
                    <small>${this.formatarData(anuncio.data)}</small>
                </div>
                ${anuncio.imagem ? `<img src="${anuncio.imagem}" alt="${anuncio.titulo}" class="anuncio-imagem">` : ''}
                <h3 class="anuncio-title">${anuncio.titulo}</h3>
                <p class="anuncio-descricao">${anuncio.descricao}</p>
                ${anuncio.preco ? `<p class="anuncio-price">${anuncio.preco}</p>` : ''}
                <div class="anuncio-contato">
                    <i class="fas fa-phone"></i> ${anuncio.telefone}
                </div>
                <div class="anuncio-actions">
                    <button class="btn-primary" onclick="compartilharAnuncio(${anuncio.id})">
                        <i class="fas fa-share"></i> Compartilhar
                    </button>
                    <button class="btn-whats" onclick="abrirWhatsApp('${anuncio.telefone}')">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoriaNome(categoria) {
        const nomes = {
            aluguel: 'Aluguel',
            venda: 'Venda',
            servicos: 'Serviços',
            procura: 'Procura-se',
            doacao: 'Doação'
        };
        return nomes[categoria] || categoria;
    }

    formatarData(data) {
        const agora = new Date();
        const diff = agora - data;
        const minutos = Math.floor(diff / 60000);
        const horas = Math.floor(diff / 3600000);
        const dias = Math.floor(diff / 86400000);

        if (minutos < 60) return `${minutos} min atrás`;
        if (horas < 24) return `${horas}h atrás`;
        return `${dias} dias atrás`;
    }

    // Sistema de Empregos
    loadEmpregos() {
        const vagas = [
            {
                id: 1,
                titulo: 'Auxiliar de Limpeza',
                empresa: 'Cleaning Services LLC',
                descricao: 'Procuramos pessoa responsável para limpeza residencial e comercial',
                salario: '$18-22/hora',
                tipo: 'tempo-integral',
                experiencia: 'sem-experiencia',
                ingles: 'nao-necessario',
                local: 'Lowell, MA'
            },
            {
                id: 2,
                titulo: 'Cozinheiro',
                empresa: 'Restaurante Brasileiro',
                descricao: 'Experiência com comida brasileira, horário flexível',
                salario: '$20-25/hora',
                tipo: 'tempo-integral',
                experiencia: 'com-experiencia',
                ingles: 'basico',
                local: 'Lowell, MA'
            },
            {
                id: 3,
                titulo: 'Cuidador de Idosos',
                empresa: 'Home Care Agency',
                descricao: 'Cuidar de idosos, dar remédios, ajudar com higiene',
                salario: '$22-28/hora',
                tipo: 'meio-periodo',
                experiencia: 'sem-experiencia',
                ingles: 'basico',
                local: 'Lowell, MA'
            }
        ];

        this.renderVagas(vagas);
    }

    renderVagas(vagas) {
        const container = document.getElementById('vagasList');
        if (!container) return;

        container.innerHTML = vagas.map(vaga => `
            <div class="vaga-card">
                <div class="vaga-info">
                    <h3>${vaga.titulo}</h3>
                    <p><strong>${vaga.empresa}</strong></p>
                    <p>${vaga.descricao}</p>
                    <div class="vaga-details">
                        <span class="vaga-detail"><i class="fas fa-map-marker-alt"></i> ${vaga.local}</span>
                        <span class="vaga-detail"><i class="fas fa-clock"></i> ${vaga.tipo}</span>
                        ${vaga.ingles === 'nao-necessario' ? '<span class="vaga-detail"><i class="fas fa-check"></i> Sem Inglês</span>' : ''}
                        ${vaga.experiencia === 'sem-experiencia' ? '<span class="vaga-detail"><i class="fas fa-star"></i> Sem Experiência</span>' : ''}
                    </div>
                    <p class="vaga-salary">${vaga.salario}</p>
                </div>
                <div class="vaga-actions">
                    <button class="btn-primary" onclick="candidatarVaga(${vaga.id})">
                        <i class="fas fa-paper-plane"></i> Candidatar
                    </button>
                    <button class="btn-whats" onclick="compartilharVaga(${vaga.id})">
                        <i class="fab fa-whatsapp"></i> Compartilhar
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Sistema de Estabelecimentos
    loadEstabelecimentos() {
        const estabelecimentos = [
            {
                id: 1,
                nome: "Mercado Brasil",
                categoria: "mercados",
                endereco: "123 Main St, Lowell, MA",
                telefone: "(978) 555-0123",
                whatsapp: true,
                horario: "8h - 21h",
                coordenadas: [42.6334, -71.3162],
                descricao: "Produtos brasileiros, feijão, arroz, temperos e muito mais",
                avaliacao: 4.5
            },
            {
                id: 2,
                nome: "Restaurante Sabor Brasil",
                categoria: "restaurantes",
                endereco: "456 Broadway St, Lowell, MA",
                telefone: "(978) 555-0456",
                whatsapp: false,
                horario: "11h - 22h",
                coordenadas: [42.6454, -71.3082],
                descricao: "Comida brasileira autêntica, feijoada nos sábados",
                avaliacao: 4.8
            },
            {
                id: 3,
                nome: "Salão Beleza Brasil",
                categoria: "servicos",
                endereco: "789 Central St, Lowell, MA",
                telefone: "(978) 555-0789",
                whatsapp: true,
                horario: "9h - 18h",
                coordenadas: [42.6274, -71.3242],
                descricao: "Cabelo, manicure, pedicure, depilação",
                avaliacao: 4.6
            }
        ];

        this.renderEstabelecimentos(estabelecimentos);
        this.setupMapa(estabelecimentos);
    }

    renderEstabelecimentos(estabelecimentos) {
        const container = document.getElementById('estabelecimentosList');
        if (!container) return;

        container.innerHTML = estabelecimentos.map(est => `
            <div class="estabelecimento-card" onclick="verEstabelecimento(${est.id})">
                <h4>${est.nome}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${est.endereco}</p>
                <p><i class="fas fa-phone"></i> ${est.telefone}</p>
                <p><i class="fas fa-clock"></i> ${est.horario}</p>
                <div class="estrela-avaliacao">
                    ${this.renderEstrelas(est.avaliacao)}
                </div>
                ${est.whatsapp ? '<i class="fab fa-whatsapp text-success"></i> WhatsApp' : ''}
            </div>
        `).join('');
    }

    renderEstrelas(avaliacao) {
        const estrelasCheias = Math.floor(avaliacao);
        const temMeiaEstrela = avaliacao % 1 !== 0;
        let html = '';

        for (let i = 0; i < estrelasCheias; i++) {
            html += '<i class="fas fa-star" style="color: #ffc107;"></i>';
        }
        if (temMeiaEstrela) {
            html += '<i class="fas fa-star-half-alt" style="color: #ffc107;"></i>';
        }
        for (let i = estrelasCheias + (temMeiaEstrela ? 1 : 0); i < 5; i++) {
            html += '<i class="far fa-star" style="color: #ddd;"></i>';
        }
        return html;
    }

    setupMapa(estabelecimentos) {
        // Simulação de mapa interativo
        const mapa = document.getElementById('mapaEstabelecimentos');
        if (!mapa) return;

        mapa.innerHTML = `
            <div class="mapa-simulado">
                <h3 style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-map-marked-alt" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                    Mapa Interativo dos Estabelecimentos
                </h3>
                <p style="text-align: center; color: #999;">
                    Integração com Google Maps será implementada
                </p>
            </div>
        `;
    }

    // Sistema de Notícias
    loadNoticias() {
        const noticias = [
            {
                id: 1,
                titulo: 'Culto em Português - Domingo',
                categoria: 'eventos',
                conteudo: 'Não esqueça! Culto em português todos os domingos às 11h na Igreja Sagrada Família.',
                data: new Date(),
                urgencia: 'normal',
                autor: 'Comunidade Católica'
            },
            {
                id: 2,
                titulo: 'Operação ICE na Região',
                categoria: 'urgentes',
                conteudo: 'Informamos que houve atividade da ICE em Lowell hoje. Mantenham-se informados e conheçam seus direitos.',
                data: new Date(),
                urgencia: 'alta',
                autor: 'Portal Moradores'
            },
            {
                id: 3,
                titulo: 'Nova Vaga: Auxiliar de Cozinha',
                categoria: 'oportunidades',
                conteudo: 'Restaurante brasileiro contratando auxiliar de cozinha. Experiência não necessária.',
                data: new Date(),
                urgencia: 'normal',
                autor: 'Restaurante Sabor Brasil'
            }
        ];

        this.renderNoticias(noticias);
    }

    renderNoticias(noticias) {
        const container = document.getElementById('noticiasGrid');
        if (!container) return;

        container.innerHTML = noticias.map(noticia => `
            <div class="noticia-card ${noticia.urgencia === 'alta' ? 'urgente' : ''}" data-categoria="${noticia.categoria}">
                <div class="noticia-header">
                    <span class="categoria-tag">${this.getCategoriaNoticia(noticia.categoria)}</span>
                    <small>${this.formatarData(noticia.data)}</small>
                </div>
                <h3 class="noticia-title">${noticia.titulo}</h3>
                <p class="noticia-conteudo">${noticia.conteudo}</p>
                <div class="noticia-footer">
                    <small>Por: ${noticia.autor}</small>
                    <button class="btn-primary" onclick="compartilharNoticia(${noticia.id})">
                        <i class="fas fa-share"></i> Compartilhar
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoriaNoticia(categoria) {
        const categorias = {
            urgentes: 'Urgente',
            eventos: 'Eventos',
            imigracao: 'Imigração',
            oportunidades: 'Oportunidades'
        };
        return categorias[categoria] || categoria;
    }

    // Sistema de Rádio
    setupRadio() {
        const radioAudio = document.getElementById('radioAudio');
        const playBtn = document.getElementById('radioPlayBtn');
        const radioIcon = document.getElementById('radioIcon');
        const volumeSlider = document.getElementById('radioVolume');
        const programacaoContainer = document.getElementById('programacaoRadio');

        let isPlaying = false;

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                radioAudio.pause();
                radioIcon.classList.remove('fa-pause');
                radioIcon.classList.add('fa-play');
            } else {
                radioAudio.play().catch(e => {
                    console.log('Erro ao tocar rádio:', e);
                    alert('Stream de rádio não disponível no momento');
                });
                radioIcon.classList.remove('fa-play');
                radioIcon.classList.add('fa-pause');
            }
            isPlaying = !isPlaying;
        });

        volumeSlider.addEventListener('input', (e) => {
            radioAudio.volume = e.target.value / 100;
        });

        // Programação simulada
        const programacao = [
            { horario: '06:00 - 10:00', programa: 'Manhã Brasileira', apresentador: 'Carlos Silva' },
            { horario: '10:00 - 14:00', programa: 'Meio Dia Informado', apresentador: 'Ana Costa' },
            { horario: '14:00 - 18:00', programa: 'Tarde Musical', apresentador: 'Pedro Santos' },
            { horario: '18:00 - 22:00', programa: 'Noite Alegre', apresentador: 'Maria Oliveira' }
        ];

        programacaoContainer.innerHTML = programacao.map(programa => `
            <div class="programa-item">
                <strong>${programa.horario}</strong><br>
                ${programa.programa}<br>
                <small>com ${programa.apresentador}</small>
            </div>
        `).join('');
    }

    // Sistema de Modais
    setupModalHandlers() {
        // Login
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin) {
            btnLogin.addEventListener('click', () => {
                this.abrirModal('modalLogin');
            });
        }

        // Forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    abrirModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    fecharModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simular envio
        console.log('Form data:', data);
        alert('Dados enviados com sucesso! (Simulação)');
        
        // Fechar modal
        const modal = form.closest('.modal');
        if (modal) {
            this.fecharModal(modal.id);
        }
        
        // Resetar form
        form.reset();
    }

    // Funções utilitárias
    compartilharAnuncio(id) {
        alert(`Compartilhando anúncio ${id}...`);
        // Implementar compartilhamento real
    }

    abrirWhatsApp(telefone) {
        const numero = telefone.replace(/\D/g, '');
        window.open(`https://wa.me/1${numero}`, '_blank');
    }

    candidatarVaga(id) {
        alert(`Candidatando-se à vaga ${id}...`);
        // Implementar sistema de candidatura
    }

    compartilharVaga(id) {
        alert(`Compartilhando vaga ${id}...`);
    }

    verEstabelecimento(id) {
        alert(`Ver detalhes do estabelecimento ${id}...`);
    }

    compartilharNoticia(id) {
        alert(`Compartilhando notícia ${id}...`);
    }
}

// Funções globais
function showSection(sectionId) {
    portalNavigation.showSection(sectionId);
}

function abrirModal(modalId) {
    portalNavigation.abrirModal(modalId);
}

function fecharModal(modalId) {
    portalNavigation.fecharModal(modalId);
}

function compartilharAnuncio(id) {
    portalNavigation.compartilharAnuncio(id);
}

function abrirWhatsApp(telefone) {
    portalNavigation.abrirWhatsApp(telefone);
}

function candidatarVaga(id) {
    portalNavigation.candidatarVaga(id);
}

function compartilharVaga(id) {
    portalNavigation.compartilharVaga(id);
}

function verEstabelecimento(id) {
    portalNavigation.verEstabelecimento(id);
}

function compartilharNoticia(id) {
    portalNavigation.compartilharNoticia(id);
}

function abrirModalPublicar() {
    abrirModal('modalAnuncio');
}

function abrirModalVaga() {
    abrirModal('modalVaga');
}

function abrirModalEstabelecimento() {
    abrirModal('modalEstabelecimento');
}

function abrirModalNoticia() {
    abrirModal('modalNoticia');
}

function mostrarCadastro() {
    alert('Sistema de cadastro será implementado');
}

// Inicializar o portal
const portalNavigation = new PortalNavigation();

// Adicionar animações e efeitos visuais
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar loading animation
    const cards = document.querySelectorAll('.anuncio-card, .vaga-card, .noticia-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Setup de filtros
    setupFilters();
});

function setupFilters() {
    // Filtros de classificados
    const categoriaSelect = document.getElementById('categoriaClassificados');
    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', (e) => {
            filtrarClassificados(e.target.value);
        });
    }

    // Filtros de estabelecimentos
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoriaBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filtrarEstabelecimentos(e.target.dataset.categoria);
        });
    });
}

function filtrarClassificados(categoria) {
    const cards = document.querySelectorAll('.anuncio-card');
    cards.forEach(card => {
        if (categoria === '' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filtrarEstabelecimentos(categoria) {
    const cards = document.querySelectorAll('.estabelecimento-card');
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function buscarClassificados() {
    const searchTerm = document.getElementById('searchClassificados').value.toLowerCase();
    const cards = document.querySelectorAll('.anuncio-card');
    
    cards.forEach(card => {
        const titulo = card.querySelector('.anuncio-title').textContent.toLowerCase();
        const descricao = card.querySelector('.anuncio-descricao').textContent.toLowerCase();
        
        if (titulo.includes(searchTerm) || descricao.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registrado com sucesso');
    }).catch((error) => {
        console.log('Erro ao registrar Service Worker:', error);
    });
}

// Player de Rádio Global
let radioAudio = null;
let isPlaying = false;

function inicializarRadioGlobal() {
    radioAudio = document.getElementById('radioAudio');
    const playBtn = document.getElementById('radioPlayBtn');
    const volumeSlider = document.getElementById('radioVolume');
    const muteBtn = document.getElementById('radioMuteBtn');
    
    if (!radioAudio) return;
    
    // Play/Pause
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            radioAudio.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            radioAudio.play().catch(e => console.log("Erro ao tocar:", e));
            this.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    });
    
    // Controle de volume
    volumeSlider.addEventListener('input', function() {
        radioAudio.volume = this.value / 100;
    });
    
    // Mute
    muteBtn.addEventListener('click', function() {
        if (radioAudio.muted) {
            radioAudio.muted = false;
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            radioAudio.muted = true;
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Volume inicial
    radioAudio.volume = 0.5;
}

// Inicializar quando carregar a página
document.addEventListener('DOMContentLoaded', function() {
    inicializarRadioGlobal();
    console.log("✅ Player global inicializado!");
});