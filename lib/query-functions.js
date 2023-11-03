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

  getDepartments();

/////////////////////////////////////////////////////////////////

