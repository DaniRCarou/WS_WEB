// ============================================================================== COMENTARIO EXPLICATIVO ========================================================================================



/*
    main.js ES EL PUNTO DE ENTRADA DE LA APLICACIÓN.

    - Se ejecuta cuando la página se carga en el navegador.
    - Es el primer archivo que arranca la lógica de la app.
    - Inicializa los módulos principales y configura el comportamiento inicial.

    👉 Su función es coordinar e iniciar la aplicación, no implementar la lógica.

    ----------------------------------------------------------------------------

    EN GENERAL, main.js SE ENCARGA DE:

    - Esperar a que el DOM esté listo (DOMContentLoaded).
    - Inicializar los distintos módulos o componentes de la app.
    - Configurar eventos globales (navegación, acciones principales, etc.).
    - Definir el estado inicial de la interfaz.

    ----------------------------------------------------------------------------

    EN UNA SPA (como esta):

    - Controla qué vista se muestra (sin recargar la página).
    - Gestiona la navegación interna entre secciones (views).
    - Conecta los eventos del HTML con cambios de vista.

    ----------------------------------------------------------------------------

    EN UNA APP NO-SPA:

    - Puede limitarse a inicializar scripts y comportamientos
      de la página actual (ya que la navegación recarga la página).

    ----------------------------------------------------------------------------

    IMPORTANTE:

    - La lógica específica de cada funcionalidad NO va aquí.
    - Cada módulo (login, register, etc.) gestiona su propio comportamiento.
    - main.js solo conecta, inicializa y coordina.


    ESTRUCTURA DEL ARCHIVO (orden recomendado):
    
    1️⃣ Constantes y configuración general
   - Aquí definimos valores fijos que no cambian en la ejecución.
   - Ejemplos: IDs de vistas, rutas de la app, mensajes globales.
   - Se colocan primero porque otras funciones dependen de ellas.

    2️⃣ Funciones auxiliares
   - Pequeñas funciones reutilizables que realizan tareas concretas.
   - No deciden el flujo principal de la aplicación.
   - Se definen aquí para poder usarlas en setup y arranque.

    3️⃣ Funciones principales / Setup
   - Funciones que conectan la app con la interfaz.
   - Configuran eventos globales (clicks, navegación, formularios).
   - Pueden usar constantes y funciones auxiliares definidas antes.

    4️⃣ Inicialización / DOMContentLoaded
   - Bloque que se ejecuta cuando el DOM está completamente cargado.
   - Llama a los módulos de cada sección, configura la app y define el estado inicial.
   - Siempre va al final, porque necesita que todo lo anterior ya exista.
   
    Orden recomendado: Constantes → Auxiliares → Setup → Arranque
    Cada bloque depende del anterior, garantizando modularidad y claridad.
*/









// ============================================================================= CONSTANTES =============================================================================================



// La constante 'VIEWS' contiene un objeto
const VIEWS = {

    LOGIN: 'login-view',                            // Aquí guardas IDs del HTML. 'LOGIN' -> Es una propiedad (clave) dentro del objeto. login-view -> es una propiedad (valor) dentro del objeto
    REGISTER: 'register-view',
    RESET: 'reset-view',
    WORKER: 'worker-view'

};

// La constante 'NAV_LINKS' contiene un objeto
const NAV_LINKS = {

    GO_TO_REGISTER: 'go-to-register',              
    FORGOT_PASSWORD: 'forgot-password-link',
    RESET_BACK: 'loginback-link',
    REGISTER_BACK: 'register-loginback-link'

};









// ============================================================================= FUNCIONES AUXILIARES =============================================================================================
// Una FUNCIÓN AUXILIAR es simplemente una función que ayuda a hacer algo específico, pero no decide el flujo principal de tu programa, solo hace su tarea específica. No toma decisiones sobre qué hacer en la app. Solo ejecuta una tarea concreta que se puede reutilizar. Se llama desde otras partes del código cuando se necesita.



// 1. FUNCIÓN AUXILIAR 'showView' (mejor opción)

