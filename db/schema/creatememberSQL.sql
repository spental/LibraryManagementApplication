

--
-- Set default database
--
USE lv1k2o44optaw2li;

--
-- Create table `members`
--
CREATE TABLE members (
  id int NOT NULL AUTO_INCREMENT,
  memID varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  phoneno int NOT NULL,
  firstName varchar(30) NOT NULL,
  lastName varchar(50) NOT NULL,
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL,
  PRIMARY KEY (id)
);
