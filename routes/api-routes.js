// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const _=require('lodash');
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login",passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
//Route for getting  data for the books to be used client side
const getBookdata=[];
const getBookName=[];
const getBookAuthor=[];
app.get("/api/books", (req, res) => { 
getBookdata.length=0;
db.books.findAll({})
    .then(function(ans){   
    let data=[];
    ans.forEach(element => {
     console.log(element.dataValues);
     let check={
      id:element.dataValues.id,
      isbn:element.dataValues.isbn,
      book_name:element.dataValues.title,
      author_name:element.dataValues.author,
      image:element.dataValues.imageurl,      
      description:element.dataValues.description
     };
     getBookdata.push(check);
      data.push(check);  
    });
    var hbsObject = {
      book: data
  };
      res.render("book",hbsObject);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
}); 
//get the books based on isbn
let getAllinfo=[];
app.get("/api/booksisbn", (req, res) => {
 var hbsObject = {
   book: getAllinfo
};  
res.render("book",hbsObject);
});
//get the books based on the isbn
app.get("/api/isbn", (req, res) => {
 let check=[];  
 getAllinfo.length=0;
 getBookdata.forEach(element => {
   check.push(element.isbn);
 });
 if(_.includes(check,req.query.isbn))
 {getAllinfo.length=0;
   getBookdata.forEach(element => {
     if(_.includes(element.isbn,req.query.isbn))
     {
     getAllinfo.push(element);
     }
   });
   var hbsObject = {
     book: getAllinfo
 };  
 res.render("book",hbsObject);
 }
 else
  res.json("bad");
});
//search the book based on the book name
app.get("/api/booksInfo", (req, res) => {
  var hbsObject = {
    book: getAllinfo
};  
res.render("book",hbsObject);
});
//search the book based on the book name
app.get("/api/bookName", (req, res) => {
 let check=[];  
 getAllinfo.length=0;
 getBookdata.forEach(element => {
   check.push(element.book_name);
 });
 if(_.includes(check,req.query.name))
 {
   getAllinfo.length=0;
   getBookdata.forEach(element => {
     if(_.includes(element.book_name,req.query.name))
     {
     getAllinfo.push(element);
     }
   });
   console.log(getAllinfo);  
   var hbsObject = {
     book: getAllinfo
 };  
 res.render("book",hbsObject);
 }
 else
  res.json("bad");
});
//search the book with the author name 
app.get("/api/authorInfo", (req, res) => { 
  var hbsObject = {
    book: getAllinfo
};  
res.render("book",hbsObject);
});
//serach the book with author name
app.get("/api/bookAuthor", (req, res) => {
 let check=[];  
 getAllinfo.length=0;
 getBookdata.forEach(element => {
   check.push(element.author_name);
 });
 if(_.includes(check,req.query.name))
 {
   getAllinfo.length=0;
   getBookdata.forEach(element => {
     if(_.includes(element.author_name,req.query.name))
     {
     getAllinfo.push(element);
     }
   });
   console.log(getAllinfo);  
   var hbsObject = {
     book: getAllinfo
 };  
 res.render("book",hbsObject);
 }
 else
  res.json("bad");
    });
};
