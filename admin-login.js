document.getElementById('formLogin').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const erro = document.getElementById('mensagemErro');

  try {
    await firebase.auth().signInWithEmailAndPassword(email, senha);

    const adminDoc = await db.collection('admins').doc('admin').get();
    if (adminDoc.exists && adminDoc.data().usuario === email) {
      localStorage.setItem('adminLogado', 'true');
      localStorage.setItem('adminEmail', email);
      window.location.href = 'admin-painel.html';
    } else {
      throw new Error('Você não tem permissão de administrador.');
    }
  } catch (err) {
    erro.textContent = err.message;
    erro.classList.add('show');
  }
});