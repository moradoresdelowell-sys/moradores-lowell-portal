// Configuração do Player de Rádio
class RadioPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentVolume = 0.5;
        this.radioUrl = 'https://stream.zeno.fm/y8x3d9wucmvvv'; // URL exemplo - substitua pela sua
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    initializeElements() {
        this.playPauseBtn = document.getElementById('playPause');
        this.volumeSlider = document.getElementById('volume');
        this.statusElement = document.getElementById('radioStatus');
    }
    
    setupEventListeners() {
        // Botão play/pause
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Controle de volume
        this.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        // Eventos do áudio
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updateUI();
        });
        
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updateUI();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Erro no player de rádio:', e);
            this.statusElement.textContent = 'Erro ao carcar stream';
            this.statusElement.style.color = '#dc3545';
        });
        
        this.audio.addEventListener('loadstart', () => {
            this.statusElement.textContent = 'Carregando...';
            this.statusElement.style.color = '#ffc107';
        });
        
        this.audio.addEventListener('canplay', () => {
            this.statusElement.textContent = 'Pronto';
            this.statusElement.style.color = '#28a745';
        });
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        if (this.audio.src !== this.radioUrl) {
            this.audio.src = this.radioUrl;
        }
        
        this.audio.play().catch(error => {
            console.error('Erro ao iniciar reprodução:', error);
            this.statusElement.textContent = 'Erro ao iniciar';
            this.statusElement.style.color = '#dc3545';
        });
    }
    
    pause() {
        this.audio.pause();
    }
    
    setVolume(volume) {
        this.currentVolume = volume;
        this.audio.volume = volume;
        
        // Salvar volume preferido
        localStorage.setItem('radioVolume', volume);
    }
    
    updateUI() {
        if (this.isPlaying) {
            this.playPauseBtn.textContent = '⏸';
            this.statusElement.textContent = 'Tocando';
            this.statusElement.style.color = '#28a745';
        } else {
            this.playPauseBtn.textContent = '▶';
            this.statusElement.textContent = 'Parado';
            this.statusElement.style.color = '#6c757d';
        }
    }
    
    // Carregar configurações salvas
    loadSettings() {
        const savedVolume = localStorage.getItem('radioVolume');
        if (savedVolume !== null) {
            this.currentVolume = parseFloat(savedVolume);
            this.audio.volume = this.currentVolume;
            this.volumeSlider.value = this.currentVolume * 100;
        }
    }
}

// Inicializar player quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const radioPlayer = new RadioPlayer();
    radioPlayer.loadSettings();
    
    // Tornar player global para acesso externo
    window.radioPlayer = radioPlayer;
});

// Controles adicionais
function setRadioStation(url, name) {
    if (window.radioPlayer) {
        window.radioPlayer.radioUrl = url;
        document.querySelector('.radio-title').textContent = name;
        
        // Se estiver tocando, trocar estação
        if (window.radioPlayer.isPlaying) {
            window.radioPlayer.pause();
            window.radioPlayer.play();
        }
    }
}

// Lista de estações de rádio (pode ser expandida)
const radioStations = [
    {
        name: 'Rádio Comunidade',
        url: 'https://stream.zeno.fm/y8x3d9wucmvvv'
    },
    {
        name: 'Rádio Brasileira',
        url: 'https://stream.zeno.fm/0m6rg7q7pzzuv'
    }
];

// Função para alternar entre estações
function switchRadioStation(index) {
    if (radioStations[index] && window.radioPlayer) {
        setRadioStation(radioStations[index].url, radioStations[index].name);
    }
}