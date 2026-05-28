-- =====================================================================
-- db_company.sql
-- Employee Portal — Database structure
-- Run this file in MySQL Workbench to create all tables
-- =====================================================================

CREATE DATABASE IF NOT EXISTS db_company;
USE db_company;

-- Task table (no dependencies)
CREATE TABLE `task` (
  `TASK_ID` int NOT NULL AUTO_INCREMENT,
  `TASK_NAME` varchar(25) NOT NULL,
  PRIMARY KEY (`TASK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert default tasks
INSERT INTO `task` (`TASK_NAME`) VALUES ('Assembly and Wiring');
INSERT INTO `task` (`TASK_NAME`) VALUES ('Team Meeting');
INSERT INTO `task` (`TASK_NAME`) VALUES ('Cleanup');

-- Employee table (depends on department, created before with circular reference workaround)
-- Note: department has a FK to employee (MANAGER_ID), so we create employee first without the FK,
-- then create department, then add the FK to employee.

CREATE TABLE `employee` (
  `EMPLOYEE_ID` int NOT NULL,
  `DEPARTMENT_ID` int NOT NULL,
  `FIRST_NAME` varchar(25) NOT NULL,
  `SURNAME` varchar(25) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `ROLE` varchar(20) NOT NULL DEFAULT 'WORKER',
  PRIMARY KEY (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Department table (depends on employee for MANAGER_ID)
CREATE TABLE `department` (
  `DEPARTMENT_ID` int NOT NULL AUTO_INCREMENT,
  `DEPARTMENT_NAME` varchar(25) NOT NULL,
  `MANAGER_ID` int NOT NULL,
  PRIMARY KEY (`DEPARTMENT_ID`),
  KEY `fk_manager` (`MANAGER_ID`),
  CONSTRAINT `fk_manager` FOREIGN KEY (`MANAGER_ID`) REFERENCES `employee` (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Add FK from employee to department
ALTER TABLE `employee`
  ADD KEY `employee_ibfk_1` (`DEPARTMENT_ID`),
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`DEPARTMENT_ID`) REFERENCES `department` (`DEPARTMENT_ID`);

-- Equipment table (depends on department)
CREATE TABLE `equipment` (
  `EQUIPMENT_ID` int NOT NULL AUTO_INCREMENT,
  `DEPARTMENT_ID` int NOT NULL,
  `EQUIPMENT_NAME` varchar(25) NOT NULL,
  PRIMARY KEY (`EQUIPMENT_ID`),
  KEY `equipment_ibfk_1` (`DEPARTMENT_ID`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`DEPARTMENT_ID`) REFERENCES `department` (`DEPARTMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Record table (depends on employee, task, equipment)
CREATE TABLE `record` (
  `Record_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int NOT NULL,
  `Task_ID` int NOT NULL,
  `Equipment_ID` int DEFAULT NULL,
  `Date` date NOT NULL,
  `Total_Time` int NOT NULL,
  `Start_Time` time NOT NULL,
  `End_Time` time NOT NULL,
  PRIMARY KEY (`Record_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  KEY `Task_ID` (`Task_ID`),
  KEY `Equipment_ID` (`Equipment_ID`),
  CONSTRAINT `record_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`EMPLOYEE_ID`),
  CONSTRAINT `record_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`TASK_ID`),
  CONSTRAINT `record_ibfk_3` FOREIGN KEY (`Equipment_ID`) REFERENCES `equipment` (`EQUIPMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Password reset token table (depends on employee)
CREATE TABLE `password_reset_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `password_reset_token_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`EMPLOYEE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
