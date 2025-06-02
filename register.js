// frontend/register.js

const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessageDiv = document.getElementById('errorMessage');
const successMessageDiv = document.getElementById('successMessage');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        errorMessageDiv.textContent = ''; // Limpiar mensajes
        successMessageDiv.textContent = ''; // Limpiar mensajes

        // 1. Validación básica de contraseñas
        if (password !== confirmPassword) {
            errorMessageDiv.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        // Puedes añadir más validaciones de complejidad de contraseña aquí (ej. longitud mínima)
        if (password.length < 6) { // Firebase requiere un mínimo de 6 caracteres
            errorMessageDiv.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            return;
        }

        try {
            // 2. Crear usuario con correo y contraseña
            // Esta función registra al usuario en Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            console.log('Usuario registrado:', user.email);

            // 3. Enviar correo de verificación
            // Es crucial que el usuario verifique su correo para confirmar que es el dueño
            await user.sendEmailVerification();

            successMessageDiv.textContent = '¡Registro exitoso! Se ha enviado un correo de verificación a tu dirección. Por favor, revisa tu bandeja de entrada (y spam).';

            // Opcional: Limpiar el formulario después del registro
            registerForm.reset();

            // Opcional: Redirigir al usuario a una página de "Verifica tu correo"
            // window.location.href = 'verify-email.html';

        } catch (error) {
            console.error('Error al registrar usuario:', error.code, error.message);
            // Mostrar mensajes de error amigables
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessageDiv.textContent = 'El correo electrónico ya está registrado.';
                    break;
                case 'auth/invalid-email':
                    errorMessageDiv.textContent = 'El formato del correo electrónico es inválido.';
                    break;
                case 'auth/weak-password':
                    errorMessageDiv.textContent = 'La contraseña es demasiado débil. Usa una combinación de letras, números y símbolos.';
                    break;
                default:
                    errorMessageDiv.textContent = 'Error al registrar usuario. Por favor, inténtelo de nuevo.';
                    break;
            }
        }
    });
} else {
    console.error("El formulario con ID 'registerForm' no fue encontrado en el DOM.");
}

// Opcional: Manejar el estado de autenticación (si el usuario ya está logueado, redirigir)
// Esto es menos común en la página de registro, pero podría ser útil
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Si el usuario ya está logueado, podríamos redirigirlo al dashboard
        // console.log('Usuario ya logueado:', user.email);
        // window.location.href = 'dashboard.html';
    }
});