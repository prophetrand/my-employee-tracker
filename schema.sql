DROP DATABASE IF EXISTS workforce;
CREATE DATABASE workforce;

USE workforce;

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,3),
    department_id INT,
    id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    name VARCHAR(30) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (id)
);


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;