package es.employee_information_management.service;

import es.employee_information_management.model.Equipment;
import java.util.List;

public interface IEquipmentService {

    // Listar todos los equipos
    List<Equipment> listEquipments();

    // Buscar un equipo por su ID
    Equipment findEquipmentById(Integer equipmentId); // Metodo para buscar Departments por id. Cuando buscas algo “por ID”, lo único que necesitas es el identificador ID. Por eso utilizamos como tipo 'Integer'

    // Guardar un equipo (inserción o actualización)
    void saveEquipment(Equipment equipment);

    // Opcional: eliminar un equipo por ID
    void deleteEquipmentById(Integer equipmentId);

}
