
This is a web application for a company where employees record their worked hours, completed tasks, department, and any issues encountered.

1. Database: Developed using SQL through MySQL Workbench, ensuring data integrity and well-defined relationships between tables.
It is designed so that all tables are interconnected, allowing queries on the total accumulated hours for each team. Additionally, users can query hours by team and task, see who has worked on each piece of equipment, and identify the department to which each employee belongs.

The database will include the following tables:

DEPARTMENT: Department_ID (PK), Department_Name, Manager
EMPLOYEE: Employee_ID (PK), Department_ID (FK), First_Name, Last_Name, Email, Password
RECORD: Record_ID (PK), Equipment_ID, Task_ID (FK), Employee_ID, Date, Total_Time
TASKS: Task_ID (PK), Name
EQUIPMENT: Equipment_ID (PK), Department_ID (FK), Name

Relationships Summary:

DEPARTMENT - EMPLOYEE: 1:N
EMPLOYEE - RECORD: 1:N
TASKS - RECORD: 1:N
EQUIPMENT - RECORD: 1:N


2. Frontend: Built with HTML, CSS, and JavaScript for a responsive and user-friendly interface.

3. Backend: Developed in Java with Spring Boot and RESTful services to manage data and handle business logic.
	 