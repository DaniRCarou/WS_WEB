

// Importa las funciones que se comunican con el backend para el reset de contraseña
// sendResetEmail → envía el email con el enlace de reset
// resetPassword → envía el token y la nueva contraseña para completar el reset
import { sendResetEmail, resetPassword } from '../api/passwordReset.api.js';




// window.location.search → es una propiedad del navegador que devuelve la parte de la URL que empieza por ?. Por ejemplo si la URL es http://127.0.0.1:5500?token=abc123, devuelve ?token=abc123.
// new URLSearchParams(...) → es una clase de JavaScript que convierte ese texto en un objeto con el que puedes buscar parámetros fácilmente.
const urlParams = new URLSearchParams(window.location.search);

// urlParams.get('token') → busca el parámetro llamado token y devuelve su valor. Si no existe devuelve null.
const token = urlParams.get('token');

const resetForm = document.querySelector('#reset-form');

if (resetForm) {

    resetForm.addEventListener('submit', async (e) => {     // async → marca la función como asíncrona porque dentro vamos a usar await — necesitamos esperar la respuesta del backend antes de continuar. Sin async no puedes usar await. El backend devuelve siempre un mensaje de texto: "If the email exists, a reset link has been sent". Siempre el mismo mensaje — tanto si el email existe como si no. Por seguridad. El frontend simplemente muestra ese mensaje al usuario — algo como "Si tu email está registrado, recibirás un enlace".
                                                            // Cuando el usuario pulsa submit, el navegador crea automáticamente un objeto con información sobre ese evento — qué botón se pulsó, en qué formulario, en qué momento, etc.
                                                            // Ese objeto se lo pasa automáticamente a tu función. Tú lo recibes en el parámetro e — el nombre e es arbitrario, podrías llamarlo event o x, da igual. Y dentro de ese objeto hay un método preventDefault() que cancela el comportamiento por defecto del navegador.
                                                            // Es decir: El navegador crea el objeto del evento, te lo pasa a tu función como e, tú usas e.preventDefault() para cancelar la recarga

        e.preventDefault();        // cuando pulsas submit en un formulario HTML, el navegador por defecto intenta enviar los datos y recargar la página. Eso borraría todo y no llegaríamos a llamar al backend.
                                    // e.preventDefault() cancela ese comportamiento para que podamos gestionar el submit nosotros con JavaScript.


        const email = document.querySelector('#reset-email').value;

        const result = await sendResetEmail(email);

        if (result.success) {

            alert(window.currentLanguageData?.alerts?.resetEmailSent || "If your email is registered, you will receive a reset link");

        } else {

            alert('Error: ' + result.message);

        }

        document.querySelector('#reset-email').value = '';

    });
}






// ------------------------ FORMULARIO DE NUEVA CONTRASEÑA ------------------------
// Cuando el empleado hace clic en el enlace del email, la URL contiene el token.
// Este bloque recoge la nueva contraseña, comprueba que coincide con la confirmación
// y la envía al backend junto con el token para completar el reset.



// Selecciona el formulario de nueva contraseña del HTML por su id
// Si no hay token en la URL este formulario no existe — por eso comprobamos antes de usarlo
const newPasswordForm = document.querySelector('#new-password-form');

// Comprueba que el formulario existe antes de añadir el listener
// Si newPasswordForm es null (no existe en el DOM) y llamamos a addEventListener → el programa se rompe
// El if evita ese error — solo ejecuta el código si el formulario existe
if (newPasswordForm) {

    // Escucha el evento submit del formulario
    // async → necesitamos await dentro para esperar la respuesta del backend
    // e → objeto del evento, lo usamos para cancelar el comportamiento por defecto
    newPasswordForm.addEventListener('submit', async (e) => {

        // Cancela la recarga de página que haría el navegador por defecto al pulsar submit
        e.preventDefault();

        // Lee el valor del input de nueva contraseña
        // .value → obtiene el texto escrito dentro del input en ese momento
        const newPassword = document.querySelector('#new-password').value;

        // Lee el valor del input de confirmación de contraseña
        const confirmPassword = document.querySelector('#confirm-password').value;

        // Comprueba que las dos contraseñas son iguales
        // !== → "es diferente de". Si son distintas → muestra alerta y para
        // return → detiene la ejecución — no envía nada al backend
        if (newPassword !== confirmPassword) {
            alert(window.currentLanguageData?.alerts?.passwordsDoNotMatch || "Passwords do not match");
            return;
        }

        // llamar al backend con el token y la nueva contraseña
        // Llama a la función del api que envía el token y la nueva contraseña al backend
        // newPassword → la nueva contraseña introducida por el trabajador
        // token → el token leído de la URL al principio del archivo
        const result = await resetPassword(newPassword, token);

        // Comprueba si el reset fue exitoso
        if (result.success) {

            // Si fue bien → muestra mensaje de éxito y redirige al login
            // window.location.href → cambia la URL del navegador, redirigiendo a otra página
            alert(window.currentLanguageData?.alerts?.passwordResetSuccess || "Password reset successfully. Please login.");
            window.location.href = 'index.html';

        } else {

            // Si hubo error → muestra mensaje de token inválido o expirado
            alert(window.currentLanguageData?.alerts?.invalidToken || "This reset link is invalid or has expired");

        }

    });

}