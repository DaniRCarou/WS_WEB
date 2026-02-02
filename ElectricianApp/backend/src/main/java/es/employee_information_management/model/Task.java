package es.employee_information_management.model;

// UNA DE LAS CLASES QUE REPRESENTA LA BASE DE DATOS


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task") // Nombre de la tabla en la base de datos
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria autoincrementable
    @Column(name = "TASK_ID", nullable = false)
    private Integer taskId;

    @Column(name = "TASK_NAME", nullable = false, length = 25) // Nombre de la tarea
    private String taskName;
}
