



// Importa la función saveRecords de work.api.js
// saveRecords → envía todos los registros del trabajador al backend
import { saveRecords } from '../api/work.api.js';
import { showView } from '../main.js'; // importa showView para navegar a worker-view tras el SUBMIT














// ------------------------ 1. SELECCIÓN DE FECHA ------------------------



// Cuando la página carga, el navegador ejecuta worker.js inmediatamente. En ese momento intenta seleccionar #prod-number — pero ese elemento no existe todavía porque la vista del worker está oculta.
// DOMContentLoaded es un evento que dice: "espera a que todo el HTML esté cargado antes de ejecutar el código".

document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecciona el input de fecha del HTML por su id="date" y lo guarda en una constante
    const dateInput = document.getElementById('date');

    // 2. Crea un objeto Date con la fecha y hora actual del sistema del ordenador
    const today = new Date();

    // 3. Extrae el año de la fecha actual. Ejemplo: 2026
    const yyyy = today.getFullYear();

    // 4. Extrae el mes de la fecha actual.
    //    getMonth() devuelve valores del 0 al 11 (enero=0, diciembre=11), por eso se suma +1
    //    String() convierte el número a texto para poder usar padStart()
    //    padStart(2, '0') añade un cero delante si el mes tiene un solo dígito. Ejemplo: 4 → '04'
    const mm = String(today.getMonth() + 1).padStart(2, '0');

    // 5. Extrae el día de la fecha actual.
    //    padStart(2, '0') añade un cero delante si el día tiene un solo dígito. Ejemplo: 7 → '07'
    const dd = String(today.getDate()).padStart(2, '0');

    // 6. Une las tres partes en el formato que necesita el input type="date": YYYY-MM-DD
    //    Los backticks `` y ${} permiten insertar variables dentro de un texto. Ejemplo: '2026-04-12'
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // 7. Asigna la fecha formateada al input de fecha del HTML
    //    Así el input muestra hoy como valor inicial cuando el trabajador abre la página
    dateInput.value = formattedDate;

    // 8. sessionStorage.getItem('employeeId') → lee el valor guardado con la clave 'employeeId'
    // del sessionStorage. Devuelve el número personal del empleado que se guardó al hacer login.
    // Si el usuario no ha hecho login o cerró la pestaña, devuelve null.
    const employeeId = sessionStorage.getItem('employeeId');

    // Lee el nombre del empleado del sessionStorage y lo muestra en el saludo
    // getItem('firstName') → lee el nombre guardado al hacer login
    // textContent → escribe el texto dentro del span #user-name del HTML
    const firstName = sessionStorage.getItem('firstName');
    document.getElementById('user-name').textContent = firstName;






    // ------------------------ 1b. AUTO-SALTO ENTRE INPUTS DE TIEMPO ------------------------
    // Escucha cada tecla que el trabajador pulsa en el input task-start. Cuando el trabajador termina de escribir la hora de inicio (5 caracteres HH:MM)
    // el cursor salta automáticamente al input de hora de fin    
    // .addEventListener Le dice al navegador: "vigila este input y cuando ocurra algo, ejecuta este código".
    // 'input' El tipo de evento que vigila — se activa en cada tecla que el trabajador pulsa.
    // function() La función que se ejecuta cuando ocurre el evento.
    // this Dentro de la función, this representa el elemento que disparó el evento — en este caso el input task-start. Es una forma de decir "yo mismo".
    // this.value.length === 5 → comprueba si ya tiene los 5 caracteres completos
    // document.querySelector('.task-end').focus() Busca el input task-end y le mueve el cursor — como si el trabajador hubiera hecho clic en él.

    document.querySelector('.task-start').addEventListener('input', function() {

        const parts = this.value.split(':');

            if (parts.length === 2 && parts[1].length === 2) {

                document.querySelector('.task-end').focus();

            }

     });


    document.querySelector('.meeting-start').addEventListener('input', function() {

        if (this.value.length === 5) {

            document.querySelector('.meeting-end').focus();

        }

    });


    document.querySelector('.cleanup-start').addEventListener('input', function() {

        if (this.value.length === 5) {

            document.querySelector('.cleanup-end').focus();

        }

    });



    // Al pulsar Enter en task-end → ejecuta el botón Confirm del Assembly
    // keydown → detecta cuando se pulsa una tecla
    // e.key === 'Enter' → comprueba si la tecla pulsada es Enter
    document.querySelector('.task-end').addEventListener('keydown', function(e) {

        if (e.key === 'Enter') { // e es el objeto del evento — contiene información sobre lo que ocurrió. e.key es una propiedad de ese objeto que dice exactamente qué tecla pulsó el usuario. Por ejemplo: e.key === 'Enter' → pulsó Enter

            e.preventDefault();                                         // evita que el formulario haga submit. evita el comportamiento predeterminado del navegador cuando ocurre un evento. En este caso, cuando se pulsa Enter dentro de un formulario, el navegador por defecto hace submit del formulario — lo que en tu caso navega a la pantalla de check. e.preventDefault() cancela ese comportamiento antes de que ocurra.

            document.querySelector('#task-panel .confirm-btn').click(); // Busca en el HTML el botón con clase confirm-btn que esté dentro del elemento con id task-panel. 
                                                                        // .click() Llama al método click() sobre ese elemento — simula un clic de ratón programáticamente. Es exactamente igual que si el trabajador hubiera hecho clic con el ratón en ese botón. 
                                                                        
        }

    });


    // Meeting
    document.querySelector('.meeting-end').addEventListener('keydown', function(e) {

        if (e.key === 'Enter') {

            e.preventDefault();                                         // evita que el formulario haga submit. evita el comportamiento predeterminado del navegador cuando ocurre un evento. En este caso, cuando se pulsa Enter dentro de un formulario, el navegador por defecto hace submit del formulario — lo que en tu caso navega a la pantalla de check. e.preventDefault() cancela ese comportamiento antes de que ocurra.
            
            document.querySelector('#meeting-panel .confirm-btn').click();

        }

    });


    // Cleanup
    document.querySelector('.cleanup-end').addEventListener('keydown', function(e) {

        if (e.key === 'Enter') {

            e.preventDefault();                                         // evita que el formulario haga submit. evita el comportamiento predeterminado del navegador cuando ocurre un evento. En este caso, cuando se pulsa Enter dentro de un formulario, el navegador por defecto hace submit del formulario — lo que en tu caso navega a la pantalla de check. e.preventDefault() cancela ese comportamiento antes de que ocurra.
           
            document.querySelector('#cleanup-panel .confirm-btn').click();

        }

    }); 














    // ------------------------ 2. BOTÓN ASSEMBLY AND WIRING ------------------------



    // 1. Selecciona los tres botones principales del HTML y los guarda en constantes
    //    Se declaran aquí arriba porque los tres eventos los necesitan — si los declaramos dentro
    //    de cada evento, los otros eventos no podrían verlos
    const taskButton = document.querySelector('.task-btn');           /* botón Assembly and Wiring */

    const teamMeetingButton = document.querySelector('.meeting-btn'); /* botón Team Meeting */

    const cleanUpButton = document.querySelector('.cleanup-btn');     /* botón Cleanup */


    // 2. Selecciona los elementos que se muestran y ocultan al pulsar el botón Assembly and Wiring
    const prod = document.querySelector('.prod');                     /* div que contiene el input de Prod. number */

    const taskTime = document.querySelector('.task-time');            /* div que contiene los inputs From y To */

    const taskValidation = document.querySelector('#task-validation'); /* div que contiene los botones Delete y Confirm */


    // 3. Escucha el evento click en el botón Assembly and Wiring
    //    Cada vez que el trabajador pulse el botón, se ejecuta el código dentro de () => { }
    taskButton.addEventListener('click', () => {

            // 4. Comprueba si los tres elementos ya están visibles en pantalla
            //    === 'flex' → comprueba si el display actual del elemento es flex (visible)
            //    && → significa "y además", es decir, los tres deben ser flex a la vez
            if (prod.style.display === 'flex' && taskTime.style.display === 'flex' && taskValidation.style.display === 'flex') {

            // 5. Si los tres están visibles → los oculta (el trabajador ha vuelto a pulsar el botón)
            prod.style.display = 'none';            /* oculta el input de Prod. number */

            taskTime.style.display = 'none';        /* oculta los inputs From y To */

            taskValidation.style.display = 'none';  /* oculta los botones Delete y Confirm */


            // 6. Vuelve a mostrar los botones de Meeting y Cleanup por si estaban ocultos en móvil
            teamMeetingButton.style.display = 'flex'; /* muestra el botón Team Meeting */

            cleanUpButton.style.display = 'flex';     /* muestra el botón Cleanup */

        } else {

            // 7. Si no están visibles → los muestra (el trabajador ha pulsado el botón por primera vez)
            prod.style.display = 'flex';            /* muestra el input de Prod. number */

            taskTime.style.display = 'flex';        /* muestra los inputs From y To */

            taskValidation.style.display = 'flex';  /* muestra los botones Delete y Confirm */


            // 8. Oculta los tiempos y validaciones de los otros paneles
            //    para que no aparezcan dos paneles abiertos a la vez
            meetingTime.style.display = 'none';       /* oculta los inputs From y To del Meeting */

            meetingValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Meeting */

            cleaninUpTime.style.display = 'none';     /* oculta los inputs From y To del Cleanup */

            cleanUpValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Cleanup */


            // Ponemos el focus en el comienzo de la tarea cuando se pulsa el botón. Con la acción de .focus(), Igual que .click() simula un clic, .focus() simula que el usuario hace clic en un input — el cursor aparece dentro listo para escribir.
            document.querySelector('.task-start').focus();


            // 9. Solo en móvil oculta los botones de Meeting y Cleanup
            //    window.innerWidth → ancho actual de la pantalla en píxeles
            //    <= 480 → si el ancho es menor o igual a 480px estamos en móvil
            if (window.innerWidth <= 480) {

                teamMeetingButton.style.display = 'none'; /* oculta el botón Team Meeting en móvil */

                cleanUpButton.style.display = 'none';     /* oculta el botón Cleanup en móvil */

            }

        }

    });














    // ------------------------ 3. BOTÓN TEAM MEETING ------------------------



    // 1. Selecciona los elementos que se muestran y ocultan al pulsar el botón Team Meeting
    //    Nota: teamMeetingButton ya fue declarado arriba, no se declara de nuevo aquí
    const meetingTime = document.querySelector('.meeting-time');             /* div que contiene los inputs From y To del Meeting */

    const meetingValidation = document.querySelector('#meeting-validation'); /* div que contiene los botones Delete y Confirm del Meeting */

    // 2. Escucha el evento click en el botón Team Meeting
    //    Cada vez que el trabajador pulse el botón, se ejecuta el código dentro de () => { }
    teamMeetingButton.addEventListener('click', () => {

        // 3. Comprueba si los dos elementos del Meeting ya están visibles en pantalla
        //    === 'flex' → comprueba si el display actual del elemento es flex (visible)
        //    && → significa "y además", es decir, los dos deben ser flex a la vez
        if (meetingTime.style.display === 'flex' && meetingValidation.style.display === 'flex') {

            // 4. Si los dos están visibles → los oculta (el trabajador ha vuelto a pulsar el botón)
            meetingTime.style.display = 'none';       /* oculta los inputs From y To del Meeting */

            meetingValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Meeting */


            // 5. Vuelve a mostrar los botones de Assembly y Cleanup por si estaban ocultos en móvil
            taskButton.style.display = 'flex';    /* muestra el botón Assembly and Wiring */

            cleanUpButton.style.display = 'flex'; /* muestra el botón Cleanup */

        } else {

            // 6. Si no están visibles → los muestra (el trabajador ha pulsado el botón por primera vez)
            meetingTime.style.display = 'flex';       /* muestra los inputs From y To del Meeting */

            meetingValidation.style.display = 'flex'; /* muestra los botones Delete y Confirm del Meeting */


            // 7. Oculta los tiempos y validaciones de los otros paneles
            //    para que no aparezcan dos paneles abiertos a la vez
            prod.style.display = 'none';              /* oculta el input de Prod. number */

            taskTime.style.display = 'none';          /* oculta los inputs From y To de la tarea */

            taskValidation.style.display = 'none';    /* oculta los botones Delete y Confirm de la tarea */

            cleaninUpTime.style.display = 'none';     /* oculta los inputs From y To del Cleanup */

            cleanUpValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Cleanup */

            // Ponemos el focus en el comienzo de la tarea cuando se pulsa el botón. Con la acción de .focus(), Igual que .click() simula un clic, .focus() simula que el usuario hace clic en un input — el cursor aparece dentro listo para escribir.
            document.querySelector('.meeting-start').focus();



            // 8. Solo en móvil oculta los botones de Assembly y Cleanup
            //    window.innerWidth → ancho actual de la pantalla en píxeles
            //    <= 480 → si el ancho es menor o igual a 480px estamos en móvil
            if (window.innerWidth <= 480) {

                taskButton.style.display = 'none';    /* oculta el botón Assembly and Wiring en móvil */

                cleanUpButton.style.display = 'none'; /* oculta el botón Cleanup en móvil */

            }

        }

    });














    // ------------------------ 4. BOTÓN CLEANUP ------------------------



    // 1. Selecciona los elementos que se muestran y ocultan al pulsar el botón Cleanup
    //    Nota: cleanUpButton ya fue declarado arriba, no se declara de nuevo aquí
    const cleaninUpTime = document.querySelector('.cleanup-time');           /* div que contiene los inputs From y To del Cleanup */

    const cleanUpValidation = document.querySelector('#cleanup-validation'); /* div que contiene los botones Delete y Confirm del Cleanup */

    // 2. Escucha el evento click en el botón Cleanup
    //    Cada vez que el trabajador pulse el botón, se ejecuta el código dentro de () => { }
    cleanUpButton.addEventListener('click', () => {

        // 3. Comprueba si los dos elementos del Cleanup ya están visibles en pantalla
        //    === 'flex' → comprueba si el display actual del elemento es flex (visible)
        //    && → significa "y además", es decir, los dos deben ser flex a la vez
        if (cleaninUpTime.style.display === 'flex' && cleanUpValidation.style.display === 'flex') {

            // 4. Si los dos están visibles → los oculta (el trabajador ha vuelto a pulsar el botón)
            cleaninUpTime.style.display = 'none';     /* oculta los inputs From y To del Cleanup */

            cleanUpValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Cleanup */


            // 5. Vuelve a mostrar los botones de Assembly y Meeting por si estaban ocultos en móvil
            taskButton.style.display = 'flex';        /* muestra el botón Assembly and Wiring */

            teamMeetingButton.style.display = 'flex'; /* muestra el botón Team Meeting */

        } else {

            // 6. Si no están visibles → los muestra (el trabajador ha pulsado el botón por primera vez)
            cleaninUpTime.style.display = 'flex';     /* muestra los inputs From y To del Cleanup */

            cleanUpValidation.style.display = 'flex'; /* muestra los botones Delete y Confirm del Cleanup */


            // 7. Oculta los tiempos y validaciones de los otros paneles
            //    para que no aparezcan dos paneles abiertos a la vez
            meetingTime.style.display = 'none';       /* oculta los inputs From y To del Meeting */

            meetingValidation.style.display = 'none'; /* oculta los botones Delete y Confirm del Meeting */

            prod.style.display = 'none';              /* oculta el input de Prod. number */

            taskTime.style.display = 'none';          /* oculta los inputs From y To de la tarea */

            taskValidation.style.display = 'none';    /* oculta los botones Delete y Confirm de la tarea */

            // Ponemos el focus en el comienzo de la tarea cuando se pulsa el botón. Con la acción de .focus(), Igual que .click() simula un clic, .focus() simula que el usuario hace clic en un input — el cursor aparece dentro listo para escribir.
            document.querySelector('.cleanup-start').focus();



            // 8. Solo en móvil oculta los botones de Assembly y Meeting
            //    window.innerWidth → ancho actual de la pantalla en píxeles
            //    <= 480 → si el ancho es menor o igual a 480px estamos en móvil
            if (window.innerWidth <= 480) {

                taskButton.style.display = 'none';        /* oculta el botón Assembly and Wiring en móvil */

                teamMeetingButton.style.display = 'none'; /* oculta el botón Team Meeting en móvil */

            }

        }

    });














    // ------------------------ 5. SELECCIÓN DE ELEMENTOS PARA EL CLIC FUERA ------------------------



    // 1. Selecciona el botón CHECK del HTML por su id="check-btn"
    //    Se usa más adelante para saber si el trabajador ha pulsado el botón CHECK
    const check = document.querySelector('#check-btn');

    // 2. Selecciona el contenedor de la pantalla de revisión por su clase ".check-wrapper"
    //    Se declara aquí porque se necesita en dos sitios distintos:
    //    - En el clic fuera → para ocultarlo si el trabajador hace clic fuera de él
    //    - En el botón CHECK → para mostrarlo cuando el trabajador pulse CHECK
    const checkWrapper = document.querySelector('.check-wrapper');

    // 3. Selecciona el panel completo de Assembly and Wiring por su id="task-panel"
    //    Se usa para detectar si el trabajador ha hecho clic dentro o fuera de este panel
    const tFormular = document.querySelector('#task-panel');

    // 4. Selecciona el panel completo de Team Meeting por su id="meeting-panel"
    //    Se usa para detectar si el trabajador ha hecho clic dentro o fuera de este panel
    const mFormular = document.querySelector('#meeting-panel');

    // 5. Selecciona el panel completo de Cleanup por su id="cleanup-panel"
    //    Se usa para detectar si el trabajador ha hecho clic dentro o fuera de este panel
    const cFormular = document.querySelector('#cleanup-panel');


    // ------------------------ OCULTAR ELEMENTOS AL HACER CLIC FUERA ------------------------

    /*
        DIFERENCIA ENTRE matches() y closest() — por qué usamos closest():

        matches(selector) → comprueba SOLO el elemento exacto donde hiciste clic.
        Ejemplo: si haces clic en un <input> dentro de .prod, matches('.prod') devuelve false
        porque el clic fue en el <input>, no en el div .prod directamente.

        closest(selector) → busca hacia arriba desde el elemento donde hiciste clic,
        subiendo por todos sus contenedores padre hasta encontrar uno que coincida.
        Ejemplo: si haces clic en un <input> dentro de .prod, closest('.prod') devuelve
        el div .prod porque está por encima del <input> en el árbol HTML.

        Por eso usamos closest() — porque el trabajador puede hacer clic en cualquier
        elemento dentro de un panel, no solo en el panel directamente.
    */

    // 1. Escucha todos los clics que ocurran en cualquier parte del documento
    //    (e) → es el objeto del evento, contiene información sobre el clic
    document.addEventListener("click", (e) => {

        // 2. Guarda el elemento exacto donde el trabajador ha hecho clic
        //    e.target → es siempre el elemento más pequeño donde ocurrió el clic
        //    Ejemplo: si hay un <span> dentro de un <button> y haces clic en el texto,
        //    e.target será el <span>, no el <button>
        //    Se guarda en una variable para no repetir e.target en cada línea
        const target = e.target;


        // 3. Si el trabajador hace clic FUERA del panel de Assembly and Wiring → oculta sus elementos
        // target → es el elemento donde ocurrió el clic.
        if (!target.closest('#task-panel')) {

            prod.style.display = 'none';           /* oculta el input de Prod. number */

            taskTime.style.display = 'none';       /* oculta los inputs From y To */

            taskValidation.style.display = 'none'; /* oculta los botones Delete y Confirm */

            // Busca cada input en el DOM y lo guarda en una variable
            // querySelector puede devolver null si el formulario fue borrado con innerHTML=""
            // Por eso comprobamos si existe antes de intentar borrar su valor
            const prodNumber = document.querySelector('#prod-number');
            if (prodNumber) prodNumber.value = '';  /* Borra el número de producto solo si existe */

            const taskStart = document.querySelector('.task-start');
            if (taskStart) taskStart.value = '';   /* Borra la hora de inicio solo si existe */

            const taskEnd = document.querySelector('.task-end');
            if (taskEnd) taskEnd.value = '';       /* Borra la hora de fin solo si existe */


        }

        // 4. Si el trabajador hace clic FUERA del panel de Team Meeting → oculta sus elementos
        if (!target.closest('#meeting-panel')) {

            meetingTime.style.display = 'none';

            meetingValidation.style.display = 'none';

            // Busca el input de hora de inicio del Meeting en el DOM. Busca el elemento y guárdalo
            // querySelector puede devolver null si el elemento no existe (por ejemplo si el formulario fue borrado)
            // Por eso lo guardamos primero en una variable antes de intentar acceder a su valor
            const meetingStart = document.querySelector('.meeting-start');

            // Solo si existe, borra su valor
            // if (meetingStart) → comprueba si el elemento existe antes de intentar borrar su valor
            // Si meetingStart es null y hacemos .value = '' directamente → el programa se rompe
            // Es como comprobar si existe una puerta antes de intentar abrirla
            if (meetingStart) meetingStart.value = '';

            // Lo mismo para el input de hora de fin del Meeting
            const meetingEnd = document.querySelector('.meeting-end');
            if (meetingEnd) meetingEnd.value = '';

        }

        // 5. Si el trabajador hace clic FUERA del panel de Cleanup → oculta sus elementos
        if (!target.closest('#cleanup-panel')) {

            cleaninUpTime.style.display = 'none';
            
            cleanUpValidation.style.display = 'none';


            // Busca el input de hora de inicio del Cleanup en el DOM. Busca el elemento y guárdalo
            // querySelector puede devolver null si el elemento no existe (por ejemplo si el formulario fue borrado)
            // Por eso lo guardamos primero en una variable antes de intentar acceder a su valor
            const cleanupStart = document.querySelector('.cleanup-start');
            // Solo si existe, borra su valor
            // if (cleanupStart) → comprueba si el elemento existe antes de intentar borrar su valor
            // Si cleanupStart es null y hacemos .value = '' directamente → el programa se rompe
            // Es como comprobar si existe una puerta antes de intentar abrirla
            if (cleanupStart) cleanupStart.value = '';

            const cleanupEnd = document.querySelector('.cleanup-end');
            if (cleanupEnd) cleanupEnd.value = '';

        }


    });









    // ------------------------ 6. BOTÓN DELETE ------------------------



    // 1. Selecciona los tres botones Delete de cada panel
    const taskDeleteBtn = document.querySelector('#task-delete-btn');       /* Botón Delete del panel Assembly */
    const meetingDeleteBtn = document.querySelector('#meeting-delete-btn'); /* Botón Delete del panel Meeting */

    // 2. Escucha el clic en el botón Delete del panel Assembly and Wiring
    taskDeleteBtn.addEventListener('click', () => {


        // 3. Borra los valores de los inputs del panel Assembly
        document.querySelector('#prod-number').value = '';   /* Borra el número de producto */

        document.querySelector('.task-start').value = '';    /* Borra la hora de inicio */

        document.querySelector('.task-end').value = '';      /* Borra la hora de fin */

    });


    // 4. Escucha el clic en el botón Delete del panel Team Meeting
    meetingDeleteBtn.addEventListener('click', () => {

        // 5. Borra los valores de los inputs del panel Meeting
        document.querySelector('.meeting-start').value = ''; /* Borra la hora de inicio */

        document.querySelector('.meeting-end').value = '';   /* Borra la hora de fin */

    });


    // 5. Selecciona el botón Delete del panel Cleanup
    const cleanupDeleteBtn = document.querySelector('#cleanup-delete-btn');  /* Botón Delete del panel Cleanup */

    // 6. Escucha el clic en el botón Delete del panel Cleanup
    cleanupDeleteBtn.addEventListener('click', () => {

        // 7. Borra los valores de los inputs del panel Cleanup
        document.querySelector('.cleanup-start').value = ''; /* Borra la hora de inicio */
        
        document.querySelector('.cleanup-end').value = '';   /* Borra la hora de fin */

    });






    // ------------------------ 7 GUARDAR DATOS AL PULSAR CONFIRM ------------------------



    // ------------------------ FUNCIÓN AUXILIAR: COMPROBAR SOLAPAMIENTO ------------------------

    // Comprueba si un nuevo registro se solapa con alguno de los ya guardados en entries
    // newStart y newEnd → horas de inicio y fin del nuevo registro en formato HH:MM
    // Devuelve true si hay solapamiento, false si no lo hay
    function hasSolapamiento(newStart, newEnd) {

        return entries.some(reg => {    /* some() → recorre el array y devuelve true si algún elemento cumple la condición */

            // Dos registros se solapan si el nuevo empieza antes de que termine el existente
            // Y el nuevo termina después de que empiece el existente
            return newStart < reg.end && newEnd > reg.start;    /* < y > → compara strings HH:MM directamente */

        });

    }


    // 1. Crea un array vacío donde se guardarán todos los registros que el trabajador confirme
    //    Cada elemento será un objeto con los datos de una tarea
    const entries = [];

    // 2. Escucha el clic en el botón Confirm del panel Assembly and Wiring
    //    '#task-panel .confirm-btn' → selector que apunta al botón Confirm dentro del panel de Assembly
    //    Usar el panel como prefijo evita conflictos con los otros botones Confirm que también existen
    // document.querySelector('#task-panel .confirm-btn') → busca el botón Confirm dentro del panel de Assembly
    // '#task-panel .confirm-btn' → es el selector CSS:
    //  # → busca por id
    //  #task-panel → busca el elemento con id="task-panel"
    //  (espacio) → significa "dentro de"
    //  . → busca por clase
    //  .confirm-btn → busca el elemento con class="confirm-btn" dentro del task-panel
    // .addEventListener('click', () => { }) → escucha el evento click en ese botón y ejecuta el código dentro de las llaves
    document.querySelector('#task-panel .confirm-btn').addEventListener('click', () => {

        // 3. Lee los valores que el trabajador ha introducido en los inputs del panel Assembly
        //    .value → obtiene el texto o número que hay escrito dentro del input en ese momento
        const faNumber = document.querySelector('#prod-number').value;  /* Número de producto introducido */

        const start = document.querySelector('.task-start').value;      /* Hora de inicio introducida */

        const end = document.querySelector('.task-end').value;          /* Hora de fin introducida */

        const date = document.querySelector('#date').value;             /* Fecha seleccionada */


        // Validación 0: comprueba que los inputs de hora no están vacíos
        // !start || !end → si start o end están vacíos devuelve true
        // return → detiene la ejecución si alguno está vacío
        if (!start || !end) {

            alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format");
            return;

        }


        // Validación 1: comprueba que la hora de fin es mayor que la hora de inicio
        // start >= end → si la hora de inicio es mayor o igual a la de fin, las horas están al revés
        // return → detiene la ejecución y no guarda nada si las horas son incorrectas
        if (start >= end) {

            alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time");
            return;

        }

        // Validación 2: comprueba que el nuevo registro no se solapa con ninguno ya guardado
        // hasSolapamiento(start, end) → llama a la función auxiliar que compara el nuevo registro con todos los existentes
        // Si devuelve true significa que hay solapamiento y no se puede guardar
        // return → detiene la ejecución y no guarda nada si hay solapamiento
        if (hasSolapamiento(start, end)) {

            alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry");
            return;

        }


        // 4. Añade un nuevo objeto al array entries con los datos leídos
        //    push() → método que añade un elemento al final del array
        //    {} → un objeto en JS, similar a una fila de una tabla con sus columnas y valores
        entries.push({

            type: "Assembly and Wiring",  /* Tipo de tarea → siempre será este valor para este botón */

            date: date,                   /* Fecha seleccionada por el trabajador */

            start: start,                 /* Hora de inicio introducida */

            end: end,                     /* Hora de fin introducida */

            faNumber: faNumber            /* Número de producto introducido */

        });

        // Borra los inputs y oculta el panel para poder añadir una nueva entrada
        document.querySelector('#prod-number').value = '';   /* Borra el número de producto */
        document.querySelector('.task-start').value = '';    /* Borra la hora de inicio */
        document.querySelector('.task-end').value = '';      /* Borra la hora de fin */
        prod.style.display = 'none';                         /* Oculta el input de Prod. number */
        taskTime.style.display = 'none';                     /* Oculta los inputs From y To */
        taskValidation.style.display = 'none';               /* Oculta los botones Delete y Confirm */


        // 5. Muestra un mensaje temporal al trabajador confirmando que el registro se ha guardado
        alert(window.currentLanguageData?.alerts?.assemblySaved || "Assembly entry saved");

    });


    // 6. Escucha el clic en el botón Confirm del panel Team Meeting
    //    '#meeting-panel .confirm-btn' → selector que apunta al botón Confirm dentro del panel Meeting
    document.querySelector('#meeting-panel .confirm-btn').addEventListener('click', () => {

        // 7. Lee los valores que el trabajador ha introducido en los inputs del panel Meeting
        const start = document.querySelector('#meeting-panel .meeting-start').value;  /* Hora de inicio */

        const end = document.querySelector('#meeting-panel .meeting-end').value;      /* Hora de fin */

        const date = document.querySelector('#date').value;                           /* Fecha seleccionada */


        // Validación 0: comprueba que los inputs de hora no están vacíos
        // !start || !end → si start o end están vacíos devuelve true
        // return → detiene la ejecución si alguno está vacío
        if (!start || !end) {

            alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format");
            return;

        }

        
        // Validación 1: comprueba que la hora de fin es mayor que la hora de inicio
        // start >= end → si la hora de inicio es mayor o igual a la de fin, las horas están al revés
        // return → detiene la ejecución y no guarda nada si las horas son incorrectas
        if (start >= end) {

            alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time");
            return;

        }

        // Validación 2: comprueba que el nuevo registro no se solapa con ninguno ya guardado
        // hasSolapamiento(start, end) → llama a la función auxiliar que compara el nuevo registro con todos los existentes
        // Si devuelve true significa que hay solapamiento y no se puede guardar
    // return → detiene la ejecución y no guarda nada si hay solapamiento
    if (hasSolapamiento(start, end)) {

        alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry");
        return;

    }


    // 8. Añade un nuevo objeto al array entries con los datos del Meeting
    //    Este objeto no tiene faNumber porque el Meeting no necesita número de producto
    entries.push({

        type: "Team Meeting",  /* Tipo de tarea → siempre será este valor para este botón */

        date: date,            /* Fecha seleccionada por el trabajador */

        start: start,          /* Hora de inicio introducida */

        end: end               /* Hora de fin introducida */

    });

    // Borra los inputs y oculta el panel para poder añadir una nueva entrada
    document.querySelector('.meeting-start').value = ''; /* Borra la hora de inicio */
    document.querySelector('.meeting-end').value = '';   /* Borra la hora de fin */
    meetingTime.style.display = 'none';                  /* Oculta los inputs From y To */
    meetingValidation.style.display = 'none';            /* Oculta los botones Delete y Confirm */


    // 9. Muestra un mensaje temporal al trabajador confirmando que el registro se ha guardado
    alert(window.currentLanguageData?.alerts?.meetingSaved || "Team Meeting entry saved");

    });


    // 10. Escucha el clic en el botón Confirm del panel Cleanup
    //     '#cleanup-panel .confirm-btn' → selector que apunta al botón Confirm dentro del panel Cleanup
    document.querySelector('#cleanup-panel .confirm-btn').addEventListener('click', () => {

        // 11. Lee los valores que el trabajador ha introducido en los inputs del panel Cleanup
        const start = document.querySelector('#cleanup-panel .cleanup-start').value;  /* Hora de inicio */

        const end = document.querySelector('#cleanup-panel .cleanup-end').value;      /* Hora de fin */

        const date = document.querySelector('#date').value;                           /* Fecha seleccionada */


        // Validación 0: comprueba que los inputs de hora no están vacíos
        // !start || !end → si start o end están vacíos devuelve true
        // return → detiene la ejecución si alguno está vacío
        if (!start || !end) {

            alert(window.currentLanguageData?.alerts?.emptyTimeError || "Please enter a valid time in HH:MM format");
            return;

        }


        // Validación 1: comprueba que la hora de fin es mayor que la hora de inicio
        // start >= end → si la hora de inicio es mayor o igual a la de fin, las horas están al revés
        // return → detiene la ejecución y no guarda nada si las horas son incorrectas
        if (start >= end) {

            alert(window.currentLanguageData?.alerts?.endTimeError || "The end time must be later than the start time");
            return;

        }

        // Validación 2: comprueba que el nuevo registro no se solapa con ninguno ya guardado
        // hasSolapamiento(start, end) → llama a la función auxiliar que compara el nuevo registro con todos los existentes
        // Si devuelve true significa que hay solapamiento y no se puede guardar
        // return → detiene la ejecución y no guarda nada si hay solapamiento
        if (hasSolapamiento(start, end)) {

            alert(window.currentLanguageData?.alerts?.overlapError || "This time slot overlaps with an existing entry");
            return;

        }


        // 12. Añade un nuevo objeto al array entries con los datos del Cleanup
        //     Este objeto tampoco tiene faNumber porque el Cleanup no necesita número de producto
        entries.push({

            type: "Cleanup",  /* Tipo de tarea → siempre será este valor para este botón */

            date: date,       /* Fecha seleccionada por el trabajador */

            start: start,     /* Hora de inicio introducida */

            end: end          /* Hora de fin introducida */

        });

        

        // Borra los inputs y oculta el panel para poder añadir una nueva entrada
        document.querySelector('.cleanup-start').value = ''; /* Borra la hora de inicio */
        document.querySelector('.cleanup-end').value = '';   /* Borra la hora de fin */
        cleaninUpTime.style.display = 'none';                /* Oculta los inputs From y To */
        cleanUpValidation.style.display = 'none';            /* Oculta los botones Delete y Confirm */



        // 13. Muestra un mensaje temporal al trabajador confirmando que el registro se ha guardado
        alert(window.currentLanguageData?.alerts?.cleanupSaved || "Cleanup entry saved");

    });









    // ------------------------ 8. BOTÓN CHECK ------------------------



    // 1. Selecciona los elementos principales que se necesitan para mostrar la pantalla de revisión
    const workerWrapper = document.querySelector('.worker-wrapper');   /* Contenedor principal del worker */

    const workerForm = document.getElementById('worker-form');         /* Referencia al formulario ANTES de que se borre */

    const backBtn = document.querySelector('.check-back_btn');         /* Botón para volver atrás */

    const submitBtn = document.querySelector('.check-submit_btn');     /* Botón para enviar los datos a la BBDD */

    // 2. Escucha el clic en el botón CHECK
    //    Cada vez que el trabajador pulse CHECK, se ejecuta el código dentro de () => { }
    check.addEventListener('click', (event) => {

        // 3. Detiene la propagación del evento click
        //    Sin esto, el document.addEventListener('click') que tenemos más arriba también
        //    se activaría con este mismo clic, y ocultaría el checkWrapper inmediatamente
        //    después de abrirlo — se abriría y cerraría al instante
        event.stopPropagation();


        // 4. Elimina todo el contenido del worker-wrapper
        //    innerHTML = "" → borra todos los elementos HTML que hay dentro del worker-wrapper
        //    Esto es necesario para que solo se vea la pantalla de revisión, sin los botones ni el formulario
        workerWrapper.innerHTML = "";


        // 5. Hace visible el check-wrapper
        //    display = 'flex' → muestra el contenedor de la pantalla de revisión
        checkWrapper.style.display = 'flex';


        // 6. Vuelve a añadir el check-wrapper dentro del worker-wrapper
        //    Cuando se hizo innerHTML = "" en el paso 4, el check-wrapper también desapareció del DOM
        //    appendChild() → lo vuelve a colocar como último hijo del worker-wrapper
        workerWrapper.appendChild(checkWrapper);


        // 7. Selecciona el cuerpo de la tabla donde se insertarán las filas con los registros
        const tbody = document.querySelector('.check-table__body');   /* Cuerpo de la tabla de revisión */

        // Limpia la tabla antes de añadir las filas para evitar duplicados
        tbody.innerHTML = "";   /* innerHTML = "" → borra todas las filas anteriores de la tabla */



        // 8. Recorre el array entries y crea una fila en la tabla por cada registro guardado
        //    forEach() → ejecuta el código dentro de () => { } una vez por cada elemento del array
        //    reg → representa cada registro guardado, con sus propiedades: type, date, start, end, faNumber
        entries.forEach((reg, index) => {

                // 9. Calcula la duración de cada registro en horas y minutos
                //    split(':') → divide la hora en dos partes: horas y minutos. Ejemplo: '08:30' → ['08', '30']
                //    Number() → convierte el texto a número para poder hacer operaciones matemáticas
                const [startHours, startMinutes] = reg.start.split(':').map(Number);  /* Horas y minutos de inicio */

                const [endHours, endMinutes] = reg.end.split(':').map(Number);        /* Horas y minutos de fin */

            
                // 10. Convierte las horas y minutos a minutos totales para poder restarlos fácilmente
                const startTotal = startHours * 60 + startMinutes;  /* Minutos totales desde medianoche al inicio */
                const endTotal = endHours * 60 + endMinutes;        /* Minutos totales desde medianoche al fin */


                // 11. Calcula la diferencia en minutos entre el inicio y el fin
                const durationMinutes = endTotal - startTotal;  /* Duración total en minutos */


                // 12. Convierte la duración de minutos a horas y minutos para mostrarlo de forma legible
                //    Math.floor() → redondea hacia abajo. Ejemplo: 7.5 → 7
                //    % → operador módulo, devuelve el resto de la división. Ejemplo: 90 % 60 → 30
                const durationHours = Math.floor(durationMinutes / 60);   /* Horas completas de duración */
                const durationMins = durationMinutes % 60;                /* Minutos restantes de duración */


                // 13. Crea una nueva fila <tr> para este registro
                //    createElement('tr') → crea un elemento HTML <tr> en memoria, aún no está en la página
                const tr = document.createElement('tr');  /* Nueva fila de la tabla */


            

                // 14. Rellena la fila con las 8 celdas correspondientes a cada columna de la tabla

                //    tr.innerHTML → tr es la fila <tr> que creamos en el paso 13. innerHTML es una propiedad
                //    que permite escribir HTML dentro de un elemento. Todo lo que escribamos entre los
                //    backticks `` se convertirá en el contenido HTML de la fila.

                //    ` ` → los backticks permiten escribir texto en varias líneas y meter variables dentro
                //    usando la sintaxis ${}. Sin backticks tendríamos que concatenar con + lo cual es más
                //    difícil de leer.

                //    ${} → es la forma de insertar una variable dentro de un texto con backticks.
                //    El navegador sustituye ${variable} por el valor real de esa variable.
                //    Ejemplo: si index = 0, entonces ${index + 1} se convierte en 1.

                //    index + 1 → index es la posición del registro en el array, empezando en 0.
                //    Como no queremos mostrar 0, 1, 2... sino 1, 2, 3... sumamos 1.

                //    reg.type → reg es el registro actual del forEach. .type es una de sus propiedades.
                //    Ejemplo: reg.type podría ser "Assembly and Wiring", "Team Meeting" o "Cleanup".

                //    reg.faNumber || '—' → || significa "o". Si reg.faNumber existe y tiene valor,
                //    lo muestra. Si no existe o está vacío, muestra un guión —.
                //    Ejemplo: Assembly tiene faNumber, pero Meeting y Cleanup no, así que muestran —.

                //    data-label → es un atributo personalizado de HTML que guarda texto extra en el elemento.
                //    En móvil, el CSS lo usa para mostrar la etiqueta delante del valor de cada celda.
                //    Ejemplo: data-label="Task" hace que en móvil aparezca "Task:" antes del tipo de tarea.

                tr.innerHTML = `

                    <td data-label="#">${index + 1}</td>

                    <td data-label="Task">${reg.type}</td>

                    <td data-label="Date">${reg.date}</td>

                    <td data-label="From">${reg.start}</td>

                    <td data-label="To">${reg.end}</td>

                    <td data-label="Duration">${durationHours}h ${durationMins}min</td>

                    <td data-label="FA Number">${reg.faNumber || '—'}</td>

                    <td data-label=""><button class="delete-row-btn">✕</button></td>

                `;


                // 15. Escucha el clic en el botón X de esta fila
                tr.querySelector('.delete-row-btn').addEventListener('click', () => {

                    // Busca la posición actual del registro en el array en el momento del clic
                    const currentIndex = entries.indexOf(reg);  /* indexOf() → devuelve la posición actual del registro */

                    // Elimina el registro del array en la posición actual
                    entries.splice(currentIndex, 1);            /* splice(currentIndex, 1) → elimina 1 elemento en esa posición. Es un método de los arrays en JavaScript que elimina elementos. Es como decir "corta y saca". currentIndex → es la posición del registro que queremos eliminar. Recuerda que indexOf(reg) nos devolvió esa posición. Por ejemplo: 1 si es el segundo registro.*/

                    // Elimina la fila de la tabla visualmente
                    tr.remove();                                /* remove() → elimina el <tr> del DOM */

                    // Renumera todas las filas que quedan en la tabla
                    // querySelectorAll() → selecciona todos los elementos que coincidan con el selector
                    // forEach() → recorre cada fila y actualiza su número
                    const filas = tbody.querySelectorAll('tr');             /* Selecciona todas las filas que quedan en la tabla. tbody → es el cuerpo de la tabla, el elemento <tbody> del HTML donde están las filas con los datos. querySelectorAll('tr') → busca todos los elementos <tr> que hay dentro del tbody. A diferencia de querySelector que solo devuelve el primero, querySelectorAll devuelve todos. const filas → guarda todos esos <tr> encontrados en una variable llamada filas. */

                    filas.forEach((fila, i) => {

                        fila.cells[0].textContent = i + 1;  /* cells[0] → primera celda de la fila, i + 1 → nuevo número. Coge la primera celda de cada fila y le pone el valor del índice más 1. textContent sobreescribe lo que había*/

                    }); // cierra el forEach


                }); // cierra el check.addEventListener 


                tbody.appendChild(tr);

            });    


            // 16. Calcula el tiempo total sumando la duración de todos los registros
            //    reduce() → recorre el array y acumula un valor. Empieza en 0 y va sumando los minutos de cada registro
            const totalMinutes = entries.reduce((total, reg) => {

                const [startHours, startMinutes] = reg.start.split(':').map(Number);  /* Horas y minutos de inicio */

                const [endHours, endMinutes] = reg.end.split(':').map(Number);        /* Horas y minutos de fin */

                const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes); /* Duración en minutos */

                return total + duration;  /* Acumula la duración al total */

            }, 0);


            // 17. Convierte el total de minutos a horas y minutos para mostrarlo de forma legible
            const totalHours = Math.floor(totalMinutes / 60);  /* Horas completas del total */
            
            const totalMins = totalMinutes % 60;               /* Minutos restantes del total */


            // 18. Muestra el tiempo total formateado en los dos formatos en la pantalla de revisión
            document.getElementById('total-time-formatted').textContent = `${totalHours}h ${totalMins}min`; /* Formato legible */

            document.getElementById('total-time-minutes').textContent = `${totalMinutes} min`;              /* Total en minutos */


            // 19. Escucha el clic en el botón BACK
            //     reset() → limpia todos los inputs del formulario y vuelve a mostrar el worker-wrapper original
            backBtn.addEventListener('click', () => {                   

                // No vaciamos entries aquí — los registros confirmados deben mantenerse
                // para que la validación de solapamiento siga funcionando

                workerForm.reset();                         /* reset() → borra todos los valores de los inputs del formulario */

                checkWrapper.style.display = 'none';        /* Oculta la pantalla de revisión */

                workerWrapper.appendChild(workerForm);      /* Devuelve el formulario al worker-wrapper */

                dateInput.value = formattedDate;            /* Vuelve a poner la fecha de hoy */

            });   
        

        });








    // 20. Escucha el clic en el botón SUBMIT
            submitBtn.addEventListener('click', async () => {

                // Llama a saveRecords pasándole el array entries y el employeeId del sessionStorage
                const result = await saveRecords(entries, employeeId);

                if (result.success) {

                    // Si todo fue bien → muestra mensaje de éxito y vacía el array
                    entries.length = 0;

                    alert(window.currentLanguageData?.alerts?.submitReady || "Data ready to be sent to the database");

                    console.log('navegando a worker-view');

                    showView('worker-view'); // vuelve a la vista del trabajador tras el SUBMIT
                

                    // Oculta la pantalla de revisión (check-wrapper)
                    // display = 'none' → el elemento desaparece visualmente y no ocupa espacio
                    checkWrapper.style.display = 'none';

                    // Devuelve el formulario al worker-wrapper
                    // appendChild() → añade workerForm como hijo del workerWrapper
                    // workerWrapper es el contenedor principal del worker
                    // workerForm es el formulario que fue borrado cuando se pulsó CHECK
                    workerWrapper.appendChild(workerForm);

                    // Vuelve a poner la fecha de hoy en el input de fecha
                    // dateInput → el input type="date" del formulario
                    // formattedDate → la fecha de hoy en formato YYYY-MM-DD, calculada al principio del archivo
                    dateInput.value = formattedDate;

                } else {

                        // Si hubo error → muestra el mensaje de error
                        alert('Error: ' + result.message);
                        
                }

            });









            // ------------------------ 9. BOTÓN LOGOUT ------------------------



            const logoutBtn = document.querySelector('#logout-btn');

                logoutBtn.addEventListener('click', () => {

                if (entries.length > 0) {

                    alert(window.currentLanguageData?.alerts?.logoutPendingTasks || "You have pending tasks. Press CHECK to review them before logging out.");

                    return; // para aquí — no cierra sesión

                }

                // SI EL ARRAY entries ESTÁ VACÍO LLEGA AQUÍ Y CIERRA SESIÓN
                // Borra todo el sessionStorage — elimina el employeeId guardado al hacer login
                // clear() → vacía completamente la caja temporal del navegador
                // Sin esto el trabajador seguiría "conectado" aunque navegue a login-view
                sessionStorage.clear();

                showView('login-view');

            });






});

/* ---------------------------------------------------------------------------------------- THE END -------------------------------------------------------------------------------------------- */