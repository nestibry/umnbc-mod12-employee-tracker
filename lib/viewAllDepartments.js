const db = require('../config/connection.js');

async function viewAllDepartments() {

    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM departments`, (err, data) => {
            if (err) reject({status: "err", body: err});
            // console.table(data);
            resolve({status: "success", body: data});
        });

    });
}

module.exports = viewAllDepartments;
