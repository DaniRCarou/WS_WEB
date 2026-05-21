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

## Estructura
- FRONTEND/
  - index.html — SPA completa con todas las vistas
  - css/style.css — estilos completos
  - i18n/ — 7 archivos JSON de traducción (en, es, de, pt, gl, ca, eus)
  - js/
    - main.js — navegación entre vistas, detecta token en URL para mostrar new-password-view
    - utils/i18n.js — sistema de traducciones
    - pages/
      - register.js — formulario de registro (NO es módulo)
      - login.js — formulario de login (es módulo)
      - worker.js — vista del trabajador (es módulo, tiene DOMContentLoaded)
      - password_reset.js — escucha submit, recoge email, llama a sendResetEmail (es módulo)
    - api/
      - auth.api.js — fetch para login, devuelve { success, firstName }
      - work.api.js — fetch para guardar registros y consultar solapamiento contra MySQL
      - register.api.js — vacío (fetch está en register.js directamente)
      - passwordReset.api.js — sendResetEmail creada y funcionando

- BACKEND/
  - controller/
    - EmployeeController.java — /employees/register y /employees/login
    - RecordController.java — /records/save y GET /records/employee/{employeeId}/date/{date}
    - PasswordResetController.java — POST /password-reset/send, GET /password-reset/validate/{token}, POST /password-reset/reset
    - DepartmentController.java, EquipmentController.java, TaskController.java — vacíos
  - service/
    - EmployeeServiceImpl.java — lógica de registro y login
    - RecordServiceImpl.java — busca Employee y Task antes de guardar; tiene findByEmployeeAndDate
    - PasswordResetServiceImpl.java — usa Resend para enviar emails, genera token, resetea contraseña
  - dto/
    - LoginRequest.java — recibe personalNumber y password
    - LoginResponse.java — devuelve employeeId y firstName
    - RecordResponse.java — devuelve startTime y endTime
  - model/
    - Employee, Department, Equipment, Record, Task, PasswordResetToken
  - repository/
    - RecordRepository — findByEmployee_EmployeeIdAndDate
    - EmployeeRepository — findByEmail
    - PasswordResetTokenRepository — findByToken, findByEmployee_Email
  - config/CorsConfig.java — CORS para 127.0.0.1:5500

## Hecho ✅
- HTML completo con data-i18n
- i18n con 7 idiomas y todos los JSON completos
- Sistema de navegación SPA con showView()
- Registro de empleados funcionando end-to-end
- Login funcionando — devuelve nombre del empleado
- Nombre del empleado aparece en "Hello, nombre!" — se actualiza en login.js tras login exitoso
- worker.js completo con botones Assembly, Team Meeting, Cleanup
- Botón SUBMIT conectado al backend — guarda registros en MySQL
- Tras SUBMIT → vuelve a worker-view con formulario limpio
- sessionStorage guarda employeeId y firstName tras el login
- Logout con validación de tareas pendientes
- Auto-salto entre inputs de tiempo — funciona en los 3 paneles
- Foco en el primer input al pulsar Assembly, Meeting y Cleanup
- Botón X — borra solo la fila correspondiente
- Remember me — guarda número personal en localStorage
- Alerts de login traducidos a i18n en 7 idiomas
- Ojo ver/ocultar contraseña en login y registro
- CORS configurado
- Tabla task con 3 tareas insertadas en MySQL
- RecordController y RecordServiceImpl funcionando
- LoginResponse DTO creado para evitar referencias circulares
- Start_Time y End_Time añadidos a la tabla record en MySQL
- Start_Time y End_Time añadidos al modelo Record.java (LocalTime)
- work.api.js envía startTime y endTime al backend
- DTO RecordResponse creado — devuelve solo startTime y endTime
- Endpoint GET /records/employee/{employeeId}/date/{date} creado y funcionando
- Validación solapamiento contra MySQL — funciona en los 3 paneles
- Tabla password_reset_token creada en MySQL
- Modelo PasswordResetToken.java creado
- PasswordResetTokenRepository creado — findByToken, findByEmployee_Email
- EmployeeRepository — añadido findByEmail
- IPasswordResetService y PasswordResetServiceImpl creados
- PasswordResetController creado y funcionando
- password_reset.js creado — escucha submit, recoge email, llama a sendResetEmail
- password_reset.js añadido al index.html como módulo
- passwordReset.api.js — sendResetEmail creada y funcionando (CORS resuelto)
- Resend integrado en backend — emails de reset funcionando
- Vista new-password-view creada en index.html
- main.js detecta token en URL y muestra new-password-view automáticamente
- i18n actualizado en 7 idiomas con secciones newPassword y nuevas claves de alerts

## Pendiente ❌
- new-password-view — conectar formulario con backend (validar token y cambiar contraseña)
- new-password-view — mejorar estilos CSS
- Borrar token anterior cuando se solicita uno nuevo (acumulación de tokens en MySQL)
- Equipment — conectar faNumber con tabla equipment
- register.api.js — mover fetch de register.js
- README profesional para reclutadores
- Despliegue en Railway con MySQL para demo en vivo
- Documento explicativo completo de la app

## Manera de aprender — MUY IMPORTANTE
- Explicar cada cosa paso a paso antes de pedir que se ejecute
- Explicar cada palabra del código — no asumir nada
- Hacer preguntas para que el estudiante piense antes de dar la solución
- No dar código sin explicar qué hace cada línea
- El objetivo es aprender, no solo que funcione

## Notas importantes
- worker.js es type="module" y tiene DOMContentLoaded
- register.js NO es módulo — el fetch está directamente en register.js
- password_reset.js es type="module"
- employeeId y firstName se guardan en sessionStorage al hacer login
- employeeId también se guarda en localStorage si "Remember me" está marcado
- La tabla equipment está vacía — equipment_id se guarda como null en record
- showView exportada en main.js — importada en login.js y worker.js
- OneDrive puede corromper archivos de Git — considerar mover el proyecto fuera
- El autocompletado de Firefox guarda credenciales
- Record.java tiene startTime y endTime como LocalTime
- work.api.js envía startTime y endTime como strings HH:MM — el backend los convierte automáticamente a LocalTime
- Resend API key guardada en application.properties (excluido de Git con .gitignore)
- En plan gratuito de Resend solo se puede enviar a danicarou.dev@gmail.com
- Live Server debe abrirse desde la carpeta frontend/ no desde la raíz del proyecto
- El token en la URL se lee con URLSearchParams en main.js

## Git
- GitHub: DaniRCarou/WS_WEB
- Si se corrompe main: echo [ID] > .git/refs/heads/main

## Último commit
feat: add new-password view, Resend email integration and i18n for password reset