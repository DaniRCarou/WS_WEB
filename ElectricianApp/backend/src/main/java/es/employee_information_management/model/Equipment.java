package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

// -------- Anotaciones de JPA --------
@Entity
@Table(name = "equipments")

// -------- Anotaciones de Lombok --------
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EQUIPMENT_ID")
    private Integer equipmentId;

    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID", nullable = false)
    private Department departmentId;

    @Column(name = "EQUIPMENT_NAME", nullable = false, length = 25) // nullable = false → le dice a JPA que la columna no puede ser nula. Esto se corresponde con el NN (NOT NULL) de MySQL. No es obligatorio para que funcione, pero es buena práctica porque hace que JPA valide antes de guardar un objeto y evita errores en la base de datos.
    private String equipmentName;

}
