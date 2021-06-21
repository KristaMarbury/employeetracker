create database employees;

use employees;

create table employee(
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

create table roles(
    id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id int 
);

create table department(
    id int auto_increment primary key,
    name varchar(30) not null 
);