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

  connection.connect(

  )

  connection.connect(function(err) {
    showListing();
  });

  function showListing(){
    connection.query(
    "SELECT * FROM products",
    function(err, res){
        if (err) throw err;
        console.table(res)
    }
    )
    connection.end()
  }