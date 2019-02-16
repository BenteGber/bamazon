item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

    DROP DATABASE IF EXISTS fantasy_costco;
   CREATE DATABASE fantasy_costco;

    USE fantasy_costco;

    CREATE TABLE products_demo (
        id INT NOT NULL AUTO_INCREMENT,
        item_name VARCHAR (200),
        price INT,
        description TEXT,
        episode INT,
        stock_quantity INT,
        PRIMARY KEY(id)
    );

    USE fantasy_costco;
LOAD DATA INFILE 'fantasycostco.csv' 
INTO TABLE products 
FIELDS TERMINATED BY ',' 
IGNORE 1 ROW

    USE fantasy_costco;
    INSERT INTO products_demo(item_name,price,description,episode,stock_quantity)
    VALUES('Silly Sword',100,'A sword that makes you laugh', 9,2)
    SELECT * FROM products;
    
    USE fantasy_costco;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30),
    password VARCHAR(16),
    PRIMARY KEY(id)
)

