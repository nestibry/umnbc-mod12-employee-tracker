const db = require('../config/connection.js');

db;

console.log("Starting Queries...");

// // View all Departments
// db.query(`SELECT * FROM department`, function (err, results) {
//     console.log("View All Departments");
//     console.table(results);
// });


// // View All Roles (w/o department)
// db.query(`SELECT * FROM role`, function (err, results) {
//     console.log("View All Roles (w/o department)");
//     console.table(results);
// });


// // View All Employees (w/o role and manager)
// db.query(`SELECT * FROM employee`, function (err, results) {
//     console.log("View All Employees (w/o role and manager)");
//     console.table(results);
// });


// // View All Roles
// db.query(`
//     SELECT r.id, r.title, d.name as department, r.salary
//     FROM department d
//     INNER JOIN role r ON d.id = r.department_id`,
//     function (err, results) {
//         console.log("View All Roles");
//         console.table(results);
// });


// View All Employees
// db.query(`
//     SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employee e
//     INNER JOIN role r ON e.role_id = r.id
//     INNER JOIN department d ON r.department_id = d.id
//     LEFT JOIN employee m ON e.manager_id = m.id`,
//     function (err, results) {
//         console.log("View All Employees");
//         console.table(results);
// });



/*
    Queries remaining to execute:
        
        'View All Employees',
        'Add a Department',
        'Add an Employee',
        'Add a Role',
        'Update an Employee Role',
        // 'Update Employee Managers',   // Bonus
        // 'View Employees by Manager',  // Bonus
        // 'View Employees by Department', //Bonus
        // 'Delete Departments, Roles, and Employees', // Bonus
        // 'View Utilized Budget of a Department',  // Bonus: i.e., the combined salaries of all employees in that department
*/

