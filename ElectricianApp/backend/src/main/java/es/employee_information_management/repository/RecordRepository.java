package es.employee_information_management.repository;

import es.employee_information_management.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    List<Record> findByEmployee_EmployeeIdAndDate(Integer employeeId, LocalDate date);

}