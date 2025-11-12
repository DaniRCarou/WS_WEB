
const langLinks = document.querySelectorAll("[data-language]"); // Método que selecciona todos los elementos del DOM que coincidan con un selector CSS. Devuelve una NodeList, que es como un array de elementos HTML (aunque no es un array real, se puede recorrer con forEach).
const textsToChange = document.querySelectorAll("[data-section]"); // Escogimos data-section porque también contiene los data-value. Esto también podría valer, const textsToChange = document.querySelectorAll("[data-section]");
const selectedLangContainer = document.querySelector(".selected-lang"); // como no tiene dataset, utilizamos la clase para localizarlo





// Primero, forEach recorre una sola vez todos los enlaces con data-language y les pone un listener.
// Ese listener está esperando a que el usuario haga clic.
// al mismo tiempo, solo cuando se hace clic en un enlace, se ejecuta la función que está dentro del listener, incluyendo el fetch, la actualización de textos y la actualización del idioma seleccionado.


langLinks.forEach((link) => { // Con esto se recorre la lista de enlaces una sola vez al cargar la página.

    link.addEventListener("click", () => { // A cada enlace se le “asocia” un listener que está en espera de un clic.

        
        fetch(`../json/${link.dataset.language}.json`)  // fetch -> carga el archivo JSON (por ejemplo es.json correspondiente a ' data-language="es" '. 'es' -> es el nombre del archivo json), solo cuando el usuario ha hecho clic en un enlacepor ejemplo es.json, de.json, etc.), según el data-language del enlace.
                                                        // (`../json/${link.dataset.language}.json`) -> ruta para encontrar el archivo JSON. link es la variable que guarda el enlace en ese momento, 'datset.language' es para acceder a 'data-language=' del código html.
                                                        // Muy importante utilizar estas comillas `` -> ESTO DE AQUÍ REPRESENTA LAS LETRAS (ca,de, en, es, eus, gl, pt) QUE TIENEN EN EL TÍTULO LOS ARCHIVOS JSON: '${link.dataset.language}'
        
        .then(res => res.json())    /* .then() es un método de las promesas en JavaScript. La función dentro de .then() se ejecuta solo cuando fetch ha recibido la respuesta.
                                        Cuando haces un 'fetch': no devuelve directamente los datos del archivo JSON. Devuelve una promesa que, cuando se cumple, te da un objeto Response. 
                                        Un objeto Response es como un “sobre” que contiene: El contenido del archivo que pediste (es.json) + Información extra de la respuesta (código HTTP, cabeceras…). No es un objeto JavaScript todavía
                                        El contenido dentro del Response está en formato texto, como si leyéramos el archivo JSON crudo: "{ \"languageMenu\": { \"logInTitle\": \"Iniciar sesión\" } }"
                                        Este texto no se puede usar directamente como un objeto en JS; sería solo una cadena.
                                        res => res.json() es una función flecha que dice: Cuando la promesa se cumpla y llegue la respuesta (res), entonces ejecuta res.json(). res.json() -> Lee ese texto y lo convierte en un objeto JavaScript.
                                        Es lo mismo que esto:
                                        function(res) {
                                            return res.json();
                                        }
                                        res -> es el objeto Response que devuelve fetch.
                                        res.json() -> convierte el contenido en objeto JavaScript.
                                    
                                        res.json() -> también devuelve una promesa, por eso podemos encadenar otro .then(data => ...).
                                    
                                        Explicación rápida:
                                        fetch → pide el archivo JSON, devuelve una promesa.
                                        Primer .then(res => res.json()) → convierte la respuesta en objeto JS (otra promesa).
                                        Segundo .then(data => ...) → recibe el objeto final listo para usar y actualizar la página. */


        .then(data => { // .then() -> es un método de las promesas en JavaScript. La función dentro de .then() se ejecuta solo cuando fetch ha recibido la respuesta.
                        // data -> es el objeto JS creado a partir del JSON. La variable data solo existe dentro del segundo .then(data => { ... }), porque es el resultado de la promesa que devuelve res.json().
                        // res y data no son palabras reservadas en JavaScript. Son nombres de variables, completamente arbitrarios. Puedo usar cualquier otro nombre que tenga sentido para mi. -> .then(response => response.json()) -> .then(obj => {
                            
            textsToChange.forEach((el) => { // textsToChange contiene todos los elementos del HTML con data-section
                                            // forEach recorre cada uno de esos elementos para actualizarlos.

                const section = el.dataset.section; // Guardamos en section el data-section del elemento que está examinando ahora
                const value = el.dataset.value;     // Guardamos en value el data-value del elemento que está examinando ahora.




                // innerHTML -> solo funciona con el contenido “entre etiquetas” de un elemento, es decir, lo que está dentro de <etiqueta>…contenido…</etiqueta>.
                // Si fuera de otra manera podríamos utilizar directamente: el.innerHTML = data[section][value];

                if (el.tagName.toLowerCase() === "input") { // el.tagName -> devuelve el tipo de elemento (por ejemplo "INPUT" o "H1"). Si es un <input>, el texto se debe poner en placeholder.

                    el.placeholder = data[section][value]; // actualizamos el placeholder

                } else if (el.tagName.toLowerCase() === "a" && el.querySelector("img")) {   // el.tagName -> nos diría "A" porque él es 'el' <a>. Es decir, aquí queremos coger el tag del 'el' y compararlo. y con el querySelector queremos saber si el padre contiene un 'img'
                                                                                            // el.querySelector("img") -> Pero queremos localizar la <img> dentro de ese <a>, no el <a> en sí. busca el primer <img> dentro de ese <a> y nos devuelve ese nodo <img> para poder usarlo.
                                                                                            // Podemos manipular solo el texto que está después de esa imagen sin borrar la <img>

                    const img = el.querySelector("img");    // Guardamos la imagen en una constante para poder modificarla después con el método .remove()
                                                            // el → Es el elemento actual del forEach. En tu caso, cada <a> dentro del menú de idiomas.
                                                            // querySelector("img") → Busca el primer elemento <img> dentro de el padre, 'el'. Devuelve un nodo HTML o null si no lo encuentra.
                                                            

                    img.nextSibling?.remove();  // Eliminamos cualquier texto existente después de la img 
                                                // img → La variable que contiene el <img> que encontramos.
                                                // nextSibling → Devuelve el siguiente nodo hermano de img dentro del mismo <a>
                                                // Con img puedes hacer cosas como: img.src → obtener la ruta de la imagen, img.alt → obtener el texto alternativo, img.classList → acceder a sus clases, img.remove() → eliminar el nodo completo del DOM

                    const textNode = document.createTextNode(" " + data[section][value]);   // Creamos un nuevo nodo de texto con el valor del JSON. 
                                                                                            // createTextNode(...) → Crea un nodo de texto puro (no HTML), que se puede añadir a cualquier elemento.
                                                                                            // " " + data[section][value] → El contenido del nodo de texto: " " → Un espacio al principio para separar la imagen del texto.
                                                                                            // data[section][value] → Valor del idioma que viene del JSON. data -> es el objeto JS creado a partir del JSON. La variable data solo existe dentro del segundo .then(data => { ... }), porque es el resultado de la promesa que devuelve res.json().


                                                                                            // En el DOM (Document Object Model), todo lo que está dentro de una página web se representa como nodos. 
                                                                                            // Hay varios tipos de nodos, pero los más importantes para nosotros aquí son: Element nodes (nodos de elemento): Son las etiquetas HTML, como <a>, <img>, <div>, <input>, etc. Pueden tener atributos (src, href, class, etc.) y hijos (otros nodos). 
                                                                                            // Text nodes (nodos de texto): Es el texto que está dentro de un elemento, no está envuelto en otra etiqueta. <a> → element node, <img> → element node, " German" → text node (es un hijo de <a>, separado de la imagen). 
                                                                                            // Ese nodo de texto no es HTML, solo es texto que vive dentro del <a> y se representa como un nodo independiente en el DOM. 
                                                                                            // Si haces el.innerHTML = "Deutsch", borras todos los hijos (imagen + nodo de texto). Si en cambio localizas solo el text node y lo eliminas (img.nextSibling.remove()), mantienes la imagen intacta y solo cambias el texto.
                                                                                            // Luego puedes crear un nuevo text node con document.createTextNode(" Deutsch") y añadirlo al <a> con appendChild.

                    
                    
                    
                    
                    el.appendChild(textNode);   
                    // el → El <a> que contiene la bandera y donde queremos poner el texto. Es el <a> completo. Ese es el padre.
                    // <img> → appendChild. Ya existe dentro de <a> como hijo, pero no se modifica aquí.
                    // appendChild(textNode) → Es un método de los nodos en el DOM que sirve para añadir un nodo hijo al final del nodo padre. es decir, cuando escribes appehdchild y entre paréntesis un texto, quiere decir que eso que está dentro del paréntesis va después del appendchild, que en este caso es img







                }else if (el.tagName.toLowerCase() === "label" && el.querySelector("input")) {

                    const input = el.querySelector("input");

                    // Eliminar solo los nodos de texto existentes (no el input)
                    el.childNodes.forEach(node => {

                    if (node.nodeType === Node.TEXT_NODE) node.remove();
                    
                });

                // Añadir el nuevo texto después del input
                el.appendChild(document.createTextNode(" " + data[section][value]));

                }else {
                
                    el.textContent = data[section][value];
                }


            })
                



            // 2. Intercambiar idioma seleccionado con el del menú



            // Guarda en una variable el <a> que está actualmente dentro de selected-lang (el idioma que se está mostrando arriba).

            const currentSelected = selectedLangContainer.querySelector("a");   
            // Esta es la variable que representa el enlace (<a>) que actualmente se muestra en el contenedor superior (.selected-lang).
            // querySelector busca el primer elemento que coincida con el selector CSS que le pases dentro de selectedLangContainer.
            // "a" significa: queremos el primer <a> dentro de selectedLangContainer, que es el idioma actualmente seleccionado.



            // Guarda en una variable el <li> que contiene el <a> sobre el que hiciste clic en el menú desplegable.

            const menuLi = link.parentNode; 
            // Esta variable guarda el <li> del menú que contiene el enlace sobre el que hiciste clic.
            // parentNode devuelve el nodo padre inmediato de link, que en este caso es el <li> del menú desplegable.
            // Esto nos permite devolver el enlace que estaba arriba al menú correctamente después de hacer el intercambio.



            // Limpia todo el contenido del selected-lang, eliminando temporalmente el enlace que estaba ahí.

            selectedLangContainer.innerHTML = ""; 
            // Limpiamos todo el contenido de selectedLangContainer antes de mover el nuevo enlace.
            // innerHTML = "" elimina todos los nodos hijos de selectedLangContainer, es decir, el <a> anterior se elimina del DOM visual, pero ya lo guardamos en currentSelected para poder reutilizarlo.

            
            
            // Mueve el <a> clickeado al selected-lang, mostrando ahora el nuevo idioma arriba.
            
            selectedLangContainer.appendChild(link); 
            // Movemos el enlace sobre el que hiciste clic al contenedor superior (.selected-lang).
            // appendChild(link) añade el nodo link como hijo de selectedLangContainer.
            // Esto lo mueve **en lugar de clonarlo**, así que conserva todos los atributos, imagen y event listeners.



            // Mete el <a> anterior (el que estaba arriba) dentro del <li> del menú, devolviéndolo al desplegable para que siga siendo seleccionable.

            menuLi.appendChild(currentSelected); 
            // Movemos el enlace que estaba previamente en selectedLangContainer al <li> del menú que acabamos de vaciar con link.
            // appendChild(currentSelected) inserta el nodo currentSelected como hijo del <li> del menú, devolviendo al menú el idioma que estaba arriba.






        })
            
        

        

    })    





        










})




