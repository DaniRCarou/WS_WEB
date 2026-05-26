package es.employee_information_management.controller;

import es.employee_information_management.dto.RecordResponse;
import es.employee_information_management.model.Record;
import es.employee_information_management.service.RecordServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordServiceImpl recordService;

    // POST /records/save
    @PostMapping("/save")
    public ResponseEntity<?> saveRecord(@RequestBody Record record) {
        try {
            recordService.saveRecord(record);
            return ResponseEntity.ok("Record saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // GET /records/employee/{employeeId}/date/{date}
    @GetMapping("/employee/{employeeId}/date/{date}")
    public ResponseEntity<?> getRecordsByEmployeeAndDate(
            @PathVariable Integer employeeId,
            @PathVariable LocalDate date) {
        List<Record> records = recordService.findByEmployeeAndDate(employeeId, date);
        List<RecordResponse> response = records.stream()
                .map(r -> new RecordResponse(r.getStartTime(), r.getEndTime()))
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(response);
    }

}