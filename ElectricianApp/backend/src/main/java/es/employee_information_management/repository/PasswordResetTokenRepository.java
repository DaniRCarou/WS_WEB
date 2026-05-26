package es.employee_information_management.repository;

import es.employee_information_management.model.Employee;
import es.employee_information_management.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByEmployee_Email(String email);
    List<PasswordResetToken> findAllByEmployee(Employee employee);

}