package es.employee_information_management.repository;

// UNA DE LAS CLASES QUE HABLAN CON LA BASE DE DATOS


import es.employee_information_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {



}
