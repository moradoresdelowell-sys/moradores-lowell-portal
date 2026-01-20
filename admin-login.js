// LOGIN ADMIN - SISTEMA DE AUTENTICAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    verificarLogin();
    configurarLogin();
});

// Verifica se já está logado
function verificarLogin() {
    const user = localStorage.getItem('adminUser');
    if (user) {
        // Já está logado, vai pro admin
        window.location.href = 'admin-anuncios.html';
    }
}

// Configurar formulário de login
function configurarLogin() {
    const form = document.getElementById('formLogin');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        try {
            // Faz login com email/senha
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
            const user = userCredential.user;
            
            // Verifica se é admin (você vai configurar isso)
            const userDoc = await db.collection('admin').doc(user.uid).get();
            
            if (userDoc.exists && userDoc.data().isAdmin) {
                // Salva no localStorage
                localStorage.setItem('adminUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    nome: userDoc.data().nome
                }));
                
                // Vai pro admin
                window.location.href = 'admin-anuncios.html';
                
            } else {
                // Não é admin
                await firebase.auth().signOut();
                mostrarErro('Acesso negado! Área restrita a administradores.');
            }
            
        } catch (error) {
            console.error('Erro login:', error);
            mostrarErro('Email ou senha incorretos!');
        }
    });
}

function mostrarErro(mensagem) {
    const erroDiv = document.getElementById('mensagemErro');
    erroDiv.textContent = mensagem;
    erroDiv.style.display = 'block';
    
    setTimeout(() => {
        erroDiv.style.display = 'none';
    }, 5000);
}