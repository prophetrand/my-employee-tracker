INSERT INTO division (department, department_id)
VALUES ("Brains", 11);

INSERT INTO division (department, department_id)
VALUES ("Brawn", 22);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Manager", 300.99, 1, 11);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Navigator", 199.99, 2, 11);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Cannoneer", 220.20, 3, 22);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Swabbie", 101.01, 4, 22);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Pirate CEO", 777.777, 5, 11);

-- for employees, manager_id can be null, such as when the employee is a manager, or for a role above Manager like Captain or Pirate CEO
INSERT INTO employee (first_name, last_name, role_id, id)
VALUES ("J.", "Pesos", 5, 777);

INSERT INTO employee (first_name, last_name, role_id, id)
VALUES ("Lad", "Etz", 1, 580);

INSERT INTO employee (first_name, last_name, role_id, id)
VALUES ("Jake", "Thomas", 1, 101);

INSERT INTO employee (first_name, last_name, role_id, id)
VALUES ("Killy", "Colly", 1, 280);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("M.", "Bison", 2, 101, 533);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Manny", "Faberino", 3, 280, 17);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Pete", "Rose", 4, 580, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Yojimbo", "Tale", 4, 101, 207);