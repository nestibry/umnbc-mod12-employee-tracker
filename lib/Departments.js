const db = require('../config/connection.js');
const inquirer = require('inquirer');



async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM departments`, (err, data) => {
            if (err) reject({status: "error", body: err});
            resolve({status: "success", body: data});
        });
    });
}


async function viewAllDepartments() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT name AS department FROM departments`, (err, data) => {
            if (err) reject({status: "error", body: err});
            resolve({status: "success", body: data});
        });
    });
}


async function viewUtilizedBudgetByDepartment() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT d.name AS department, SUM(r.salary) AS utilized_budget FROM employees e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
        GROUP BY r.department_id;`, (err, data) => {
            if (err) reject({status: "error", body: err});
            resolve({status: "success", body: data});
        });
    });
}


async function addDepartment() {
    var response = await getDepartments();
    return new Promise((resolve, reject) => {
        var data = (response.status === "success") ? response.body : reject(response);
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: `Enter name for the new department:`,
                validate: async (input) => {
                    if (data.filter(item => item.name.toLowerCase() === input.toLowerCase()).length > 0) {
                        return `The ${input} department already exists.`;
                    } else {
                        return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null or more than 30 characters";
                    }
                },
            }
        ]).then((response) => {
            db.query(`INSERT INTO departments(name) VALUES (?); `, response.name, (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}


async function deleteDepartment() {
    
    var response = await getDepartments();

    return new Promise((resolve, reject) => {
        var departments = (response.status === "success") ? response.body : reject(response);

        // Transform data to be the choices
        var deptChoices = departments.map((item) => { return { value: item.id, name: item.name } });

        // Prompt: department_id
        inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: `Select a department to delete:`,
                choices: deptChoices,
            },
            
        ]).then((response) => {
            db.execute(`DELETE FROM departments WHERE id = ?;`,    
                [response.department_id],
                (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            });
        });
    });
}



module.exports = {
    getDepartments,
    viewAllDepartments,
    viewUtilizedBudgetByDepartment,
    addDepartment,
    deleteDepartment
};