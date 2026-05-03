# ESTADO DEL PROYECTO

## Estructura
- FRONTEND/
- BACKEND/

## Hecho
- HTML completo con data-i18n
- i18n.js con 7 idiomas
- worker.js completo
- register.js corregido
- Backend arrancando en puerto 8080
- MySQL con datos iniciales
- CORS configurado

## Pendiente
- Probar registro
- Corregir login.js
- Crear password_reset.js
- Conectar worker.js con backend

## Último paso
- Añadir register.js al index.html
- Probar el registro de un trabajador

Estamos desarrollando una aplicación web de gestión de empleados industriales llamada Employee Portal. 
Es una SPA (Single Page Application) con frontend en HTML/CSS/JS vanilla y backend en Spring Boot 4.0.0 con MySQL.

El frontend usa un sistema de traducciones i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).
El backend tiene los endpoints /employees/register y /employees/login funcionando en el puerto 8080.
La base de datos db_company tiene las tablas: employee, department, equipment, record y task.

Continuamos desde donde lo dejamos — el siguiente paso es probar el registro de un trabajador 
desde el formulario de registro del frontend, que envía los datos al endpoint /employees/register 
del backend via fetch. Para ello hay que añadir register.js al index.html y probarlo.