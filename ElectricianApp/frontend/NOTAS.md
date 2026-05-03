Aquí tienes todos los conceptos juntos para tu `NOTAS.md`:

---

# 📝 CONCEPTOS JS — Employee Portal

## 1. `const` vs `let`
- `const` → no se puede reasignar
- `let` → se puede reasignar

## 2. Scope (alcance)
- Una variable declarada con `const` o `let` dentro de `{ }` solo existe dentro de esas llaves
- Fuera de esas llaves la variable no existe

```javascript
try {
    const data = await res.json();  // data solo existe aquí dentro
} catch (err) { }

console.log(data);  // ❌ ERROR — data no existe aquí fuera
```

## 3. `window`
- Es el objeto global del navegador — existe siempre
- Puedes añadirle cualquier cosa: variables, objetos, arrays, funciones
- Todo lo que añadas es accesible desde cualquier script de la página
- Con `var` las variables se añaden automáticamente a `window`. Con `const` y `let` hay que hacerlo manualmente

```javascript
// Añadir al window
window.miNombre = "Juan";
window.miObjeto = { nombre: "Juan", edad: 25 };
window.miLista = [1, 2, 3];
window.miFuncion = function() { console.log("hola"); };

// Leer desde cualquier script
console.log(window.miNombre);    // → "Juan"
console.log(window.miLista[0]);  // → 1
window.miFuncion();              // → "hola"

// Con var se añade automáticamente
var miVariable = "hola";
console.log(window.miVariable);  // → "hola"

// Con const y let hay que hacerlo manualmente
const miConst = "hola";
console.log(window.miConst);     // → undefined
window.miConst = miConst;        // → ahora sí es accesible
```

## 4. Objetos en JS vs Java
- En JS los objetos son colecciones de pares clave:valor
- Puedes añadir y leer propiedades directamente con `.` sin declarar nada antes
- No necesitas clases, getters ni setters obligatorios
- En Java necesitas declarar la clase, crear instancia con `new` y usar getters/setters
- Leer una propiedad: `objeto.propiedad`
- Escribir o crear una propiedad: `objeto.propiedad = valor`

## 5. Módulos vs scripts normales
- Los módulos tienen la "puerta cerrada" — lo que hay dentro no es accesible desde fuera sin `export`/`import`
- Los scripts normales tienen la "puerta abierta"
- `window` es el "pasillo" — accesible desde todos
- `export` → permite que algo salga del módulo
- `import` → permite traer algo de otro módulo

## 6. Selectores CSS en JS
- `#id` → busca por id
- `.clase` → busca por clase
- espacio → significa "dentro de"
- Son los mismos selectores que en CSS
- `querySelector` → devuelve el primer elemento que coincide
- `querySelectorAll` → devuelve todos los elementos que coinciden

```javascript
document.querySelector('#task-panel .confirm-btn')
// → busca .confirm-btn dentro de #task-panel
```

## 7. `addEventListener`
- Escucha eventos en un elemento
- Sintaxis: `elemento.addEventListener('evento', () => { })`
- Eventos comunes: `click`, `submit`, `input`, `DOMContentLoaded`
- El código dentro de `() => { }` se ejecuta cuando ocurre el evento

## 8. Funciones flecha `() => { }`
- Forma moderna y corta de escribir funciones
- Son equivalentes a `function() { }`
- El código dentro de `{ }` se ejecuta cuando se llama la función

## 9. `querySelector` vs `window.currentLanguageData`
- `querySelector` → busca elementos en el HTML, devuelve un nodo del DOM
- `window.currentLanguageData` → accede a datos guardados en memoria, devuelve un objeto JavaScript

## 10. JSON y `currentLanguageData`
- `currentLanguageData` es una variable que contiene el JSON del idioma seleccionado
- Se accede a sus valores con `.`: `currentLanguageData.alerts.assemblySaved`
- Se actualiza cada vez que el trabajador cambia de idioma
- `window.currentLanguageData = data` → la hace accesible desde cualquier script

## 11. `||` operador OR como valor por defecto
- `a || b` → si `a` existe y tiene valor devuelve `a`, si no devuelve `b`
- Se usa como red de seguridad:

```javascript
window.currentLanguageData?.alerts?.assemblySaved || "Assembly entry saved"
```

## 12. `?.` operador de encadenamiento opcional
- Evita errores si el objeto no existe
- Sin `?.`: si el objeto es `undefined` → error
- Con `?.`: si el objeto es `undefined` → devuelve `undefined` sin error

