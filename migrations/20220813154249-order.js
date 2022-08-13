'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      food_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values:["waiting", "success", "canceled"],
      },
      transaction_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

    await queryInterface.addConstraint("orders", {
      type: "foreign key",
      name: "ORDERS_FOOD_ID",
      fields: ["food_id"],
      references: {
        table: "food",
        field: "id",
      }
    })

    await queryInterface.addConstraint("orders", {
      type: "foreign key",
      name: "ORDERS_USER_ID",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
