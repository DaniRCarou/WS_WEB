package es.employee_information_management.service;
import es.employee_information_management.model.Employee;
import es.employee_information_management.model.Equipment;
import es.employee_information_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements IEmployeeService{

    @Autowired
    // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> listEmployees() {

        List<Employee> employee = employeeRepository.findAll();

        return employee;

    }

    @Override
    public Employee findEmployeeById(Integer employeeId) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow();

        return employee;

    }

    @Override
    public Employee saveEmployee(Employee employee) {

        return employeeRepository.save(employee); // Devuelve el objeto guardado con id generado y lo guarda también.

    }

    @Override
    public void deleteEmployeeById(Integer employeeId) {

        employeeRepository.deleteById(employeeId);

    }

    @Override
    public boolean authenticate(Integer personalNumber, String password) {

        Employee employee = employeeRepository.findById(personalNumber).orElse(null);   // Esto consultará la base de datos a través de

        if (employee != null) {

            return employee.getPassword().equals(password);                             // Esto consultará la base de datos a través de

        }

        return false;

    }

}
