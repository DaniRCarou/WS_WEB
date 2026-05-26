package es.employee_information_management.service;

import es.employee_information_management.model.Employee;
import java.util.List;

public interface IEmployeeService {

    List<Employee> listEmployees();
    Employee findEmployeeById(Integer employeeId);
    Employee saveEmployee(Employee employee);
    void deleteEmployeeById(Integer employeeId);
    boolean authenticate(Integer personalNumber, String password);

}