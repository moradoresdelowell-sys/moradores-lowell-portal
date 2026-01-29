// ADMIN LOGIN - CÓDIGO COMPLETO E FUNCIONAL
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagem = document.getElementById('login-mensagem');
            
            try {
                // Autenticação no Firebase
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
                
                // Salva sessão no localStorage
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                
                // Mostra mensagem de sucesso
                mensagem.innerHTML = '<div class="success">✅ Login realizado com sucesso!</div>';
                mensagem.style.display = 'block';
                
                // Aguarda 1 segundo e redireciona
                setTimeout(function() {
                    window.location.href = 'admin-painel.html';
                }, 1000);
                
            } catch (error) {
                // Erro no login
                mensagem.innerHTML = '<div class="error">❌ ' + error.message + '</div>';
                mensagem.style.display = 'block';
            }
        });
    }
});