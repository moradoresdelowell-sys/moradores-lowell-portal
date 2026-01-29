// FIREBASE-CONFIG.JS - VERSÃO FUNCIONAL
console.log('🔧 Carregando Firebase...');

// REMOVER SERVICE WORKER PROBLEMATICO
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
        console.log('✅ Service Workers removidos');
    });
}

// FIREBASE ANTIGO (COMPATÍVEL) - MAIS CONFIÁVEL
// Carregar scripts diretamente (sem import)
document.write('<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"><\/script>');
document.write('<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"><\/script>');
document.write('<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"><\/script>');

// Aguardar carregamento dos scripts
setTimeout(function() {
    // Suas credenciais
    const firebaseConfig = {
        apiKey: "AIzaSyCYx6LLnu4tf6OS4W4xPcBprve4IRROtX8",
        authDomain: "moradores-lowell-portal.firebaseapp.com",
        projectId: "moradores-lowell-portal",
        storageBucket: "moradores-lowell-portal.firebasestorage.app",
        messagingSenderId: "967028216371",
        appId: "1:967028216371:web:6d8d01956a2d9b9c6b0946"
    };

    // Inicializar Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar Firebase:', error);
    }

    // Disponibilizar globalmente
    window.firebaseApp = firebase;
    window.firebaseDb = firebase.firestore();
    window.firebaseAuth = firebase.auth();

    console.log('🚀 Firebase pronto para uso!');
}, 100); // Pequeno delay para garantir carregamento