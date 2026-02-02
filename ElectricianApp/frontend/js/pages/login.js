
/*  
 Este módulo se encarga de:
 1. MANEJAR EL DOM: 
    - Leer y actualizar elementos de la página.
    - Cambiar estilos o clases según la interacción del usuario.
    - No realiza cálculos de negocio ni acceso directo a la base de datos.
 2. GESTIÓN DE EVENTOS: 
    - Escucha interacciones del usuario (click, submit, input).
    - Llama a funciones de otros módulos según corresponda.
 3. COMUNICACIÓN CON LA API: 
    - Envia datos de login al backend mediante fetch.
    - Procesa la respuesta y actualiza la UI.

 Flujo principal: UI → login.js → API → login.js → UI
 */




 

 // ------------------------------------------------ CONTROLADOR DEL DOM --------------------------------------------------------------------


// =====================================================================================================================
// CONTROLADOR DEL FORMULARIO DE LOGIN
// - Escucha submit del usuario
// - Envía datos a la API y procesa la respuesta
// =====================================================================================================================

import { loginEmployee } from '../api/auth.api.js';                     // Importamos la función de la API. Importa la función loginEmployee desde auth.api.js. Como login.js está directamente en js, para acceder a ese archivo, debo utilizar una ruta relativa: './' → empieza desde la carpeta donde está login.js, es decir, js/. api/ → entra en la carpeta api dentro de js/. auth.api.js → el archivo dentro de api.
                                                                        // loginEmployee: Función que reside en auth.api.js, encargada de enviar los datos al backend y devolver la respuesta.
                                                                        // login.js no sabe cómo se hace la autenticación; solo llama a esta función y maneja el resultado para la UI.

const loginForm = document.querySelector('#login-form');                // Selecciona el elemento del DOM con id="login-form" y lo guarda en la variable

loginForm.addEventListener('submit', async function(e) {                // Agrega un listener que escucha eventos del formulario. 'submit' → Escucha el evento de enviar el formulario. async function(e) → Función asíncrona que se ejecuta al enviar el formulario. e → Objeto del evento, contiene información sobre el submit.

    e.preventDefault();                                                 // Evita que el navegador recargue la página al hacer submit. Esto es fundamental en apps SPA modernas.

    const personalNumber = document.querySelector('#number').value;     // Selecciona el input donde el usuario escribe el número personal y lo guarda en la variable. .value → Obtiene el valor escrito por el usuario.

    const password = document.querySelector('#pass').value;
   
    const result = await loginEmployee(personalNumber, password);       // Llamamos a la función de la API. Llama a la función loginEmployee que definimos en auth.api.js. await → Espera la respuesta de la API antes de continuar. result → Guarda el objeto devuelto por la función { success: true/false, message: ... }.
                                                                        // Aquí login.js solo procesa la respuesta y decide qué mostrar al usuario

    if (result.success) {                                               // result es la respuesta procesada del backend, normalmente algo como esto: { "success": true, "message": "Login OK" }. Definido en loginApi.js

        alert('Successful login');

        window.location.href = "/worker.html";                          // Aquí rediriges a otra página: "/worker.html";

    } else {

        alert('Login failed: ' + result.message);

    }

});