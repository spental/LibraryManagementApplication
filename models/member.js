// Creating our member model
module.exports = function (sequelize, DataTypes) {
    const Member = sequelize.define("members", {
      // member id can not null
      memID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // first name can not be null
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // last name can not be null
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // email can not be null
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      //phone number can not be null
      phoneno: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },  
    });
    //return the member model
    return Member;
  };
  