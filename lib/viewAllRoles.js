const db = require('../config/connection.js');

function viewAllRoles() {
    // db.query(`SELECT * FROM roles`, (err, data) => {
    //     if (err) return console.log("Error reading database");
    //     console.table(data);
    // });
    db.query(`
    SELECT r.id, r.title, d.name as department, r.salary
    FROM departments d
    INNER JOIN roles r ON d.id = r.department_id`,
    (err, results) => {
        if(err) console.log("Error reading departments");
        console.table(results);
});
}

module.exports =  viewAllRoles ;
