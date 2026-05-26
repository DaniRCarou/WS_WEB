package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Employee {

    @Id
    @Column(name = "EMPLOYEE_ID")
    private Integer employeeId;

    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID", nullable = false)
    private Department department;

    @Column(name = "FIRST_NAME", nullable = false, length = 25)
    private String firstName;

    @Column(name = "SURNAME", nullable = false, length = 25)
    private String surname;

    @Column(name = "EMAIL", nullable = false, length = 100)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

}