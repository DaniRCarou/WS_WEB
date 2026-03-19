

// ------------------------ 3. SELECCIÓN DE FECHA ------------------------


// Get the input for the date field
const dateInput = document.getElementById('date');

// Get today's date in YYYY-MM-DD format
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Meses: 0-11, se ajusta a 1-12
const dd = String(today.getDate()).padStart(2, '0');

const formattedDate = `${yyyy}-${mm}-${dd}`;

// Set today's date as the initial value
dateInput.value = formattedDate;









// 4. Get the elements inside the .worker-form container

const taskButton = document.querySelector('.task-btn');
const prod = document.querySelector('.prod');
const taskTime = document.querySelector('.task-time'); 
const taskValidation = document.querySelector('#task-validation');

// 2. Add a click event to the button

taskButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (prod.style.display === 'flex' && taskTime.style.display === 'flex' && taskValidation.style.display === 'flex') {

    // 4. If they are visible, hide them

        prod.style.display = 'none';
        taskTime.style.display = 'none';
        taskValidation.style.display = 'none';

       
    } else {

    // 5. If they are not visible, show them

        prod.style.display = 'flex';
        taskTime.style.display = 'flex';
        taskValidation.style.display = 'flex';

        meetingTime.style.display = 'none';
        meetingValidation.style.display = 'none';
        cleaninUpTime.style.display = 'none';
        cleanUpValidation.style.display = 'none';       

    }

});









// 1. Get the "teammeeting_btn" button and the elements inside the .formular container

const teamMeetingButton = document.querySelector('.meeting-btn');
const meetingTime = document.querySelector('.meeting-time');
const meetingValidation = document.querySelector('#meeting-validation');


// 2. Add a click event to the button

teamMeetingButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (meetingTime.style.display === 'flex' && meetingValidation.style.display  === 'flex') {

    // 4. If they are visible, hide them

        
        meetingTime.style.display = 'none';
        meetingValidation.style.display = 'none';      
       

    } else {

    // 5. If they are not visible, show them

        meetingTime.style.display = 'flex';
        meetingValidation.style.display = 'flex';
        
        prod.style.display = 'none';
        taskTime.style.display = 'none';
        taskValidation.style.display = 'none';
        cleaninUpTime.style.display = 'none';
        cleanUpValidation.style.display = 'none';        

    }

});









// 1. Get the "cleanup_btn" button and the elements inside the .formular container

const cleanUpButton = document.querySelector('.cleanup-btn');
const cleaninUpTime = document.querySelector('.cleanup-time');
const cleanUpValidation = document.querySelector('#cleanup-validation');

// 2. Add a click event to the button

cleanUpButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (cleaninUpTime.style.display === 'flex' && cleanUpValidation.style.display  === 'flex') {

    // 4. If they are visible, hide them

        cleaninUpTime.style.display = 'none';
        cleanUpValidation.style.display = 'none';
                

    } else {

    // 5. If they are not visible, show them

        cleaninUpTime.style.display = 'flex';
        cleanUpValidation.style.display = 'flex';
        
        meetingTime.style.display = 'none';
        meetingValidation.style.display = 'none';
        prod.style.display = 'none';
        taskTime.style.display = 'none';
        taskValidation.style.display = 'none';        

    }

});


























/* --------------------------------------------------------------------------- When clicking anywhere outside on the screen, the elements are hidden ----------------------------------------------------------------------------------------------------------- */ 
   


const check = document.querySelector('#check-btn');
const tFormular = document.querySelector('#task-panel');    
const mFormular = document.querySelector('#meeting-panel');
const cFormular = document.querySelector('#cleanup-panel');


// La razón por la cual closest() funciona en este caso, mientras que matches() no, se debe a cómo ambos métodos interactúan con el árbol de elementos y la propagación de eventos en el DOM.
// !e.target.matches(selector): Este método se usa para verificar si el elemento específico sobre el cual ocurrió el evento (es decir, e.target) coincide directamente con el selector proporcionado. Si haces clic sobre el .prod, e.target.matches('.prod') devolverá true solo si el elemento sobre el cual se hizo clic tiene la clase .prod directamente. No afecta a los ancestros ni a los elementos contenedores. Es una coincidencia exacta del elemento donde ocurrió el clic.
// !e.target.closest(selector): Este método, en cambio, busca recursivamente hacia arriba desde el elemento donde ocurrió el clic (e.target), y devuelve el primer ancestro que coincida con el selector. Si el clic fue sobre un elemento que está dentro de un contenedor con la clase .prod, closest('.prod') devolverá ese contenedor. Si el clic fue sobre .prod directamente, closest('.prod') también devolverá el mismo .prod. Si no encuentra ningún ancestro que coincida, devuelve null.

