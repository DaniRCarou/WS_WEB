package es.employee_information_management.service;

import es.employee_information_management.model.Employee;

import java.util.List;

public interface IEmployeeService {

    public List<Employee> listEmployees(); // Metodo para listar Employees. Aunque en estos métodos no aparezca la palabra public, automáticamente como es una interfaz serán públicos. Se puede ahorrar la palabra public

    Employee findEmployeeById(Integer employeeId); // Metodo para buscar Employees por id. Cuando buscas algo “por ID”, lo único que necesitas es el identificador ID. Por eso utilizamos como tipo 'Integer'

    Employee saveEmployee(Employee employee);  // Si el employeeId NO existe en la base de datos → inserción. Si el employeeId YA existe → actualización. Como va a devolver un Employee, se cambia el tipo de retorno, de void a Employee.

    void deleteEmployeeById(Integer employeeId); // Para eliminar al empleado si fuera necesario

    boolean authenticate(Integer personalNumber, String password);

}
