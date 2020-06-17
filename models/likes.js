module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
        movieId:{type:DataTypes.STRING},
 
    })
    Likes.associate = (models) => {
        Likes.belongsTo(models.Movies, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Likes
}