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
    - main.js — navegación entre vistas (showView exportada)
    - utils/i18n.js — sistema de traducciones
    - pages/
      - register.js — formulario de registro (NO es módulo)
      - login.js — formulario de login (es módulo)
      - worker.js — vista del trabajador (es módulo, tiene DOMContentLoaded)
      - password_reset.js — recuperación de contraseña (pendiente conectar)
    - api/
      - auth.api.js — fetch para login
      - work.api.js — fetch para guardar registros de trabajo
      - register.api.js — vacío (fetch está en register.js directamente)
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
    - RecordServiceImpl.java — lógica de guardar registros (busca Employee y Task antes de guardar)
  - model/ — entidades JPA: Employee, Department, Equipment, Record, Task
  - repository/ — interfaces JPA para cada entidad
  - config/CorsConfig.java — CORS configurado para 127.0.0.1:5500

## Hecho ✅
- HTML completo con data-i18n
- i18n.js con 7 idiomas y 7 archivos JSON completos con todas las claves
- Sistema de navegación SPA con showView()
- Registro de empleados funcionando end-to-end
- Login de empleados funcionando — navega a worker-view
- Login corregido — isChecked movido dentro del submit
- Checkbox remember-checkbox con id correcto en HTML
- worker.js completo con botones Assembly, Team Meeting, Cleanup
- Los tres tipos de tarea (Assembly, Meeting, Cleanup) se guardan correctamente en MySQL
- Botón SUBMIT conectado al backend — guarda registros en MySQL
- Tras SUBMIT → vuelve a worker-view con formulario limpio
- sessionStorage guarda employeeId tras el login
- Ojo para ver/ocultar contraseña en login y registro (SVG de Feather Icons)
- CORS configurado para 127.0.0.1:5500
- Tabla task con 3 tareas insertadas en MySQL
- RecordController y RecordServiceImpl funcionando
- Error de elementos DOM null al hacer clic fuera corregido con comprobación if (element)
- Branch de Git reparado — archivo .git/refs/heads/main estaba vacío por interferencia de OneDrive

## Pendiente ❌
- Logout — botón de cerrar sesión
- Remember me — implementar funcionalidad real con localStorage
- Validación Confirm con Enter — evitar que Enter guarde sin rellenar campos
- Auto-salto entre inputs de tiempo
- Validación solapamiento contra MySQL
- Equipment — conectar faNumber con la tabla equipment
- password_reset.js — conectar con backend
- register.api.js — mover fetch de register.js a register.api.js
- Traducir alerts hardcodeados restantes
- README completo explicando toda la aplicación

## Notas importantes
- worker.js es type="module" y tiene DOMContentLoaded
- register.js NO es type="module" — no puede usar import
- El employeeId se guarda en sessionStorage al hacer login
- La tabla equipment está vacía — equipment_id se guarda como null en record
- Los nombres de las tareas en la tabla de revisión aparecen en inglés (pendiente traducir)
- showView está exportada en main.js — se importa en login.js y worker.js
- isChecked debe leerse DENTRO del evento submit, no fuera
- OneDrive puede corromper archivos internos de Git — considerar mover el proyecto fuera de OneDrive

## Git — estructura interna
- .git/HEAD → apunta al branch actual: "ref: refs/heads/main"
- .git/refs/heads/main → guarda el ID del último commit del branch main
- .git/logs/HEAD → historial completo de todos los commits
- Si .git/refs/heads/main está vacío → Git no puede hacer commits → reparar con: echo [ID_ULTIMO_COMMIT] > .git/refs/heads/main

## Manera de programar aprendida
Programación orientada a eventos:
1. Seleccionar el elemento del HTML con querySelector
2. Leer su valor con .value, .checked, etc. (SIEMPRE dentro del evento, no fuera)
3. Actuar según ese valor — mostrar alert, navegar, enviar datos...

## Último paso completado
- Corregido error de elementos DOM null al borrar valores de inputs cuando el formulario no existe
- Los tres tipos de tarea funcionan correctamente y se guardan en MySQL
- Branch de Git reparado