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
    database: "#"
});

connection.connect(function(err) {
    if (err) throw err;
    
    // FUNCTIONS
    choiceTime();
});

function choiceTime() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all crewmates", "View crewmates by role", "View crewmates by department", "Add crewmate", "Add role", "Add department", "Update employee roles"
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

        case "Update employee roles":
            updateRole();
            break;
        }
        
    });
}