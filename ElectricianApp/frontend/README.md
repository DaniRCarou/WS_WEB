# Employee Portal

A full-stack industrial web application for employee work hour tracking and task management.

Aplicación web industrial full-stack para el registro de horas de trabajo y gestión de tareas.

---

## Live Demo

*Coming soon — deployment in progress*

---

## Description / Descripción

**EN:** Employee Portal is an intranet SPA (Single Page Application) designed for industrial environments. Employees can log in, register their daily tasks with start and end times, and submit their work records to the database. The application includes a complete password reset flow via email and supports 7 languages.

**ES:** Employee Portal es una SPA (Single Page Application) de intranet diseñada para entornos industriales. Los empleados pueden iniciar sesión, registrar sus tareas diarias con hora de inicio y fin, y enviar sus registros de trabajo a la base de datos. La aplicación incluye un flujo completo de restablecimiento de contraseña por email y soporta 7 idiomas.

---

## Tech Stack

| Capa / Layer             | Tecnología / Technology                          |
|--------------------------|--------------------------------------------------|
| Frontend                 | HTML5, CSS3, Vanilla JavaScript (ES Modules)     |
| Backend                  | Java 23, Spring Boot 4.0.0                       |
| Base de datos / Database | MySQL 8.0                                        |
| ORM                      | Hibernate / Spring Data JPA                      |
| Email                    | Resend API                                       |
| i18n                     | Sistema propio basado en JSON / Custom JSON-based system |

---

## Funcionalidades / Features

- Login y logout con gestión de sesión / Login and logout with session management
- Registro de empleados / Employee registration
- Registro de tareas con hora de inicio y fin / Task time tracking with start and end times
- Validación de solapamiento de horarios / Time overlap validation (in-memory + database)
- Restablecimiento de contraseña por email / Password reset via email (Resend API)
- 7 idiomas: español, inglés, alemán, portugués, gallego, catalán, euskera
- Diseño responsive

---

## Arquitectura / Architecture

La aplicación sigue una arquitectura en capas estándar.
The application follows a standard layered architecture.

```
Frontend (SPA)
      ↓ HTTP REST
Backend (Spring Boot)
      ↓ JPA
MySQL Database
```

**Estructura frontend / Frontend structure:**
```
frontend/
├── index.html
├── css/style.css
├── i18n/              # Archivos JSON de traducción / Translation JSON files (7 idiomas / languages)
└── js/
    ├── main.js
    ├── utils/i18n.js
    ├── pages/         # Controladores de vista / View controllers
    └── api/           # Capa de comunicación con el backend / Backend communication layer
```

**Estructura backend / Backend structure:**
```
src/main/java/
├── controller/        # Endpoints REST
├── service/           # Lógica de negocio / Business logic
├── repository/        # Acceso a datos / Database access (Spring Data JPA)
├── model/             # Entidades JPA / JPA entities
├── dto/               # Objetos de transferencia de datos / Data Transfer Objects
└── config/            # Configuración CORS / CORS configuration
```

---

## Base de datos / Database

**Tablas / Tables:**

**employee**
| Campo / Field | Tipo / Type  | Descripción / Description                          |
|---------------|--------------|----------------------------------------------------|
| EMPLOYEE_ID   | INT (PK)     | Número personal / Personal number                  |
| DEPARTMENT_ID | INT (FK)     | Departamento / Department                          |
| FIRST_NAME    | VARCHAR(25)  | Nombre / First name                                |
| SURNAME       | VARCHAR(25)  | Apellido / Surname                                 |
| EMAIL         | VARCHAR(100) | Correo electrónico / Email                         |
| PASSWORD      | VARCHAR(255) | Contraseña / Password                              |
| ROLE          | VARCHAR(20)  | Rol (por defecto: WORKER) / Role (default: WORKER) |

**department**
| Campo / Field   | Tipo / Type | Descripción / Description                                       |
|-----------------|-------------|-----------------------------------------------------------------|
| DEPARTMENT_ID   | INT (PK)    | ID del departamento / Department ID                             |
| DEPARTMENT_NAME | VARCHAR(25) | Nombre del departamento / Department name                       |
| MANAGER_ID      | INT (FK)    | Responsable (FK → employee) / Manager (FK → employee)           |

**equipment**
| Campo / Field  | Tipo / Type | Descripción / Description                                              |
|----------------|-------------|------------------------------------------------------------------------|
| EQUIPMENT_ID   | INT (PK)    | ID del equipo / Equipment ID                                           |
| DEPARTMENT_ID  | INT (FK)    | Departamento (FK → department) / Department (FK → department)          |
| EQUIPMENT_NAME | VARCHAR(25) | Nombre del equipo / Equipment name                                     |

