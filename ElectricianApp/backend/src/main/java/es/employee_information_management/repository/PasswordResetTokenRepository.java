package es.employee_information_management.repository;

import es.employee_information_management.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {


// Optional significa que el resultado puede existir o no — si el token no existe en la base de datos, no devuelve null sino un Optional vacío.
// Spring reconoce palabras clave específicas en los nombres de los métodos para generar el SQL automáticamente. findBy es una de esas palabras clave — Spring la entiende y genera el SELECT correspondiente.
// getBy también existe en Spring pero devuelve directamente el objeto y lanza una excepción si no lo encuentra. findBy devuelve un Optional — más seguro porque te obliga a manejar el caso de que no exista.
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByEmployee_Email(String email);


}


