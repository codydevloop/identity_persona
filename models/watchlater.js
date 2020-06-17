module.exports = (sequelize, DataTypes) => {
    const Watchlater = sequelize.define('Watchlater', {

        movieId:{type:DataTypes.STRING},

    })
    Watchlater.associate = (models) => {
        Watchlater.belongsTo(models.Movies, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Watchlater
}