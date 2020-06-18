module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define(
        "likes", 
        {

        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        action: {
          type:DataTypes.STRING
        },
        movieId: {
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        userEmail: {
            type:DataTypes.STRING
        }

    });

    // Likes.associate = (models) => {
    //     Likes.belongsTo(models.moviesdbs);
    //   };

    return Likes;
};

