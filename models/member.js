// Creating our member model
module.exports = function (sequelize, DataTypes) {
    const Member = sequelize.define("members", {
      memID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phoneno: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  
    });
    return Member;
  };
  