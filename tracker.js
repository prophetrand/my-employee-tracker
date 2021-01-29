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
    
    // FUNCTION
});