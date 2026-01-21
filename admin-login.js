const ADMIN_EMAIL = "admin@moradoresdelowell.com";
const ADMIN_SENHA = "Admin2024!";

document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, senha);
            localStorage.setItem('adminLogado', 'true');
            window.location.href = 'admin-painel.html';
        } catch (error) {
            const erroDiv = document.getElementById('mensagemErro');
            erroDiv.textContent = 'Erro ao conectar: ' + error.message;
            erroDiv.classList.add('show');
        }
    } else {
        const erroDiv = document.getElementById('mensagemErro');
        erroDiv.textContent = 'Email ou senha incorretos!';
        erroDiv.classList.add('show');
    }
});