package es.employee_information_management.controller;

import com.resend.core.exception.ResendException;
import es.employee_information_management.service.PasswordResetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password-reset")
public class PasswordResetController {

    @Autowired
    private PasswordResetServiceImpl passwordResetService;

    @PostMapping("/send")
    public ResponseEntity<?> sendResetEmail(@RequestParam String email) throws ResendException {
        passwordResetService.sendResetEmail(email);
        return ResponseEntity.ok("If the email exists, a reset link has been sent");
    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<?> validateToken(@PathVariable String token) {
        boolean valid = passwordResetService.validateToken(token);
        return ResponseEntity.ok(valid);
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully");
    }

}