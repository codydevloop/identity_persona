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
                type:DataTypes.STRING(1024)
            },
            title: {
                type:DataTypes.STRING
            },
            homepage: {
                type:DataTypes.STRING
            },
            email: {
                type:DataTypes.STRING
            }

        });

        Moviesdbs.associate = (models) => {
            Moviesdbs.hasOne(models.likes, {
              foreignKey: {
                name: "email",
                allowNull: true
              }
            });
          };


    return Moviesdbs;
};

