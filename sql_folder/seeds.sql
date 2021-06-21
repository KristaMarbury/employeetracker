use employees;

insert into employee (first_name, last_name, role_id, manager_id)
values
('michael', 'scott', 1, null),
('dwight', 'shrute', 2, 1),
('jim', 'halpert', 2, 1),
('creed', 'smith', 2, 1),
('robert', 'california', 2, 1);