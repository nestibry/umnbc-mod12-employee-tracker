USE employee_db;

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

SELECT r.id, r.title, d.name as department, r.salary 
FROM department d
INNER JOIN role r ON d.id = r.department_id;