module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    voted_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0 
    }
  },
    {
      // Foreign keys to UserId and CandidateId
      classMethods: {
        associate: function(models) {
          // Foreign key to user_id
          Vote.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
          // Foreign key to candidate_id
          Vote.belongsTo(models.Candidate, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Vote;
};