# ESTADO DEL PROYECTO — Employee Portal

## Descripción
Aplicación web de gestión de empleados industriales llamada Employee Portal.
SPA con frontend en HTML/CSS/JS vanilla y backend en Spring Boot 4.0.0.
El frontend usa i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).

## Cómo arrancar el proyecto en local
1. Arrancar PostgreSQL (recién instalado, puerto 5432)
2. Arrancar el backend en IntelliJ — clase EmployeeInformationManagementApplication.java
3. Abrir el frontend con Live Server en VS Code — desde la carpeta frontend/
4. URL: http://127.0.0.1:5500

## Ramas
- main → código completo con comentarios de aprendizaje — NO tocar
- production → código limpio para reclutadores — rama activa

## Decisiones tomadas hoy — MUY IMPORTANTE

### Migración de MySQL a PostgreSQL
Se decidió migrar de MySQL a PostgreSQL para que el entorno local y el de producción (Render) sean idénticos. Esto evita configuraciones duales y es más profesional.

Cambios realizados:
1. En pom.xml — sustituida la dependencia de MySQL por PostgreSQL:
   - Comentada: mysql-connector-j
   - Activa: postgresql (org.postgresql)
2. En application.properties — pendiente de actualizar con credenciales de PostgreSQL
3. PostgreSQL instalado en local (versión 18, puerto 5432, usuario postgres)

### Despliegue en Render
- Cuenta creada en render.com
- Servicio Web creado: employee-portal-drc → https://employee-portal-drc.onrender.com
- Base de datos PostgreSQL creada: employee-portal-db (expira el 28 de junio de 2026 si no se actualiza el plan)
- Variable de entorno añadida: RESEND_API_KEY
- Dockerfile creado en ElectricianApp/backend/Dockerfile
- Permisos de ejecución añadidos a mvnw con git update-index --chmod=+x

### Credenciales de Render PostgreSQL (NO compartir)
Internal Database URL:
postgresql://employee_portal_db_lkrc_user:GH0oue1yAG1PUBQMd2w41nxjWPqBznk0@dpg-d8cssiojs32c73asi6n0-a/employee_portal_db_lkrc

## Pendiente ❌ — EN ORDEN

1. Crear la base de datos en PostgreSQL local con pgAdmin
   - Crear base de datos llamada db_company
   - Ejecutar db_company.sql para crear las tablas
   - Nota: el SQL tiene sintaxis MySQL — puede necesitar pequeños ajustes para PostgreSQL

2. Actualizar application.properties para PostgreSQL local:
   - spring.datasource.url=jdbc:postgresql://localhost:5432/db_company
   - spring.datasource.username=postgres
   - spring.datasource.password=TU_PASSWORD_DE_POSTGRESQL
   - spring.datasource.driver-class-name=org.postgresql.Driver
   - spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

3. Probar que el backend arranca en local con PostgreSQL

4. Configurar variables de entorno en Render:
   - DATABASE_URL → la Internal Database URL de Render PostgreSQL
   - DATABASE_USERNAME → employee_portal_db_lkrc_user
   - DATABASE_PASSWORD → GH0oue1yAG1PUBQMd2w41nxjWPqBznk0
   - HIBERNATE_DIALECT → org.hibernate.dialect.PostgreSQLDialect

5. Crear las tablas en la base de datos de Render PostgreSQL
   - Conectarse desde pgAdmin a la base de datos externa de Render
   - Ejecutar db_company.sql adaptado para PostgreSQL

6. Hacer commit y push de los cambios (pom.xml, application.properties, Dockerfile)

7. Hacer deploy en Render y verificar que funciona

8. Desplegar el frontend como Static Site en Render
   - Actualizar las URLs del backend en los archivos api/*.js (de localhost:8080 a la URL de Render)

9. Actualizar el README con la URL de la demo en vivo

10. Explicar pull request en GitHub (PENDIENTE IMPORTANTE — prometido)

11. Documento explicativo completo de la app

## Notas importantes
- PostgreSQL versión 18 instalado en local, puerto 5432, usuario postgres
- El plan gratuito de Render PostgreSQL expira el 28 de junio de 2026
- El plan gratuito de Render Web Service duerme tras 15 minutos de inactividad
- El frontend tiene las URLs del backend apuntando a localhost:8080 — hay que cambiarlas para producción
- application.properties está en .gitignore — nunca se sube a GitHub
- En plan gratuito de Resend solo se puede enviar a danicarou.dev@gmail.com
- SessionStorage se borra al cerrar la pestaña — siempre hay que hacer login de nuevo

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
  - DepartmentRepository.java / EquipmentRepository.java / TaskRepository.java
- model/
  - Employee.java / Department.java / Equipment.java
  - Task.java / Record.java / PasswordResetToken.java
- dto/
  - LoginRequest.java / LoginResponse.java / RecordResponse.java
- config/
  - CorsConfig.java

## Manera de aprender — MUY IMPORTANTE
- Explicar cada cosa paso a paso antes de pedir que se ejecute
- Explicar cada palabra del código — no asumir nada
- Hacer preguntas para que el estudiante piense antes de dar la solución
- No dar código sin explicar qué hace cada línea
- El objetivo es aprender, no solo que funcione

## Git
- GitHub: DaniRCarou/WS_WEB
- Ramas: main (aprendizaje) y production (limpia)
- Si se corrompe main: echo [ID] > .git/refs/heads/main
- Último commit: fix: add execute permission to mvnw