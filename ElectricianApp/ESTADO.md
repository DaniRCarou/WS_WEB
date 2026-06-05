# ESTADO DEL PROYECTO — Employee Portal

## Descripción
SPA con frontend HTML/CSS/JS vanilla y backend Spring Boot 4.0.0 con PostgreSQL.
i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).

## Ramas
- main → código con comentarios de aprendizaje — NO tocar
- production → código limpio — rama activa

## URLs de producción
- Backend: https://employee-portal-drc.onrender.com
- Frontend: https://employee-portal-frontend.onrender.com
- Base de datos Render: dpg-d8cssiojs32c73asi6n0-a.frankfurt-postgres.render.com
  - DB: employee_portal_db_lkrc
  - User: employee_portal_db_lkrc_user
  - Password: GH0oue1yAG1PUBQMd2w41nxjWPqBznk0
  - EXPIRA: 28 de junio de 2026

## Cómo arrancar en local
1. Arrancar PostgreSQL local (puerto 5432, usuario postgres, password: Putosql1)
2. Arrancar backend en IntelliJ — EmployeeInformationManagementApplication.java
3. Live Server desde frontend/ → http://127.0.0.1:5500

## Estado del despliegue ✅
- Backend desplegado en Render
- Frontend desplegado en Render
- Tablas creadas en base de datos de Render
- Datos iniciales insertados (4 managers, 4 departamentos)
- CORS configurado correctamente
- Login funcionando en producción
- Submit de tareas funcionando en producción
- Validación de solapamiento funcionando correctamente por empleado

## Bugs resueltos ✅
1. Sobreescritura en registro — validación de ID duplicado con existsById
2. Redirect al login tras registro exitoso
3. Doble confirm con try/finally — botón se rehabilita siempre
4. Enlace email de reset apunta a URL de producción
5. Autofill amarillo en input email — resuelto con autocomplete="off"

## Pendiente ❌
1. README con URLs de producción y nota sobre lentitud del plan gratuito
2. Explicar pull request en GitHub — PROMETIDO
3. Documento explicativo completo de la app — archivo para estudiar

## Notas importantes
- application.properties excluido de Git
- DevTools comentado en pom.xml
- Plan gratuito Render duerme tras 15 min — primera petición tarda ~2 min
- Plan gratuito Render PostgreSQL expira 28 junio 2026
- Resend API: solo puede enviar a danicarou.dev@gmail.com (plan gratuito)
- parseInt en login.js y work.api.js para IDs con ceros delante (ej: "0001")
- employeeId se lee de sessionStorage dentro de las funciones, no al inicio

## Git
- GitHub: DaniRCarou/WS_WEB
- Último commit: fix: disable autocomplete on password reset email input