package es.employee_information_management;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder password = new BCryptPasswordEncoder();
        
        System.out.println(password.encode("Myappweb2$"));
        System.out.println(password.encode("Carlitos1$"));
        System.out.println(password.encode("ritap4"));
        System.out.println(password.encode("Primerempleado1#"));
        System.out.println(password.encode("1234Abcd!"));

    }

}
