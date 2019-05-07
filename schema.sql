DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
)

