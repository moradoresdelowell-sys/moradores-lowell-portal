// NOVO admin-login.js com módulos ES6
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar Firebase carregar
    setTimeout(async function() {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');
        
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            // Desabilitar botão
            const btn = e.target.querySelector('button');
            btn.textContent = 'ENTRANDO...';
            btn.disabled = true;
            
            try {
                // Usar o novo Firebase
                const auth = window.firebaseAuth;
                const db = window.firebaseDb;
                
                // Criar usuário temporário para teste (já que não temos auth habilitado)
                const userCredential = { user: { uid: 'admin-paulo', email: email } };
                
                // Verificar se existe no banco
                const userDoc = await db.collection('usuarios').doc('admin-paulo').get();
                
                if (userDoc.exists && userDoc.data().role === 'admin') {
                    // Sucesso!
                    window.location.href = 'admin-painel.html';
                } else {
                    // Criar admin se não existir
                    await db.collection('usuarios').doc('admin-paulo').set({
                        nome: 'Administrador',
                        email: email,
                        role: 'admin',
                        criadoEm: new Date()
                    });
                    window.location.href = 'admin-painel.html';
                }
                
            } catch (error) {
                errorMessage.textContent = 'Erro: ' + error.message;
                errorMessage.style.display = 'block';
                btn.textContent = 'ENTRAR';
                btn.disabled = false;
            }
        });
    }, 1000);
});