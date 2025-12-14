
/*

// Get the "task btn" button
const taskButton = document.querySelectorAll('.task_btn'); // Selecting all elements with the class task_btn on the page.

// Add a click event for each button. It is looped over each button in the taskButton NodeList and attach a click event listener to each one. When a button is clicked, the function inside the event listener is executed.
taskButton.forEach(button => { 

    button.addEventListener('click', () => {

        // Select the corresponding task container. Used to find the closest ancestor element of the clicked button that has the class formular. This helps us get the container that contains the button and the elements we want to show/hide.
        const container = button.closest('.formular');

        // Show the elements inside that container. QuerySelector is used to select the first elements with the classes .fa, .hours, and .hours_btn inside the selected container.
        const fa = container.querySelector('.fa');
        const hours = container.querySelector('.hours');
        const hoursBtn = container.querySelector('.hours_btn');

        if (fa.style.display === 'flex' && hours.style.display === 'flex' && hoursBtn.style.display === 'flex') { // it is checked if the display style of the fa, hours, and hoursBtn elements is set to 'flex'. If all three are visible (i.e., display: 'flex'), the condition evaluates to true.

            // If they are visible, hide them
            fa.style.display = 'none';
            hours.style.display = 'none';
            hoursBtn.style.display = 'none';

        } else {

            // If they are not visible, show them
            fa.style.display = 'flex';
            hours.style.display = 'flex';
            hoursBtn.style.display = 'flex';

        }
    });

});

*/





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









// 1. Get the "task_btn" button and the elements inside the .formular container

const taskButton = document.querySelector('.task_btn');
const fa = document.querySelector('.fa');
const hours = document.querySelector('.hours');
const hoursBtn = document.querySelector('.hours_btn');

// 2. Add a click event to the button

taskButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (fa.style.display === 'flex' && hours.style.display === 'flex' && hoursBtn.style.display === 'flex') {

    // 4. If they are visible, hide them

        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';

       
    } else {

    // 5. If they are not visible, show them

        fa.style.display = 'flex';
        hours.style.display = 'flex';
        hoursBtn.style.display = 'flex';

        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';
        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';       

    }

});









// 1. Get the "teammeeting_btn" button and the elements inside the .formular container

const teamMeetingButton = document.querySelector('.teammeeting_btn');
const meetingTime = document.querySelector('.meeting_time');
const agreeButton = document.querySelector('.agree_btn');


// 2. Add a click event to the button

teamMeetingButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (meetingTime.style.display === 'flex' && agreeButton.style.display  === 'flex') {

    // 4. If they are visible, hide them

        
        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';      
       

    } else {

    // 5. If they are not visible, show them

        meetingTime.style.display = 'flex';
        agreeButton.style.display = 'flex';
        
        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';
        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';        

    }

});









// 1. Get the "cleanup_btn" button and the elements inside the .formular container

const cleanUpButton = document.querySelector('.cleanup_btn');
const cleaninUpTime = document.querySelector('.cleanup_time');
const cleanUpAgreeButton = document.querySelector('.cleanup_agree_btn');


// 2. Add a click event to the button

cleanUpButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (cleaninUpTime.style.display === 'flex' && cleanUpAgreeButton.style.display  === 'flex') {

    // 4. If they are visible, hide them

        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';
                

    } else {

    // 5. If they are not visible, show them

        cleaninUpTime.style.display = 'flex';
        cleanUpAgreeButton.style.display = 'flex';
        
        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';
        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';        

    }

});


























/* --------------------------------------------------------------------------- When clicking anywhere outside on the screen, the elements are hidden ----------------------------------------------------------------------------------------------------------- */ 
   


const check = document.querySelector('.check-btn');
const tFormular = document.querySelector('#ftask');
const mFormular = document.querySelector('#fmeeting');
const cFormular = document.querySelector('#fcleanup');


// La razón por la cual closest() funciona en este caso, mientras que matches() no, se debe a cómo ambos métodos interactúan con el árbol de elementos y la propagación de eventos en el DOM.
// !e.target.matches(selector): Este método se usa para verificar si el elemento específico sobre el cual ocurrió el evento (es decir, e.target) coincide directamente con el selector proporcionado. Si haces clic sobre el .fa, e.target.matches('.fa') devolverá true solo si el elemento sobre el cual se hizo clic tiene la clase .fa directamente. No afecta a los ancestros ni a los elementos contenedores. Es una coincidencia exacta del elemento donde ocurrió el clic.
// !e.target.closest(selector): Este método, en cambio, busca recursivamente hacia arriba desde el elemento donde ocurrió el clic (e.target), y devuelve el primer ancestro que coincida con el selector. Si el clic fue sobre un elemento que está dentro de un contenedor con la clase .fa, closest('.fa') devolverá ese contenedor. Si el clic fue sobre .fa directamente, closest('.fa') también devolverá el mismo .fa. Si no encuentra ningún ancestro que coincida, devuelve null.

