// VERSÃO SUPERSIMPLIFICADA - SÓ PRA TESTAR
console.log("=== TESTANDO FIREBASE ===");

// Remove analytics que tá dando erro
if (typeof firebase !== 'undefined' && firebase.analytics) {
    console.log("Analytics disponível");
} else {
    console.log("Analytics NÃO disponível - vamos sem ele!");
}

document.getElementById('formCriarAdmin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        console.log("=== TENTANDO CRIAR USUÁRIO ===");
        
        const email = document.getElementById('emailAdmin').value;
        const senha = document.getElementById('senhaAdmin').value;
        
        console.log("Email:", email);
        console.log("Senha:", senha.length, "caracteres");
        
        // Tenta criar usuário
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        console.log("✅ SUCESSO! UID:", userCredential.user.uid);
        
        alert('✅ Usuário criado com sucesso! UID: ' + userCredential.user.uid);
        
    } catch (error) {
        console.error('❌ ERRO COMPLETO:', error);
        console.error('Código:', error.code);
        console.error('Mensagem:', error.message);
        
        let msg = 'Erro: ';
        if (error.code === 'auth/configuration-not-found') {
            msg += 'Auth não configurado no Firebase Console!';
        } else if (error.code === 'auth/email-already-in-use') {
            msg += 'Email já existe!';
        } else if (error.code === 'auth/weak-password') {
            msg += 'Senha muito fraca!';
        } else {
            msg += error.message;
        }
        
        alert(msg);
    }
});