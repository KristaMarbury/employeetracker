use employees;
-- new problem... this won't work on dolphins for some reason 
insert into employee (first_name, last_name, role_id, manager_id)
values
('Tim', 'Doe', 'Sales Lead', 'Asheley Rodriguez'),
('Mike', 'Chan', 'Salesperson', 'Time Doe'),
('Ashley', 'Rodriguez', 'Lead Engineer', 'nobody'),
('Malia', 'Brown', 'Accountant', 'nobody'),
('Sarah', 'Lourd', 'Legal Team Lead', 'nobody'),
('Tom', 'Allen', 'Layer', 'Sarah Lourd'),
('Christian', 'Eckenrode', 'Lead Engineer', 'Mike Chan');

insert into roles (title, salary, department_id)
values
('Sales Lead', 100000, 'Sales'),
('Salesperson', 80000, 'Sales'),
('Lead Engineer', 150000, 'Engineering'),
('Software Engineer', 120000, 'Engineering'),
('Accountant', 125000, 'Finance'),
('Legal Tam Lead', 250000, 'Legal'),
('Layer', 190000, 'Legal'),
('Lead Engineer', 150000, 'Engineering');

insert into department (name)
values
('Sales'),
('Engineering'),
('Finance'),
('Legal');
