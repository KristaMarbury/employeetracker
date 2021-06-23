const connection = require('./../sql_folder/connection')

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  // Find all employees, join with roless and departments to display their roless, salaries, departments, and managers
  findAllEmployees() {
    return this.connection
      .query(
        "SELECT  * FROM employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id JOIN"
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
      .query("UPDATE employee SET roles_id = ? WHERE id = ?", [
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
  findAllroless() {
    return this.connection
      .promise()
      .query(
        "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;"
      );
  }
  // Create a new roles
  createroles(roles) {
    return this.connection.promise().query("INSERT INTO roles SET ?", roles);
  }
  // Remove a roles from the db
  removeroles(rolesId) {
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
  // Find all departments, join with employees and roless and sum up utilized department budget
  viewDepartmentBudgets() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(roles.salary) AS utilized_budget FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id GROUP BY department.id, department.name;"
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
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department department on roles.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }
  // Find all employees by manager, join with departments and roless to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, roles.title FROM employee LEFT JOIN roles on roles.id = employee.roles_id LEFT JOIN department ON department.id = roles.department_id WHERE manager_id = ?;",
        managerId
      );
  }
}

module.exports = new DB(connection);

