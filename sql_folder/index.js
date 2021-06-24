const connection = require('./connection')

class Sql_Folder {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  // Find all employees, join with roless and departments to display their roless, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, roles.id, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }
  // Create a new employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }
  // Update the given employee's roles
  updateEmployeeroles(employeeId, rolesId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        rolesId,
        employeeId,
      ]);
  }
  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }
  // Find all roless, join with departments to display the department name
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;"
      );
  }
  // Create a new roles
  createRole(roles) {
    return this.connection.promise().query("INSERT INTO roles SET ?", roles);
  }
  // Remove a roles from the db
  removeRole(rolesId) {
    return this.connection
      .promise()
      .query("DELETE FROM roles WHERE id = ?", rolesId);
  }
  // Find all departments
  findAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }
  // Find all departments, join with employees and roles and sum up utilized department budget
  viewDepartmentBudgets() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(roles.salary) AS utilized_budget FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id GROUP BY department.id, department.name;"
      );
  }
  // Create a new department
  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  // Remove a department
  removeDepartment(departmentId) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", departmentId);
  }
  // Find all employees in a given department, join with roless to display roles titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department department on roles.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }
  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, roles.title FROM employee LEFT JOIN roles on roles.id = employee.role_id LEFT JOIN department ON department.id = roles.department_id WHERE manager_id = ?;",
        managerId
      );
  }
}

module.exports = new Sql_Folder(connection);

