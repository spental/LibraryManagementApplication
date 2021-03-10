// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const _=require('lodash');
const book=require('../controllers/books');
const member=require('../controllers/members');
const express=require('express');
let router=express.Router(); 
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
   var hbsObject = {
     book: getAllinfo
 };  
 res.render("book",hbsObject);
 }
 else
  res.json("bad");
    });
//navigate to the member page
let getMemberdata =[];   
    app.get("/api/member", (req, res) => {       
      getMemberdata.length=0;
    db.members.findAll({})
        .then(function(ans){   
        let data=[];
        let count=0;
        ans.forEach(element => {
          count++;
         let check={
          id:count,
          memID:element.dataValues.memID.trim(),
          firstName:element.dataValues.firstName.trim(),
          lastName:element.dataValues.lastName.trim(),
          email:element.dataValues.email.trim(),      
          phoneno:element.dataValues.phoneno
         };
         getMemberdata.push(check);
          data.push(check);     
        });
        var hbsObject = {
          member: data
      };
          res.render("member",hbsObject);
        })
        .catch(function(err) {
          res.status(401).json(err);
        });     
      });
//get the member based on memID
//get the books based on isbn
let getAllMemeberInfo=[];
app.get("/api/membermemID", (req, res) => {
 var hbsObject = {
   member: getAllMemeberInfo
};  
res.render("member",hbsObject);
});
//get the books based on the isbn
app.get("/api/memID", (req, res) => {
 let check=[];  
 getAllMemeberInfo.length=0;
 getMemberdata.forEach(element => {
   check.push(element.memID);
 });
 if(_.includes(check,req.query.memID))
 {
   getAllMemeberInfo.length=0;
  getMemberdata.forEach(element => {
     if(_.includes(element.memID,req.query.memID))
     {
      getAllMemeberInfo.push(element);
     }
   });
   var hbsObject = {
     member: getAllMemeberInfo
 };  
 res.render("member",hbsObject);
 }
 else
  res.json("bad");
});
//member search based on first name
//search the book based on the book name
app.get("/api/fNameInfo", (req, res) => {
  var hbsObject = {
    member: getAllMemeberInfo
};  
res.render("member",hbsObject);
});
//search the book based on the book name
app.get("/api/fName", (req, res) => {
 let check=[];  
 getAllMemeberInfo.length=0;
 getMemberdata.forEach(element => {
   check.push(element.firstName);
 });
 
 
 if(_.includes(check,req.query.fName))
 {
  getAllMemeberInfo.length=0;
  getMemberdata.forEach(element => {
     if(_.includes(element.firstName,req.query.fName))
     {      
      getAllMemeberInfo.push(element);
     }
   });
   var hbsObject = {
     book: getAllMemeberInfo
 };  
 res.render("member",hbsObject);
 }
 else
  res.json("bad");
});
//member search based on last name
app.get("/api/lNameInfo", (req, res) => {
  var hbsObject = {
    member: getAllMemeberInfo
};  
res.render("member",hbsObject);
});
//search the member based on the last name
app.get("/api/lName", (req, res) => {
  let check=[];  
  getAllMemeberInfo.length=0;
  getMemberdata.forEach(element => {
    check.push(element.lastName);
  });
  
  if(_.includes(check,req.query.lName))
  {
   getAllMemeberInfo.length=0;
   getMemberdata.forEach(element => {
      if(_.includes(element.lastName,req.query.lName))
      { 
       getAllMemeberInfo.push(element);
      }
    });
    var hbsObject = {
      book: getAllMemeberInfo
  };  
  res.render("member",hbsObject);
  }
  else
   res.json("bad");
 });
//create the new book record
router.post('/api/newBook',book.createNewBook);
//delete the book record
router.post('/api/deleteBook',book.deleteBook);
//add the new member
router.post('/api/newMember',member.createNewMember);
//delete the member record
router.post('/api/deleteMember',member.deleteMember);
//update the book
router.post('/api/updateBook',book.updateBook);
//update the member
router.post('/api/updateMember',member.updateMember);
return app.use('/',router);
};
