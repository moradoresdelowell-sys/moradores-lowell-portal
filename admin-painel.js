// Verifica login
if (!localStorage.getItem('adminLogado')) {
  window.location.href = 'admin-login.html';
}

// Login simples (sem Firebase Auth)
const adminEmail = 'admin@moradoresdelowell.com';
const adminSenha = 'ph140204';

// Mostra email
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('adminEmail').textContent = localStorage.getItem('adminEmail') || adminEmail;
  carregarEstatisticas();
});

// Sair
function sairAdmin() {
  if (confirm('Tem certeza que deseja sair?')) {
    localStorage.removeItem('adminLogado');
    localStorage.removeItem('adminEmail');
    window.location.href = 'admin-login.html';
  }
}

// Carrega estatísticas (sem erros)
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
    console.log('Erro ao carregar estatísticas:', error);
  }
}