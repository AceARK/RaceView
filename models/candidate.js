module.exports = function(sequelize, DataTypes) {
  var Candidate = sequelize.define("Candidate", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoSrc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    party: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    // To create an association between Users and Players
    {
      classMethods: {
        associate: function(models) {
          // User has many Player data
          Candidate.hasMany(models.Vote);
        }
      }
    }
  );
  return Candidate;
};