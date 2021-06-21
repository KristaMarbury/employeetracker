use employees;
-- new problem... this won't work on dolphins for some reason 
insert into employee (first_name, last_name, role_id, manager_id)
values
('Tim', 'Doe', 1, 2),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, 3),
('Malia', 'Brown', 5, 5),
('Sarah', 'Lourd', 6, 6),
('Tom', 'Allen', 7, 6),
('Christian', 'Eckenrode', 8, 2);

insert into roles (title, salary, department_id)
values
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Tam Lead', 250000, 4),
('Lawyer', 190000, 4),
('Lead Engineer', 150000, 2);

insert into department (name)
values
('Sales'),
('Engineering'),
('Finance'),
('Legal');
