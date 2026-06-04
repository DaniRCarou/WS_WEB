package es.employee_information_management.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import es.employee_information_management.model.Employee;
import es.employee_information_management.model.PasswordResetToken;
import es.employee_information_management.repository.EmployeeRepository;
import es.employee_information_management.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements IPasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Override
    public void sendResetEmail(String email) throws ResendException {
        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
        if (employeeOpt.isEmpty()) return;

        Employee employee = employeeOpt.get();

        // Delete previous tokens before creating a new one
        tokenRepository.deleteAll(tokenRepository.findAllByEmployee(employee));

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmployee(employee);
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        tokenRepository.save(resetToken);

        Resend resend = new Resend(resendApiKey);
        CreateEmailOptions sendEmailRequest = CreateEmailOptions.builder()
                .from("onboarding@resend.dev")
                .to(email)
                .subject("Password Reset")
                .html("<p>Click the link to reset your password: <a href='https://employee-portal-frontend.onrender.com?token=" + token + "'>Reset Password</a></p>")
                .build();
        resend.emails().send(sendEmailRequest);
    }

    @Override
    public boolean validateToken(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) return false;
        return tokenOpt.get().getExpiryDate().isAfter(LocalDateTime.now());
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) return;

        Employee employee = tokenOpt.get().getEmployee();
        employee.setPassword(newPassword);
        employeeRepository.save(employee);
        tokenRepository.delete(tokenOpt.get());
    }

}