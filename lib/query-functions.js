const db = require('../config/connection.js');
const inquirer = require('inquirer');

// async function getAllRoles(){
//     // db.query(`SELECT * FROM roles`, (err, data) => err ? "Error reading roles" : data  );
//     let data = [];
//     db.query(`SELECT * FROM roles`, (err, response) => {
//         if(err) {data = "Error Reading Roles"};
//         data = response;
//     });
//     return data;
// }
// const roles = allRoles.map( role => {
//     return {id: role.id, name: role.name};
// });

// console.log(roles);


// getAllRoles().then((response) => {

//     console.log(response);

// });

// getAllRoles().then((roles) => console.log(roles));







// function getAllRoles(){
//     // db.query(`SELECT * FROM roles`, (err, data) => err ? "Error reading roles" : data  );
//     db.query(`SELECT * FROM roles`, (err, data) => {
//         if(err) console.log("Error Reading Roles");
//         console.table(data);
//     });
// }

// const allRoles = getAllRoles();
// console.log(allRoles);






// async function getAllRoles(){
    
//     const results = await db.execute(`SELECT * FROM roles`);
//     console.log(results);
    
// }




// getAllRoles();

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
// function getAllRoles(callback){
//     let data
//     db.query(`SELECT * FROM roles`, callback);
// return data
// }

// const getDataFromQuery = (query) => new Promise((resolve, reject) => {
//     db.query('SELECT * FROM roles', (err, data) => {
//         resolve data
//     })
// })
// var roles = getAllRoles((err, data, fields) => console.log(err, data, fields));

// async function getData(){
//     var roles = await getDataFromQuery()


// console.log(data);

// function viewAllRoles(){
//     const roles = getAllRoles();
//     console.log(roles);
//     const choices = [() => {
//         roles.map( role => {
//             return {id: role.id, name: role.name}
//         });
//     }];
//     console.log(choices);
// }

// viewAllRoles();

