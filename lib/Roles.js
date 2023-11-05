const db = require('../config/connection.js');
const inquirer = require('inquirer');
const { getDepartments } = require('./Departments.js');


async function getRoles() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM roles`, (err, data) => {
            if (err) reject({status: "error", body: err});
            resolve({status: "success", body: data});
        });
    });
}


async function viewAllRoles() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT r.id, r.title, d.name as department, r.salary FROM departments d INNER JOIN roles r ON d.id = r.department_id`, 
            (err, data) => {
                if (err) reject({status: "error", body: err});
                resolve({status: "success", body: data});
            }
        );
    });
}


async function addRole() {
    
    var roleResp = await getRoles();
    var deptResp = await getDepartments();

    return new Promise((resolve, reject) => {
        var roles = (roleResp.status === "success") ? roleResp.body : reject(roleResp);
        var departments = (deptResp.status === "success") ? deptResp.body : reject(deptResp);
        // console.table(roles);
        // console.table(departments);
        // resolve({status: "success", body: roles});


        // Prompt: Title, Department, Salary
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
                type: "input",
                name: "salary",
                message: `Enter salary for the new role:`,
            },

        ]).then((response) => {
            // db.query(`INSERT INTO departments(name) VALUES (?); `, response.name, (err, data) => {
            //     if (err) reject({status: "error", body: err});
            //     resolve({status: "success", body: data});
            // });
            resolve({status: "success", body: response});
        });


    });
}

module.exports =  {
    getRoles,
    viewAllRoles,
    addRole 
};
