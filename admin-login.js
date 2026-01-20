const ADMIN_EMAIL = "admin@moradoresdelowell.com";
const ADMIN_SENHA = "Admin2024!";

// DEBUG COMPLETO
document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    console.log('=== TENTANDO LOGIN ===');
    console.log('Email digitado:', email);
    console.log('Senha digitada:', senha);
    console.log('Esperado:', ADMIN_EMAIL, ADMIN_SENHA);
    
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        console.log('✅ Credenciais corretas, tentando Firebase...');
        
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, senha);
            console.log('✅ Firebase login OK:', result.user.uid);
            
            localStorage.setItem('adminLogado', 'true');
            window.location.href = 'admin-painel.html';
            
        } catch (error) {
            console.error('❌ Firebase erro completo:', error);
            console.error('Código:', error.code);
            console.error('Mensagem:', error.message);
            
            const erroDiv = document.getElementById('mensagemErro');
            erroDiv.textContent = 'ERRO FIREBASE: ' + error.code + ' - ' + error.message;
            erroDiv.classList.add('show');
        }
    } else {
        console.log('❌ Credenciais incorretas');
        const erroDiv = document.getElementById('mensagemErro');
        erroDiv.textContent = 'Email ou senha incorretos!';
        erroDiv.classList.add('show');
    }
});