INSERT INTO department (name)     
    VALUES
        ('Shipping and Handling'),
        ('Development'),
        ('Customer Retention'),
        ('Manufacturing');

INSERT INTO role (title,salary,department_id)
    VALUES
        ('Reindeer',34000,1),
        ('Driver',600000,1),
        ('Gift Loader', 34000,1),
        ('Wrapping Associate', 35000,1),
        ('Gift Designer',90000,2),
        ('Wrapping Designer',90000,2),
        ('Design Lead',90000,2),
        ('Behavioral Consultant',42460,3),
        ('CR Manager',71500,3),
        ('Correspondance Associate',34900,3),
        ('Line Operator',68000,4),
        ('Floor Manager',102000,4),
        ('QA Engineer',84680,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES
        ('Santa','Claus',2,NULL),
        ('Rudolph','Red-Nose',1,1),
        ('Elvis','Spark',7,1),
        ('Angus','Picksalot',9,1),
        ('Elizabeth','Seesall',12,1),
        ('Dasher','Reindeer',1,2),
        ('Prancer','Lightdeer',1,2),
        ('Sam','Stockwell',3,1),
        ('Gary','Speedster',4,1),
        ('Cherlie','Greatsigner',5,3),
        ('Ian','Spiration',6,3),
        ('Rate','Istner',8,4),
        ('Brad','Istner',8,4),
        ('Carly','Graphy',10,4),
        ('Justine','Thyme',13,5),
        ('Sally','Pronto',11,5),
        ('Shante','Stawp',11,5);