const db = require('../config/connection.js');
const inquirer = require('inquirer');

////////////////////////////////////////////////////////
// Gary's help

function getAllDepartments(callback){
    db.query(`SELECT * FROM roles`, (err, data) => {
        callback(data)
    })
}


function getDepartments(){
    getAllDepartments( (data) => {
        console.log(data)
        inquirer.prompt([
        {
            type: "input",
            message: `This data has ${data.length} records`,
            name: "test"
        }
        ]).then( response => {
        // response.department_id 
        })
})
  }

//   getDepartments();

/////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////
// My attempt at a callback function to just return the selected department
function promptSelectDepartment(){
    db.query(`SELECT id, name FROM departments`, (err, data) => {
        if(err) return console.log("Error reading database");
        // console.table(data);
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: `Select a department:`,
                choices: data.map((item) => { return {value: item.id, name: item.name} })
            }
            ]).then( (response) => {
                console.log(response);
            });
    });
}

promptSelectDepartment();

//////////////////////////////////////////////////////////////////
