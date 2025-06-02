// firebase-config.js

// Tu configuración de Firebase, obtenida directamente de la consola de Firebase.
// ¡No compartas tu apiKey ni ningún otro dato sensible públicamente en una aplicación del lado del cliente!
// Firebase Authentication está diseñado para ser seguro incluso con apiKey expuesta,
// pero sé consciente de lo que expones.

const firebaseConfig = {
    apiKey: "AIzaSyDx6Kpb1w92ixukoKialDNDnKTWPUuRN5M", // Ejemplo: "AIzaSyC0s-YourActualApiKey"
    authDomain: "b2enviosfirst.firebaseapp.com", // Ejemplo: "your-project.firebaseapp.com"
    projectId: "b2enviosfirst", // Ejemplo: "your-project-id-12345"
    storageBucket: "b2enviosfirst.firebasestorage.app", // Ejemplo: "your-project.appspot.com"
    messagingSenderId: "299713069311", // Ejemplo: "1234567890"
    appId: "1:299713069311:web:a6e02cfa246acd47494cca" // Ejemplo: "1:1234567890:web:abcdef123456"
};

// Inicializa Firebase con tu configuración.
// Asegúrate de que esta línea esté presente y se ejecute.
firebase.initializeApp(firebaseConfig);

// Opcional: Para depuración, puedes ver la configuración en la consola.
// console.log("Firebase initialized with config:", firebaseConfig.projectId);