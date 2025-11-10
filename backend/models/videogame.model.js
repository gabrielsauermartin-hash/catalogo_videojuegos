module.exports = (sequelize, Sequelize) => {
    const Videogame = sequelize.define("videogame", {
        title: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        developer: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        description: {
            type: Sequelize.STRING
        },
        requirements: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        },
        //For link this table to User
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Videogame;
};