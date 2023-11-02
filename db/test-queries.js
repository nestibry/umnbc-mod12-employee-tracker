const db = require('../config/connection.js');

db;

console.log("Starting Queries...");

// // View all Departments
// db.query(`SELECT * FROM departments`, function (err, results) {
//     console.log("View All Departments");
//     console.table(results);
// });


// // View All Roles (w/o department)
// db.query(`SELECT * FROM roles`, function (err, results) {
//     console.log("View All Roles (w/o department)");
//     console.table(results);
// });


// // View All Employees (w/o role and manager)
// db.query(`SELECT * FROM employees`, function (err, results) {
//     console.log("View All Employees (w/o role and manager)");
//     console.table(results);
// });


// // View All Roles
// db.query(`
//     SELECT r.id, r.title, d.name as department, r.salary
//     FROM departments d
//     INNER JOIN roles r ON d.id = r.department_id`,
//     (err, results) => {
//         if(err) console.log("Error reading departments");
//         console.table(results);
// });


// // View All Employees
// db.query(`
//     SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e
//     INNER JOIN roles r ON e.role_id = r.id
//     INNER JOIN departments d ON r.department_id = d.id
//     LEFT JOIN employees m ON e.manager_id = m.id`,
//     function (err, results) {
//         console.log("View All Employees");
//         console.table(results);
// });


// // 'Add a Department'
// db.query(`INSERT INTO departments(name) VALUES ("Service"); `, (err, results) => {
//     if(err) console.log("Error adding a department");
//     console.log(results);
// });
// db.query(`SELECT * FROM departments`, (err, results) => {
//     if(err) console.log("Error reading departments");
//     console.table(results);
// });


// // 'Add a Role',
// db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("Snow Shoveler", 75000, 5)`, (err, results) => {
//     if(err) console.log("Error adding a role");
//     console.log(results);
// });
// db.query(`
//     SELECT r.id, r.title, d.name as department, r.salary
//     FROM departments d
//     INNER JOIN roles r ON d.id = r.department_id`,
//     (err, results) => {
//         if(err) console.log("Error reading departments");
//         console.table(results);
// });


/*
    Queries remaining to execute:
        

        'Add an Employee',
        'Update an Employee Role',
        // 'Update Employee Managers',   // Bonus
        // 'View Employees by Manager',  // Bonus
        // 'View Employees by Department', //Bonus
        // 'Delete Departments, Roles, and Employees', // Bonus
        // 'View Utilized Budget of a Department',  // Bonus: i.e., the combined salaries of all employees in that department
*/

