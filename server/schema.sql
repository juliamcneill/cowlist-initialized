CREATE DATABASE cow_list;

USE cow_list;

CREATE TABLE cows (
  id INT AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  PRIMARY KEY (id)
);