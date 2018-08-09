DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE  products (
  Item_id INT NOT NULL AUTO_INCREMENT,
  Product_name VARCHAR(100) NOT NULL,
  Department_name VARCHAR(45) NOT NULL,
  Price DECIMAL(4,2) default 0,
  Stock_Quantity INT default 0,
  PRIMARY KEY (Item_id)
);

INSERT INTO products (Product_name, Department_name, Price, Stock_Quantity)
VALUES ("soap", "shower", 20.00, 100), 
("shampoo", "shower", 40.00, 100),
("shower curtain", "household", 20.00, 50)