```javascript
window.currentLanguageData?.alerts?.assemblySaved
```

## 13. `console.log`
- Solo visible en la consola del navegador (F12)
- El usuario nunca lo ve
- Se usa para depuración — puede estar en cualquier idioma

## 14. Rutas relativas en `fetch`
- La ruta depende de desde dónde se sirve el archivo
- Si el servidor arranca desde la raíz del proyecto: `fetch('i18n/en.json')`
- Si el archivo está en una subcarpeta: `fetch('../i18n/en.json')`

## 15. `data-i18n` vs `data-section`/`data-value`
- `data-i18n="login.title"` → estándar moderno, más limpio
- `data-section="login" data-value="title"` → más verboso, mismo resultado
- El punto `.` separa sección y clave: `sección.clave`

## 16. Estructura del JSON para i18n
- Cada sección agrupa los textos de una vista
- La clave del JSON debe coincidir exactamente con lo que hay en `data-i18n`

```json
{
    "login": {
        "title": "Login"
    }
}
```
Se accede con: `data-i18n="login.title"`

## 17. Seleccionar una línea completa en VS Code
- `Ctrl + L` → selecciona toda la línea donde está el cursor

## 18. Elementos que necesitan traducción en una SPA
- Títulos y textos visibles
- Placeholders de inputs
- Labels (incluso los `visually-hidden` para accesibilidad)
- Botones
- Textos de confirmación y error (alerts)
- Textos dinámicos generados por JS

Comparando lo que tienes con todo lo que hemos visto, te faltan estos conceptos:
## 19. Spring Boot — arquitectura en capas

    model → entidades JPA que representan tablas de la base de datos
    repository → acceso a datos, habla con la base de datos
    service → lógica de negocio, coordina repositorios
    controller → endpoints HTTP, recibe peticiones y llama al service
    dto → objetos de transferencia de datos, no son entidades de base de datos

## 20. Anotaciones Spring Boot

    @SpringBootApplication → marca la clase principal de la aplicación
    @RestController → la clase recibe peticiones HTTP y responde JSON
    @RequestMapping("/ruta") → define la ruta base del controlador
    @PostMapping("/ruta") → escucha peticiones HTTP POST
    @RequestBody → convierte el JSON recibido en un objeto Java
    @Service → marca una clase como servicio de Spring
    @Autowired → inyecta automáticamente una dependencia
    @Entity → marca una clase como entidad JPA
    @Table(name="tabla") → indica el nombre de la tabla en la base de datos
    @Column(name="columna") → indica el nombre de la columna en la base de datos
    @Id → marca el campo como clave primaria
    @GeneratedValue → la clave primaria se genera automáticamente
    @ManyToOne → relación muchos a uno entre entidades
    @JoinColumn → indica la columna de la clave foránea
    @Configuration → marca una clase como clase de configuración de Spring
    @Override → indica que se está sobreescribiendo un método de una interfaz o clase padre

## 21. Anotaciones Lombok

    @Data → genera getters, setters, toString(), equals() y hashCode()
    @NoArgsConstructor → genera un constructor vacío
    @AllArgsConstructor → genera un constructor con todos los campos
    @ToString → genera el método toString()
    @EqualsAndHashCode → genera equals() y hashCode()

## 22. Tomcat

    Servidor web integrado en Spring Boot
    Escucha en el puerto 8080
    Recibe las peticiones HTTP del frontend y las entrega a Spring Boot
    Sin Tomcat activo el frontend no puede conectarse al backend
    Se activa con spring.main.web-application-type=servlet

## 23. CORS — Cross-Origin Resource Sharing

    Un origen es: protocolo + dominio + puerto. Ejemplo: http://localhost:5500
    Los navegadores bloquean peticiones entre orígenes distintos por seguridad — Same-Origin Policy
    Frontend en http://localhost:5500 y backend en http://localhost:8080 son orígenes distintos
    Hay que configurar CORS en el backend para permitir las peticiones del frontend
    Se configura en Spring Boot creando una clase CorsConfig que implementa WebMvcConfigurer

## 24. application.properties

    Archivo de configuración principal de Spring Boot
    Spring Boot lo lee al arrancar y configura todo según los valores que encuentra
    Ubicación: BACKEND/src/main/resources/application.properties
    Claves importantes:
        spring.datasource.url → dónde está MySQL
        spring.datasource.username → usuario de MySQL
        spring.datasource.password → contraseña de MySQL
        spring.jpa.hibernate.ddl-auto=none → no toques las tablas
        spring.jpa.show-sql=true → muestra las consultas SQL en la consola
        spring.main.web-application-type=servlet → activa Tomcat

