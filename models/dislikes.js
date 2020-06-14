module.exports = (sequelize, DataTypes) => {
    var Dislikes = sequelize.define('Dislikes', {

        movieId:  {type:DataTypes.STRING},

    })
    return Dislikes
}