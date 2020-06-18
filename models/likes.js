module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define(
        "likes", 
        {
            movieId: {
                type:DataTypes.INTEGER,
                primaryKey: true
            },
            userEmail: {
                type:DataTypes.STRING
            }

    });

    Likes.associate = (models) => {
        Likes.belongsTo(models.moviesdbs, {
          // foreignKey: {
          //   name: "movieId",
          //   allowNull: true
          // }
        });
      };

    return Likes;
};

