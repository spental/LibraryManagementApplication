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
      author: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
          },  
        imageurl: {
          type: DataTypes.STRING,
          allowNull: false
        },
  
    });
    return Book;
  };
  