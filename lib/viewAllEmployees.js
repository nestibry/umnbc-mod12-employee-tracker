const db = require('../config/connection.js');

const queryStr = `
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, concat(m.first_name, ' ' ,m.last_name) AS manager FROM employees e
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id`;

async function viewAllEmployees() {
    return new Promise((resolve, reject) => {
        db.execute(queryStr, (err, data) => {
                if (err) reject({status: "err", body: err});
                resolve({status: "success", body: data});
            }
        );
    });
}

module.exports =  viewAllEmployees ;
