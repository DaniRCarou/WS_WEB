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
  - index.html
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
  - EmployeeRepository.java / RecordRepository.java / PasswordResetTokenRepository.java
  - DepartmentRepository.java / EquipmentRepository.java / TaskRepository.java — mantenidos por relaciones JPA
- model/
  - Employee.java / Department.java / Equipment.java / Task.java / Record.java / PasswordResetToken.java
- dto/
  - LoginRequest.java / LoginResponse.java / RecordResponse.java
- config/
  - CorsConfig.java

## Hecho ✅
- App completa y funcionando en local
- Rama production limpia — sin comentarios de aprendizaje
- README profesional añadido en la raíz del proyecto
- db_company.sql añadido en la raíz del proyecto
- Dockerfile creado en ElectricianApp/backend/Dockerfile
- Cuenta creada en Render — servicio employee-portal-drc creado
- RESEND_API_KEY añadida como variable de entorno en Render

## Pendiente ❌
- Resolver error de despliegue en Render — Dockerfile no encontrado
  - Root Directory vacío, Dockerfile Path: ElectricianApp/backend/Dockerfile
  - El error es: failed to read dockerfile: open Dockerfile: no such file or directory
  - Verificar ubicación exacta del Dockerfile en el proyecto
- Crear base de datos MySQL en Render y añadir variables de entorno de conexión
- Actualizar README con URL de demo en vivo
- Explicar pull request en GitHub (PENDIENTE IMPORTANTE)
- Documento explicativo completo de la app

## Manera de aprender — MUY IMPORTANTE
- Explicar cada cosa paso a paso antes de pedir que se ejecute
- Explicar cada palabra del código — no asumir nada
- Hacer preguntas para que el estudiante piense antes de dar la solución
- No dar código sin explicar qué hace cada línea
- El objetivo es aprender, no solo que funcione

## Notas importantes
- Live Server debe abrirse desde la carpeta frontend/
- application.properties excluido de Git — contiene credenciales MySQL y Resend API key
- En plan gratuito de Resend solo se puede enviar a danicarou.dev@gmail.com
- SessionStorage se borra al cerrar la pestaña — siempre hay que hacer login de nuevo
- El token en la URL se lee con URLSearchParams en main.js
- Render free plan: la app se duerme tras 15 minutos de inactividad

## Git
- GitHub: DaniRCarou/WS_WEB
- Ramas: main (aprendizaje) y production (limpia)
- Si se corrompe main: echo [ID] > .git/refs/heads/main

## Último commit
feat: add Dockerfile for Render deployment