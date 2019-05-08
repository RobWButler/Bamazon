var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Ay02^R3bWGEeQwx5",
    database: "bamazon"
  });

connection.connect(
    prompt()
)

function prompt(){
    
    inquirer.prompt([
        {
          type: "list",
          name: "startChoice",
          message: "\nWelcome to Bamazon Manger. Select your command.",
          choices: ["Show Items For Sale", "View Low Inventory", "Add to Inventory", "List New Item", "Exit"]
        }
      ]).then(function(user) {
          if (user.startChoice === "Show Items For Sale"){
              showListing();
          };
  
          if (user.startChoice === "View Low Inventory"){
              lowInv();
          };
  
          if (user.startChoice === "Add to Inventory"){
              addInv();
          };

          if (user.startChoice === "List New Item"){
              newInv();
          };

          if (user.startChoice === "Exit"){
              console.log("\nExiting Bamazon Manager...");
              connection.end();
          };
  
      })
}

function showListing(){
    connection.query(
        "SELECT * FROM products",
        function(err, res){
            if (err) throw err;
            console.log("\n");
            console.table(res);
        }
    )
    prompt();
}

function lowInv(){
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
        function(err, res){
            if (err) throw err;
            if (!res.length){
                console.log("No low inventory.");
                prompt();
            } else {
                console.log("\n");
                console.table(res);
                prompt();
            }
        }
    )
}

function addInv(){
    connection.query(
        "SELECT * FROM products",
        function(err, res){
            if (err) {throw err}
            console.log("\n");
            console.table(res);
        }
    )
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Please input the id of the product you would like to add more of.",
      },
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to add?"
      }
    ]).then(function(user) {
        if (user.quantity < 0){
            console.log("You can't add negative stock!")
            prompt();
        } else {
        connection.query(
            "SELECT * FROM products WHERE item_id = ?",[user.id],
            function(err, res){
                if (err) {throw err}
                var name = res[0].product_name;
                connection.query(
                    "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",[user.quantity, user.id],
                  function(err, res){
                    if (err) throw err;
        
                    console.log("You have added " + user.quantity + " units of " + name + " to stock.");
                    prompt();
                  }
                )
            }
        )}
    })
}

function newInv(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Product name?"
        },
        {
            type: "input",
            name: "dept",
            message: "Product department?"
        },
        {
            type: "input",
            name: "price",
            message: "Individual price?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How much stock?"
        },
    ]).then(function(user) {
        connection.query(
            "INSERT INTO products SET?",
            {
                product_name: user.name,
                department_name: user.dept,
                price: user.price,
                stock_quantity: user.quantity
            },
        function(err, res){
            if (err) {throw err}
            console.log("You have added " + user.name + " into stock.")
            prompt();
        }
        )
    })
}