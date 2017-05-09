module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING
    },
    salt: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      isIn: [['admin', 'user']]
    }
  },
    // To create an association between Users and Votes
    {
      classMethods: {
        associate: function(models) {
          // User has only one vote data
          User.hasOne(models.Vote);
        }
      }
    }
  );
  return User;
};

