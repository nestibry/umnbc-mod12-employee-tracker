USE employee_db;

SELECT * FROM departments;

SELECT * FROM roles;

SELECT * FROM employees;

-- View All Roles
SELECT r.id, r.title, d.name as department, r.salary 
FROM departments d
INNER JOIN roles r ON d.id = r.department_id;

-- View ALL Employees 
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;


-- Add new department 
INSERT INTO departments(name) VALUES ("Service"); 


-- Add new role 
INSERT INTO roles (title, salary, department_id) VALUES ("Dog Walker", 50000, 5);

SELECT r.id, r.title, d.name as department, r.salary 
FROM departments d
INNER JOIN roles r ON d.id = r.department_id;

