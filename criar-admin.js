// SISTEMA PARA CRIAR ADMINISTRADOR
document.addEventListener('DOMContentLoaded', function() {
    configurarFormulario();
});

function configurarFormulario() {
    const form = document.getElementById('formCriarAdmin');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nomeAdmin').value;
        const email = document.getElementById('emailAdmin').value;
        const senha = document.getElementById('senhaAdmin').value;
        const senhaConfirma = document.getElementById('senhaAdminConfirma').value;
        
        // Validações
        if (senha.length < 6) {
            mostrarErro('A senha precisa ter no mínimo 6 caracteres!');
            return;
        }
        
        if (senha !== senhaConfirma) {
            mostrarErro('As senhas não coincidem!');
            return;
        }
        
        try {
            // Criar usuário no Firebase Auth
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
            const user = userCredential.user;
            
            // Salvar dados do admin no Firestore
            await db.collection('admin').doc(user.uid).set({
                nome: nome,
                email: email,
                isAdmin: true,
                criadoEm: new Date(),
                ativo: true
            });
            
            // Faz login automaticamente
            await firebase.auth().signInWithEmailAndPassword(email, senha);
            
            // Salva no localStorage
            localStorage.setItem('adminUser', JSON.stringify({
                uid: user.uid,
                email: email,
                nome: nome
            }));
            
            mostrarSucesso('✅ Administrador criado com sucesso!');
            
            // Vai pro admin após 2 segundos
            setTimeout(() => {
                window.location.href = 'admin-anuncios.html';
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao criar admin:', error);
            let mensagemErro = 'Erro ao criar administrador!';
            
            if (error.code === 'auth/email-already-in-use') {
                mensagemErro = 'Este email já está cadastrado!';
            } else if (error.code === 'auth/weak-password') {
                mensagemErro = 'Senha muito fraca!';
            }
            
            mostrarErro(mensagemErro);
        }
    });
}

function mostrarSucesso(mensagem) {
    const sucessoDiv = document.getElementById('mensagemSucesso');
    sucessoDiv.textContent = mensagem;
    sucessoDiv.style.display = 'block';
    
    // Esconde o formulário
    document.getElementById('formCriarAdmin').style.display = 'none';
}

function mostrarErro(mensagem) {
    const erroDiv = document.getElementById('mensagemErro');
    erroDiv.textContent = mensagem;
    erroDiv.style.display = 'block';
    
    setTimeout(() => {
        erroDiv.style.display = 'none';
    }, 5000);
}