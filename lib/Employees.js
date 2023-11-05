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


async function getManagers() {
    return new Promise((resolve, reject) => {

        var queryStr = `
        SELECT e.manager_id, concat(m.first_name, ' ' ,m.last_name) AS manager_name FROM employees e
        INNER JOIN employees m ON e.manager_id = m.id`;

        db.execute(queryStr, (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            }
        );
    });
}


async function viewEmployeesByManager() {
    
    var response = await getManagers();

    return new Promise((resolve, reject) => {
        var managers = (response.status === "success") ? response.body : reject(response);

        // Transform data to be the choices, add an unassigned option for manager
        var managerChoices = managers.map((item) => { return { value: item.manager_id, name: item.manager_name } });

        // Prompt: manager_id
        inquirer.prompt([
            {
                type: "list",
                name: "manager_id",
                message: `Select a manager:`,
                choices: managerChoices,
            },
            
        ]).then((response) => {
            db.execute(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e INNER JOIN roles r ON e.role_id = r.id INNER JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id WHERE e.manager_id = ?;`,    [response.manager_id],
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}


async function viewEmployeesByDepartment() {
    
    var response = await getDepartments();

    return new Promise((resolve, reject) => {
        var departments = (response.status === "success") ? response.body : reject(response);

        // Transform data to be the choices, add an unassigned option for manager
        var deptChoices = departments.map((item) => { return { value: item.id, name: item.name } });

        // Prompt: manager_id
        inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: `Select a department:`,
                choices: deptChoices,
            },
            
        ]).then((response) => {
            db.execute(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e INNER JOIN roles r ON e.role_id = r.id INNER JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id WHERE r.department_id = ?;`,    
                [response.department_id],
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
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
            db.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, 
                [response.first_name.trim(), response.last_name.trim(), response.role_id, response.manager_id], 
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}



async function updateEmployeeRole() {
    
    var roleResp = await getRoles();
    var emplResp = await getEmployees();

    return new Promise((resolve, reject) => {
        var roles = (roleResp.status === "success") ? roleResp.body : reject(roleResp);
        var employees = (emplResp.status === "success") ? emplResp.body : reject(emplResp);

        // Transform data to be the choices, add an unassigned option for manager
        var roleChoices = roles.map((item) => { return { value: item.id, name: item.title } });
        var employeeChoices = employees.map((item) => { return { value: item.id, name: item.first_name.concat(" ", item.last_name)}});

        // Prompt: employee_id, role_id
        inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: `Select an employee:`,
                choices: employeeChoices,
            },
            {
                type: "list",
                name: "role_id",
                message: `Update role to:`,
                choices: roleChoices,
            },
            
        ]).then((response) => {
            db.execute(`UPDATE employees SET role_id = ? WHERE id = ?`, 
                [response.role_id, response.employee_id], 
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}


async function updateEmployeeManager() {
    
    var emplResp = await getEmployees();

    return new Promise((resolve, reject) => {
        
        var employees = (emplResp.status === "success") ? emplResp.body : reject(emplResp);

        // Transform data to be the choices, add an unassigned option for manager
        var employeeChoices = employees.map((item) => { return { value: item.id, name: item.first_name.concat(" ", item.last_name)}});
        var managerChoices = employees.map((item) => { return { value: item.id, name: item.first_name.concat(" ", item.last_name)}});
        managerChoices.push(new inquirer.Separator());
        managerChoices.push({value:null, name: "Unassigned"});
        managerChoices.push(new inquirer.Separator());

        // Prompt: employee_id, role_id
        inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: `Select an employee:`,
                choices: employeeChoices,
            },
            {
                type: "list",
                name: "manager_id",
                message: `Update role to:`,
                choices: managerChoices,
                validate: async (input) => {
                    return (input.value !== this.employee_id.value ) ? true : "An employee cannot be managed by themselves.";
                },

            },
            
        ]).then((response) => {
            // Set manager to null if the manager_id is the same as the employee_id
            var manager_id;
            if (response.manager_id === response.employee_id) {
                manager_id = null;
            } else {
                manager_id = response.manager_id;
            }
            db.execute(`UPDATE employees SET manager_id = ? WHERE id = ?`, 
                [manager_id, response.employee_id], 
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
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager 
};
