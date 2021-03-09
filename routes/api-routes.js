// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const _ = require('lodash');
const book=require('../controllers/books');
const express=require('express');
let router=express.Router(); 
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
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
  const getBookdata = [];
  app.get("/api/books", (req, res) => { 
    getBookdata.length=0;
    db.books.findAll({})
        .then(function(ans){   
        let data=[];
        let count=0;
        ans.forEach(element => {
          count++;
         let check={
          id:count,
          isbn:element.dataValues.isbn.trim(),
          book_name:element.dataValues.title.trim(),
          author_name:element.dataValues.author.trim(),
          image:element.dataValues.imageurl.trim(),      
          description:element.dataValues.description.trim()
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
  let getAllinfo = [];
  app.get("/api/booksisbn", (req, res) => {
    //create an object for books based on the searched isbn
    var hbsObject = {
      book: getAllinfo
    };
    //call the book handlebar
    res.render("book", hbsObject);
  });
  //get the books based on the isbn
  app.get("/api/isbn", (req, res) => {
    let check = [];
    getAllinfo.length = 0;
    getBookdata.forEach(element => {
      check.push(element.isbn);
    });
    // in the array check if the serached isbn is present or not 
    if (_.includes(check, req.query.isbn)) {
      getAllinfo.length = 0;
      getBookdata.forEach(element => {
        if (_.includes(element.isbn, req.query.isbn)) {
          getAllinfo.push(element);
        }
      });
      // if the isbn is present in the book table then create the object and render the book hendlebars
      var hbsObject = {
        book: getAllinfo
      };
      res.render("book", hbsObject);
    }
  });
  //search the book based on the book name
  app.get("/api/booksInfo", (req, res) => {
    //create an object if the book is present in the book table
    var hbsObject = {
      book: getAllinfo
    };
    //render the book handlebar
    res.render("book", hbsObject);
  });
  //search the book based on the book name
  app.get("/api/bookName", (req, res) => {
    let check = [];
    getAllinfo.length = 0;
    //check if the book is present in the array
    //if its present then render the book handelbar
    getBookdata.forEach(element => {
      check.push(element.book_name);
    });
    if (_.includes(check, req.query.name)) {
      getAllinfo.length = 0;
      getBookdata.forEach(element => {
        if (_.includes(element.book_name, req.query.name)) {
          getAllinfo.push(element);
        }
      });
      var hbsObject = {
        book: getAllinfo
      };
      res.render("book", hbsObject);
    }
  });
  //search the book with the author name 
  app.get("/api/authorInfo", (req, res) => {
    //create an object if the author is present in the book table
    //render the book handlebar
    var hbsObject = {
      book: getAllinfo
    };
    res.render("book", hbsObject);
  });
  //serach the book with author name
  app.get("/api/bookAuthor", (req, res) => {
    let check = [];
    getAllinfo.length = 0;
    //check if the author is present in the book table 
    // if the author is present then render the book handlebar and return the author row
    getBookdata.forEach(element => {
      check.push(element.author_name);
    });
    if (_.includes(check, req.query.name)) {
      getAllinfo.length = 0;
      getBookdata.forEach(element => {
        if (_.includes(element.author_name, req.query.name)) {
          getAllinfo.push(element);
        }
      });
      var hbsObject = {
        book: getAllinfo
      };
      res.render("book", hbsObject);
    }
  });
 //create the new book record
router.post('/api/newBook',book.createNewBook);
//delete the book record
router.post('/api/deleteBook',book.deleteBook);
//update the book
router.post('/api/updateBook',book.updateBook); 
return app.use('/',router);
};
