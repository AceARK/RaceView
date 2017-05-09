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
    // To create an association between Candidates and Votes
    {
      classMethods: {
        associate: function(models) {
          // Candidate has many Votes data
          Candidate.hasMany(models.Vote);
        }
      }
    }
  );
  return Candidate;
};