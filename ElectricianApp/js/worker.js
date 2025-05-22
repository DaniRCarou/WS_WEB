
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
        specialWrapper.style.display = 'none';

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
        specialWrapper.style.display = 'none';

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
        specialWrapper.style.display = 'none';

    }

});









// 1. Get the "special_btn" button and the elements inside the .formular container

const specialButton = document.querySelector('.special_btn');
const specialWrapper = document.querySelector('.special_wrapper');
const scrollWrapper = document.querySelector('.scroll_wrapper');

// 2. Add a click event to the button

specialButton.addEventListener('click', () => {

    // 3. To checik if the elements are visible

    if (specialWrapper.style.display === 'flex') {

    // 4. If they are visible, hide them

        specialWrapper.style.display = 'none';
        

       


    } else {

    // 5. If they are not visible, show them

        specialWrapper.style.display = 'flex';
        scrollWrapper.style.display = 'flex';

        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';        
        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';
        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';
        internScrollWrapper.style.display = 'none';

    }

});







// 1. Get the "cleanup_btn" button and the elements inside the .formular container

const internTab = document.querySelector('.intern_tab');
const internScrollWrapper = document.querySelector('.intern_scroll_wrapper');


// 2. Add a click event to the button

internTab.addEventListener('click', () => {
            
    internScrollWrapper.style.display = 'flex';   
    internTab.style.backgroundColor = 'white'; 
    externTab.style.backgroundColor = 'rgb(231, 227, 227)';   

});


// 1. Get the "cleanup_btn" button and the elements inside the .formular container

const externTab = document.querySelector('.extern_tab');

// 2. Add a click event to the button

externTab.addEventListener('click', () => {
            
    internScrollWrapper.style.display = 'none';  
    externTab.style.backgroundColor = 'white';   
    internTab.style.backgroundColor = 'rgb(231, 227, 227)';
      
});






const check = document.querySelector('.check-btn');
const sFormular = document.querySelector('.special_formular');
const tFormular = document.querySelector('#ftask');
const mFormular = document.querySelector('#fmeeting');
const cFormular = document.querySelector('#fcleanup');
const checkWrapper = document.querySelector('.check_wrapper');


check.addEventListener('click', () => {
            
    if (checkWrapper.style.display === 'flex') {

        // 4. If they are visible, hide them
    
            specialWrapper.style.display = 'none';
            sFormular.style.display = 'flex';
            tFormular.style.display = 'flex';
            mFormular.style.display = 'flex';
            cFormular.style.display = 'flex';
            checkWrapper.style.display = 'none';
    
        } else {
    
        // 5. If they are not visible, show them
    
            specialWrapper.style.display = 'flex';
            scrollWrapper.style.display = 'flex';
    
            cleaninUpTime.style.display = 'none';
            cleanUpAgreeButton.style.display = 'none';        
            meetingTime.style.display = 'none';
            agreeButton.style.display = 'none';
            fa.style.display = 'none';
            hours.style.display = 'none';
            hoursBtn.style.display = 'none';
            internScrollWrapper.style.display = 'none';
            sFormular.style.display = 'none';
            tFormular.style.display = 'none';
            mFormular.style.display = 'none';
            cFormular.style.display = 'none';
            checkWrapper.style.display = 'flex';
        }      
      
});





/* --------------------------------------------------------------------------- When clicking anywhere outside on the screen, the elements are hidden ----------------------------------------------------------------------------------------------------------- */ 
   



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

    // Si haces clic FUERA de .special_formular

    if (!target.closest('.special_formular')) {

        specialWrapper.style.display = 'none';

    }

    // Si haces clic FUERA de .check_wrapper
    // Este caso es diferente a los anteriores. 
    // Porque, cuando haces clic en el botón .check-btn para mostrar .check_wrapper, ese mismo clic también activa el document.addEventListener('click'), y como .check_wrapper aún no está visible en ese momento, se oculta inmediatamente. ¡Se abre y se cierra al instante!

    if (!target.closest('.check_wrapper') && !target.closest(".check-btn") ) {

        checkWrapper.style.display = 'none';

    }



});







/*


    Esto es otra ejemplo, fíjate en .matches.


    🔹 .matches(selector)

    Comprueba si el elemento exacto sobre el que ocurrió el evento (e.target) coincide con el selector que le pasas.

    No sube por los elementos padres.

    ✅ Útil para verificar si el clic fue directamente sobre un botón o elemento específico.


    🔹 .closest(selector)

    Recorre hacia arriba en el DOM desde el e.target, buscando el primer ancestro (o él mismo) que coincida con el selector.

    Si encuentra uno, lo devuelve. Si no, devuelve null.

    ✅ Útil cuando el clic puede ocurrir dentro de un contenedor, y quieres saber si pertenece a una "zona" específica.


    if (!e.target.matches(".check-btn") && !e.target.matches(".special_btn") && !e.target.matches(".cleanup_btn") && !e.target.matches(".teammeeting_btn") && !e.target.matches(".task_btn") && !e.target.matches(".check_wrapper") && !e.target.closest('#ftask') && !e.target.closest('#fmeeting') && !e.target.closest('#fcleanup') && !e.target.closest('.special_formular')) {

        specialWrapper.style.display = 'none';
        cleaninUpTime.style.display = 'none';
        cleanUpAgreeButton.style.display = 'none';
        fa.style.display = 'none';
        hours.style.display = 'none';
        hoursBtn.style.display = 'none';
        meetingTime.style.display = 'none';
        agreeButton.style.display = 'none';              

    }



*/




/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */ 
   
