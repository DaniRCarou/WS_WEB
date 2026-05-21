
export async function sendResetEmail(email) {                               // email → es el parámetro que recibe — el email que introdujo el trabajador

    try {

        const response = await fetch(`http://localhost:8080/password-reset/send?email=${encodeURIComponent(email)}`, {  // fetch → envía una petición HTTP al backend. await → espera a que el backend responda antes de continuar. response → guarda la respuesta HTTP del backend
                                                                                                                        // La URL lleva ?email=${email} — así el email viaja como parámetro en la URL, no en el body, porque el backend lo espera como @RequestParam: @PostMapping("/send")
                                                                                                                        //                                                                                                                                            public ResponseEntity<?> sendResetEmail(@RequestParam String email)

        method: 'POST',     // method: 'POST' → indica que estamos ejecutando una acción en el servidor. Significa que estamos pidiendo al servidor que haga algo — en este caso generar un token y enviar un email. No estamos pidiendo datos (eso sería GET), sino pidiendo que ejecute una acción.
        
    });

    if (response.ok) {              // response.ok → es true si el backend respondió con código 200 — es decir, todo fue bien. Si fue bien → devuelve { success: true } a password_reset.js

        return { success: true };   // Si fue bien → devuelve { success: true } a password_reset.js

    }else {

        const error = await response.text();                                // Extrae el mensaje de error devuelto por el backend como texto.
                
        return { success: false, message: error };                          // Error del backend. Devuelve un objeto indicando fallo y el mensaje de error.
            
    }

    } catch (err) {                                                         // Captura cualquier error que haya ocurrido en el try, por ejemplo que el servidor no esté disponible.
            
        console.error("Error connecting to server:", err);                  // Muestra el error en la consola para desarrolladores.
            
        return { success: false, message: "Server connection error" };      // Error de red. Devuelve un objeto indicando fallo por error de conexión.
        
    }

}




export async function resetPassword(password, token) {

    try {

        const response = await fetch(`http://localhost:8080/password-reset/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`, {  // fetch → envía una petición HTTP al backend. await → espera a que el backend responda antes de continuar. response → guarda la respuesta HTTP del backend
                                                                                                                        // La URL lleva ?email=${email} — así el email viaja como parámetro en la URL, no en el body, porque el backend lo espera como @RequestParam: @PostMapping("/send")
                                                                                                                        //                                                                                                                                            public ResponseEntity<?> sendResetEmail(@RequestParam String email)

        method: 'POST',     // method: 'POST' → indica que estamos ejecutando una acción en el servidor. Significa que estamos pidiendo al servidor que haga algo — en este caso generar un token y enviar un email. No estamos pidiendo datos (eso sería GET), sino pidiendo que ejecute una acción.
        
    });

    if (response.ok) {              // response.ok → es true si el backend respondió con código 200 — es decir, todo fue bien. Si fue bien → devuelve { success: true } a password_reset.js

        return { success: true };   // Si fue bien → devuelve { success: true } a password_reset.js

    }else {

        const error = await response.text();                                // Extrae el mensaje de error devuelto por el backend como texto.
                
        return { success: false, message: error };                          // Error del backend. Devuelve un objeto indicando fallo y el mensaje de error.
            
    }

    } catch (err) {                                                         // Captura cualquier error que haya ocurrido en el try, por ejemplo que el servidor no esté disponible.
            
        console.error("Error connecting to server:", err);                  // Muestra el error en la consola para desarrolladores.
            
        return { success: false, message: "Server connection error" };      // Error de red. Devuelve un objeto indicando fallo por error de conexión.
        
    }

}
