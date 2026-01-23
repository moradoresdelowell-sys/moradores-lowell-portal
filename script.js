// Menu hamburguer
document.getElementById("menu-toggle").onclick = () =>
  document.getElementById("menu").classList.toggle("open");

// Navegação suave
document.querySelectorAll("nav a").forEach(a => {
  a.onclick = e => {
    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    document.getElementById("menu").classList.remove("open");
  };
});

// 🔴 CARREGA DESTAQUES (como nas fotos)
db.collection("destaques").where("destaque", "==", true).limit(3)
  .onSnapshot(snap => {
    const container = document.getElementById("destaques-container");
    if (snap.empty) {
      container.innerHTML = "<p>Nenhum destaque ainda. Clique no botão acima para criar.</p>";
      return;
    }
    container.innerHTML = "";
    snap.forEach(doc => {
      const d = doc.data();
      container.innerHTML += `
        <div class="card">
          <img src="${d.imagem}" alt="${d.titulo}">
          <div class="card-content">
            <strong>${d.titulo}</strong><br>
            <small>${d.descricao}</small><br>
            <span class="card-endereco">📍 ${d.endereco}</span><br>
            <span class="card-telefone">📞 ${d.telefone}</span><br>
            <button class="btn-detalhes" onclick="alert('Detalhes: ${d.titulo}')">Ver Detalhes</button>
          </div>
        </div>`;
    });
  });

// 🔴 CARREGA CLASSIFICADOS
db.collection("classificados").limit(3)
  .onSnapshot(snap => {
    const container = document.getElementById("classificados-container");
    if (snap.empty) {
      container.innerHTML = "<p>Nenhum classificado ainda. Clique no botão acima para criar.</p>";
      return;
    }
    container.innerHTML = "";
    snap.forEach(doc => {
      const c = doc.data();
      container.innerHTML += `
        <div class="card-list-item">
          <strong>${c.titulo}</strong><br>
          <small>${c.descricao}</small><br>
          <a href="https://wa.me/1${c.telefone.replace(/\D/g,'')}" target="_blank" class="whatsapp-link">💬 WhatsApp</a>
        </div>`;
    });
  });

// 🔴 **NOVO: CARREGA NOTÍCIAS**
db.collection("noticias").orderBy("data", "desc").limit(3)
  .onSnapshot(snap => {
    const container = document.getElementById("noticias-container");
    if (snap.empty) {
      container.innerHTML = "<p class='erro'>Erro ao carregar notícias.</p>";
      return;
    }
    container.innerHTML = "";
    snap.forEach(doc => {
      const n = doc.data();
      container.innerHTML += `
        <div class="noticia-card">
          <h3>${n.titulo}</h3>
          <p>${n.resumo || n.descricao}</p>
          <small>${n.data ? n.data.toDate().toLocaleDateString() : 'Sem data'}</small>
        </div>`;
    });
  }, err => {
    document.getElementById("noticias-container").innerHTML = "<p class='erro'>Erro ao carregar notícias.</p>";
  });