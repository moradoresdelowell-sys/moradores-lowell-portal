// ADMIN-LOGIN.JS COMPLETO E FUNCIONAL
console.log('🔧 Login iniciado...');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Carregar Firebase
    const script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
    document.head.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
    document.head.appendChild(script2);
    
    setTimeout(function() {
        const firebaseConfig = {
            apiKey: "AIzaSyCYx6LLnu4tf6OS4W4xPcBprve4IRROtX8",
            authDomain: "moradores-lowell-portal.firebaseapp.com",
            projectId: "moradores-lowell-portal",
            storageBucket: "moradores-lowell-portal.firebasestorage.app",
            messagingSenderId: "967028216371",
            appId: "1:967028216371:web:6d8d01956a2d9b9c6b0946"
        };
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            try {
                // VERIFICAR ADMIN COM ID SEM HÍFEN
                const adminDoc = await db.collection('usuarios').doc('adminprincipal').get();
                
                if (adminDoc.exists) {
                    const adminData = adminDoc.data();
                    if (adminData.email === email && adminData.senha === senha) {
                        window.location.href = 'admin-painel.html';
                        return;
                    }
                }
                
                // Se não encontrou, mostrar erro
                errorMessage.textContent = 'Email ou senha incorretos';
                errorMessage.style.display = 'block';
                
            } catch (error) {
                errorMessage.textContent = 'Erro de conexão';
                errorMessage.style.display = 'block';
            }
        });
    }, 2000);
});
            } catch (error) {
                errorMessage.textContent = 'Erro de conexão';
                errorMessage.style.display = 'block';
                console.error('Erro:', error);
            }
        });
    }, 2000);
});