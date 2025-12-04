package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

// -------- Anotaciones de JPA --------
@Entity // Marca la clase como una entidad JPA, que representa una tabla de la base de datos.
@Table(name = "employees") // Nombre exacto de la tabla en la base de datos.

// -------- Anotaciones de Lombok --------
@Data // Genera automáticamente getters, setters, toString(), equals() y hashCode().
@NoArgsConstructor // Constructor vacío necesario para JPA.
@AllArgsConstructor // Constructor con todos los campos, útil para pruebas y servicios.
@ToString // Genera método toString() para depuración y logs.
@EqualsAndHashCode // Genera equals() y hashCode() basados en los campos de la clase.

public class Employee {

    @Id
    @Column(name = "EMPLOYEE_ID") // El ID lo introduce el propio trabajador y no es autoincrementable. Si fuera autoincrementable, necesitarías: @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeId;

    @ManyToOne
    @Column(name = "DEPARTMENT_ID", nullable = false) // Foreign key a Department (opcionalmente puedes usar @ManyToOne)
    private Integer departmentId;

    @Column(name = "FIRST_NAME", nullable = false, length = 25) // nullable = false → le dice a JPA que la columna no puede ser nula. Esto se corresponde con el NN (NOT NULL) de MySQL. No es obligatorio para que funcione, pero es buena práctica porque hace que JPA valide antes de guardar un objeto y evita errores en la base de datos.
    private String firstName;

    @Column(name = "SURNAME", nullable = false, length = 25)
    private String surname;

    @Column(name = "EMAIL", nullable = false, length = 100)
    private String email;

    @Column(name = "PASSWORD", nullable = false) // En este caso se excluye la anotación length = 255 porque es redundante, ya que JPA asigna 255 por defecto a columnas String, por lo que se incluye solo por claridad
    private String password;

}
