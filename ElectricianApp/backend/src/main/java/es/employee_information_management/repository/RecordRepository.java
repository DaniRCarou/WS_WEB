package es.employee_information_management.repository;

// UNA DE LAS CLASES QUE HABLAN CON LA BASE DE DATOS


import org.springframework.data.jpa.repository.JpaRepository;
import es.employee_information_management.model.Record;
import java.time.LocalDate;
import java.util.List;


public interface RecordRepository extends JpaRepository<Record,Integer> {

    List<Record> findByEmployee_EmployeeIdAndDate(Integer employeeId, LocalDate date);

}
