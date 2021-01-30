DROP DATABASE IF EXISTS workforce;
CREATE DATABASE workforce;

USE workforce;

CREATE TABLE division (
    department_id INT NOT NULL,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
    role_id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,3),
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES division(department_id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM division;