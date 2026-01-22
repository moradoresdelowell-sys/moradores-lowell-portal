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

// Player rádio
const player = document.getElementById("radio-player");
const btn = document.getElementById("play-btn");
btn.onclick = () => {
  if (player.paused) {
    player.play();
    btn.textContent = "⏸️";
  } else {
    player.pause();
    btn.textContent = "▶️";
  }
};

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
        <div style="display:inline-block;margin:.5rem;background:#fff;border:1px solid #ddd;border-radius:6px;width:260px">
          <img src="${d.imagem}" style="width:100%;height:150px;object-fit:cover;border-radius:6px 6px 0 0">
          <div style="padding:.75rem">
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
        <div style="background:#f9f9f9;border:1px solid #ddd;border-radius:6px;padding:1rem;margin:.5rem 0">
          <strong>${c.titulo}</strong><br>
          <small>${c.descricao}</small><br>
          <a href="https://wa.me/1${c.telefone.replace(/\D/g,'')}" target="_blank">WhatsApp</a>
        </div>`;
    });
  });