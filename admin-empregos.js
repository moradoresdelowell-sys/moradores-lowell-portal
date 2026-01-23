// Formata contato
function formatContato(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length <= 10) {
    input.value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
  }
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
document.getElementById('formVaga').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.querySelector('.btn-cadastrar');
  const msg = document.getElementById('mensagem');
  btn.disabled = true;
  btn.textContent = 'Cadastrando...';

  try {
    const fotoURLs = [];
    for (const img of uploadedImages) {
      const ref = firebase.storage().ref(`vagas/${Date.now()}_${img.file.name}`);
      await ref.put(img.file);
      fotoURLs.push(await ref.getDownloadURL());
    }

    await db.collection('vagas').add({
      titulo: document.getElementById('titulo').value,
      empresa: document.getElementById('empresa').value,
      descricao: document.getElementById('descricao').value,
      salario: document.getElementById('salario').value,
      local: document.getElementById('local').value,
      contato: document.getElementById('contato').value,
      fotos: fotoURLs,
      dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
      ativo: true,
      secao: 'vagas'
    });

    msg.className = 'mensagem sucesso';
    msg.textContent = '✅ Vaga cadastrada!';
    msg.style.display = 'flex';
    e.target.reset();
    uploadedImages = [];
    updatePreview();
  } catch (err) {
    msg.className = 'mensagem erro';
    msg.textContent = '❌ Erro: ' + err.message;
    msg.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Cadastrar Vaga';
  }
});