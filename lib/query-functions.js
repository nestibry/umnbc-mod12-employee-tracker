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

// promptSelectDepartment();

//////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////
// Attempt at a Class with Method instance and save the data
class Employees {
    constructor(){
        this.data = "";
        this.choices = "";
    }

    getAll(){
        db.query(`SELECT id, name FROM departments`, (err, data) => {
            if(err) return console.log("Error reading database");
            // console.log(data);
            this.data = data;
            console.log(this.data);
            // this.choices = data.map((item) => { return {value: item.id, name: item.name} });
        });
        console.log(this.data);
    }

    setData(data){
        this.data = data;
    }

    promiseGetAll(){
        let myPromise = new Promise(function(myResolve,myReject) {
            let x = 0;
            if(x == 0){
                myResolve("OK");
            } else {
                myReject("Error");
            }
        });

        myPromise.then( (value) => {
            // console.log(value);
            this.setData(value);
            console.log(this.data);
            // return value;
            // this.setData(value);
        });
    }


}


const employees = new Employees();
// employees.getAll().then(()=>{
//     console.log(employees);
// });
// employees.getAll();
// console.log(employees);

// console.log(employees.promiseGetAll());
// employees.setData("OK");
employees.promiseGetAll();
const data = employees.data;
console.log(data);
// .then( (value) => {
//     console.log(value);
//     // this.setData(value);
// });
// console.log(employees.data);