// Esta función llamada showView, muestra solo la vista que quiero mostrar de inicio y oculta las demás. Recibe un parámetro viewId, que es el id de la vista que quieres mostrar.
function showView(viewId) {

    const views = document.querySelectorAll('.view');                   // Esto selecciona todos los elementos HTML del DOM (Document Object Model (Modelo de Objetos del Documento)) con la clase '.view'. El resultado es una lista (NodeList).

    views.forEach(view => {                                             // recorre uno por uno todos los elementos encontrados. 'view' representa cada elemento del dom que obtienes de la constante 'views' en cada vuelta.

        view.classList.toggle('view--active', view.id === viewId);      // 'classList' es una propiedad de los elementos DOM que maneja las clases CSS. No añade CSS “directamente”, sino que el elemento ahora tiene la clase 'view--active', que tu has añadido al archivo CSS y ya sabe interpretar: .view.view--active { display: block; }
                                                                        // Con 'classList' puedes: add('clase') → añade la clase / remove('clase') → elimina la clase. / toggle('clase') → añade si no existe, elimina si existe.
                                                                        // Compara 'view.id' → el id del elemento actual en el bucle, con viewId → el id que queremos mostrar. Si el id coincide (view.id === viewId → true) → añade la clase view--active → la vista se muestra. Si no coincide (view.id === viewId → false) → elimina la clase view--active → la vista se oculta. Todo en una sola línea, sin if/else.

    });

}









// ================================================================================== FUNCIONES PRINCIPALES ==============================================================================================



// 2. FUNCIÓN PRINCIPAL. 

// Enlaza links del HTML con la función showView() 
function setupNavigation() {

    const links = [                                                 // Creas una lista (array) de configuraciones. Es decir, 'links' es una constante que guarda varios objetos

        { id: NAV_LINKS.GO_TO_REGISTER, view: VIEWS.REGISTER },     // Cada objeto dice: qué botón (id) a qué vista va (view). Esto es SOLO datos, no lógica. Botón con id "go-to-register", muestra "register-view".

        { id: NAV_LINKS.FORGOT_PASSWORD, view: VIEWS.RESET },

        { id: NAV_LINKS.RESET_BACK, view: VIEWS.LOGIN },

        { id: NAV_LINKS.REGISTER_BACK, view: VIEWS.LOGIN }

    ];


    links.forEach(link => {                                         // Recorres cada elemento de la lista 'links'. Ahora “link” será: { id: 'go-to-register', view: 'register-view' }

        const el = document.getElementById(link.id);                // Buscas en cada elemento de la lista 'links' a través de la clave 'id' y lo guardas en la constante. Compruebas que existe (evita errores si no está en el DOM).

        if (el) {                                                   // Compruebas que existe. Si 'el' elemento existe. Si 'el' = true. 'if (el !== null)' -> también en js.

            el.addEventListener('click', e => {                     // Escuchas cuando el usuario hace click.

                e.preventDefault();                                 // Evitas el comportamiento por defecto (por ejemplo, que un <a> recargue la página). Cuando haces click: el navegador intenta navegar (recarga o cambia de página). Así se indica que no haga lo que haría normalmente

                showView(link.view);                                // Cambias la vista manualmente a través de la función auxiliar 'showView'                         

            });

        }

    });
}









// ================================================================================== INICIALIZACIÓN ==============================================================================================



// 1. FUNCIÓN PRINCIPAL  

// Esperamos a que el HTML se cargue
document.addEventListener('DOMContentLoaded', () => {                                           // Esto le dice al navegador: “espera a que todo el HTML se haya cargado completamente” antes de ejecutar el código dentro del () => { … }.

    /* try { initLogin(); } catch (e) { console.error('initLogin falló', e); }                     // Funciones que inicializan cada sección de tu app (validaciones, botones, listeners…). try -> El navegador intenta ejecutar initLogin().
                                                                                                // Si alguna de estas funciones lanza un error, todo el script se detiene y showView('login-view') nunca se ejecuta, por eso no se veía el login. Para evitar que un error en un módulo bloquee la app, usamos try…catch: try { … } intenta ejecutar el código. catch(e) { … } captura cualquier error que ocurra dentro del try y lo maneja sin romper el flujo.
                                                                                                // console.error('initLogin falló', e); imprime el error en la consola para depuración. Así sabes qué módulo falló y por qué, pero el resto del código sigue ejecutándose.

    try { initRegister(); } catch (e) { console.error('initRegister falló', e); }

    try { initWorker(); } catch (e) { console.error('initWorker falló', e); }

    try { initPasswordReset(); } catch (e) { console.error('initPasswordReset falló', e); } */

    // 👉 Mostrar login después de inicializar los módulos
    showView('worker-view');                                                                     // Esta es la llamada a la función showView que he tenido que declarar con anterioridad -> antes -> showView('worker-view');

    // Configurar navegación
    setupNavigation();                                                                          // Llama a la función que vincula los enlaces de navegación (Sign up, Forgot password, etc.) con showView. Gracias a esto, cuando el usuario hace clic en un enlace, la sección correspondiente se muestra sin recargar la página.

});
