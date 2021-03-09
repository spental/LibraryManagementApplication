//get the book model from the models folder
const db = require('../models');
//create the new book
let createNewBook = (req, res) => {
    console.log(req);
    db.books.findAll({ where: { isbn: req.body.isbn } })
        .then(function (data) {
            if(!data.length){
            db.books.create({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                imageurl: req.body.imageurl
            })
                .then(function () {
                    res.json("book");
                })
                .catch(function (err) {
                    res.status(401).json(err);
                });
            }
            else
            {
                res.status(401).json(err);
            }
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}
let updateBook = (req, res) => {
    db.books.findAll({ where: { isbn: req.body.isbn } })
    .then(function (data) {
    const bookId=(data[0].dataValues.id);
    db.books.update(req.body,
        {
          where: {
            id: bookId
          }
        })
        .then(function(dbBook) {
          res.json(dbBook);
        });

    })
    .catch(function (err) {
        res.status(401).json(err);
    })
}
//delete the book from the database
let deleteBook=(req, res) => {
    db.books.destroy({ where: { isbn: req.body.isbn } })
        .then(function (data) {
            res.json(data);           
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}
module.exports.createNewBook = createNewBook;  
module.exports.deleteBook = deleteBook;    
module.exports.updateBook = updateBook;    