# ESTADO DEL PROYECTO

## Descripción
Aplicación web de gestión de empleados industriales llamada Employee Portal.
SPA (Single Page Application) con frontend en HTML/CSS/JS vanilla y backend en Spring Boot 4.0.0 con MySQL.
El frontend usa un sistema de traducciones i18n con 7 idiomas (en, es, de, pt, gl, ca, eus).
La base de datos db_company tiene las tablas: employee, department, equipment, record y task.

## Cómo arrancar el proyecto
1. Arrancar MySQL
2. Arrancar el backend en IntelliJ — clase EmployeeInformationManagementApplication.java
3. Abrir el frontend con Live Server en VS Code — URL: http://127.0.0.1:5500

## Estructura
- FRONTEND/
  - index.html — SPA completa con todas las vistas
  - css/style.css — estilos completos
  - i18n/ — 7 archivos JSON de traducción (en, es, de, pt, gl, ca, eus)
  - js/
    - main.js — navegación entre vistas (showView)
    - utils/i18n.js — sistema de traducciones
    - pages/
      - register.js — formulario de registro
      - login.js — formulario de login
      - worker.js — vista del trabajador
      - password_reset.js — recuperación de contraseña (pendiente conectar)
    - api/
      - auth.api.js — fetch para login
      - register.api.js — vacío (fetch está en register.js directamente)
      - work.api.js — fetch para guardar registros de trabajo
      - passwordReset.api.js — vacío (pendiente)

- BACKEND/
  - controller/
    - EmployeeController.java — endpoints /employees/register y /employees/login
    - RecordController.java — endpoint /records/save
    - DepartmentController.java — vacío
    - EquipmentController.java — vacío
    - TaskController.java — vacío
  - service/
    - EmployeeServiceImpl.java — lógica de registro y login
    - RecordServiceImpl.java — lógica de guardar registros
  - model/ — entidades JPA: Employee, Department, Equipment, Record, Task
  - repository/ — interfaces JPA para cada entidad
  - config/CorsConfig.java — CORS configurado para 127.0.0.1:5500

## Hecho ✅
- HTML completo con data-i18n
- i18n.js con 7 idiomas y 7 archivos JSON completos
- Sistema de navegación SPA con showView()
- Registro de empleados funcionando end-to-end
- Login de empleados funcionando — navega a worker-view
- worker.js completo con botones Assembly, Team Meeting, Cleanup
- Botón SUBMIT conectado al backend — guarda registros en MySQL
- sessionStorage guarda employeeId tras el login
- Ojo para ver/ocultar contraseña en login y registro (SVG de Feather Icons)
- CORS configurado para 127.0.0.1:5500
- Tabla task con 3 tareas insertadas en MySQL
- RecordController y RecordServiceImpl funcionando

## Pendiente ❌
- Tras SUBMIT → volver a la vista worker
- Logout — botón de cerrar sesión
- Validación de Confirm con Enter — evitar que Enter guarde sin rellenar campos
- Auto-salto entre inputs de tiempo — al terminar minutos saltar al siguiente input
- Validación de solapamiento contra MySQL — no permitir registros duplicados
- Equipment — conectar faNumber con la tabla equipment
- password_reset.js — conectar con backend
- register.api.js — mover fetch de register.js a register.api.js
- Traducir alerts hardcodeados restantes
- README completo explicando toda la aplicación

## Notas importantes
- worker.js es type="module" — puede usar import
- register.js NO es type="module" — no puede usar import
- El employeeId se guarda en sessionStorage al hacer login
- La tabla equipment está vacía — equipment_id se guarda como null en record
- Los nombres de las tareas en la tabla de revisión aparecen en inglés (pendiente traducir)

## Último paso completado
- Conectado worker SUBMIT con backend via work.api.js
- Registros guardados correctamente en tabla record de MySQL