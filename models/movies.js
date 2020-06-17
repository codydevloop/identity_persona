module.exports = (sequelize, DataTypes) => {
const Movies = sequelize.define('Movies', {
    title:{type:DataTypes.STRING},
    description: {type:DataTypes.TEXT},
    movieId: {type:DataTypes.STRING},
    
  })
  Movies.associate = (models) => {
    Movies.hasOne(models.Likes, {
      foreignKey: {
        allowNull: false
      }
    });
    Movies.hasOne(models.Dislikes, {
      foreignKey: {
        allowNull: false
      }
    });
    Movies.hasOne(models.Watchlater, {
      foreignKey: {
        allowNull: false
      }
    });
  };
return Movies
}