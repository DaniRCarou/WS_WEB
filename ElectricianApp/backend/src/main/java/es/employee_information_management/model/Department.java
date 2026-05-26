package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DEPARTMENT_ID", nullable = false)
    private Integer departmentId;

    @Column(name = "DEPARTMENT_NAME", nullable = false, length = 25)
    private String departmentName;

    @ManyToOne
    @JoinColumn(name = "MANAGER_ID", nullable = false)
    private Employee manager;

}