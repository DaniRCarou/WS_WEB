# ESTADO DEL PROYECTO — Employee Portal

## Descripción
Aplicación web de gestión de empleados industriales llamada Employee Portal.
SPA con frontend en HTML/CSS/JS vanilla y backend en Spring Boot 4.0.0 con MySQL.
El frontend usa i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).
La base de datos db_company tiene las tablas: employee, department, equipment, record, task y password_reset_token.

## Cómo arrancar el proyecto
1. Arrancar MySQL
2. Arrancar el backend en IntelliJ — clase EmployeeInformationManagementApplication.java
3. Abrir el frontend con Live Server en VS Code — desde la carpeta frontend/
4. URL: http://127.0.0.1:5500

## Ramas
- main → código completo con comentarios de aprendizaje — NO tocar
- production → código limpio para reclutadores — rama activa

## Estructura frontend (rama production — limpia)

- frontend/
  - index.html — limpio, comentarios en inglés
  - css/style.css
  - i18n/ — 7 JSON de traducción
  - js/
    - main.js
    - utils/i18n.js
    - pages/
      - login.js
      - register.js
      - worker.js
      - password-reset.js
    - api/
      - auth.api.js
      - register.api.js
      - work.api.js
      - password-reset.api.js

## Estructura backend (rama production — limpia)

- controller/
  - EmployeeController.java
  - RecordController.java
  - PasswordResetController.java
- service/
  - IEmployeeService.java / EmployeeServiceImpl.java
  - IRecordService.java / RecordServiceImpl.java
  - IPasswordResetService.java / PasswordResetServiceImpl.java
- repository/
  - EmployeeRepository.java
  - RecordRepository.java
  - PasswordResetTokenRepository.java
  - DepartmentRepository.java — mantenido por relaciones JPA
  - EquipmentRepository.java — mantenido por relaciones JPA
  - TaskRepository.java — mantenido por relaciones JPA
- model/
  - Employee.java / Department.java / Equipment.java
  - Task.java / Record.java / PasswordResetToken.java
- dto/
  - LoginRequest.java / LoginResponse.java / RecordResponse.java
- config/
  - CorsConfig.java

## Hecho ✅
- HTML completo con data-i18n
- i18n con 7 idiomas y todos los JSON completos
- Sistema de navegación SPA con showView()
- Registro de empleados funcionando end-to-end
- Login funcionando — devuelve nombre del empleado
- Nombre del empleado aparece en "Hello, nombre!"
- worker.js completo con botones Assembly, Team Meeting, Cleanup
- Botón SUBMIT conectado al backend — guarda registros en MySQL
- Tras SUBMIT → vuelve a worker-view con formulario limpio
- sessionStorage guarda employeeId y firstName tras el login
- Logout con validación de tareas pendientes
- Auto-salto entre inputs de tiempo
- Foco en el primer input al pulsar cada botón
- Botón X — borra solo la fila correspondiente
- Remember me — guarda número personal en localStorage
- Alerts traducidos a i18n en 7 idiomas
- Ojo ver/ocultar contraseña en login y registro
- CORS configurado
- Validación solapamiento contra MySQL
- Password reset completo con Resend email
- Tokens anteriores se borran al solicitar uno nuevo
- register.api.js funcionando
- Rama production limpia — sin comentarios de aprendizaje, sin archivos personales

## Pendiente ❌
- README profesional para reclutadores
- Despliegue en Railway con MySQL
- Documento explicativo completo de la app

## Manera de aprender — MUY IMPORTANTE
- Explicar cada cosa paso a paso antes de pedir que se ejecute
- Explicar cada palabra del código — no asumir nada
- Hacer preguntas para que el estudiante piense antes de dar la solución
- No dar código sin explicar qué hace cada línea
- El objetivo es aprender, no solo que funcione

## Notas importantes
- Live Server debe abrirse desde la carpeta frontend/ no desde la raíz del proyecto
- application.properties excluido de Git con .gitignore — contiene Resend API key y credenciales MySQL
- En plan gratuito de Resend solo se puede enviar a danicarou.dev@gmail.com
- SessionStorage se borra al cerrar la pestaña — siempre hay que hacer login de nuevo
- Controllers y services de Department, Equipment y Task eliminados en production
- Repositories de Department, Equipment y Task se mantienen — necesarios para relaciones JPA
- El token en la URL se lee con URLSearchParams en main.js

## Git
- GitHub: DaniRCarou/WS_WEB
- Ramas: main (aprendizaje) y production (limpia)
- Si se corrompe main: echo [ID] > .git/refs/heads/main

## Último commit
refactor: clean production branch — remove learning comments and unused files