// Envia formulário
document.getElementById('formNoticia').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.querySelector('.btn-cadastrar');
  const msg = document.getElementById('mensagem');
  btn.disabled = true;
  btn.textContent = 'Publicando...';

  try {
    await db.collection('noticias').add({
      titulo: document.getElementById('titulo').value,
      resumo: document.getElementById('resumo').value,
      conteudo: document.getElementById('conteudo').value,
      dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
      ativo: true,
      secao: 'noticias'
    });

    msg.className = 'mensagem sucesso';
    msg.textContent = '✅ Notícia publicada!';
    msg.style.display = 'flex';
    e.target.reset();
  } catch (err) {
    msg.className = 'mensagem erro';
    msg.textContent = '❌ Erro: ' + err.message;
    msg.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Publicar Notícia';
  }
});