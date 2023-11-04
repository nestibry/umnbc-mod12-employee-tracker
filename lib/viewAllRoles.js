const db = require('../config/connection.js');

async function viewAllRoles() {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT r.id, r.title, d.name as department, r.salary FROM departments d INNER JOIN roles r ON d.id = r.department_id`, 
            (err, data) => {
                if (err) reject({status: "err", body: err});
                resolve({status: "success", body: data});
            }
        );
    });
}

module.exports =  viewAllRoles ;
