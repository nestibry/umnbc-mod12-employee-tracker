DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Create Tables 
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);


-- Seed tables
INSERT INTO departments (name)
VALUES  
        ("Finance"),
        ("Legal"),
        ("Sales"),
        ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  
        ("Account Manager", 160000, 1),
        ("Accountant", 125000, 1),
        ("Legal Team Lead", 250000, 2),
        ("Lawyer", 190000, 2),
        ("Sales Lead", 100000, 3),
        ("Salesperson", 80000, 3),
        ("Lead Engineer", 150000, 4),
        ("Software Engineer", 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ("Kunal", "Singh", 1, NULL),
        ("Malia", "Brown", 2, 1),
        ("Sarah", "Lourd", 3, NULL),
        ("Tom", "Allen", 4, 3),
        ("John", "Doe", 5, NULL),
        ("Mike", "Chan", 6, 5),
        ("Ashley", "Rodriguez", 7, NULL),
        ("Kevin", "Tupik", 8, 7);



