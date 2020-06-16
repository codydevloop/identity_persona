module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define(
        "likes", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            movieId: {
                type:DataTypes.INTEGER
            },
            userEmail: {
                type:DataTypes.STRING
            }

    });

    return Likes;
};

