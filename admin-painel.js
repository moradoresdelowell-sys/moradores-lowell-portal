// Verifica login
if (!localStorage.getItem('adminLogado')) {
  window.location.href = 'admin-login.html';
}

// Faz login no Firebase (CORRIGIDO)
firebase.auth().signInWithEmailAndPassword('admin@moradoresdelowell.com', 'ph140204');

// Função sair
function sairAdmin() {
  const confirmar = confirm('Tem certeza que deseja sair do sistema?');
  if (confirmar) {
    try {
      localStorage.removeItem('adminLogado');
      localStorage.removeItem('adminEmail');
      firebase.auth().signOut().then(() => {
        window.location.href = 'admin-login.html';
      });
    } catch (error) {
      window.location.href = 'admin-login.html';
    }
  }
}

// Mostra email do admin
document.addEventListener('DOMContentLoaded', function() {
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@moradoresdelowell.com';
  document.getElementById('adminEmail').textContent = adminEmail;
  const btnSair = document.querySelector('.btn-sair');
  if (btnSair) {
    btnSair.addEventListener('click', sairAdmin);
  }
  carregarEstatisticas();
});

// Carrega estatísticas
async function carregarEstatisticas() {
  try {
    const [anuncios, vagas, aluguel, estab] = await Promise.all([
      db.collection('classificados').where('ativo', '==', true).get(),
      db.collection('vagas').where('ativo', '==', true).get(),
      db.collection('aluguel').where('ativo', '==', true).get(),
      db.collection('estabelecimentos').where('ativo', '==', true).get()
    ]);

    document.getElementById('totalAnuncios').textContent = anuncios.size;
    document.getElementById('totalVagas').textContent = vagas.size;
    document.getElementById('totalAluguel').textContent = aluguel.size;
    document.getElementById('totalEstabelecimentos').textContent = estab.size;
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
  }
}