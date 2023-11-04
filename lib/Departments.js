const db = require('../config/connection.js');
const inquirer = require('inquirer');



async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM departments`, (err, data) => {
            if (err) reject({status: "err", body: err});
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
                    if (data.filter(item => item.name === input).length > 0) {
                        return `The ${input} department already exists.`;
                    } else {
                        return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null and less than 30 characters";
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



module.exports = {
    getDepartments,
    viewAllDepartments,
    addDepartment
};