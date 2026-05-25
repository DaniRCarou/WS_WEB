package es.employee_information_management.controller;

import es.employee_information_management.dto.LoginRequest;
import es.employee_information_management.model.Employee;
import es.employee_information_management.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import es.employee_information_management.dto.LoginResponse;

@RestController // Es una anotación de Spring Boot que combina @Controller + @ResponseBody. Significa que esta clase va a recibir solicitudes HTTP (desde el navegador o frontend) y responderá datos en formato JSON, no páginas HTML.
@RequestMapping("/employees") // Define la ruta base de tu controlador. Todos los endpoints de esta clase comenzarán con /employees.
public class EmployeeController {

    private final EmployeeServiceImpl employeeService;

    @Autowired
    public EmployeeController(EmployeeServiceImpl employeeService) {
        this.employeeService = employeeService;
    }

    // Registro de empleado. Este metodo es un endpoint(es el “punto de entrada” a tu backend. Una URL específica de una API a la que el cliente puede hacer una petición para realizar una acción o acceder a un recurso.).
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
        try {

            Employee savedEmployee = employeeService.saveEmployee(employee);

            return ResponseEntity.ok("Employee registered successfully");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }
    }

    // Login de empleado. Este metodo es un endpoint(es el “punto de entrada” a tu backend. Una URL específica de una API a la que el cliente puede hacer una petición para realizar una acción o acceder a un recurso.).
    @PostMapping("/login")                                                                                              // Indica que este metodo escucha peticiones HTTP POST. El backend recibe los datos. La URL completa será: http://localhost:8080/employees/login
    public ResponseEntity<?> loginEmployee(@RequestBody LoginRequest loginRequest) {                                    // @RequestBody le dice a Spring Boot: "Oye, espera un JSON en el cuerpo de la solicitud y conviértelo automáticamente a un objeto LoginRequest". Spring Boot usa un convertidor automático (Jackson) que transforma el JSON en un objeto Java. El nombre de la variable NO importa. El tipo SÍ importa
                                                                                                                        // {"personalNumber": 12345, "password": "abc123"} -> JSON hace internamente -> LoginRequest loginRequest = new LoginRequest(); → loginRequest.setPersonalNumber(12345); lr.setPassword("abc123");. El nombre de la variable NO importa. El tipo SÍ importa
        boolean success = employeeService.authenticate(loginRequest.getPersonalNumber(), loginRequest.getPassword());   // Se extraen los datos ya convertidos: getPersonalNumber(), getPassword(). Se delega la lógica al service. El controller no valida, solo coordina.

        if (success) {

            Employee employee = employeeService.findEmployeeById(loginRequest.getPersonalNumber());

            LoginResponse response = new LoginResponse(employee.getEmployeeId(), employee.getFirstName());

            return ResponseEntity.ok(response);

        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        }

    }

}
