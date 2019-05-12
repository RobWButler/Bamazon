# Bamazon
Project app using SQL and Node for a mock storefront and retail management app


### Depedencies
 Node.js, Inquirer, and MySQL packages


### Setting up the databases
 Simply import two spreadsheets into SQL:
  * A products spreadsheet containing an id number, item name, department, price, stock, and revenue
  * A departments spreadsheet containing id number, department name, and overhead costs.

Use
------

### For Customers (bamazonCustomer.js)

The customer's only options are to purchase an item or exit the app. 

![](https://i.imgur.com/Zw3qW2H.png)

The user is shown the table of items in inventory and asked to enter the id number of their purchase, and how much quantity they want. After purchase, they're given the prompt again.

![](https://i.imgur.com/qoVkRMI.png)

### For Managers (bamazonManager.js)

The manager is allowed to view a slightly more detailed inventory readout (including sales revenue for each product):

![](https://i.imgur.com/0udpHNe.png)

View items that have a low inventory (set at 5 units in stock):

![](https://i.imgur.com/z29OOWf.png)

Add new stock of existing items:

![](https://i.imgur.com/fwUbYmb.png)

And list a new item for purchase:

![](https://i.imgur.com/bGsndcq.png)

### For Supervisors (bamazonSupervisor.js)

Supervisors are shown a view of all departments, with overhead costs, combined revenue for all items in that department, and gross profit (revenue minus cost):

![](https://i.imgur.com/rX8aWLl.png)

They are also allowed to set up a brand new department, though managers must populate the products database with relevant items, or there is no sales revenue or profit to display.

![Null is due to lack of products and thus no sales](https://i.imgur.com/wgpg3Fn.png)
