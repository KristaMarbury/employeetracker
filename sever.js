// will need mysql and inquirer
//will need a node.js, check greatbay work to figure out things 
//salary is connected to the job title

const mysql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Be sure to update with your own MySQL password!
  password: "Typ3rG1rly",
  database: "employees",
});
// loadprompts (inquirer choices)
// selecting a choice will go to that function
// view all employees
// view employees by department
// view employees by manager
// add employee
// remmove emplyee
// update employee role
// update employee manager
// view roles
// add role
// remove role
// view departments
// add department
// remove department
// quit


const readEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};



// view employees by department
// inqurier ask what department
// select * from employee left join role on employee.role_id = role.id left join deparment on role.department_id = deparment.id where department = ?

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // loadprompts
  // viewAllEmployees();
  // searchByDepartment();
  // searchByManager();
  readEmployees();
});