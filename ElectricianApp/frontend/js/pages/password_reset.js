

// Importa la función que envía el email de reset al backend
import { sendResetEmail } from '../api/passwordReset.api.js';


const resetForm = document.querySelector('#reset-form');


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