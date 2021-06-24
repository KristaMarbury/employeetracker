//salary is connected to the job title

const inquirer = require("inquirer")
const sql_folder = require("./sql_folder")
// const index = require("./sql_folder/index")

// loadprompts (inquirer choices)
const loadMainPrompt = () => {
  inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "What do you want to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ])
  .then(res => {
    let choice = res.choice;
    console.log(choice);
    // Call the appropriate function depending on what the user chose
    if (choice === 'VIEW_EMPLOYEES') {
      viewAllEmployees();
    } else if (choice === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
      viewEmployeesByDepartment();
    } else if (choice === 'VIEW_EMPLOYEES_BY_MANAGER') {
      viewAllEmployeesByManager();
    } else return
  })
}
// view all employees
const viewAllEmployees = () => {
  sql_folder
    .findAllEmployees()
    .then((rows) => {
      console.log("\n");
      console.table(rows);
    })
    .then(() => loadMainPrompt());
};

// view employees by department
const viewEmployeesByDepartment = () => {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByDepartment(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  });
}

const viewAllEmployeesByManager = () => {
  db.findAllEmployeesByManager().then(([rows]) => {
    let roles = rows;
    const rolesChoices = roles.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which manager would you like to see employees for?",
        choices: rolesChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByManager(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  });
};


// selecting a choice will go to that function
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

loadMainPrompt();