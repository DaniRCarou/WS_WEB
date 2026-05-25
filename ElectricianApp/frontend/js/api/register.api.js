

export async function registerEmployee(employeeId, firstName, surname, email, password, department){


    const data = { employeeId, firstName, surname, email, password, department: { departmentId: department } }; 


    try {

        const response = await fetch('http://localhost:8080/employees/register', { 

            method: 'POST',                                                         // Especifica el tipo de solicitud HTTP. 'POST' → Indica que vamos a enviar datos al backend.
           
            headers: { 'Content-Type': 'application/json' },                        // Cabeceras HTTP que dicen al servidor cómo interpretar la solicitud. { 'Content-Type': 'application/json' } → Indica que los datos enviados estarán en formato JSON, que es lo que el backend espera. application -> Es un tipo de “media type” o MIME type. Significa que el contenido es datos para ser procesados por una aplicación, no texto plano (text/plain) ni una imagen (image/png). json -> Indica que los datos están en formato JSON (JavaScript Object Notation), es decir, un texto estructurado con llaves {} y pares clave:valor. 
            
            body: JSON.stringify(data)                                              // Contenido que se envía en la solicitud POST. JSON.stringify(data) → Convierte el objeto data en una cadena JSON, porque fetch solo puede enviar texto, no objetos JavaScript puros.
        
        });


        if (response.ok) {

            return { success: true };

        } else {

            const error = await response.text();                                    // Extrae el mensaje de error devuelto por el backend como texto.

            return { success: false, message: error };                              // Error del backend. Devuelve un objeto indicando fallo y el mensaje de error.

        }

    } catch (err) {                                                                 // Captura cualquier error que haya ocurrido en el try, por ejemplo que el servidor no esté disponible.

                console.error("Error connecting to server:", err);                          // Muestra el error en la consola para desarrolladores.

                return { success: false, message: "Server connection error" };              // Error de red. Devuelve un objeto indicando fallo por error de conexión.

    }
}