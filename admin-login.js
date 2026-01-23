// Login Simples e Funcional
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        // Mostrar loading
        const btn = e.target.querySelector('button');
        btn.textContent = 'ENTRANDO...';
        btn.disabled = true;
        
        try {
            const result = await firebaseUtils.loginAdmin(email, senha);
            
            if (result.success) {
                // Sucesso! Redirecionar
                window.location.href = 'admin-painel.html';
            } else {
                // Erro
                errorMessage.textContent = result.error;
                errorMessage.style.display = 'block';
                btn.textContent = 'ENTRAR';
                btn.disabled = false;
            }
        } catch (error) {
            errorMessage.textContent = 'Erro de conexão. Tente novamente.';
            errorMessage.style.display = 'block';
            btn.textContent = 'ENTRAR';
            btn.disabled = false;
        }
    });
});