var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(

    inquirer.prompt([
      {
        type: "list",
        name: "startChoice",
        message: "Welcome to Bamazon! What would you like to do today?",
        choices: ["Purchase", "Exit"]
      }
    ]).then(function(user) {
      if (user.startChoice === "Purchase") {
        showListing()
        inquirer.prompt([
          {
            type: "input",
            name: "id",
            message: "Please input the id of the product you would like to purchase.",
          },
          {
            type: "input",
            name: "quantity",
            message: "How many units would you like the purchase?"
          }
        ]).then(function(user) {
            connection.query(
              "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[user.quantity, user.id],
              function(err, res){
                console.log("Thank you for your purchase of " + user.quantity + " units.")
              }
            )
        })
      }

      if (user.startChoice === "Exit") {
        console.log("Thank you for using Bamazon!")
        connection.end()
      }
    }))

function showListing(){
  connection.query(
  "SELECT * FROM products",
  function(err, res){
      if (err) throw err;
      console.table(res)
  }
  )
}