document.addEventListener("click", (e) => {



    /* 

        Cuando haces clic en cualquier parte del documento, el navegador dispara un evento click.
        Dentro de ese evento, e.target es el elemento exacto donde hiciste clic.

        Ejemplo:
        Si haces clic en un <span> dentro de un botón, e.target será el <span>, no el botón entero.

    */

    const target = e.target; 

    /* Esto simplemente guarda e.target en una variable para que no tengas que escribir e.target una y otra vez, si no habría que escribir lo siguiente: 

        if (!e.target.closest('.check_wrapper') && !e.target.closest('.check-btn')) {

            checkWrapper.style.display = 'none';

        }

    */
    





    // Si haces clic FUERA de #ftask

    if (!target.closest('#ftask')) {

        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';

    }

    // Si haces clic FUERA de #fmeeting

    if (!target.closest('#fmeeting')) {

        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';

    }

    // Si haces clic FUERA de #fcleanup

    if (!target.closest('#fcleanup')) {

        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';

    }

    

    // Si haces clic FUERA de .check_wrapper
    // Este caso es diferente a los anteriores. 
    // Porque, cuando haces clic en el botón .check-btn para mostrar .check_wrapper, ese mismo clic también activa el document.addEventListener('click'), y como .check_wrapper aún no está visible en ese momento, se oculta inmediatamente. ¡Se abre y se cierra al instante!

    if (!target.closest('.check_wrapper') && !target.closest(".check-btn") ) {

        checkWrapper.style.display = 'none';

    }




    



});




   







// -------------------------- EN ESTE APARTADO SE GUARDARÁN LOS DATOS QUE SE VAN A ENVIAR PARA SER COMPROBADOS ANTES DE ENVIARLOS A LA BBDD ------------------




// 1️⃣ Crear una estructura para guardar los datos

    const entries = []; // aquí guardaremos todos los datos que el usuario introduce


// 2️⃣ Capturar los datos cuando se pulsa "Confirmar" en cada formulario

    document.querySelector('#ftask .confirm_btn').addEventListener('click', () => { // ('#ftask .confirm_btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes

        const faNumber = document.querySelector('#fa_number').value;
        const start = document.querySelector('.montage_start_time').value;
        const end = document.querySelector('.montage_end_time').value;
        const date = document.querySelector('#date').value;

        // Guardar en el array

        entries.push({                          // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Montage und Verdrahtung",    
            date: date,
            start: start,
            end: end,
            faNumber: faNumber
        });

        alert("Montage-Eintrag gespeichert");
    });





    document.querySelector('#fmeeting .confirm_btn').addEventListener('click', () => {  // ('#fmeeting .confirm_btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes.

        const start = document.querySelector('#fmeeting .start_time').value;
        const end = document.querySelector('#fmeeting .end_time').value;
        const date = document.querySelector('#date').value;

        // Guardar en el array

        entries.push({                         // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Teamrunde",
            date: date,
            start: start,
            end: end
        });

        alert("Teamrunde-Eintrag gespeichert");
    });





    document.querySelector('#fcleanup .confirm_btn').addEventListener('click', () => {   // ('#fcleanup .confirm_btn') -> Opción más segura (recomendada). Evita conflictos si hay más botones iguales. Más mantenible en proyectos grandes.

        const start = document.querySelector('#fcleanup .start_time').value;
        const end = document.querySelector('#fcleanup .end_time').value;
        const date = document.querySelector('#date').value;

        entries.push({                          // push() es un método de los arrays. Se está añadiendo un objeto tipico de un array. En JSON -> {  "type": "Teamrunde",  "date": "2025-01-10"  }
            type: "Aufräumen",
            date: date,
            start: start,
            end: end
        });

        alert("Reinigungs-Eintrag gespeichert");
    });















    

// 3️⃣ Mostrar los registros en un wrapper de confirmación. 
//  BOTÓN ÜBERPRÜFEN → OCULTAR TODO EL CONTENIDO DEL WRAPPER

const wrapper = document.querySelector('.wrapper');
const checkWrapper = document.querySelector('.check-wrapper');
const backBtn = document.querySelector('.back-btn');
const submitBtn = document.querySelector('.back-btn');

check.addEventListener('click', (event) => {

    event.stopPropagation(); // 🔥 IMPORTANTE: evita que tu document.addEventListener cierre cosas por error

    wrapper.innerHTML = ""; // 🔥 Elimina todo el contenido del wrapper  

    checkWrapper.style.display = 'flex'; // Muestra el check-wrapper

    wrapper.appendChild(checkWrapper); // vuelve a añadir check-wrapper
       
 


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
   
