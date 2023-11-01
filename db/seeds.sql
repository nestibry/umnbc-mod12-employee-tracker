INSERT INTO department (name)
VALUES  
        ("Finance"),
        ("Legal"),
        ("Sales"),
        ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  
        ("Account Manager", 160000, 1),
        ("Accountant", 125000, 1),
        ("Legal Team Lead", 250000, 2),
        ("Lawyer", 190000, 2),
        ("Sales Lead", 100000, 3),
        ("Salesperson", 80000, 3),
        ("Lead Engineer", 150000, 4),
        ("Software Engineer", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
        ("Kunal", "Singh", 1, NULL),
        ("Malia", "Brown", 2, 1),
        ("Sarah", "Lourd", 3, NULL),
        ("Tom", "Allen", 4, 3),
        ("John", "Doe", 5, NULL),
        ("Mike", "Chan", 6, 5),
        ("Ashley", "Rodriguez", 7, NULL),
        ("Kevin", "Tupik", 8, 7);
