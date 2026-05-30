# ESTADO DEL PROYECTO — Employee Portal

## Descripción
Aplicación web de gestión de empleados industriales llamada Employee Portal.
SPA con frontend en HTML/CSS/JS vanilla y backend en Spring Boot 4.0.0 con PostgreSQL.
El frontend usa i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).
La base de datos db_company tiene las tablas: employee, department, equipment, record, task y password_reset_token.

## Cómo arrancar el proyecto en local
1. Arrancar PostgreSQL (puerto 5432)
2. Arrancar el backend en IntelliJ — clase EmployeeInformationManagementApplication.java
3. Abrir el frontend con Live Server en VS Code — desde la carpeta frontend/
4. URL: http://127.0.0.1:5500

## Ramas
- main → código completo con comentarios de aprendizaje — NO tocar
- production → código limpio para reclutadores — rama activa

## Cambios importantes realizados
- Migración de MySQL a PostgreSQL — pom.xml, application.properties actualizados
- DevTools comentado en pom.xml — causaba conflicto con el driver de PostgreSQL
- getRecordsByDate en work.api.js — parseInt(employeeId) añadido para evitar error con "0001"
- Dockerfile en ElectricianApp/backend/Dockerfile
- Permisos de ejecución añadidos a mvnw

## Pendiente ❌ — EN ORDEN

1. Configurar variables de entorno en Render para PostgreSQL:
   - DATABASE_URL → postgresql://employee_portal_db_lkrc_user:GH0oue1yAG1PUBQMd2w41nxjWPqBznk0@dpg-d8cssiojs32c73asi6n0-a/employee_portal_db_lkrc
   - RESEND_API_KEY → ya configurada

2. Crear las tablas en la base de datos de Render PostgreSQL
   - Conectarse desde pgAdmin a la base de datos externa de Render
   - Ejecutar el SQL de creación de tablas

3. Hacer deploy en Render y verificar que funciona

4. Desplegar el frontend como Static Site en Render
   - Actualizar las URLs del backend en los archivos api/*.js
   - De localhost:8080 a la URL de Render

5. Actualizar el README con la URL de la demo en vivo

6. Explicar pull request en GitHub — PENDIENTE IMPORTANTE prometido

7. Documento explicativo completo de la app

## Manera de aprender — MUY IMPORTANTE
- Explicar cada cosa paso a paso antes de pedir que se ejecute
- Explicar cada palabra del código — no asumir nada
- Hacer preguntas para que el estudiante piense antes de dar la solución
- No dar código sin explicar qué hace cada línea
- El objetivo es aprender, no solo que funcione

## Notas importantes
- PostgreSQL versión 18 instalado en local, puerto 5432, usuario postgres
- application.properties excluido de Git — contiene credenciales PostgreSQL y Resend API key
- El plan gratuito de Render PostgreSQL expira el 28 de junio de 2026
- El plan gratuito de Render Web Service duerme tras 15 minutos de inactividad
- SessionStorage se borra al cerrar la pestaña — siempre hay que hacer login de nuevo
- employeeId puede venir con ceros delante (ej: "0001") — parseInt() lo convierte a número
- DevTools comentado en pom.xml — no descomentar sin probar primero

## Git
- GitHub: DaniRCarou/WS_WEB
- Ramas: main (aprendizaje) y production (limpia)
- Último commit: feat: migrate from MySQL to PostgreSQL