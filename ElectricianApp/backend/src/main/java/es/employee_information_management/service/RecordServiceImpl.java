package es.employee_information_management.service;
import es.employee_information_management.model.Record;
import es.employee_information_management.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements IRecordService{

    @Autowired
    // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private RecordRepository recordRepository;

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

        recordRepository.save(record);

    }

    @Override
    public void deleteRecordById(Integer recordId) {

        recordRepository.deleteById(recordId);

    }

}
