DROP DATABASE IF EXISTS bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products(
position int not null,
item_id SELECT FLOOR(rand() * 90000 + 10000),
product_name varchar(200) null,
department_name varchar(200) null,
price decimal(12, 2), 
stock_quantity SELECT stock_quantity FROM in_stock LEFT JOIN purchased using (stock_quantity) WHERE purchased.id IS NULL, 
PRIMARY KEY (position)
);

