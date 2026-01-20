// Configurações do admin
const ADMIN_EMAIL = "admin@moradoresdelowell.com";
const ADMIN_SENHA = "Admin2024!";

document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        try {
            // Faz login no Firebase
            await firebase.auth().signInWithEmailAndPassword(email, senha);
            
            // Salva no localStorage
            localStorage.setItem('adminLogado', 'true');
            
            // Vai pro painel
            window.location.href = 'admin-painel.html';
            
        } catch (error) {
            console.error('Erro Firebase:', error);
            const erroDiv = document.getElementById('mensagemErro');
            erroDiv.textContent = 'Erro ao conectar com o banco de dados: ' + error.message;
            erroDiv.classList.add('show');
            
            setTimeout(() => {
                erroDiv.classList.remove('show');
            }, 3000);
        }
    } else {
        const erroDiv = document.getElementById('mensagemErro');
        erroDiv.textContent = 'Email ou senha incorretos!';
        erroDiv.classList.add('show');
        
        setTimeout(() => {
            erroDiv.classList.remove('show');
        }, 3000);
    }
});