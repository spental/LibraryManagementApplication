// Creating our book model
module.exports = function(sequelize, DataTypes) {
    const Book = sequelize.define("books", {
      // The isbn cannot be null, and must be a proper isbn before creation
      isbn: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // The password cannot be null
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // the author can not be null
      author: {
          type: DataTypes.STRING,
          allowNull: false
        },
        // the book description can not be null
        description: {
            type: DataTypes.STRING,
            allowNull: false
          },  
          // the book image can not be null
        imageurl: {
          type: DataTypes.STRING,
          allowNull: false
        },
    });
    // return the book model
    return Book;
  };
  