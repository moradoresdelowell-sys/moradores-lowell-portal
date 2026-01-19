// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYx6LLnu4tf6OS4W4xPcBprve4IRROtX8",
  authDomain: "moradores-lowell-portal.firebaseapp.com",
  projectId: "moradores-lowell-portal",
  storageBucket: "moradores-lowell-portal.firebasestorage.app",
  messagingSenderId: "967028216371",
  appId: "1:967028216371:web:b35abe9e38877fdc6b0946",
  measurementId: "G-LV936QFH1L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();

// Exporta para uso global
window.firebaseApp = {
  db: db,
  auth: auth,
  analytics: analytics
};