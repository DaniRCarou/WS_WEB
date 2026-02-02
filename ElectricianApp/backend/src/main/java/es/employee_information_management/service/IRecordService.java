package es.employee_information_management.service;

import es.employee_information_management.model.Record;

import java.util.List;

public interface IRecordService {

    public List<Record> listRecords(); // Metodo para listar Records

    public Record findRecordById(Integer recordId); // Metodo para buscar Records por id. Cuando buscas algo “por ID”, lo único que necesitas es el identificador ID.  Por eso utilizamos como tipo 'Integer'

    public void saveRecord(Record record);  // Si el recordId NO existe en la base de datos → inserción. Si el recordId YA existe → actualización

    void deleteRecordById(Integer recordId);

}
