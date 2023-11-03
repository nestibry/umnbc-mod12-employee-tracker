const db = require('../config/connection.js');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require("dotenv").config();

////////////////////////////////////////////////////////
// Gary's help

function getAllDepartments(callback) {
    db.query(`SELECT * FROM roles`, (err, data) => {
        callback(data)
    })
}


function getDepartments() {
    getAllDepartments((data) => {
        console.log(data)
        inquirer.prompt([
            {
                type: "input",
                message: `This data has ${data.length} records`,
                name: "test"
            }
        ]).then(response => {
            // response.department_id 
        })
    })
}

//   getDepartments();

/////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////
// My attempt at a callback function to just return the selected department
function promptSelectDepartment() {
    db.query(`SELECT id, name FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        // console.table(data);
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: `Select a department:`,
                choices: data.map((item) => { return { value: item.id, name: item.name } })
            }
        ]).then((response) => {
            console.log(response);
        });
    });
}

// promptSelectDepartment();

//////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////
// Attempt at a Class with Method instance and save the data
class Employees {
    constructor() {
        this.data = "";
        this.choices = "";
    }

    getAll() {
        db.query(`SELECT id, name FROM departments`, (err, data) => {
            if (err) return console.log("Error reading database");
            // console.log(data);
            this.data = data;
            console.log(this.data);
            // this.choices = data.map((item) => { return {value: item.id, name: item.name} });
        });
        console.log(this.data);
    }

    setData(data) {
        this.data = data;
    }

    promiseGetAll() {
        let myPromise = new Promise(function (myResolve, myReject) {
            let x = 0;
            if (x == 0) {
                myResolve("OK");
            } else {
                myReject("Error");
            }
        });

        myPromise.then((value) => {
            // console.log(value);
            this.setData(value);
            console.log(this.data);
            // return value;
            // this.setData(value);
        });
    }

}

// const employees = new Employees();
// employees.promiseGetAll();
// const data = employees.data;
// console.log(data);
//////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
// ChatGPT help from propmt: "mysql2 use a class method to query a database table and have the results be stored in a class property"
class DatabaseHandler {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        this.data = [];
    }

    connect() {
        this.connection.connect(err => {
            if (err) {
                console.error('Error connecting to the database:', err);
                return;
            }
            console.log('Connected to the database');
        });
    }

    queryDatabase(sqlQuery) {
        this.connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error('Error executing the query:', error);
                return;
            }
            this.data = results;
        });
    }

    closeConnection() {
        this.connection.end();
    }
}

// Usage example
const dbHandler = new DatabaseHandler();
dbHandler.connect();

// Example SQL query
const sqlQuery = 'SELECT * FROM roles';
dbHandler.queryDatabase(sqlQuery);

// Wait for the query to complete, you can use Promises or callbacks for more complex cases

// Access the results from the class property
setTimeout(() => {
    console.log('Data:', dbHandler.data);
    dbHandler.closeConnection();
}, 1000); // Adjust the delay as needed to ensure the query is completed

console.log('Data:', dbHandler.data);
///////////////////////////////////////////////////////////////////////////////////////////

