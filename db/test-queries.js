const db = require('../config/connection.js');

db;

console.log("Starting Queries...");


db.query(`SELECT * FROM department`, function (err, results) {
    console.log("View All Departments");
    console.table(results);
});

db.query(`SELECT * FROM role`, function (err, results) {
    console.log("View All Roles (w/o department)");
    console.table(results);
});

db.query(`SELECT * FROM employee`, function (err, results) {
    console.log("View All Employees (w/o role and manager)");
    console.table(results);
});


db.query(`SELECT r.id, r.title, d.name as department, r.salary
            FROM department d
            INNER JOIN role r ON d.id = r.department_id`, 
            function (err, results) {
                console.log("View All Roles");
                console.table(results);
});



/*
    Queries remaining to execute:
        View All Roles
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

