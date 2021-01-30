INSERT INTO department (name, department_id)
VALUES ("Brains", 11);

INSERT INTO department (name, department_id)
VALUES ("Brawn", 22);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Manager", 300.99, 1, 11);

INSERT INTO role (title, salary, role_id, department_id)
VALUES ("Navigator", 199.00, 2, 11);

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
VALUES ("Ash", "Ketchum", 1, 580);

INSERT INTO employee (first_name, last_name, role_id, id)
VALUES ("Gary", "Oak", 1, 101);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Candy", "Prankson", 2, 101, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Porky", "Pig", 3, 101, 15);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES ("Pete", "Rose", 4, 580, 99);