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

        case "View crewmates by role":
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
        switch (answer.role) {
        case "Navigator":
            var roleNum = 2;
            break;
        case "Cannoneer":
            var roleNum = 3;
            break;
        case "Swabbie":
            var roleNum = 4;
            break;
        }

        switch (answer.manager) {
        case "Jake Thomas":
            var manaNum = 101;
            break;
        case "Lad Etz":
            var manaNum = 580;
            break;
        case "Killy Colly":
            var manaNum = 280;
            break;
        }
        
        connection.query("INSERT INTO employee SET ?", 
            {
                id: answer.id,
                first_name: answer.first,
                last_name: answer.last,
                role_id: roleNum,
                manager_id: manaNum
            },
            function(err) {
                if (err) throw err;
                console.log("Successfully added " + answer.first + " to the crew!")
                choiceTime();
            }
        );
    });
}

function addRole() {
    var departs = [];

    connection.query('SELECT department FROM division', function (err, res) {
        if (err) throw err;
        res.forEach((dep) => {departs.push(dep.department)});
    });
    
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role you would like to add?",
        },
        {
            name: "salary",
            type: "input",
            message: "What salary should the role have?"
        },
        {
            name: "id",
            type: "input",
            message: "What ID number should the role have? Please choose a number greater than 5.",
            validate: function(value) {
                if (isNaN(value) === false && value > 5) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "department",
            type: "rawlist",
            message: "Which department should this role be assigned to?",
            choices: departs
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                role_id: answer.id,
                department_id: 11
            },
            function(err) {
                if (err) throw err;
                console.log("Successfully added " + answer.title + " to the list of roles!");
                choiceTime();
            }
        );
    });
}
// INSERT INTO role (title, salary, role_id, department_id)
// VALUES ("Navigator", 199.99, 2, 11);


function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What title should this department have?"
        },
        {
            name: "id",
            type: "input",
            message: "What ID number should the department have?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO division SET ?",
            {
                department: answer.department,
                department_id: answer.id
            },
            function(err) {
                if (err) throw err;
                console.log("Successfully added " + answer.department + " to the list of departments!");
                choiceTime();
            }
        );
    })
    
}

function updateRole() {
    var roleArray = [];
    connection.query('SELECT title FROM role WHERE role_id != 1 AND role_id != 5', function (err, res) {
        if (err) throw err;
        res.forEach((role) => {roleArray.push(role.title)});
    });
    
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        var crewArray = results.map((crew) => {return crew.first_name});

        inquirer.prompt([
            {
                name: "crewmate",
                type: "list",
                message: "Which crewmate's role would you like to update?",
                choices: crewArray
            },
            {
                name: "roleChoice",
                type: "rawlist",
                message: "Which role would you like to assign them?",
                choices: roleArray
            }
        ])
        .then(function(answer) {
            var crewChoice;
            for (var i = 0; i < results.length; i++) {
                if (results[i].first_name === answer.crewmate) {
                    crewChoice = results[i];
                }
            }

            connection.query("UPDATE employee SET ? WHERE ?", 
            [
                {role_id: 4},
                {id: crewChoice.id}
            ],
            function(err) {
                if (err) throw err;
                console.log("Crewmate role updated successfully!");
                choiceTime();
            });
        });
    });
};