USE lv1k2o44optaw2li;

INSERT INTO members
(
  id
 ,memID
 ,email
 ,phoneno
 ,firstName
 ,lastName
 ,createdAt
 ,updatedAt
)
VALUES
(
  0 -- id - INT NOT NULL
 ,'jennalifson' -- memID - VARCHAR(50) NOT NULL
 ,'jennalifson@gmail.com' -- email - VARCHAR(50) NOT NULL
 ,4438005595 -- phoneno - BIGINY NOT NULL
 ,'Jenna' -- firstName - VARCHAR(30) NOT NULL
 ,'Lifson' -- lastName - VARCHAR(50) NOT NULL
 ,NOW() -- createdAt - TIMESTAMP NOT NULL
 ,NOW() -- updatedAt - TIMESTAMP NOT NULL
);