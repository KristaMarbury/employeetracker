// will need mysql and inquirer
//will need a node.js, check greatbay work to figure out things 
//salary is connected to the job title

const mysql = require("mysql");
const inquirer = require("inquirer")


const viewAllEmployees = () => {
  connection.query(" * from employee", (err, res) => {
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            res.forEach(({ item_name }) => {
              choiceArray.push(item_name);
            });
            return choiceArray;
          },
          message: "For whom do you look?",
        },
      ])
      .then((answer) => {
        connection.query(
          "UPDATE auctions SET ? WHERE ?",
          [
            {
              highest_bid: answer.bid,
            },
            {
              item_name: answer.choice,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log("bid placed");
          }
        );
      });
  });
};
const createAuction = () => {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?",
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?",
      },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid,
          highest_bid: answer.startingBid,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} auction inserted!\n`);
        }
      );
      bidAuction();
    });
};
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
  viewAllEmployees();
  // searchByDepartment();
  // searchByManager();
  readEmployees();
});