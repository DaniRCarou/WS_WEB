
// =====================================================================
// work.api.js
// Se encarga de enviar los registros de trabajo al backend
// No toca el HTML, no muestra alertas, no cambia vistas
// =====================================================================

// export → permite que worker.js pueda importar esta función
// async → marca la función como asíncrona, permite usar await dentro
//         para esperar la respuesta del backend antes de continuar
// entries → el array de registros confirmados por el trabajador
//           cada elemento tiene: type, date, start, end y faNumber
// employeeId → el número personal del empleado logueado,
//              leído del sessionStorage en worker.js
export async function saveRecords(entries, employeeId) {

    // Diccionario que traduce el nombre de la tarea a su ID en la base de datos. Objeto en JavaScript (colección de pares clave-valor donde yo defino las claves).
    // "Assembly and Wiring" → 1, "Team Meeting" → 2, "Cleanup" → 3
    // Usamos un objeto porque necesitamos buscar por nombre ("Assembly and Wiring") y obtener su número (1) — algo que un array no puede hacer directamente.
    // // se accede con: taskIds["Assembly and Wiring"] → devuelve 1.
    const taskIds = {
        "Assembly and Wiring": 1,
        "Team Meeting": 2,
        "Cleanup": 3
    };


    // Ahora el siguiente paso es recorrer el array entries y para cada registro enviarlo al backend.
    // Para recorrer el array usamos for...of — es como forEach pero más limpio cuando usas await dentro.
    // Recorre el array entries uno por uno
    // for...of → igual que forEach pero permite usar await dentro
    // entry → representa cada registro individual del array en cada vuelta
    // Ejemplo: primera vuelta → entry = { type: "Assembly and Wiring", date: "2026-05-07", ... }
    //          segunda vuelta → entry = { type: "Team Meeting", date: "2026-05-07", ... }
    // entries no existe en este archivo — viene de worker.js como parámetro
    // cuando worker.js llama a saveRecords(entries, employeeId), le pasa su array
    for (const entry of entries) {
        
        // Convierte la hora de inicio de texto a números
        // "08:30".split(':') → ["08", "30"] → map(Number) → [8, 30]
        // entry Es cada elemento del array entries en cada vuelta del bucle for. Viene de worker.js — es un objeto que el trabajador creó al pulsar Confirm. Contiene type, date, start, end y faNumber.
        // entry.start Es la propiedad start de ese objeto — la hora de inicio que el trabajador introdujo en el input. Es un texto, por ejemplo "08:30". Viene del input task-start del HTML.
        // .split(':') split es un método de JavaScript que divide un texto en partes. El ':' le dice dónde cortar — por los dos puntos.
        // Resultado: un array con dos elementos de texto.
        // .map(Number) map recorre cada elemento del array y le aplica una función. Number convierte texto a número. Resultado: un array con dos números.
        const [startHours, startMinutes] = entry.start.split(':').map(Number);

        // Convierte la hora de fin de texto a números
        const [endHours, endMinutes] = entry.end.split(':').map(Number);

        // Calcula la duración en minutos
        // Ejemplo: (10 * 60 + 0) - (8 * 60 + 30) = 600 - 510 = 90 minutos
        const totalTime = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

    


        // Construye el objeto que el backend necesita para guardar el registro en MySQL
        // Es una "ficha" con 4 datos: qué tarea, quién la hizo, cuándo y cuánto tiempo
        const record = {

            // task → la tarea realizada
            // entry.type contiene el nombre: "Assembly and Wiring", "Team Meeting" o "Cleanup"
            // taskIds[entry.type] busca ese nombre en el diccionario taskIds, que creamos al principio de la función — el objeto taskIds y devuelve su número
            // Ejemplo: taskIds["Assembly and Wiring"] → 1
            // El backend no acepta el nombre de la tarea, solo el número (clave foránea de la tabla task)
            // El backend espera un objeto task, no un número suelto.
            // task: → es el nombre de la propiedad del objeto record
            // { taskId: ... } → es el contenido, un objeto con una clave y un valor
            // taskId → es la clave, y debe coincidir exactamente con el nombre del campo en Task.java del backend
            // taskIds[entry.type] → es el valor, el número que obtuvimos del diccionario
            task: { taskId: taskIds[entry.type] },

            // employee → el empleado que realizó la tarea
            // employeeId viene del sessionStorage — se guardó al hacer login en login.js
            // parseInt() lo convierte a número entero por si acaso viene como texto
            employee: { employeeId: parseInt(employeeId) },

            // date → la fecha seleccionada por el trabajador en el calendario
            // Ejemplo: "2026-05-07"
            date: entry.date,

            // totalTime → la duración de la tarea en minutos, calculada arriba
            // Ejemplo: 90 minutos
            totalTime: totalTime

        };


        // try/catch → maneja los errores de forma controlada
        // Sin él, si algo falla (backend caído, sin internet, MySQL caído...)
        // el programa se rompe completamente y el trabajador ve una pantalla en blanco
        // Con él:
        // try → intenta ejecutar el código
        // catch → si algo falla, lo captura y muestra un mensaje controlado al usuario
        // err → es el error que ocurrió, lo mostramos en la consola para depuración
        try {

            // fetch → envía el objeto record al backend como una carta
            // await → espera la respuesta del backend antes de continuar
            // 'http://localhost:8080/records/save' → la dirección del endpoint en RecordController.java
            // method: 'POST' → indica que estamos enviando datos nuevos
            // headers → le dice al backend que el contenido es JSON
            // body → el contenido de la carta, el objeto record convertido a texto con JSON.stringify
            //        JSON.stringify es necesario porque fetch solo puede enviar texto, no objetos JavaScript
            const response = await fetch('http://localhost:8080/records/save', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(record)

            });


            if (!response.ok) {                                 // !response.ok significa "si NO fue bien"

                const error = await response.text();            // Lee el mensaje de error que devuelve el backend — por ejemplo "Record not found" o "Invalid data". await espera a que el backend termine de enviar ese texto.

                return { success: false, message: error };      // Para la función y devuelve un objeto indicando que hubo un error y cuál fue. worker.js recibirá ese objeto y podrá mostrar el mensaje al trabajador.

            }
            

        } catch (err) {

            console.error("Error connecting to server:", err);

            return { success: false, message: "Server connection error" };

        }


    }

    return { success: true };   // Solo llega aquí si todos los registros se enviaron correctamente. Devuelve éxito a worker.js.

}


