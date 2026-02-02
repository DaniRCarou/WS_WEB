package es.employee_information_management.service;
import es.employee_information_management.model.Equipment;
import es.employee_information_management.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentServiceImpl implements IEquipmentService{

    @Autowired
    // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private EquipmentRepository equipmentRepository;

    @Override
    public List<Equipment> listEquipments() {

        List<Equipment> equipments = equipmentRepository.findAll();

        return equipments;

    }

    @Override
    public Equipment findEquipmentById(Integer equipmentId) {

        // Spring Data JPA nunca devuelve null directamente con findById; devuelve Optional<T>. Por eso tu código original da error de compilación.
        // Si el Department siempre tiene un ID (clave primaria obligatoria en la base de datos) y estás seguro de que el ID que le pasas siempre existe, entonces puedes simplificar, pero Spring Data JPA sigue devolviendo Optional<Department>, porque no sabe de antemano si existe el registro.
        // Eso significa que aunque en tu modelo de negocio siempre se ponga un ID válido, el compilador y JPA te obligan a manejar el Optional.
        // --- Department department = departmentRepository.findById(departmentId).get(); --- Pros: sencillo si siempre estás seguro de que existe.
        // Contras: si por algún motivo el ID no existe, .get() lanzará NoSuchElementException. Por eso muchos desarrolladores prefieren .orElseThrow() para dar un mensaje de error más claro:

        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow();

        return equipment;

    }

    @Override
    public void saveEquipment(Equipment equipment) {

        equipmentRepository.save(equipment);

    }

    @Override
    public void deleteEquipmentById(Integer equipmentId) {

        equipmentRepository.deleteById(equipmentId);

    }

}
