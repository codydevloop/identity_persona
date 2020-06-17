module.exports = (sequelize, DataTypes) => {
    const Dislikes = sequelize.define('Dislikes', {

        movieId:  {type:DataTypes.STRING},

    })
    Dislikes.associate = (models) => {
        Dislikes.belongsTo(models.Movies, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Dislikes
}
