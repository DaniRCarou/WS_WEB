package es.employee_information_management.service;

import es.employee_information_management.model.Record;
import java.time.LocalDate;
import java.util.List;

public interface IRecordService {

    List<Record> listRecords();
    Record findRecordById(Integer recordId);
    void saveRecord(Record record);
    void deleteRecordById(Integer recordId);
    List<Record> findByEmployeeAndDate(Integer employeeId, LocalDate date);

}