'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING
      },
      popular: {
        type: Sequelize.INTEGER
      },
      recommended: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Food');
  }
};