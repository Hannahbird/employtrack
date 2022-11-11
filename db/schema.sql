DROP DATABASE IF EXISTS business
CREATE DATABASE business;

CREATE USER 'assist'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON business.* TO 'assist'@'localhost';

USE business;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    CONSTRAINT uc_name unique (name)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL DEFAULT 0.00,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) on DELETE SET NULL
);

--If you do not want to seed your database delete everything below this comment.
INSERT INTO department (name)     
    VALUES
        ('Heaven'),
        ('Hell'),
        ('Conversion'),
        ('Faith Tester');

INSERT INTO role (title,salary,department_id)
    VALUES
        ('Father',34000,1),
        ('Son',600000,1),
        ('Holy Ghost', 34000,1),
        ('Pastor', 35000,1),
        ('Bishop',90000,2),
        ('Prophet',90000,2),
        ('Primary Teacher',90000,2),
        ('Satan',42460,3),
        ('Sheep',71500,3),
        ('Inn Keeper',34900,3),
        ('Fig Leaf',68000,4),
        ('Forbidden Fruit',102000,4),
        ('Snek',84680,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES
        ('Yah','Weh',2,NULL),
        ('Jesus','Christ',1,1),
        ('A','Dove',7,1),
        ('Hugh','Sinner',9,1),
        ('Molly','Mormon',12,1),
        ('Cain','Rock',1,2),
        ('Joseph','Smith',1,2),
        ('Noah','Ark',3,1),
        ('Simon','Simon',4,1),
        ('Saul','Paul',5,3),
        ('Abraham','Lincoln',6,3),
        ('Lucifer','Hell',8,4),
        ('Chad','Michael Murphy',8,4),
        ('Pope','Francis',10,4),
        ('John','Baptist',13,5),
        ('Mary','Magdelene',11,5),
        ('Eve','adam',11,5);