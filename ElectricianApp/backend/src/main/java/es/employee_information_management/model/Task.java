package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TASK_ID", nullable = false)
    private Integer taskId;

    @Column(name = "TASK_NAME", nullable = false, length = 25)
    private String taskName;

}