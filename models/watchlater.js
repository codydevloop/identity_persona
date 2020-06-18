module.exports = (sequelize, DataTypes) => {
    const Watchlater = sequelize.define(
        "watchlater", 
        {

        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        movieId: {
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        userEmail: {
            type:DataTypes.STRING
        }

    });

    // Watchlater.associate = (models) => {
    //     Watchlater.belongsTo(models.moviesdbs);
    //   };

    return Watchlater;
};