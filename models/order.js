module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        food_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        amount: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        status: {
            allowNull: false,
            values: ["waiting", "success", "canceled"],
            type: DataTypes.ENUM,
        },
        transaction_code: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:"created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:"updated_at"
        },
    });
    return Order
};