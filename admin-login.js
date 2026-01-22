// Login com Firebase Auth
document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const erroDiv = document.getElementById('mensagemErro');

    try {
        // Faz login no Firebase
        await firebase.auth().signInWithEmailAndPassword(email, senha);
        
        // Verifica se é admin
        const user = firebase.auth().currentUser;
        const adminDoc = await db.collection('admin').doc(user.uid).get();
        
        if (adminDoc.exists && adminDoc.data().isAdmin) {
            localStorage.setItem('adminLogado', 'true');
            localStorage.setItem('adminEmail', user.email);
            window.location.href = 'admin-painel.html';
        } else {
            throw new Error('Você não tem permissão de administrador.');
        }
        
    } catch (error) {
        erroDiv.textContent = error.message;
        erroDiv.classList.add('show');
    }
});