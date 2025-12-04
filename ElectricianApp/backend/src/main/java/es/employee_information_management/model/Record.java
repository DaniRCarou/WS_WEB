package es.employee_information_management.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "record")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Record_ID")
    private Integer recordId;

    @ManyToOne
    @JoinColumn(name = "Equipment_ID", nullable = true) // puede ser null si la tarea no tiene equipo
    private Equipment equipment;

    @ManyToOne
    @JoinColumn(name = "Task_ID", nullable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "Employee_ID", nullable = false)
    private Employee employee;

    @Column(name = "Date", nullable = false)
    private LocalDate date;

    @Column(name = "Total_Time", nullable = false) // en minutos
    private Integer totalTime;
}

