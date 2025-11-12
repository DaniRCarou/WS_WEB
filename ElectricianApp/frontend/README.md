# Electrician WebApp

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1-brightgreen)
![HTML](https://img.shields.io/badge/HTML-CSS-JS-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## Description
This is a web application for a company where employees record their worked hours, completed tasks, department, and any issues encountered.

The system allows:
- Query total accumulated hours for each team.
- See who worked on each piece of equipment.
- Identify employee departments.
- Track tasks and equipment usage.


## Database
Developed using SQL through MySQL Workbench, ensuring data integrity and well-defined relationships between tables.  

**Tables:**

- **DEPARTMENT:** Department_ID (PK), Department_Name, Manager  
- **EMPLOYEE:** Employee_ID (PK), Department_ID (FK), First_Name, Last_Name, Email, Password  
- **RECORD:** Record_ID (PK), Equipment_ID, Task_ID (FK), Employee_ID, Date, Total_Time  
- **TASKS:** Task_ID (PK), Name  
- **EQUIPMENT:** Equipment_ID (PK), Department_ID (FK), Name  

**Relationships:**

- DEPARTMENT - EMPLOYEE: 1:N  
- EMPLOYEE - RECORD: 1:N  
- TASKS - RECORD: 1:N  
- EQUIPMENT - RECORD: 1:N  

---

## Frontend
Built with **HTML, CSS, and JavaScript** for a responsive and user-friendly interface.

---

## Backend
Developed in **Java with Spring Boot** using **RESTful services** to manage data and handle business logic.

---

## Project Structure

```
WS_WEB/

├─ Electrician_WebApp/ # Frontend

│ ├─ css/ # Estilos de la web

│ ├─ html/ # Páginas HTML

│ ├─ js/ # Scripts de JavaScript

│ └─ json/ # Archivos JSON de configuración o datos

└─ Electrician_WebApp-Backend/ # Backend Java/Spring Boot

    ├─ src/main/java/... # Código Java: controladores, modelos, servicios

    ├─ src/main/resources/ # Archivos de configuración y recursos

    │    └─ application.properties

    └─ pom.xml # Dependencias y configuración Maven
```
	 