USE employee_db;

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

-- View All Roles
SELECT r.id, r.title, d.name as department, r.salary 
FROM department d
INNER JOIN role r ON d.id = r.department_id;

-- View ALL Employees 
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;