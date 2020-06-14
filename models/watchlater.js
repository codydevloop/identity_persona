module.exports = (sequelize, DataTypes) => {
    var Watchlater = sequelize.define('Watchlater', {

        movieId:{type:DataTypes.STRING},

    })
    return Watchlater
}