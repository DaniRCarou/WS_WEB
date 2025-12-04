package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

// -------- Estas anotaciones son de JPA (Java Persistence API) y se usan para indicar que una clase Java representa una entidad que se puede guardar en una base de datos. --------
@Entity // Marca la clase como una entidad JPA, es decir, que representa una tabla de la base de datos. JPA (Java Persistence API) usa esta anotación para saber que la clase debe ser gestionada por Hibernate / Spring Data JPA. Obligatoria si quieres que tu clase se pueda guardar, actualizar o eliminar en la base de datos.
@Table(name = "departments") // Indica el nombre exacto de la tabla en la base de datos. Útil cuando: El nombre de la clase y de la tabla no coinciden. La tabla está en mayúsculas, plural o con guiones bajos, como departments.

// -------- Estas anotaciones son parte de Lombok, una librería muy usada en proyectos Java para reducir código repetitivo. --------
// Lombok es la única dependencia que requiere configuración adicional en el IDE.
// 1. Instalar el plugin Lombok: Ve a File → Settings → Plugins → Marketplace: Busca Lombok → Install → Restart IDE
// 2. Activar annotation processing: Ve a File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors: Marca la opción: Enable annotation processing
// 3. Rebuild del proyecto: Ve a Build → Rebuild Project
//Después de esto, los avisos de “never used” deberían desaparecer y IntelliJ dejará de marcar tu clase en rojo.
@Data // Lombok automáticamente genera por ti: Getters y Setters, Constructor por defecto pero solo si no hay ningún otro constructor definido en la clase., método ToString()
@NoArgsConstructor // Genera un constructor vacío (sin parámetros). Para garantizar siempre la existencia del constructor vacío, aunque agregues otros constructores como @AllArgsConstructor. Esto es crucial para JPA, porque Spring / Hibernate necesitan un constructor vacío para instanciar las entidades al leer de la base de datos.
@AllArgsConstructor // Genera un constructor con todos los campos de la clase como parámetros. Muy útil para crear objetos rápidamente en pruebas o en servicios.
@ToString // Genera automáticamente el método toString() que devuelve todos los campos como texto. Útil para debug o logs.
@EqualsAndHashCode // Genera automáticamente los métodos. equals() sirve para comparar objetos. Sin este método, == compara referencias de memoria, no contenido. Con equals(), puedes comparar el contenido de los campos.
                   // hashCode() devuelve un número (hash) que representa el objeto. Es usado por colecciones como HashMap, HashSet para organizar y buscar objetos rápidamente. Regla: si dos objetos son equals(), su hashCode debe ser igual.
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ← clave autoincrementable. Cuando selecciono Alter table en mysql de la tabla que deseo, MySQL SIEMPRE autoincrementa la columna marcada como AI, independientemente de lo que hagas en Java. necesito @GeneratedValue en JPA porque necesita saber que NO debes enviar tú el ID, sino que la base de datos lo genera.
    @Column(name = "DEPARTMENT_ID", nullable = false)
    private Integer departmentId;   // int (tipo primitivo), no un objeto. No puede ser nulo siempre tiene el valor por defecto 0.
                                    // Problema con JPA: si la columna de la base de datos puede ser nula, no podrás asignarle null.
                                    // Integer (clase wrapper / objeto), es un objeto, no un primitivo.
                                    // Puede ser null. Es compatible con Spring Data JPA y anotaciones como @Id, @GeneratedValue. Cuando guardas un registro nuevo, JPA deja id en null y luego lo asigna automáticamente al hacer save(). Esto no funciona con int, porque int no puede ser null.


    @Column(name = "DEPARTMENT_NAME", nullable = false, length = 25)    // nullable = false → le dice a JPA que la columna no puede ser nula. Esto se corresponde con el NN (NOT NULL) de MySQL. No es obligatorio para que funcione, pero es buena práctica porque hace que JPA valide antes de guardar un objeto y evita errores en la base de datos.
    private String departmentName;                                      // El atributo length = 25 en la anotación @Column indica a JPA/Hibernate que la columna FIRST_NAME (VARCHAR(25) NOT NULL) debe respetar un máximo de 25 caracteres al crear la tabla o validar datos, manteniendo la entidad sincronizada con la base de datos y evitando truncamientos o errores; si se omite, JPA asume 255 caracteres por defecto, lo que puede causar problemas si se exceden los 25 caracteres reales de la columna.


    // @Column(name = "MANAGER", nullable = false, length = 25)    // nullable = false → le dice a JPA que la columna no puede ser nula. Esto se corresponde con el NN (NOT NULL) de MySQL. No es obligatorio para que funcione, pero es buena práctica porque hace que JPA valide antes de guardar un objeto y evita errores en la base de datos.
    // private String manager;                                     // El atributo length = 25 en la anotación @Column indica a JPA/Hibernate que la columna FIRST_NAME (VARCHAR(25) NOT NULL) debe respetar un máximo de 25 caracteres al crear la tabla o validar datos, manteniendo la entidad sincronizada con la base de datos y evitando truncamientos o errores; si se omite, JPA asume 255 caracteres por defecto, lo que puede causar problemas si se exceden los 25 caracteres reales de la columna.


    @ManyToOne // Muchos departamentos podrían tener el mismo manager (aunque normalmente 1:1)
    @JoinColumn(name = "MANAGER_ID", nullable = false) // FK hacia EMPLOYEE.EMPLOYEE_ID, en este caso no hace falta length = 25 para la columna MANAGER_ID porque ahora no es un String, sino un objeto Employee.
    private Employee manager;

}
