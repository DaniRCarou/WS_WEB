package es.employee_information_management.service;

import es.employee_information_management.model.Employee;
import es.employee_information_management.model.Record;
import es.employee_information_management.model.Task;
import es.employee_information_management.repository.EmployeeRepository;
import es.employee_information_management.repository.RecordRepository;
import es.employee_information_management.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;

@Service
public class RecordServiceImpl implements IRecordService{

    @Autowired
    // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private RecordRepository recordRepository;

    @Autowired
    private EmployeeRepository employeeRepository;  // para buscar el empleado en la base de datos

    @Autowired
    private TaskRepository taskRepository;          // para buscar la tarea en la base de datos



    @Override
    public List<Record> listRecords() {

        List<Record> records = recordRepository.findAll();

        return records;

    }

    @Override
    public Record findRecordById(Integer recordId) {

        // Spring Data JPA nunca devuelve null directamente con findById; devuelve Optional<T>. Por eso tu código original da error de compilación.
        // Si el Department siempre tiene un ID (clave primaria obligatoria en la base de datos) y estás seguro de que el ID que le pasas siempre existe, entonces puedes simplificar, pero Spring Data JPA sigue devolviendo Optional<Department>, porque no sabe de antemano si existe el registro.
        // Eso significa que aunque en tu modelo de negocio siempre se ponga un ID válido, el compilador y JPA te obligan a manejar el Optional.
        // --- Department department = departmentRepository.findById(departmentId).get(); --- Pros: sencillo si siempre estás seguro de que existe.
        // Contras: si por algún motivo el ID no existe, .get() lanzará NoSuchElementException. Por eso muchos desarrolladores prefieren .orElseThrow() para dar un mensaje de error más claro:

        Record record = recordRepository.findById(recordId).orElseThrow();

        return record;
    }

    @Override
    public void saveRecord(Record record) {

        // Busca el Employee en la base de datos por su ID
        // Así JPA lo reconoce y no lanza TransientPropertyValueException
        Employee employee = employeeRepository.findById(record.getEmployee().getEmployeeId()).orElseThrow();
        record.setEmployee(employee);

        // Busca la Task en la base de datos por su ID
        Task task = taskRepository.findById(record.getTask().getTaskId()).orElseThrow();
        record.setTask(task);

        recordRepository.save(record);
    }

    @Override
    public void deleteRecordById(Integer recordId) {

        recordRepository.deleteById(recordId);

    }


    @Override
    public List<Record> findByEmployeeAndDate(Integer employeeId, LocalDate date) {
        return recordRepository.findByEmployee_EmployeeIdAndDate(employeeId, date);
    }

}
