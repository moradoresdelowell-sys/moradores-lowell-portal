if (!localStorage.getItem('adminLogado')) {
  window.location.href = 'admin-login.html';
}

const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@moradoresdelowell.com';
  document.getElementById('adminEmail').textContent = adminEmail;
  carregarEstatisticas();
});

function sairAdmin() {
  if (confirm('Tem certeza que deseja sair?')) {
    localStorage.removeItem('adminLogado');
    localStorage.removeItem('adminEmail');
    window.location.href = 'admin-login.html';
  }
}

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