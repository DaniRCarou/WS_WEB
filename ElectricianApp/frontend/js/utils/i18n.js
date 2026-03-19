/* 
 Todo lo relacionado con los idioma. Carga JSON de idiomas y actualiza los textos. Se llama i18n por convención internacional en desarrollo de software.
 i18n significa “internationalization”. La letra i es la primera de internationalization, la n es la última, y el 18 representa las 18 letras que hay entre la i y la n.
 Es una abreviatura estándar usada en todo el software para referirse a todo lo relacionado con traducciones, idiomas y adaptación de la aplicación a distintos países/regiones.

 Este archivo se guarda dentro de la carpeta utils porque utils viene de “utilities”, que en español sería “utilidades”. Es una carpeta donde pones funciones o módulos que son genéricos y reutilizables en varias partes del proyecto, pero que no pertenecen a una vista específica ni a una API concreta.
 Por ejemplo:

  - Funciones para formatear fechas (formatDate)
  - Validaciones genéricas (isEmpty, isEmail)
  - Funciones para traducciones (i18n.js)
  - Helpers para manipular arrays o objetos

  Idea: cualquier función “de uso general” que puedas usar en muchas partes de tu frontend.
*/






// =====================================================================
// Estado global del idioma
// Variables exportadas y compartidas entre módulos
// =====================================================================

const DEFAULT_LANG = "en";                                              // Idioma por defecto.
export let currentLang = DEFAULT_LANG;                                  // Idioma por defecto. 
                                                                        // *export* → significa que esta variable puede ser usada fuera de este archivo js. Permite que otro archivo JS haga: import { currentLang } from './i18n.js';. Sin export, la variable solo existe dentro de este archivo.
                                                                        // *let* → Declara una variable que puede cambiar su valor después.
                                                                        // *= "en"* → Inicializa la variable con el valor por defecto "en".

export let currentLanguageData = {};                                    // Variable que almacena un objeto con los textos cargados
                                                                        // *currentLanguageData* → almacena todos los textos del idioma cargado, como los mensajes de alert, placeholders, títulos, etc.
                                                                        // *= {}* → inicia como objeto vacío. Luego se llenará con los datos del JSON del idioma.






// =====================================================================
// Referencias al DOM
// Constantes locales al módulo usadas para interactuar con la interfaz
// =====================================================================

const langLinks = document.querySelectorAll("[data-language]");         // Colección de objetos del DOM
                                                                        // const → declara una variable que no se puede reasignar (aunque sí puedes modificar su contenido si es un objeto o array).
                                                                        // langLinks → nombre de la variable, aquí será una lista de todos los enlaces de idiomas.
                                                                        // document.querySelectorAll("[data-language]") → busca en el DOM todos los elementos que tengan el atributo data-language y devuelve una NodeList (parecida a un array).

const textsToChange = document.querySelectorAll("[data-section]");
const selectedLangContainer = document.querySelector(".selected-lang");





// =====================================================================
// Función para cargar un idioma
// =====================================================================

export async function loadLanguage(lang) {                          // Recibe un idioma (lang), carga el JSON correspondiente con fetch, guarda ese contenido en memoria y luego actualiza los textos de la página para mostrar el idioma seleccionado.
                                                                    // export → Permite que esta función sea usada en otros archivos JS. Ejemplo desde otro archivo.js: import { loadLanguage } from "./language.js";
                                                                    // async → Indica que la función es asíncrona. Permite usar await dentro. La función devuelve una Promise automáticamente. cualquier función marcada con async devuelve automáticamente una Promise, incluso si no escribes return. Marcar una función con async permite usar await dentro de ella. await -> hace que JavaScript espere a que la Promise se resuelva antes de continuar. Sin async, no puedes usar await.
                                                                    // lang → Es el idioma a cargar. Normalmente es un código de idioma como: "en" → inglés

  try {                                                             // Sirve para manejar errores sin que la aplicación se rompa. Si algo falla dentro del try, el error se captura en el catch.

    const res = await fetch(`../json/${lang}.json`);                // res → será un objeto Response. Es una ruta dinámica porque la ruta depende de una variable (lang).
                                                                    // await → Espera a que la petición termine antes de continuar. Pausa la ejecución hasta que la petición termine.
                                                                    // fetch hace una petición HTTP. En este caso, está cargando un archivo local JSON
                                                                    // `../json/${lang}.json` → Ruta dinámica. Si lang = "es" → carga: ../json/es.json

    const data = await res.json();                                  // Convierte la respuesta HTTP en un objeto JavaScript. El archivo JSON podría verse así: { "title": "Bienvenido", "button": "Enviar"}. 
                                                                    // Después de esta línea: data = {title: "Bienvenido",button: "Enviar"}
                                                                    

    currentLanguageData = data;                                     // Guarda los textos del idioma en una variable global o de módulo. Esto permite que otras funciones accedan a las traducciones

    updateTexts();                                                  // Llama a una función que: Recorre el DOM y cambia los textos visibles según currentLanguageData

  } catch (err) {

    console.error("Error loading language:", err);                  // Se mostrará en la consola un error de tipo: Archivo no existe, Error de red, JSON mal formado.     

  }

}





