package es.employee_information_management.controller;

import es.employee_information_management.dto.RecordResponse;

// ─── IMPORTS ───────────────────────────────────────────────────────────────────
// Importa el modelo Record → la clase que representa la tabla 'record' en MySQL
import es.employee_information_management.model.Record;

// Importa el service → la capa que contiene la lógica de negocio de los registros
import es.employee_information_management.service.RecordServiceImpl;

// @Autowired → permite que Spring inyecte automáticamente las dependencias
import org.springframework.beans.factory.annotation.Autowired;

// HttpStatus → contiene los códigos de respuesta HTTP (200, 400, 401, 500...)
import org.springframework.http.HttpStatus;

// ResponseEntity → permite devolver una respuesta HTTP completa (código + cuerpo)
import org.springframework.http.ResponseEntity;

// Importa todas las anotaciones web de Spring: @RestController, @RequestMapping, @PostMapping, @RequestBody
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


// @RestController → marca esta clase como controlador REST
//                   combina @Controller + @ResponseBody
//                   responde con JSON, no con páginas HTML
// @RequestMapping("/records") → todos los endpoints de esta clase empiezan por /records
//                               URL base: http://localhost:8080/records
@RestController
@RequestMapping("/records")
public class RecordController {

    // @Autowired → Spring crea automáticamente una instancia de RecordServiceImpl
    //              y la inyecta aquí. No necesitas hacer: new RecordServiceImpl()
    @Autowired
    private RecordServiceImpl recordService;


    // @PostMapping("/save") → escucha peticiones HTTP POST en /records/save
    //                         URL completa: http://localhost:8080/records/save
    // ResponseEntity<?> → respuesta HTTP flexible. El ? significa que el cuerpo
    //                      puede ser cualquier tipo (String, objeto, error...)
    // @RequestBody Record record → Spring convierte automáticamente el JSON
    //                              que llega del frontend en un objeto Record Java
    @PostMapping("/save")
    public ResponseEntity<?> saveRecord(@RequestBody Record record) {

        try {

            // Llama al service para guardar el registro en la base de datos
            // El service a su vez llama al repository que hace el INSERT en MySQL
            recordService.saveRecord(record);

            // Si todo fue bien → devuelve HTTP 200 OK con el mensaje de éxito
            return ResponseEntity.ok("Record saved successfully");

        } catch (Exception e) {

            // Si algo falla → devuelve HTTP 400 Bad Request con el mensaje de error
            // e.getMessage() → devuelve el texto del error que ocurrió
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }

    }


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
