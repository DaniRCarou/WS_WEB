package es.employee_information_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordResponse {

    private LocalTime startTime;
    private LocalTime endTime;

}