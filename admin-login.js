// LOGIN ADMIN - CORRIGIDO
document.addEventListener('DOMContentLoaded', function() {
    verificarLogin();
    configurarFormulario();
});

function verificarLogin() {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
        window.location.href = 'admin-painel.html';
    }
}

function configurarFormulario() {
    const form = document.getElementById('formLogin');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        try {
            console.log("Tentando login...", email);
            
            // Faz login
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
            const user = userCredential.user;
            
            console.log("Login Auth OK! UID:", user.uid);
            
            // VERIFICA SE É ADMIN NO BANCO DE DADOS
            const adminDoc = await db.collection('admin').doc(user.uid).get();
            
            console.log("Documento admin existe:", adminDoc.exists);
            
            if (adminDoc.exists && adminDoc.data().isAdmin === true) {
                console.log("✅ É ADMIN! Entrando...");
                
                // Salva no localStorage
                localStorage.setItem('adminUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    nome: adminDoc.data().nome
                }));
                
                // Vai pro painel
                window.location.href = 'admin-painel.html';
                
            } else {
                console.log("❌ NÃO é admin ou documento não existe!");
                
                // Não é admin, desloga
                await firebase.auth().signOut();
                mostrarErro('Acesso negado! Você não tem permissão de administrador.');
            }
            
        } catch (error) {
            console.error('❌ Erro completo:', error);
            let mensagemErro = 'Email ou senha incorretos!';
            
            if (error.code === 'auth/user-not-found') {
                mensagemErro = 'Usuário não encontrado!';
            } else if (error.code === 'auth/wrong-password') {
                mensagemErro = 'Senha incorreta!';
            } else if (error.code === 'auth/invalid-email') {
                mensagemErro = 'Email inválido!';
            }
            
            mostrarErro(mensagemErro);
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

// DEPOIS DE CRIAR O ADMIN - MUDA O REDIRECIONAMENTO
// troca de: window.location.href = 'admin-anuncios.html';
// pra: window.location.href = 'admin-painel.html';