const util = require("util");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Typ3rG1rly",
  database: "employees",
});

connection.connect((err) => {
    console.log("connected")
});
connection.query = util.promisify(connection.query);
module.exports = connection;
