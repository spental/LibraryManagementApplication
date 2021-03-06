
CREATE TABLE books(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    title varchar(100) NOT NULL,
    author varchar(100),NOT NULL,
    description text,
    imageurl varchar(200),
    isbn varchar(100) NOT NULL,
    createAt DATETIME, NOT NULL, 
    updatedAt DATETIME, NULL NULL,
    PRIMARY KEY (id)

);