const db = require('../config/connection.js');

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
            if (err) reject({status: "err", body: err});
            resolve({status: "success", body: data});
        });
    });
}

module.exports = {
    getDepartments,
    viewAllDepartments
};