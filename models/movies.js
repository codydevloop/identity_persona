module.exports = (sequelize, DataTypes) => {
var Movies = sequelize.define('Movies', {
    title:{type:DataTypes.STRING},
    description: {type:DataTypes.TEXT},
    movieId: {type:DataTypes.STRING},
    
  })
return Movies
}