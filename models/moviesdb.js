module.exports = (sequelize, DataTypes) => {
    const Moviesdbs = sequelize.define(
        "moviesdbs", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }, 
            movieId: {
                type:DataTypes.INTEGER
            },
            poster: {
                type:DataTypes.STRING
            },
            overview: {
                type:DataTypes.STRING
            },
            title: {
                type:DataTypes.STRING
            },
            homepage: {
                type:DataTypes.STRING
            }
        });

    return Moviesdbs;
};

