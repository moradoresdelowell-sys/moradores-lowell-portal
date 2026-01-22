// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1k5lG6m5s6Z5B5B5B5B5B5B5B5B5B5B5B5",
  authDomain: "moradores-lowell.firebaseapp.com",
  projectId: "moradores-lowell",
  storageBucket: "moradores-lowell.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// FUNÇÕES RÁPIDAS PARA CRIAR DADOS FAKE
window.criarDestaquesFake = async () => {
  const batch = db.batch();
  const dest = db.collection("destaques");
  batch.set(dest.doc("1"), { titulo: "Apartamento 2 qtos", descricao: "Centro - $1.800", imagem: "https://via.placeholder.com/300x200?text=Apartamento", destaque: true });
  batch.set(dest.doc("2"), { titulo: "Vaga de garagem", descricao: "Centro - $150/mês", imagem: "https://via.placeholder.com/300x200?text=Garagem", destaque: true });
  batch.set(dest.doc("3"), { titulo: "Sala comercial", descricao: "Downtown - $900", imagem: "https://via.placeholder.com/300x200?text=Sala", destaque: true });
  await batch.commit();
  alert("3 destaques criados! Atualize a página.");
};

window.criarClassificadosFake = async () => {
  const batch = db.batch();
  const col = db.collection("classificados");
  batch.set(col.doc("1"), { titulo: "Geladeira usada", descricao: "Em perfeito estado - $250", telefone: "978-555-1111", categoria: "eletro" });
  batch.set(col.doc("2"), { titulo: "Cadeira de escritório", descricao: "Ajustável - $80", telefone: "978-555-2222", categoria: "móvel" });
  batch.set(col.doc("3"), { titulo: "Aula de inglês", descricao: "Particular - $25/h", telefone: "978-555-3333", categoria: "serviço" });
  await batch.commit();
  alert("3 classificados criados! Atualize a página.");
};

window.criarAdmin = async () => {
  const admins = db.collection("admins").doc("admin");
  await admins.set({ usuario: "admin", senha: "123456" });
  alert("Admin criado! Login: admin / senha: 123456");
};

// FUNÇÕES RÁPIDAS
window.criarDestaquesFake = async () => {
  const batch = db.batch();
  const dest = db.collection("destaques");
  batch.set(dest.doc("1"), { titulo: "Apartamento 2 qtos", descricao: "Centro - $1.800", imagem: "https://via.placeholder.com/300x200?text=Apartamento", destaque: true });
  batch.set(dest.doc("2"), { titulo: "Vaga de garagem", descricao: "Centro - $150/mês", imagem: "https://via.placeholder.com/300x200?text=Garagem", destaque: true });
  batch.set(dest.doc("3"), { titulo: "Sala comercial", descricao: "Downtown - $900", imagem: "https://via.placeholder.com/300x200?text=Sala", destaque: true });
  await batch.commit();
  alert("3 destaques criados! Atualize a página.");
};

window.criarClassificadosFake = async () => {
  const batch = db.batch();
  const col = db.collection("classificados");
  batch.set(col.doc("1"), { titulo: "Geladeira usada", descricao: "Em perfeito estado - $250", telefone: "978-555-1111", categoria: "eletro" });
  batch.set(col.doc("2"), { titulo: "Cadeira de escritório", descricao: "Ajustável - $80", telefone: "978-555-2222", categoria: "móvel" });
  batch.set(col.doc("3"), { titulo: "Aula de inglês", descricao: "Particular - $25/h", telefone: "978-555-3333", categoria: "serviço" });
  await batch.commit();
  alert("3 classificados criados! Atualize a página.");
};

window.criarAdmin = async () => {
  const admins = db.collection("admins").doc("admin");
  await admins.set({ usuario: "admin", senha: "123456" });
  alert("Admin criado! Login: admin / senha: 123456");
};