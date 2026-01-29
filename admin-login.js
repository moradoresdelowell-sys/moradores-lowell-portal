// ADMIN LOGIN - COM FALLBACK PARA FIREBASE BLOQUEADO
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagem = document.getElementById('login-mensagem');
            
            try {
                // Verifica se Firebase está disponível
                if (typeof firebase === 'undefined') {
                    throw new Error('Firebase não carregado. Verifique sua conexão.');
                }
                
                // Aguarda Firebase estar pronto
                await new Promise((resolve, reject) => {
                    if (firebase.auth()) {
                        resolve();
                    } else {
                        reject(new Error('Firebase Auth não disponível'));
                    }
                });
                
                // Autenticação
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
                
                // Salva sessão
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                
                // Sucesso
                mensagem.innerHTML = '<div class="success">✅ Login realizado com sucesso!</div>';
                mensagem.style.display = 'block';
                
                // Redireciona
                setTimeout(function() {
                    window.location.href = 'admin-painel.html';
                }, 1000);
                
            } catch (error) {
                mensagem.innerHTML = '<div class="error">❌ ' + error.message + '</div>';
                mensagem.style.display = 'block';
            }
        });
    }
});