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
    888888888888888888888888888888888888888888888888888888888888                                                       
  `);
    choiceTime();
});

function choiceTime() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all crewmates", "View crewmates by role", "View crewmates by department", "Add crewmate", "Add role", "Add department", "Update crewmate roles"
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

        case "View cremates by role":
            viewRole();
            break;

        case "View crewmates by department":
            viewDepartment();
            break;
    
        case "Add crewmate":
            addCrewmate();
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
    var query = "SELECT * from employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

        choiceTime();
    });
}
