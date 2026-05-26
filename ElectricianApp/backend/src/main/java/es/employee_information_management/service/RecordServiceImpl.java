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
public class RecordServiceImpl implements IRecordService {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Record> listRecords() {
        return recordRepository.findAll();
    }

    @Override
    public Record findRecordById(Integer recordId) {
        return recordRepository.findById(recordId).orElseThrow();
    }

    @Override
    public void saveRecord(Record record) {
        Employee employee = employeeRepository.findById(record.getEmployee().getEmployeeId()).orElseThrow();
        record.setEmployee(employee);
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