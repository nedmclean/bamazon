var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("You're Connected!");

  start();

  // run the start function after the connection is made to prompt the user
  // start();
});

function start(){
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  console.log(res);

  // inquirer.prompt({
  //     name: "listItems",
  //     type: "list",
  //     message: "Check out all our dope items for sale!"
  //     choices

  // })
  });
}

