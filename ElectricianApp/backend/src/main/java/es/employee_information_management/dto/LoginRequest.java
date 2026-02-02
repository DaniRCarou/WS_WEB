// De manera profesional, esta clase no se guarda en model directamente, porque model en mi proyecto ya representa entidades JPA (tablas de la base de datos).
// Para algo como LoginRequest, que es solo un DTO (Data Transfer Object), la práctica profesional es crear un paquete separado dentro de tu proyecto.
// DTO -> Es un objeto de transferencia de datos, no una entidad de base de datos. Separar DTOs de entidades mantiene el código más limpio y organizado. Facilita cambios futuros: si cambias la forma en que el frontend envía datos, solo tocas el DTO, no la entidad.

// No se necesita un DTO separado para registerEmployee porque en tu caso ya estás usando la misma entidad Employee como objeto de entrada: recibe exactamente los mismos campos que tu entidad JPA Employee.
// login sí conviene un DTO (LoginRequest) porque: 1.No quieres enviar toda la entidad Employee, solo los campos necesarios para autenticar (personalNumber y password). 2.Evitas exponer campos sensibles (email, nombre, departamento) innecesariamente. 3. Mantienes separado lo que el frontend necesita enviar para autenticación de lo que la entidad realmente tiene en la base de datos.

// Regla general profesional:
// Si los datos que recibes del frontend coinciden exactamente con la entidad, puedes usar la entidad directamente.
// Si solo necesitas un subconjunto de datos, o quieres separar la lógica de autenticación/entrada de la base de datos, crea un DTO.

package es.employee_information_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor // Constructor vacío
@AllArgsConstructor // Constructor con todos los campos

@Data // La anotación @Data de Lombok genera automáticamente getters (getPersonalNumber(), getPassword()) y setters (setPersonalNumber(), setPassword()). Si en tu IDE aparecen alguno de esos métodos en gris(en este caso porque está así configurado en Intellij), normalmente significa que no los estás usando todavía. No hay problema: Lombok los genera, y Spring Boot los necesita para mapear JSON a objetos.
public class LoginRequest {

    // En mi app, el frontend envía un JSON como:{ "personalNumber": 1234, "password": "MiPassword123!" }
    // Spring Boot lo convierte automáticamente en un LoginRequest, así que no necesitas llamar a setPersonalNumber() ni setPassword() tú mismo. Esto es lo que hace que tu endpoint de login funcione con @RequestBody LoginRequest loginRequest.

    private Integer personalNumber; // Número personal del empleado (ID que ingresa para loguearse)
    private String password;        // Contraseña del empleado

}
