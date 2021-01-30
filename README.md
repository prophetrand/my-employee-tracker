# My Crew Viewer

## Description
This Javascript application runs in Node.js to generate a team profile composed of a manager and as many team members as they would like to add. Upon running the app, a series of questions is presented to glean information about the manager, and then the user can sequentially add engineers and/or interns to their heart's content. Once the team is complete, the user can select "Finish building my team" to generate presentable HTML that visualizes the team based on information provided by the user. The HTML is written to the /output directory for the user to see, use, and modify.

A video of the application in action is included [here](https://drive.google.com/file/d/1uFhCftoPeio43IbkOE5xC-rHEFU6sOok/view) and can also be accessed via link in the [Screenshots](#screenshots) section further in this document.

## Table of Contents
* [Technologies Used](#technologies-used)
* [How to Access](#how-to-access)
* [What I Did](#what-i-did)
* [Code Snippets](#code-snippets)
* [Screenshots](#screenshots)
* [Acknowledgments](#acknowledgments*)
* [Who I Am](#who-i-am)

---

## Technologies Used
* [Javascript](https://www.javascript.com/) to develop the algorithms included in this web application.
* [Node.js](https://nodejs.org/en/docs/) to run this Javascript program in the terminal/Git Bash console.
* [Git](https://git-scm.com/) for distributed version control, tracking changes over time and making them visible to collaborators.
* [Github](https://github.com/) for version control in the cloud, saving my changes and presenting them clearly to myself and others.

## How to Access
1. Download the contents of this repository to your local machine. 
2. Using the terminal/Git Bash Navigate to the directory containing the contents of this repository, named team-prof-gen by default.
3. Run the command `npm install` in the terminal to install the **inquirer** and **mysql** node package module dependencies.
4. Copy the contents of schema.sql and seeds.sql and run them in MySQL Workbench together to establish the database structure necessary for the app to function.
5. Run the command `node tracker.js` in the terminal to launch the program.
6. Enter your responses as prompted in the terminal, and your database of crew members will be updated accordingly!

---

## What I Did


## Code Snippets 


```javascript

```

## Screenshots
Example of app running in the command line:

![example_app](./assets/example_app.PNG)

[Click here](https://drive.google.com/file/d/1uFhCftoPeio43IbkOE5xC-rHEFU6sOok/view) to see a short video demonstrating usage of the application.

---

## Acknowledgments
* [W3Schools](https://www.w3schools.com/) has been my go-to for descriptive tutorials on HTML, CSS, and Javascript syntax and best practices. I am eternally grateful for their massive store of documentation.
* [MDN Web Docs](https://developer.mozilla.org/en-US/) is another resource for documentation on HTML, CSS, and Javascript that I find myself using more and more often as I work through deeper Javascript.
* [Inquirer](https://www.npmjs.com/package/inquirer) is an open source node package that I used to provide interactive command line prompts in this project.


## Who I Am
My name is Rand Hale, and I am an aspiring programmer/web developer based in California.

* [LinkedIn](https://www.linkedin.com/in/rand-hale-83ba389b/)
* [GitHub](https://github.com/prophetrand)