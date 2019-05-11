var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });


prompt()


function showListing(){
  connection.query(
  `SELECT 
    item_id AS "ID",
    product_name AS "Product",
    department_name AS "Department",
    price AS "Price",
    stock_quantity AS "In Stock"
  FROM 
    products`,
  function(err, res){
      if (err) throw err;
      console.log("\n");
      console.table(res);
  }
  )
}

function purchase(user){
  connection.query(
    "SELECT * FROM products WHERE item_id = ?",[user.id],
    function(err, res){
      if (err) throw err;
      var total = parseFloat(res[0].price * user.quantity).toFixed(2)
      var name = res[0].product_name
      if (user.quantity > res[0].stock_quantity){
        console.log("Oops! We currently don't have that amount in stock.")
      } else {
        connection.query(
          "UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?",[total, user.id],
        )
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[user.quantity, user.id],
          function(err, res){
            if (err) throw err;

            console.log("Thank you for your purchase of " + user.quantity + " " + name + "(s)." +
            "\nYour total purchase value was $" + total + ".");
            prompt();
          }
        )
      }

    }
  )
}


function prompt(){
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
        purchase(user)
      })
    }

    if (user.startChoice === "Exit") {
      console.log("Thank you for using Bamazon!")
      connection.end()
    }
  })
}