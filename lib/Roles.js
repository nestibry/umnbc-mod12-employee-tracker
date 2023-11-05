const db = require('../config/connection.js');
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
        console.table(roles);
        console.table(departments);
        resolve({status: "success", body: roles});
        // Prompt: Title, Department, Salary
        // inquirer.prompt([
        //     {
        //         type: "input",
        //         name: "name",
        //         message: `Enter name for the new department:`,
        //         validate: async (input) => {
        //             if (data.filter(item => item.name.toLowerCase() === input.toLowerCase()).length > 0) {
        //                 return `The ${input} department already exists.`;
        //             } else {
        //                 return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null and less than 30 characters";
        //             }
        //         },
        //     }
        // ]).then((response) => {
        //     db.query(`INSERT INTO departments(name) VALUES (?); `, response.name, (err, data) => {
        //         if (err) reject({status: "error", body: err});
        //         resolve({status: "success", body: data});
        //     });
        // });


    });
}

module.exports =  {
    getRoles,
    viewAllRoles,
    addRole 
};
