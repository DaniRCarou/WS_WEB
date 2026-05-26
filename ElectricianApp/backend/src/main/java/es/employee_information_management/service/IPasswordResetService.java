package es.employee_information_management.service;

public interface IPasswordResetService {

    void sendResetEmail(String email) throws Exception;
    boolean validateToken(String token);
    void resetPassword(String token, String newPassword);

}