// =====================================================================
// Función localizar los textos y modificarlos
// =====================================================================

function updateTextNode(el, text) {                                           // Esta función es clave para que no desaparezcan las banderas. Cambia el texto de un elemento SIN tocar sus imágenes u otros elementos HTML. Actualiza solo nodos de texto
                                                                              // el → el elemento HTML a modificar (<button>, <label>, etc.)
                                                                              // text → el nuevo texto traducido.

  // recorre todas las etiquetas, elementos principales
  el.childNodes.forEach(node => {                                             // childNodes se refiere a los hijos de etiquetas. Las etiquetas y las palabras son nodos. Pero no todos los nodos son etiquetas. En este caso la palabra a sustituir, por ejemplo English, es un nodo pero no un elemento. Es un texto dentro del elemento.
                                                                            
    // Aquí se está comprobando si el node es de tipo texto para sustituirlo. 
    if (node.nodeType === Node.TEXT_NODE)                                     // nodeType -> es una propiedad estándar del DOM que indica qué tipo de nodo es. // (valor)3. Node.TEXT_NODE / Texto ("English") -> Es una constante del navegador que vale: 3
      node.textContent = text;                                                // Sustituyes el contenido texto del node, porque sabes que es un texto                                                                            

  });                                                                 

}





// =====================================================================
// Función para actualizar los textos en el DOM
// =====================================================================

function updateTexts() {

  textsToChange.forEach(el => {

    if (el.closest("[data-no-i18n]")) return;

    const section = el.dataset.section;

    const value = el.dataset.value;

    if ((el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") && el.querySelector("img")) {

      updateTextNode(el, " " + currentLanguageData[section][value]);

    } else if (el.tagName.toLowerCase() === "label" && el.querySelector("input")) {

      updateTextNode(el, " " + currentLanguageData[section][value]);

    } else if (el.tagName.toLowerCase() === "input" && el.placeholder !== undefined) {

      el.placeholder = currentLanguageData[section][value];

    } else {

      el.textContent = currentLanguageData[section][value];

    }

  });



  

  // ======================================================
  // Actualiza el contenedor del idioma seleccionado
  // ======================================================
  const selectedButton = selectedLangContainer.querySelector("button");

  if (selectedButton) {

    const langCode = selectedButton.dataset.language;   // ej: "en", "de"

    const value = selectedButton.dataset.value;         // ej: "english", "german"

    const translatedText = currentLanguageData.languageMenu?.[value] || selectedButton.textContent;

    const imgHTML = selectedButton.querySelector("img")?.outerHTML || "";

    selectedLangContainer.innerHTML = `<button type="button" disabled data-language="${langCode}" data-value="${value}">${imgHTML} ${translatedText}</button>`;

  }

}





// =====================================================================
// Renderiza el idioma seleccionado (solo vista, no mueve DOM real)
// =====================================================================

function renderSelectedLanguage(button) {

  const langCode = button.dataset.language;      // ej: "en", "de", "es"

  const value = button.dataset.value;            // ej: "english", "german", "spanish"

  // Obtén el texto traducido desde el JSON
  const translatedText = currentLanguageData.languageMenu?.[value] || button.textContent;

  // Renderiza el botón en el contenedor con la bandera y el texto traducido
  const imgHTML = button.querySelector("img")?.outerHTML || "";

  selectedLangContainer.innerHTML = `<button type="button" disabled>${imgHTML} ${translatedText}</button>`;

  // Oculta el botón correspondiente en la lista
  langLinks.forEach(btn => {

    btn.style.display = btn.dataset.language === langCode ? "none" : "inline-block";

  });

}





// =====================================================================
// Manejo del cambio de idioma
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {

  initLanguageMenu();

});

function initLanguageMenu() {

  const defaultButton = document.querySelector(`[data-language="${DEFAULT_LANG}"]`);

  // Carga idioma por defecto y actualiza botón seleccionado
  loadLanguage(DEFAULT_LANG).then(() => {

    renderSelectedLanguage(defaultButton);

    document.documentElement.lang = DEFAULT_LANG; // ahora se hace después de cargar idioma

  });

  // Agrega evento click a cada botón de idioma
  langLinks.forEach((button) => {

    button.addEventListener("click", () => {

      const newLang = button.dataset.language;

      currentLang = newLang;

      loadLanguage(newLang).then(() => {

        renderSelectedLanguage(button);

        document.documentElement.lang = newLang;

      });

    });

  });

}


