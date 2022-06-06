CREATE TABLE product(
    id int PRIMARY KEY AUTO_INCREMENT,
    p_name varchar(255),
    owner varchar(255),
    img_name varchar(255),
    details varchar(255),
    price int NOT NUll
    ) ENGINE=InnoDB AUTO_INCREMENT=1000;

CREATE TABLE orders(
    order_id int PRIMARY KEY AUTO_INCREMENT,
    product_id int,
    seller_addr varchar(255),
    buyer_addr varchar(255),
    price int
    ) ENGINE=InnoDB AUTO_INCREMENT=1000;

INSERT INTO product(p_name,owner,img_name,details,price) VALUES("aaaa","0x0885FDeB4D8C93303443e65F4eFD277cc193c426","screenshot_20211031_203147-1639807077602.png","bbbbb\bbbbb",1);
