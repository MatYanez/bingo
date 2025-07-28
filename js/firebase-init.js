var firebaseConfig = {
  apiKey: "AIzaSyDnOEooygFW9TnafoFhLF3szeoyZCIHA7Q",
  authDomain: "bingo-1b673.firebaseapp.com",
  projectId: "bingo-1b673",
  storageBucket: "bingo-1b673.firebasestorage.app",
  messagingSenderId: "179751163948",
  appId: "1:179751163948:web:4de3b8b670efc83f559989"
};

// Inicializa Firebase solo si aún no ha sido inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Inicializa Firestore y lo expone globalmente
window.db = firebase.firestore();
