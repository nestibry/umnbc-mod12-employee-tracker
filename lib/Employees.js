const db = require('../config/connection.js');
const inquirer = require('inquirer');
const { getDepartments } = require('./Departments.js');
const { getRoles } = require('.//Roles.js');


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
    var deptResp = await getDepartments();

    return new Promise((resolve, reject) => {
        var roles = (roleResp.status === "success") ? roleResp.body : reject(roleResp);
        var departments = (deptResp.status === "success") ? deptResp.body : reject(deptResp);
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: `Enter title for the new role:`,
                validate: async (input) => {
                    if (roles.filter(item => item.title.toLowerCase() === input.toLowerCase()).length > 0) {
                        return `The ${input} role already exists.`;
                    } else {
                        return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null and less than 30 characters";
                    }
                },
            },
            {
                type: "list",
                name: "department",
                message: `Select a department:`,
                choices: departments.map((item) => { return { value: item.id, name: item.name } })
            },
            {
                type: "number",
                name: "salary",
                message: `Enter salary for the new role:`,
            },

        ]).then((response) => {
            db.execute(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [response.title, response.salary, response.department], (err, data) => {
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
