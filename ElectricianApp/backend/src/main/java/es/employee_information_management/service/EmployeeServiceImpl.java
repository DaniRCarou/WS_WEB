package es.employee_information_management.service;

import es.employee_information_management.model.Employee;
import es.employee_information_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public List<Employee> listEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee findEmployeeById(Integer employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow();
    }

    @Override
    public boolean existsById(Integer employeeId) {
        return employeeRepository.existsById(employeeId);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        String password = passwordEncoder.encode(employee.getPassword());
        employee.setPassword(password);
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployeeById(Integer employeeId) {
        employeeRepository.deleteById(employeeId);
    }

    @Override
    public boolean authenticate(Integer personalNumber, String password) {
        Employee employee = employeeRepository.findById(personalNumber).orElse(null);
        if (employee != null) {
            String passwordE = employee.getPassword();
            return passwordEncoder.matches(password, passwordE);
        }
        return false;
    }

}