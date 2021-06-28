const inquirer = require("inquirer");
const { updateEmployeeManager } = require("./sql_folder");
const sql_folder = require("./sql_folder");
// const index = require("./sql_folder/index")

// loadprompts (inquirer choices)
const loadMainPrompt = () => {
  inquirer
    .prompt([
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
    .then((res) => {
      let choice = res.choice;
      console.log(choice);
      // Call the appropriate function depending on what the user chose
      if (choice === "VIEW_EMPLOYEES") {
        viewAllEmployees();
      } else if (choice === "VIEW_EMPLOYEES_BY_DEPARTMENT") {
        viewEmployeesByDepartment();
      } else if (choice === "VIEW_EMPLOYEES_BY_MANAGER") {
        viewAllEmployeesByManager();
      } else if (choice === "ADD_ROLE") {
        addRole();
      } else if (choice == "VIEW_ROLES") {
        viewAllRoles();
      } else if (choice === "ADD_DEPARTMENT") {
        addDepartment();
      } else if (choice === "ADD_EMPLOYEE") {
        addEmployee();
      } else if (choice === "REMOVE_DEPARTMENT") {
        removeDepartment();
      } else if (choice === "UPDATE_EMPLOYEE_ROLE") {
        updateEmployeeRole();
      } else if (choice === "VIEW_DEPARTMENTS") {
        viewAllDepartments();
      } else if (choice === "UPDATE_EMPLOYEE_ROLE") {
        updateEmployeeRole();
      } else return;
    });
};
// view all employees
const viewAllEmployees = () => {
  sql_folder
    .findAllEmployees()
    .then(([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .then(() => loadMainPrompt());
};

// view departments
const viewAllDepartments = () => {
  sql_folder
    .findAllDepartments()
    .then(([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .then(() => loadMainPrompt());
};

// view employees by department
const viewEmployeesByDepartment = () => {
  sql_folder.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to see employees for?",
          choices: departmentChoices,
        },
      ])
      .then((res) => sql_folder.findAllEmployeesByDepartment(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompt());
  });
};

// view employees by manager
const viewAllEmployeesByManager = () => {
  sql_folder.findAllEmployeesByManager().then(([rows]) => {
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
      .then((res) => sql_folder.findAllEmployeesByManager(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompt());
  });
};

// view roles
const viewAllRoles = () => {
  sql_folder
    .findAllRoles()
    .then(([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .then(() => loadMainPrompt());
};

// add role
const addRole = () => {
  sql_folder.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((role) => {
        sql_folder
          .createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => loadMainPrompt());
      });
  });
};

// add department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((res) => {
      let name = res;
      sql_folder
        .createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => loadMainPrompt());
    });
};

// add employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ])
    .then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      sql_folder.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices,
          })
          .then((res) => {
            let roleId = res.roleId;
            sql_folder.findAllEmployees().then(([rows]) => {
              let employees = rows;
              const managerChoices = employees.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );
              managerChoices.unshift({ name: "None", value: null });
              inquirer
                .prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is the employee's manager?",
                  choices: managerChoices,
                })
                .then((res) => {
                  let employee = {
                    manager_id: res.managerId,
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName,
                  };
                  sql_folder.createEmployee(employee);
                })
                .then(() =>
                  console.log(`Added ${firstName} ${lastName} to the database`)
                )
                .then(() => loadMainPrompt());
            });
          });
      });
    });
};

// remove department
const removeDepartment = () => {
  sql_folder.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
        choices: departmentChoices,
      })
      .then((res) => sql_folder.removeDepartment(res.departmentId))
      .then(() => console.log(`Removed department from the database`))
      .then(() => loadMainPrompt());
  });
};

// update employee role
const updateEmployeeRoles = () => {
  sql_folder.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
  inquirer
    .prompt([
    {
      name: "name",
      message: "Which employee's info do you want to update?",
    },
    ])
    .then((res) => {
      let name = res;
      sql_folder
        .updateEmployeeRoles(name)
        .then(() => console.log(`Changed ${name.name} in the database`))
        .then(() => loadMainPrompt());
    });
    
};


// remmove emplyee

// update employee manager
// remove role
// quit

loadMainPrompt();

