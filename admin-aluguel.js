// ===== VARIÁVEIS GLOBAIS =====
let uploadedImages = [];
let currentImageIndex = 0;

// ===== FORMATAÇÃO DE TELEFONE =====
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = `(${value}`;
        } else if (value.length <= 6) {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    input.value = formattedValue;
}

// ===== ATUALIZA MAPS E WHATSAPP =====
function atualizarMaps() {
    const endereco = document.getElementById('endereco').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    
    // Atualiza Google Maps
    if (endereco) {
        const encoded = encodeURIComponent(endereco);
        document.getElementById('mapFrame').src = 
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyCYx6LLnu4tf6OS4W4xPcBprve4IRROtX8&q=${encoded}`;
        document.getElementById('mapsPreview').style.display = 'block';
    }
    
    // Atualiza WhatsApp
    if (whatsapp) {
        const numero = whatsapp.replace(/\D/g, '');
        document.getElementById('btnWhatsMaps').onclick = () => {
            const mensagem = encodeURIComponent('Olá, vi seu imóvel no portal Moradores de Lowell. Gostaria de mais informações.');
            window.open(`https://wa.me/1${numero}?text=${mensagem}`, '_blank');
        };
    }
}

// ===== UPLOAD DE FOTOS =====
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#9b59b6';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#ddd';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    const remainingSlots = 8 - uploadedImages.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    
    filesToProcess.forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            alert(`Arquivo ${file.name} é muito grande! Máximo 5MB.`);
            return;
        }
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push({
                    file: file,
                    url: e.target.result
                });
                updatePreview();
                updateCarousel();
            };
            reader.readAsDataURL(file);
        }
    });
}

function updatePreview() {
    previewContainer.innerHTML = uploadedImages.map((img, index) => `
        <div class="preview-image" onclick="showImage(${index})">
            <img src="${img.url}" alt="Preview ${index + 1}">
            <button type="button" class="remove-image" onclick="removeImage(${index})" title="Remover foto">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function updateCarousel() {
    if (uploadedImages.length > 0) {
        document.getElementById('carouselContainer').style.display = 'block';
        showCarouselImage(0);
        updateIndicators();
    } else {
        document.getElementById('carouselContainer').style.display = 'none';
    }
}

function showCarouselImage(index) {
    currentImageIndex = index;
    const carouselImage = document.getElementById('carouselImage');
    carouselImage.src = uploadedImages[index].url;
    
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
}

function updateIndicators() {
    const indicators = document.getElementById('indicators');
    indicators.innerHTML = uploadedImages.map((_, index) => `
        <div class="indicator ${index === 0 ? 'active' : ''}" onclick="showCarouselImage(${index})"></div>
    `).join('');
}

// Navegação do carrossel
document.getElementById('prevBtn').addEventListener('click', () => {
    const newIndex = currentImageIndex === 0 ? uploadedImages.length - 1 : currentImageIndex - 1;
    showCarouselImage(newIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const newIndex = currentImageIndex === uploadedImages.length - 1 ? 0 : currentImageIndex + 1;
    showCarouselImage(newIndex);
});

// Modal de visualização
function showImage(index) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = uploadedImages[index].url;
}

function removeImage(index) {
    event.stopPropagation();
    uploadedImages.splice(index, 1);
    updatePreview();
    updateCarousel();
}

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'none';
});

document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imageModal')) {
        document.getElementById('imageModal').style.display = 'none';
    }
});

// ===== FORMATAÇÃO DE PREÇO =====
document.getElementById('preco').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
});

// ===== EVENTOS DE INPUT =====
document.getElementById('telefone').addEventListener('input', (e) => formatPhone(e.target));
document.getElementById('whatsapp').addEventListener('input', (e) => formatPhone(e.target));
document.getElementById('endereco').addEventListener('input', atualizarMaps);
document.getElementById('whatsapp').addEventListener('input', atualizarMaps);

// ===== CADASTRO NO FIREBASE =====
document.getElementById('formAluguel').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.btn-cadastrar');
    const msg = document.getElementById('mensagem');
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
    
    try {
        // Upload das fotos
        const fotoURLs = [];
        for (let img of uploadedImages) {
            const ref = firebase.storage().ref(`aluguel/${Date.now()}_${img.file.name}`);
            await ref.put(img.file);
            fotoURLs.push(await ref.getDownloadURL());
        }
        
        // Dados do imóvel
        const aluguel = {
            titulo: document.getElementById('titulo').value,
            tipo: document.getElementById('tipo').value,
            descricao: document.getElementById('descricao').value,
            preco: document.getElementById('preco').value,
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            whatsapp: document.getElementById('whatsapp').value,
            comodidades: document.getElementById('comodidades').value,
            regras: document.getElementById('regras').value,
            disponibilidade: document.getElementById('disponibilidade').value,
            fotos: fotoURLs,
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            dataExibicao: new Date().toLocaleDateString('pt-BR'),
            ativo: true,
            secao: 'aluguel'
        };
        
        // Salva no Firebase
        await db.collection('aluguel').add(aluguel);
        
        // Sucesso
        msg.className = 'mensagem sucesso';
        msg.innerHTML = '<i class="fas fa-check-circle"></i> Imóvel cadastrado com sucesso!';
        msg.style.display = 'block';
        
        // Limpa formulário
        document.getElementById('formAluguel').reset();
        uploadedImages = [];
        updatePreview();
        document.getElementById('mapsPreview').style.display = 'none';
        quill.setText('');
        
        setTimeout(() => msg.style.display = 'none', 3000);
        
    } catch (error) {
        msg.className = 'mensagem erro';
        msg.innerHTML = '❌ Erro: ' + error.message;
        msg.style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-save"></i> Cadastrar Aluguel';
    }
});