**task**
| Campo / Field | Tipo / Type | Descripción / Description      |
|---------------|-------------|--------------------------------|
| TASK_ID       | INT (PK)    | ID de la tarea / Task ID       |
| TASK_NAME     | VARCHAR(25) | Nombre de la tarea / Task name |

**record**
| Campo / Field | Tipo / Type        | Descripción / Description                                              |
|---------------|--------------------|------------------------------------------------------------------------|
| Record_ID     | INT (PK)           | ID del registro / Record ID                                            |
| Employee_ID   | INT (FK)           | Empleado (FK → employee) / Employee (FK → employee)                    |
| Task_ID       | INT (FK)           | Tarea (FK → task) / Task (FK → task)                                   |
| Equipment_ID  | INT (FK, nullable) | Equipo opcional (FK → equipment) / Optional equipment (FK → equipment) |
| Date          | DATE               | Fecha del registro / Record date                                       |
| Start_Time    | TIME               | Hora de inicio / Start time                                            |
| End_Time      | TIME               | Hora de fin / End time                                                 |
| Total_Time    | INT                | Duración en minutos / Duration in minutes                              |

**password_reset_token**
| Campo / Field | Tipo / Type  | Descripción / Description                                            |
|---------------|--------------|----------------------------------------------------------------------|
| id            | INT (PK)     | ID del token / Token ID                                              |
| employee_id   | INT (FK)     | Empleado (FK → employee) / Employee (FK → employee)                  |
| token         | VARCHAR(255) | Token de restablecimiento / Reset token                              |
| expiry_date   | DATETIME     | Fecha de expiración / Expiry date                                    |

**Relaciones / Relationships:**

- department → employee: 1:N — Un departamento tiene varios empleados / One department has many employees
- employee → record: 1:N — Un empleado tiene varios registros / One employee has many records
- task → record: 1:N — Una tarea puede aparecer en varios registros / One task can appear in many records
- equipment → record: 1:N (opcional / optional) — Un equipo puede aparecer en varios registros / One equipment can appear in many records
- employee → department (MANAGER_ID): Un empleado puede ser responsable de un departamento / An employee can manage a department

---

## Configuración local / Local Setup

**EN:** To run this project locally:

1. Download or clone the repository from GitHub and switch to the `production` branch
2. Install [Java 23](https://www.oracle.com/java/technologies/downloads/), [Maven](https://maven.apache.org/download.cgi) and [MySQL 8.0](https://dev.mysql.com/downloads/)
3. Open MySQL Workbench and run `db_company.sql` to create the database and all tables
4. Create `backend/src/main/resources/application.properties` with your own credentials (excluded from Git for security):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_company
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
resend.api.key=YOUR_RESEND_API_KEY
```

5. Start the backend from IntelliJ or run `mvn spring-boot:run` in the `backend/` folder
6. Open the `frontend/` folder with VS Code and start Live Server → `http://127.0.0.1:5500`

---

**ES:** Para ejecutar este proyecto en local:

1. Descarga o clona el repositorio desde GitHub y selecciona la rama `production`
2. Instala [Java 23](https://www.oracle.com/java/technologies/downloads/), [Maven](https://maven.apache.org/download.cgi) y [MySQL 8.0](https://dev.mysql.com/downloads/)
3. Abre MySQL Workbench y ejecuta `db_company.sql` para crear la base de datos y todas las tablas
4. Crea el archivo `backend/src/main/resources/application.properties` con tus propias credenciales (excluido de Git por seguridad):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_company
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
resend.api.key=YOUR_RESEND_API_KEY
```

5. Arranca el backend desde IntelliJ o ejecuta `mvn spring-boot:run` en la carpeta `backend/`
6. Abre la carpeta `frontend/` con VS Code e inicia Live Server → `http://127.0.0.1:5500`

---

## Autor / Author

**Daniel Rodríguez Carou**

Técnico de mantenimiento industrial (19 años de experiencia) en transición a desarrollador Java.
Combinando experiencia industrial con desarrollo de software para aplicaciones Industry 4.0.

Industrial Maintenance Technician (19 years of experience) transitioning to Java Developer.
Combining industrial expertise with software development for Industry 4.0 applications.

- GitHub: [DaniRCarou](https://github.com/DaniRCarou)
- LinkedIn: [linkedin.com/in/danicarou](https://linkedin.com/in/danicarou)
- Alemán B2 / German B2 | Inglés B1 / English B1 | Español nativo / Spanish Native

---

## Licencia / License

MIT
