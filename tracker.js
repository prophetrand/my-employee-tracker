const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// https://www.npmjs.com/package/console.table

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "workforce"
});

connection.connect(function(err) {
    if (err) throw err;
    
    // FUNCTIONS
    console.log(`
    888888888888888888888888888888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888P""  ""9888888888888888888888888888
    8888888888888888P"88888P          988888"9888888888888888888
    8888888888888888  "9888            888P"  888888888888888888
    888888888888888888bo "9  d8o  o8b  P" od88888888888888888888
    888888888888888888888bob 98"  "8P dod88888888888888888888888
    888888888888888888888888    db    88888888888888888888888888
    88888888888888888888888888      8888888888888888888888888888
    88888888888888888888888P"9bo  odP"98888888888888888888888888
    88888888888888888888P" od88888888bo "98888888888888888888888
    888888888888888888   d88888888888888b   88888888888888888888
    8888888888888888888oo8888888888888888oo888888888888888888888
    8888888888888~~ Welcome to Your Pirate Crew ~~88888888888888                                                       
  `);
    choiceTime();
});

function choiceTime() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all crewmates", "View crewmates by role", "View crewmates by department", "Add crewmate", "Add manager", "Add role", "Add department", "Update crewmate roles"
            // Bonus questions: Update employee managers
            // View crewmates by manager
            // Delete departments, roles, and employees
            // View the total utilized budget of a department -- ie the combined salaries of all employees in that department
        ]
    }).then(function(answer) {
        switch (answer.action){
        case "View all crewmates":
            viewCrew();
            break;

        case "View crewmates by role":
            viewRole();
            break;

        case "View crewmates by department":
            viewDepartment();
            break;
    
        case "Add crewmate":
            addCrewmate();
            break;
        
        case "Add manager":
            addManager();
            break;

        case "Add role":
            addRole();
            break;
        
        case "Add department":
            addDepartment();
            break;

        case "Update crewmate roles":
            updateRole();
            break;
        }
    });
}

function viewCrew() {
    var query = "SELECT id, first_name, last_name, title, salary, department FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.role_id LEFT JOIN division AS d ON d.department_id = r.department_id"
    
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

        choiceTime();
    });
}

function viewRole() {
    inquirer.prompt(
        {
            name: "role",
            type: "rawlist",
            message: "Which role would you like to see?",
            choices: [
                "Manager",
                "Navigator",
                "Cannoneer",
                "Swabbie",
                "Pirate CEO"
            ]
        }
    )
    .then(function(answer) {
        var query = "SELECT id, first_name, last_name, title, salary, department FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.role_id LEFT JOIN division AS d ON d.department_id = r.department_id WHERE r.title = ?";
        connection.query(query, [answer.role], function(err, res) {
            if (err) throw err;
            console.table(res);

            choiceTime();
        });
    });
}

function viewDepartment() {
    inquirer.prompt(
        {
            name: "Department",
            type: "rawlist",
            messages: "Which department would you like to see?",
            choices: ["Brains", "Brawn"]
        }
    )
    .then(function(answer) {
        var query = "SELECT id, first_name, last_name, title, salary, department FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.role_id LEFT JOIN division AS d ON d.department_id = r.department_id WHERE d.department = ?";
        connection.query(query, [answer.Department], function(err, res) {
            if (err) throw err;
            console.table(res);

            choiceTime();
        });
    });
}

function addCrewmate() {
    var choices = [];
    var managers = [];

    connection.query('SELECT title FROM role WHERE role_id != 1 AND role_id != 5', function (err, res) {
        if (err) throw err;
        res.forEach((role) => {choices.push(role.title)});
    });
    
    connection.query("SELECT first_name, last_name FROM employee WHERE role_id = 1", function (err, res) {
            if (err) throw err;
            res.forEach((manager) => {
                var first = manager.first_name;
                var last = manager.last_name;
                var fullName = first + " " + last;
                managers.push(fullName);
            });
    });

    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "What is the new recruit's first name?"
        },
        {
            name: "last",
            type: "input",
            message: "What is the recruit's last name"
        },
        {
            name: "id",
            type: "input",
            message: "What is the recruit's ID number?"
        },
        {
            name: "role",
            type: "rawlist",
            choices: choices,
            message: "Which post will the recruit fill?"
        },
        {
            name: "manager",
            type: "rawlist",
            choices: managers,
            message: "Who will the recruit's manager be?"
        }
    ]
    ).then(function(answer) {
        var query = "";
    })
}

function addRole() {

}

function addDepartment() {

}

function updateRole() {
    
}