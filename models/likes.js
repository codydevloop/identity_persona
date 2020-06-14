module.exports = (sequelize, DataTypes) => {
    var Likes = sequelize.define('Likes', {
        movieId:{type:DataTypes.STRING},
 
    })
    return Likes
}