package es.employee_information_management.config;

// =====================================================================
// ¿POR QUÉ NECESITO ESTA CLASE?
//
// El navegador tiene una regla de seguridad llamada Same-Origin Policy
// que bloquea las peticiones entre orígenes distintos.
//
// Un origen es la combinación de: protocolo + dominio + puerto
// - Frontend: http://localhost:5500  → origen del frontend
// - Backend:  http://localhost:8080  → origen del backend
//
// Como los puertos son diferentes (5500 vs 8080), el navegador considera que son orígenes distintos y bloquea la comunicación.
//
// Esta clase configura CORS (Cross-Origin Resource Sharing) para decirle al navegador: "Permite las peticiones desde localhost:5500" frontend tiene el origen http://localhost:5500
// el backend tiene el origen http://localhost:8080
//
// ¿Cuál es el problema?
// Los navegadores tienen una regla de seguridad llamada Same-Origin Policy — política del mismo origen. Dice:
//
// "Un script solo puede hacer peticiones al mismo origen desde el que fue cargado"
//
// Es decir — si el frontend está en http://localhost:5500, por defecto el navegador bloquea cualquier petición a http://localhost:8080 porque son orígenes diferentes.
//
// ¿Qué hace CORS?
// CORS es un mecanismo que permite al backend decirle al navegador:
//
// "Oye, aunque vengas de http://localhost:5500, te permito hacer peticiones aquí"
//
// Sin configurar CORS el navegador bloqueará todas las peticiones del frontend al backend aunque el backend esté funcionando perfectamente.
// En resumen:
//
// Sin CORS → el navegador bloquea la comunicación frontend-backend
// Con CORS configurado → el navegador permite la comunicación
//
// Sin esta clase → el navegador bloquea todas las peticiones
//                  del frontend al backend aunque ambos funcionen
//
// Con esta clase → el frontend puede comunicarse con el backend
// =====================================================================

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // Le dice a Spring Boot que esta clase contiene configuración / WebMvcConfigurer es una interfaz de Spring MVC que permite personalizar el comportamiento del framework.
// Tiene muchos métodos para personalizar Spring MVC — configurar CORS, interceptores, formateadores, etc. No tengo que implementar todos — solo los que necesito. En mi caso solo implemento addCorsMappings porque solo necesito configurar CORS.
public class CorsConfig implements WebMvcConfigurer {

    @Override // @Override → "estoy sobreescribiendo un método que viene de la interfaz"
    public void addCorsMappings(CorsRegistry registry) {    // addCorsMappings → método que registra las reglas CORS al arrancar

        registry.addMapping("/**")                          // "/**" → aplica la configuración a TODOS los endpoints del backend
                .allowedOrigins("http://localhost:5500", "http://127.0.0.1:5500")    // Solo permite peticiones desde el frontend en localhost:5500
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos HTTP permitidos:
                // GET → obtener datos
                // POST → enviar datos nuevos
                // PUT → actualizar datos existentes
                // DELETE → eliminar datos
                .allowedHeaders("*");                       // "*" → permite cualquier cabecera HTTP en las peticiones

    }

}