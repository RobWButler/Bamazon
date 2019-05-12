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
        prompt();
      }

      if (user.startChoice === "Add New Department"){
        addDept();
      }

      if (user.startChoice === "Exit"){
        console.log("Exiting Bamazon SuperVse...");
        connection.end();
      }
    })
  }

  function viewDep(){

    connection.query(
      `SELECT 
        department_id AS "ID", departments.department_name, departments.over_head_costs AS "Overhead Costs", 
        SUM(products.product_sales) AS "Product Sales", (SUM(products.product_sales) - departments.over_head_costs) AS "Profit"
      FROM 
        departments 
      LEFT JOIN 
        products 
      ON 
        (departments.department_name = products.department_name) 
      GROUP BY 
        department_name
      ORDER BY
        department_id ASC`,
      function(err, res){
        if (err) {throw err}

        console.log("\n");
        console.table(res);
        console.log("\n\n");
      }
    )
    
  }

function addDept(){

  viewDep();

  inquirer.prompt([
    {
      type: "input",
      name: "dept",
      message: "Department name:",
    },
    {
      type: "input",
      name: "costs",
      message: "Overhead costs:"
    }
  ]).then(function(user) {
      if (user.costs < 0){
          console.log("Invalid (negative) value.")
          prompt();
      } else {

        connection.query(
          "INSERT INTO departments SET?",
          {
              department_name: user.dept,
              over_head_costs: user.costs
          },
      function(err, res){
          if (err) {throw err}
          console.log("You have successfully created a " + user.dept + " department.")
          prompt();
      }
      )
     
      }
  })

}