document.addEventListener("click", (e) => {



    /* 

        Cuando haces clic en cualquier parte del documento, el navegador dispara un evento click.
        Dentro de ese evento, e.target es el elemento exacto donde hiciste clic.

        Ejemplo:
        Si haces clic en un <span> dentro de un botón, e.target será el <span>, no el botón entero.

    */

    const target = e.target; 

    /* Esto simplemente guarda e.target en una variable para que no tengas que escribir e.target una y otra vez, si no habría que escribir lo siguiente: 

        if (!e.target.closest('.check-wrapper') && !e.target.closest('#check-btn')) {

            checkWrapper.style.display = 'none';

        }

    */
    





    // Si haces clic FUERA de #task-panel

    if (!target.closest('#task-panel')) {

        prod.style.display = 'none';
        taskTime.style.display = 'none';
        taskValidation.style.display = 'none';

    }

    // Si haces clic FUERA de #meeting-panel

    if (!target.closest('#meeting-panel')) {

        meetingTime.style.display = 'none';
        meetingValidation.style.display = 'none';

    }

    // Si haces clic FUERA de #cleanup-panel

    if (!target.closest('#cleanup-panel')) {

        cleaninUpTime.style.display = 'none';
        cleanUpValidation.style.display = 'none';

    }

    

    // Si haces clic FUERA de .check-wrapper
    // Este caso es diferente a los anteriores. 
    // Porque, cuando haces clic en el botón #check-btn para mostrar .check-wrapper, ese mismo clic también activa el document.addEventListener('click'), y como .check-wrapper aún no está visible en ese momento, se oculta inmediatamente. ¡Se abre y se cierra al instante!

    if (!target.closest('.check-wrapper') && !target.closest("#check-btn") ) {     

        checkWrapper.style.display = 'none';

    }




    



});




   







// -------------------------- EN ESTE APARTADO SE GUARDARÁN LOS DATOS QUE SE VAN A ENVIAR PARA SER COMPROBADOS ANTES DE ENVIARLOS A LA BBDD ------------------




// 1️⃣ Crear una estructura para guardar los datos

    const entries = []; // aquí guardaremos todos los datos que el usuario introduce


// 2️⃣ Capturar los datos cuando se pulsa "Confirmar" en cada formulario

    document.querySelector('#task-panel .confirm-btn').addEventListener('click', () => { // ('#task-panel .confirm-btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes

        const faNumber = document.querySelector('#prod-number').value;           
        const start = document.querySelector('.task-start').value;
        const end = document.querySelector('.task-end').value;
        const date = document.querySelector('#date').value;

        // Guardar en el array

        entries.push({                          // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Assembly and Wiring",    
            date: date,
            start: start,
            end: end,
            faNumber: faNumber
        });

        alert("Assembly entry saved");
    });





    document.querySelector('#meeting-panel .confirm-btn').addEventListener('click', () => {  // ('#meeting-panel .confirm-btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes.

        const start = document.querySelector('#meeting-panel .meeting-start').value;  
        const end = document.querySelector('#meeting-panel .meeting-end').value;
        const date = document.querySelector('#date').value;

        // Guardar en el array

        entries.push({                         // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Team Meeting",
            date: date,
            start: start,
            end: end
        });

        alert("Team Meeting Entry saved");
    });





    document.querySelector('#cleanup-panel .confirm-btn').addEventListener('click', () => {   // ('#fclcleanup-paneleanup .confirm-btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes.

        const start = document.querySelector('#cleanup-panel .cleanup-start').value;
        const end = document.querySelector('#cleanup-panel .cleanup-end').value;
        const date = document.querySelector('#date').value;

        entries.push({                          // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Cleanup",
            date: date,
            start: start,
            end: end
        });

        alert("Cleanup Entry saved");
    });















    

// 3️⃣ Mostrar los registros en un worker-wrapper de confirmación. 
//  BOTÓN ÜBERPRÜFEN → OCULTAR TODO EL CONTENIDO DEL WRAPPER

const workerWrapper = document.querySelector('.worker-wrapper');
const checkWrapper = document.querySelector('.check-wrapper');//---------------------                   -------------------
const backBtn = document.querySelector('.back-btn');
const submitBtn = document.querySelector('.submit-btn');

check.addEventListener('click', (event) => {

    event.stopPropagation(); // 🔥 IMPORTANTE: evita que tu document.addEventListener cierre cosas por error

    workerWrapper.innerHTML = ""; // 🔥 Elimina todo el contenido del worker-wrapper  

    checkWrapper.style.display = 'flex'; // Muestra el check-wrapper

    workerWrapper.appendChild(checkWrapper); // vuelve a añadir check-wrapper
       
 


    // Recorremos el array para poder mostrar su contenido


    const ol = document.querySelector('.registro-list');    


    entries.forEach(reg => {


        const li = document.createElement('li'); // crea un LI nuevo

        let texto = `Datum: ${reg.date}  --  ${reg.type}  --  von: ${reg.start}  bis: ${reg.end}`;

        if (reg.type === "Montage und Verdrahtung") {

            texto = `Datum: ${reg.date}  --  ${reg.type}  --  FA Nummer: ${reg.faNumber}  --  von: ${reg.start}  bis: ${reg.end}`;

        }

        li.textContent = texto; // pon el texto dentro del LI

        ol.appendChild(li);     // Añade este LI a la lista. Toma el elemento li que creaste en memoria y lo coloca como último hijo del <ol>. Si tu <ol> estaba vacío, ahora el <li> será el primer y único hijo. Si ya tenía elementos, appendChild lo pondrá al final, después de los elementos existentes.
                                // La posición, no es arbitraria, siempre se agrega al final de la lista.


    });   





    // Funcionalidad de volver atrás

    backBtn.addEventListener('click', () => {

        window.location.reload(); // Recarga la página con el formulario original

    });

    // Aquí podría añadir funcionalidad para enviar los datos a Java

    submitBtn.addEventListener('click', () => {

        console.log("Datos a enviar:", entries);

        // Aquí iría fetch() o submit del form hacia Java

         alert("Datos listos para enviar a la BBDD");

    });

});








/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */ 
   
