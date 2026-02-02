
package es.employee_information_management.service;
import es.employee_information_management.model.Task;
import es.employee_information_management.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements ITaskService{

    @Autowired // es una anotación de Spring Framework que se utiliza para inyectar automáticamente dependencias dentro de una clase.
    private TaskRepository taskRepository;

    @Override
    public List<Task> listTasks() {

        List<Task> tasks = taskRepository.findAll();

        return tasks;

    }

    @Override
    public Task findTaskById(Integer taskId) {

        // Spring Data JPA nunca devuelve null directamente con findById; devuelve Optional<T>. Por eso tu código original da error de compilación.
        // Si la Task siempre tiene un ID (clave primaria obligatoria en la base de datos) y estás seguro de que el ID que le pasas siempre existe, entonces puedes simplificar, pero Spring Data JPA sigue devolviendo Optional<Task>, porque no sabe de antemano si existe el registro.
        // Eso significa que aunque en tu modelo de negocio siempre se ponga un ID válido, el compilador y JPA te obligan a manejar el Optional.
        // --- Task task = taskRepository.findById(taskId).get(); --- Pros: sencillo si siempre estás seguro de que existe.
        // Contras: si por algún motivo el ID no existe, .get() lanzará NoSuchElementException. Por eso muchos desarrolladores prefieren .orElseThrow() para dar un mensaje de error más claro:

        Task task = taskRepository.findById(taskId).orElseThrow();

        return task;
    }

    @Override
    public void saveTask(Task task) {

        taskRepository.save(task);

    }

    @Override
    public void deleteTaskById(Integer taskId){

        taskRepository.deleteById(taskId);

    }

}
