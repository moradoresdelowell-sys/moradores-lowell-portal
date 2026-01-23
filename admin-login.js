// Login Admin
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Verificar se já está logado
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Verificar se é admin
            db.collection('usuarios').doc(user.uid).get().then(function(doc) {
                if (doc.exists && doc.data().role === 'admin') {
                    window.location.href = 'admin-painel.html';
                }
            });
        }
    });
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        // Limpar mensagem de erro
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        
        try {
            const result = await firebaseUtils.loginAdmin(email, senha);
            
            if (result.success) {
                // Login bem-sucedido, redirecionar para o painel
                window.location.href = 'admin-painel.html';
            } else {
                // Mostrar erro
                errorMessage.textContent = result.error;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'Erro ao fazer login: ' + error.message;
            errorMessage.style.display = 'block';
        }
    });
});