package es.employee_information_management.controller;

import es.employee_information_management.dto.LoginRequest;
import es.employee_information_management.dto.LoginResponse;
import es.employee_information_management.model.Employee;
import es.employee_information_management.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeServiceImpl employeeService;

    @Autowired
    public EmployeeController(EmployeeServiceImpl employeeService) {
        this.employeeService = employeeService;
    }

    // POST /employees/register
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
        try {
            employeeService.saveEmployee(employee);
            return ResponseEntity.ok("Employee registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // POST /employees/login
    @PostMapping("/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginRequest loginRequest) {
        boolean success = employeeService.authenticate(loginRequest.getPersonalNumber(), loginRequest.getPassword());
        if (success) {
            Employee employee = employeeService.findEmployeeById(loginRequest.getPersonalNumber());
            LoginResponse response = new LoginResponse(employee.getEmployeeId(), employee.getFirstName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}