## 25. MySQL — comandos básicos

    DESCRIBE tabla → muestra la estructura de una tabla
    SELECT * FROM tabla → muestra todos los registros de una tabla
    INSERT INTO tabla (col1, col2) VALUES (val1, val2) → inserta un registro
    ALTER TABLE tabla ADD COLUMN columna tipo → añade una columna
    SET FOREIGN_KEY_CHECKS = 0 → desactiva temporalmente las claves foráneas
    SET FOREIGN_KEY_CHECKS = 1 → reactiva las claves foráneas
    -- comentario → comentario de una línea en MySQL

## 26. fetch en JavaScript

    Función para enviar peticiones HTTP al backend
    Devuelve una Promise — hay que usar await o .then()
    method: 'POST' → enviamos datos nuevos
    headers: { 'Content-Type': 'application/json' } → le decimos al backend que enviamos JSON
    body: JSON.stringify(objeto) → convierte el objeto JS a texto JSON
    response.ok → true si el servidor respondió con HTTP 200-299
    response.text() → lee la respuesta del servidor como texto
    response.json() → lee la respuesta del servidor como objeto JS

## 27. async/await

    async → marca una función como asíncrona, permite usar await dentro
    await → pausa la ejecución hasta que la Promise se resuelva
    Sin async no se puede usar await
    Una función async siempre devuelve una Promise

## 28. try/catch

    try → bloque donde se ejecuta el código que puede fallar
    catch → bloque que se ejecuta si algo falla dentro del try
    Se usa para manejar errores sin que la aplicación se rompa
    Ejemplo de errores: servidor no disponible, JSON mal formado, error de red

## 29. JSON.stringify vs JSON.parse

    JSON.stringify(objeto) → convierte un objeto JS a texto JSON para enviarlo al backend
    JSON.parse(texto) → convierte texto JSON a objeto JS para usarlo en el código

## 30. Puertos

    3306 → MySQL escucha aquí
    5500 → Live Server sirve el frontend aquí
    8080 → Tomcat escucha aquí, el frontend se conecta al backend por este puerto

## 31. localhost

    Nombre especial que siempre apunta a tu propio ordenador
    Equivalente a 127.0.0.1
    No sale a internet — todo ocurre dentro de tu ordenador

## 32. WebMvcConfigurer

    Interfaz de Spring MVC que permite personalizar el comportamiento del framework
    Se implementa con implements WebMvcConfigurer
    Solo hay que implementar los métodos que necesitas
    En este proyecto se usa para configurar CORS con addCorsMappings

## 33. ResponseEntity en Spring Boot

    Permite devolver una respuesta HTTP con código de estado personalizado
    ResponseEntity.ok(datos) → HTTP 200 con datos
    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("mensaje") → HTTP 401 con mensaje
    ResponseEntity.status(HttpStatus.BAD_REQUEST).body("mensaje") → HTTP 400 con mensaje

## 34. Operador ternario en JS

    Forma corta de escribir un if/else en una sola línea
    Estructura: condición ? "valor si verdadero" : "valor si falso"

javascript

btn.style.display = btn.dataset.language === langCode ? "none" : "inline-block";
// Es lo mismo que:
// if (btn.dataset.language === langCode) {
//     btn.style.display = "none";
// } else {
//     btn.style.display = "inline-block";
// }

## 35. e.preventDefault()

    Evita el comportamiento por defecto del navegador
    En un formulario → evita que el navegador recargue la página al hacer submit
    Se usa siempre en SPAs para controlar el comportamiento manualmente

## 36. parseInt

    Convierte un texto a número entero
    parseInt("123") → 123
    parseInt("abc") → NaN (Not a Number)
    Se usa para convertir el valor de los inputs numéricos

## 37. trim()

    Elimina los espacios en blanco al principio y al final de un texto
    "  hola  ".trim() → "hola"
    Se usa para validar que un campo no está vacío o solo tiene espacios

## 38. Expresiones regulares en JS

    Se escriben entre / y /
    /[A-Z]/.test(password) → comprueba si hay alguna mayúscula
    /\d/.test(password) → comprueba si hay algún número
    /[!@#$%^&*]/.test(password) → comprueba si hay algún carácter especial


---

