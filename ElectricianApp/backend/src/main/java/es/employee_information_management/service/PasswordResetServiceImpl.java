package es.employee_information_management.service;

import es.employee_information_management.model.Employee;
import es.employee_information_management.model.PasswordResetToken;
import es.employee_information_management.repository.EmployeeRepository;
import es.employee_information_management.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendResetEmail(String email) {

        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);

        if (employeeOpt.isEmpty()) return;

        Employee employee = employeeOpt.get();

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmployee(employee);
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));

        tokenRepository.save(resetToken);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset");
        message.setText("Click the link to reset your password: http://127.0.0.1:5500/reset?token=" + token);

        mailSender.send(message);

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