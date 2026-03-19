
/*

    main.js ES EL PUNTO DE ENTRADA DE TU APP WEB. 


    ESTE ES EL ARCHIVO QUE:

    - Se carga una sola vez
    - Conoce el estado general de la app
    - Decide qué página se ve
    - Inicializa cosas globales (idioma, eventos, sesión…)
    
    👉 Piensa en main.js como el director de orquesta. Los demás archivos tocan instrumentos, pero no deciden la canción.



    Conecta la estructura HTML con la lógica de las páginas. Es el control general de la interfaz.
    ----------------------------------------------------------------------------
    
    SE ENCARGA DE:
    1. Inicializar todas las secciones/páginas de la app (login, registro, worker, etc.).
        - Cada sección está en su propio módulo (pages/login.js, pages/register.js, etc.) para mantener el código ordenado y reutilizable.
    2. Gestionar la navegación interna entre secciones, mostrando y ocultando las vistas (section) según la interacción del usuario.
    3. Cargar datos globales si los hay, por ejemplo:
        - Estado de sesión del usuario.
        - Configuraciones globales de idioma (i18n).
    4. Centralizar eventos importantes, como el login, logout o cambios de idioma.

    NOTA IMPORTANTE:
    - La lógica específica de cada sección (validaciones, envío de formularios, listeners de botones, fetch a la API) **debe estar en su propio módulo**:
      login.js, register.js, password_reset.js, worker.js
    - main.js solo inicializa estas secciones y controla cuál se muestra al inicio o cuando el usuario navega.
    - Este archivo actúa como **entry point** de la aplicación: define el comportamiento inicial y centraliza la navegación.

*/






// ========================= FUNCIONES AUXILIARES =========================

// Una FUNCIÓN AUXILIAR es simplemente una función que ayuda a hacer algo específico, pero no decide el flujo principal de tu programa, solo hace su tarea específica. No toma decisiones sobre qué hacer en la app. Solo ejecuta una tarea concreta que se puede reutilizar. Se llama desde otras partes del código cuando se necesita.


// Muestra solo la vista que quiero y oculta las demás
function showView(viewId) {

    const views = document.querySelectorAll('.view');           // Esto selecciona todos los elementos HTML del DOM (Document Object Model (Modelo de Objetos del Documento)) con la clase .view.

    views.forEach(view => {

        if (view.id === viewId) {

            view.classList.add('view--active');                 // Se muestra. Añade la clase CSS que hace visible la sección. classList es una propiedad de los elementos DOM que maneja las clases CSS. No añade CSS “directamente”, sino que el elemento ahora tiene la clase view--active que tu CSS ya sabe interpretar: .view.view--active { display: block; }

        } else {

            view.classList.remove('view--active');              // Se oculta. Elimina la clase y la oculta

        }

    });

}






// ========================= INICIALIZACIÓN =========================

// Esperamos a que el HTML se cargue
document.addEventListener('DOMContentLoaded', () => {                                           // Esto le dice al navegador: “espera a que todo el HTML se haya cargado completamente” antes de ejecutar el código dentro del () => { … }.

    try { initLogin(); } catch (e) { console.error('initLogin falló', e); }                     // Funciones que inicializan cada sección de tu app (validaciones, botones, listeners…).
                                                                                                // Si alguna de estas funciones lanza un error, todo el script se detiene y showView('login-view') nunca se ejecuta, por eso no se veía el login. Para evitar que un error en un módulo bloquee la app, usamos try…catch: try { … } intenta ejecutar el código. catch(e) { … } captura cualquier error que ocurra dentro del try y lo maneja sin romper el flujo.
                                                                                                // console.error('initLogin falló', e); imprime el error en la consola para depuración. Así sabes qué módulo falló y por qué, pero el resto del código sigue ejecutándose.

    try { initRegister(); } catch (e) { console.error('initRegister falló', e); }

    try { initWorker(); } catch (e) { console.error('initWorker falló', e); }

    try { initPasswordReset(); } catch (e) { console.error('initPasswordReset falló', e); }

// 👉 Mostrar login después de inicializar los módulos
    showView('worker-view');                                                                     // Esta es la llamada a la función showView que he tenido que declarar con anterioridad -> antes -> showView('login-view');

    // Configurar navegación
    setupNavigation();                                                                          // Llama a la función que vincula los enlaces de navegación (Sign up, Forgot password, etc.) con showView. Gracias a esto, cuando el usuario hace clic en un enlace, la sección correspondiente se muestra sin recargar la página.
});






// Enlaza links(<a>) del HTML con showView()       -------POR EXPLICAR-----------
function setupNavigation() {

    // Login → Register
    document.querySelectorAll('[data-value="signUp"]').forEach(link => {

        link.addEventListener('click', e => {

            e.preventDefault();          // evita recargar la página

            showView('register-view');   // muestra registro

        });

    });


    // Register → Login
    document.querySelectorAll('[data-value="haveAccount"]').forEach(link => {

        link.addEventListener('click', e => {

            e.preventDefault();

            showView('login-view');      // vuelve a login

        });

    });


    // Login → Forgot Password
    document.querySelectorAll('[data-value="forgotPassword"]').forEach(link => {

        link.addEventListener('click', e => {

            e.preventDefault();

            showView('reset-view');  // muestra password reset

        });

    });


    // Password Reset → Login
    document.querySelectorAll('[data-value="back-login"]').forEach(link => {

        link.addEventListener('click', e => {

            e.preventDefault();

            showView('login-view');           // vuelve a login

        });

    });

}





