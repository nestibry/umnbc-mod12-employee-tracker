const db = require('../config/connection.js');
const inquirer = require('inquirer');
const { getDepartments } = require('./Departments.js');
const { getRoles } = require('./Roles.js');


async function getEmployees() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM employees`, (err, data) => {
            if (err) reject({status: "error", body: err});
            resolve({status: "success", body: data});
        });
    });
}


async function viewAllEmployees() {
    return new Promise((resolve, reject) => {

        var queryStr = `
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id`;

        db.execute(queryStr, (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            }
        );
    });
}


async function addEmployee() {
    
    var roleResp = await getRoles();
    var emplResp = await getEmployees();

    return new Promise((resolve, reject) => {
        var roles = (roleResp.status === "success") ? roleResp.body : reject(roleResp);
        var employees = (emplResp.status === "success") ? emplResp.body : reject(emplResp);

        // Transform data to be the choices, add an unassigned option for manager
        var roleChoices = roles.map((item) => { return { value: item.id, name: item.title } });
        var managerChoices = employees.map((item) => { return { value: item.id, name: item.first_name.concat(" ", item.last_name)}});
        managerChoices.push(new inquirer.Separator());
        managerChoices.push({value:null, name: "Unassigned"});
        managerChoices.push(new inquirer.Separator());

        // Prompt: first_name, last_name, role_id, manager_id
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: `Enter first name:`,
                validate: async (input) => {
                    return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null or more than 30 characters";
                },
            },
            {
                type: "input",
                name: "last_name",
                message: `Enter last name:`,
                validate: async (input) => {
                    return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null or more than 30 characters";
                },
            },
            {
                type: "list",
                name: "role_id",
                message: `Select a role:`,
                choices: roleChoices,
            },
            {
                type: "list",
                name: "manager_id",
                message: `Select a manager:`,
                choices: managerChoices,
            },

        ]).then((response) => {
            var first_name = response.first_name.trim();
            var last_name = response.last_name.trim();

            db.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, 
                [first_name, last_name, response.role_id, response.manager_id], 
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}

module.exports =  {
    getEmployees,
    viewAllEmployees,
    addEmployee 
};
