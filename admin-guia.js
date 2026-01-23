// Envia formulário
document.getElementById('formEstab').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.querySelector('.btn-cadastrar');
  const msg = document.getElementById('mensagem');
  btn.disabled = true;
  btn.textContent = 'Cadastrando...';

  try {
    await db.collection('estabelecimentos').add({
      nome: document.getElementById('nome').value,
      categoria: document.getElementById('categoria').value,
      descricao: document.getElementById('descricao').value,
      telefone: document.getElementById('telefone').value,
      dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
      ativo: true,
      secao: 'estabelecimentos'
    });

    msg.className = 'mensagem sucesso';
    msg.textContent = '✅ Estabelecimento cadastrado!';
    msg.style.display = 'flex';
    e.target.reset();
  } catch (err) {
    msg.className = 'mensagem erro';
    msg.textContent = '❌ Erro: ' + err.message;
    msg.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Cadastrar Estabelecimento';
  }
});