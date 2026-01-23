// Formata telefone
function formatPhone(input) {
  let value = input.value.replace(/\D/g, '');
  let formatted = '';
  if (value.length > 0) {
    if (value.length <= 3) formatted = `(${value}`;
    else if (value.length <= 6) formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    else formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  input.value = formatted;
}

// Upload de fotos
let uploadedImages = [];

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', e => {
  const files = Array.from(e.target.files).slice(0, 5);
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) return alert('Máximo 5MB por foto');
    const reader = new FileReader();
    reader.onload = ev => {
      uploadedImages.push({ file, url: ev.target.result });
      updatePreview();
    };
    reader.readAsDataURL(file);
  });
});

function updatePreview() {
  previewContainer.innerHTML = uploadedImages.map((img, i) => `
    <div class="preview-image">
      <img src="${img.url}" alt="">
      <button type="button" onclick="removeImage(${i})">✖</button>
    </div>
  `).join('');
}

function removeImage(index) {
  uploadedImages.splice(index, 1);
  updatePreview();
}

// Envia formulário
document.getElementById('formClassificado').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const btn = document.querySelector('.btn-cadastrar');
  const msg = document.getElementById('mensagem');
  
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
  
  try {
    // Upload fotos
    const fotoURLs = [];
    for (let img of uploadedImages) {
      const ref = firebase.storage().ref(`classificados/${Date.now()}_${img.file.name}`);
      await ref.put(img.file);
      fotoURLs.push(await ref.getDownloadURL());
    }
    
    const anuncio = {
      titulo: document.getElementById('titulo').value,
      tipo: document.getElementById('tipo').value,
      descricao: document.getElementById('descricao').value,
      preco: document.getElementById('preco').value || 'Grátis',
      telefone: document.getElementById('telefone').value,
      local: document.getElementById('local').value,
      fotos: fotoURLs,
      dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
      ativo: true,
      secao: 'classificados'
    };
    
    await db.collection('classificados').add(anuncio);
    
    msg.className = 'mensagem sucesso';
    msg.innerHTML = '<i class="fas fa-check-circle"></i> Anúncio cadastrado com sucesso!';
    msg.style.display = 'block';
    
    // Limpa formulário
    document.getElementById('formClassificado').reset();
    uploadedImages = [];
    updatePreview();
    
  } catch (error) {
    msg.className = 'mensagem erro';
    msg.innerHTML = '❌ Erro: ' + error.message;
    msg.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Cadastrar Classificado';
  }
});