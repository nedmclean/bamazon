var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//originally made a table, but it wasn't easy to capture user choices within it.  Looked nice!
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",


  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

});

  function start(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
 
        inquirer.prompt([
           {
      name: "productId",
      type: "list",
      message: "What absolutely fire product would you like to buy? [Select an item with arrow keys]",
      choices: function(){
        var choices =[];
          for (var i = 0; i < res.length; i++) {
              choices.push(res[i].id+": " +res[i].product_name+ " $" +res[i].price.toFixed(2) + res[i].stock_quantity)
          }
        return choices
      }
    },
            {
              type: "number",
              message: "Just how many of that special thing would you like? [Enter a quantity, please]",
              name: "amount",
              when: function(userInput){
              return answers.id
            }
            },
        ]).then(function(userInput) {
             


              var inStockAmount;
              var newProdQuant;
              var pricePer;
              var selectedItem = answers.id;
              var amountAsked = answers.number;
              var totalPrice;
              

    connection.query("SELECT * FROM products WHERE ?", [{id: selectedItem}],function(error, res){
          if (error) throw error;
      inStockAmount = parseInt(res[0].stock_quantity);
      newProdQuant = inStockAmount - amountAsked;
      pricePer = parseInt(res[0].price);
      totalPrice = amountAsked * pricePer;
    
      if (inStockAmount >= amountAsked){
        console.log("We got you!");
        connection.query(
                "UPDATE products SET ? WHERE ?", [{id: selectedItem}, {stock_quantity: newProdQuant}],function(error) {
                  if (error) throw error;
        });   
      

      else {
        console.log("We don't have enough of that to fit your gigantic needs!");
      }
          
         
        }; 
      });
    });
});
};
start();

