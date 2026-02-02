package es.employee_information_management.service;

// ESTAS CLASES SON LA CAPA LÓGICA DE NEGOCIO DE LA APLICACIÓN

// Coordinar repositorios -> Usa uno o varios repositorios para realizar operaciones complejas.
// Ejemplo: asignar un empleado a un departamento y registrar la acción.

// Aplicar reglas de negocio -> Validaciones, cálculos, restricciones.
// Ejemplo: no permitir asignar más de 5 equipos a un empleado.

// Procesar datos antes de devolverlos -> Filtrar, transformar, agregar información adicional.
// Ejemplo: devolver la lista de tareas con el total de tiempo estimado.

// Mantener la lógica separada de la API -> El Controller solo recibe peticiones y llama al Service.
// Esto permite reusar la lógica en diferentes partes de la aplicación.

// La interfaz de servicio NO es obligatoria técnicamente. Existe por diseño y buenas prácticas, no porque Spring la exija. Dice qué puede hacer el servicio, no cómo lo hace.
// El Controller no sabe cómo se implementa, solo sabe que “esto existe”. El Controller depende de la interfaz, no de la clase concreta. Podrías cambiar cosas en ella sin tocar el Controller

import es.employee_information_management.model.Department;


import java.util.List;


public interface IDepartmentService {

    public List<Department> listDepartments(); // Metodo para listar Departaments

    public Department findDepartmentById(Integer departmentId); // Metodo para buscar Departments por id. Cuando buscas algo “por ID”, lo único que necesitas es el identificador ID. Por eso utilizamos como tipo 'Integer'

    public void saveDepartment(Department department);  // Si el valor de la clave primaria del objeto de tipo 'Department' que estamos recibiendo es igual a null, entonces se va a hacer una insercción.
                                                        // Y si el valor es diferente de null entonces se va a realizar una actualización de manera automática

    void deleteDepartmentById(Integer departmentId);

}
