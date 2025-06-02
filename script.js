// frontend/script.js (Este es el NUEVO archivo)

// Obtenemos referencias a los elementos del DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessageDiv = document.getElementById('errorMessage');

// Nueva referencia para el botón de Google
const googleSignInBtn = document.getElementById('googleSignInBtn');
// Agregamos un "escuchador" de eventos al formulario para cuando se envíe
if (loginForm) { // Siempre es buena práctica verificar si el elemento existe
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario

        const email = emailInput.value;
        const password = passwordInput.value;
        errorMessageDiv.textContent = ''; // Limpiamos cualquier mensaje de error anterior

        // Añade un console.log aquí para saber si el evento 'submit' se está disparando
        console.log('Intento de login con:', email);

        try {
            // La función signInWithEmailAndPassword es parte del módulo de autenticación de Firebase
            // firebase.auth() es el objeto de autenticación una vez que Firebase está inicializado
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            console.log('¡Inicio de sesión exitoso!', user.email);
            // Aquí puedes redirigir al usuario a una página protegida o al dashboard
            window.location.href = 'dashboard.html'; // Ejemplo: Redirige a 'dashboard.html'

        } catch (error) {
            console.error('Error al iniciar sesión:', error.code, error.message);
            // Mostrar un mensaje de error específico al usuario
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessageDiv.textContent = 'No existe un usuario con ese correo electrónico.';
                    break;
                case 'auth/wrong-password':
                    errorMessageDiv.textContent = 'Contraseña incorrecta.';
                    break;
                case 'auth/invalid-email':
                    errorMessageDiv.textContent = 'El formato del correo electrónico es inválido.';
                    break;
                case 'auth/too-many-requests':
                    errorMessageDiv.textContent = 'Demasiados intentos fallidos. Inténtelo de nuevo más tarde.';
                    break;
                default:
                    errorMessageDiv.textContent = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
                    break;
            }
        }
    });
} else {
    console.error("El formulario con ID 'loginForm' no fue encontrado en el DOM.");
}

// Lógica para INICIAR SESIÓN CON GOOGLE
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
        errorMessageDiv.textContent = ''; // Limpiar mensajes de error
        try {
            // Crea una instancia del proveedor de autenticación de Google
            const provider = new firebase.auth.GoogleAuthProvider();

            // Opcional: Puedes añadir scopes si necesitas acceder a más información del perfil de Google
            provider.addScope('profile');
            provider.addScope('email');

            // Inicia sesión usando un pop-up (ventana emergente)
            const result = await firebase.auth().signInWithPopup(provider);
            const user = result.user; // El objeto de usuario autenticado

            console.log('¡Inicio de sesión exitoso con Google!', user.displayName, user.email);

            // Redirigir al usuario al dashboard después de un inicio de sesión exitoso
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error.code, error.message);
            // Manejo de errores específicos de Google
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessageDiv.textContent = 'Inicio de sesión con Google cancelado por el usuario.';
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessageDiv.textContent = 'Ya hay una ventana emergente de Google abierta. Por favor, complétela o ciérrela.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessageDiv.textContent = 'Ya existe una cuenta con este correo electrónico. Por favor, inicie sesión con su método original o use otro correo.';
                    // Aquí podrías implementar la vinculación de cuentas si lo deseas
                    break;
                default:
                    errorMessageDiv.textContent = 'Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.';
                    break;
            }
        }
    });
}
// Opcional: Esto detecta si el usuario ya está autenticado cuando carga la página
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuario ya autenticado:', user.email);
        // window.location.href = 'dashboard.html'; // Descomenta si quieres redirección automática
    } else {
        console.log('No hay usuario autenticado actualmente.');
    }
});