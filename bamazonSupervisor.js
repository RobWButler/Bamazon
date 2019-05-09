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

  function prompt(){
    inquirer.prompt([
      {
        type: "list",
        name: "startChoice",
        message: "Opening Bamazon SuperVse. Select command.",
        choices: ["View Product Sales By Department", "Add New Department", "Exit"]
      }
    ]).then(function(user){
      if (user.startChoice === "View Product Sales By Department"){
        viewDep();
      }

      if (user.startChoice === "Exit"){
        console.log("Exiting Bamazon SuperVse...");
        connection.end();
      }
    })
  }

  function viewDep(){
    var totalSales = [];

    connection.query(
      "SELECT department_name, product_sales from products",
      function(err, res){
        if (err) {throw err}
        for (i = 0; i < res.length; i++){
          sales = res[i].product_sales
          totalSales.push(sales)
        }
        
        //console.table(totalSales)
      }
    )
    connection.query(
      `SELECT 
        department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) 
      FROM 
        departments 
      LEFT JOIN 
        products 
      ON 
        (departments.department_name = products.department_name) 
      GROUP BY 
        department_name`,
      function(err, res){
        if (err) {throw err}

        var dbData = res
        var profitCol = []
        for (i = 0; i < res.length; i++){
          var profit = totalSales[i] - res[i].over_head_costs
          profitCol.push(profit)
        }
        console.log("\n");
        console.table(profitCol)
        console.table(dbData);
        console.log("\n\n");
      }
    )
    prompt();
  }
