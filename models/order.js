const Sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["waiting", "success", "canceled"],
            allowNull: false,
        },
        transaction_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at",
        },
    });

    const Users = require("./Users")(sequelize, Sequelize);
    const Food = require("./Food")(sequelize, Sequelize);

    Order.belongsTo(Users, {
        foreignKey: "user_id",
        as: "user",
    });

    Order.belongsTo(Food, {
        foreignKey: 'food_id',
        as: "food",
    });

    return Order;
};