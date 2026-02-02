package es.employee_information_management.service;
import es.employee_information_management.model.Department;
import es.employee_information_management.model.Employee;
import es.employee_information_management.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements IDepartmentService{

    @Autowired
    // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> listDepartments() {

        List<Department> department = departmentRepository.findAll();

        return department;

    }

    @Override
    public Department findDepartmentById(Integer departmentId) {

        // Spring Data JPA nunca devuelve null directamente con findById; devuelve Optional<T>. Por eso tu código original da error de compilación.
        // Si el Department siempre tiene un ID (clave primaria obligatoria en la base de datos) y estás seguro de que el ID que le pasas siempre existe, entonces puedes simplificar, pero Spring Data JPA sigue devolviendo Optional<Department>, porque no sabe de antemano si existe el registro.
        //  Eso significa que aunque en tu modelo de negocio siempre se ponga un ID válido, el compilador y JPA te obligan a manejar el Optional.

        Department department = departmentRepository.findById(departmentId).orElseThrow();

        return department;
    }

    @Override
    public void saveDepartment(Department department) {

        departmentRepository.save(department);

    }

    @Override
    public void deleteDepartmentById(Integer departmentId) {

        departmentRepository.deleteById(departmentId);

    }

}
