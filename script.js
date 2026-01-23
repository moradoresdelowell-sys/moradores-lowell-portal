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

// Carrega destaques
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
          <img src="${d.imagem}" alt="">
          <div class="card-content">
            <strong>${d.titulo}</strong><br>
            <small>${d.descricao}</small>
          </div>
        </div>`;
    });
  });

// Carrega classificados
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
          <a href="https://wa.me/1${c.telefone.replace(/\D/g,'')}" target="_blank">WhatsApp</a>
        </div>`;
    });
  });