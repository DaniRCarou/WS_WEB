package es.employee_information_management.service;

import es.employee_information_management.model.Task;

import java.util.List;

public interface ITaskService {

    List<Task> listTasks(); // Metodo para listar Records

    Task findTaskById(Integer taskId); // Metodo para buscar Records por id. Cuando buscas algo “por ID”, lo único que necesitas es el identificador ID.  Por eso utilizamos como tipo 'Integer'

    void saveTask(Task task);  // Si el recordId NO existe en la base de datos → inserción. Si el recordId YA existe → actualización

    void deleteTaskById(Integer taskId);

}
