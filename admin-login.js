document.getElementById('formLogin').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const erro = document.getElementById('mensagemErro');

  try {
    // Busca o admin no Firestore
    const adminDoc = await db.collection('admins').doc('admin').get();

    if (adminDoc.exists && adminDoc.data().usuario === email && adminDoc.data().senha === senha) {
      localStorage.setItem('adminLogado', 'true');
      localStorage.setItem('adminEmail', email);
      window.location.href = 'admin-painel.html';
    } else {
      erro.textContent = 'Email ou senha incorretos.';
      erro.classList.add('show');
    }
  } catch (err) {
    erro.textContent = 'Erro ao verificar login: ' + err.message;
    erro.classList.add('show');
  }
});