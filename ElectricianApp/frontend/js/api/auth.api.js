
/* 
ESTE ARCHIVO ESTÁ PREPARADO PARA: 
- separar la comunicación con el backend (API) del login.js. 
- se encarga solo de hablar con el backend, enviar datos, recibir respuestas.
- Facilita reutilizar la API desde otras páginas (por ejemplo registro, perfil, etc.). 
- Mejora la mantenibilidad y pruebas unitarias.

Solo se encarga de enviar datos al servidor y devolver la respuesta. No toca el HTML, no muestra alertas, no cambia vistas.
*/






// -------------------------------------COMUNICACIÓN BACKEND-------------------------------------------------


// ======================================================================
// Función para enviar datos de login al backend / Service o capa de API
// ======================================================================

export async function loginEmployee(personalNumber, password) {                     // Esta función solo se comunica con el backend. No toca el DOM ni hace nada visual. Devuelve un objeto { success: true/false, message: ... } que login.js usará para mostrar mensajes al usuario.
                                                                                    // export → Significa que esta función puede ser usada fuera de este archivo. Otros archivos pueden hacer import { loginEmployee } from './api.js';.
                                                                                    // async → Marca la función como asíncrona, lo que permite usar await dentro de ella. Esto significa que la función devuelve automáticamente una Promesa.
                                                                                    // (personalNumber, password) → Parámetros de entrada de la función. Representan los datos que vamos a enviar al backend.
    
    // Recoge los valores de los inputs #number y #pass y construye un objeto JavaScript.
    const data = { personalNumber, password };                                      // const → Declara una variable constante (no se puede reasignar a otro valor).
                                                                                    // data → Nombre de la variable. Guarda los datos del login en un objeto.
                                                                                    // { personalNumber, password } → Esto crea un objeto literal con dos propiedades. personalNumber: personalNumber, password: password. En JavaScript moderno, si la clave y la variable tienen el mismo nombre, se puede escribir solo { personalNumber, password }.

    // Envía el JSON al backend usando fetch al endpoint(EmployeeController) /employees/login.                                                                                
    try {

        const response = await fetch('http://localhost:8080/employees/login', {     // const response → Declara una variable llamada response para guardar la respuesta del servidor.
                                                                                    // await → Pausa la ejecución hasta que se resuelva la promesa devuelta por fetch.
                                                                                    // fetch(...) → Función de JavaScript que envía solicitudes HTTP al servidor.
                                                                                    // fetch envía la info, await espera la respuesta(Envía la petición y no sigas hasta que el servidor responda). fetch es la función que hace la petición HTTP. fetch(url, opciones) envía una solicitud al servidor y promete devolver una respuesta. La url → el endpoint del backend al que queremos conectarnos (/employees/login en tu controller). await ->  JS espera a que el servidor responda. response ya es el resultado HTTP. “Espera aquí hasta que la operación asíncrona termine”. Solo se puede usar dentro de una función async. Sin await response es una Promise, No tienes la respuesta aún. JS llama a fetch(...). El navegador: abre una conexión HTTP, envía la request al servidor, fetch devuelve inmediatamente una Promise, cuando el servidor responde: la Promise se resuelve, await te entrega el Response
                                                                                    // response es un objeto con: status(200, 401,500...), ok -> true / false, headers, métodos: response.text(), response.json()
                                                                                    // Analogía clara: 📬 Carta certificada, mandas una carta (fetch), te dan un resguardo (Promise(Un valor que todavía no existe, pero existirá en el futuro)), esperas en casa (await), llega la respuesta (Response), abres el sobre (response.json()).
                                                                                    // 'http://localhost:8080/employees/login' → URL del backend a la que se envía la petición POST.
                                                                                                                                                                        
            method: 'POST',                                                         // Especifica el tipo de solicitud HTTP. 'POST' → Indica que vamos a enviar datos al backend.
           
            headers: { 'Content-Type': 'application/json' },                        // Cabeceras HTTP que dicen al servidor cómo interpretar la solicitud. { 'Content-Type': 'application/json' } → Indica que los datos enviados estarán en formato JSON, que es lo que el backend espera. application -> Es un tipo de “media type” o MIME type. Significa que el contenido es datos para ser procesados por una aplicación, no texto plano (text/plain) ni una imagen (image/png). json -> Indica que los datos están en formato JSON (JavaScript Object Notation), es decir, un texto estructurado con llaves {} y pares clave:valor. 
            
            body: JSON.stringify(data)                                              // Contenido que se envía en la solicitud POST. JSON.stringify(data) → Convierte el objeto data en una cadena JSON, porque fetch solo puede enviar texto, no objetos JavaScript puros.
        
        });

        if (response.ok) {

            const employee = await response.json();                                 // await response.json() El backend devuelve el empleado en formato JSON — es un texto que parece esto: {"employeeId": 1003, "firstName": "Dani", "surname": "Rodriguez", ...}

            return { success: true, firstName: employee.firstName };

        } else {

            const error = await response.text();                                    // Extrae el mensaje de error devuelto por el backend como texto.

            return { success: false, message: error };                              // Error del backend. Devuelve un objeto indicando fallo y el mensaje de error.

        }

    } catch (err) {                                                                 // Captura cualquier error que haya ocurrido en el try, por ejemplo que el servidor no esté disponible.

        console.error("Error connecting to server:", err);                          // Muestra el error en la consola para desarrolladores.

        return { success: false, message: "Server connection error" };              // Error de red. Devuelve un objeto indicando fallo por error de conexión.

    }
}