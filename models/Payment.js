'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    status: DataTypes.STRING,
    raw_response: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    payment_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
    underscored: true,
  });
  return Payment;
};