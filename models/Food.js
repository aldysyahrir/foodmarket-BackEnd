'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    star: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    price: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    popular: DataTypes.INTEGER,
    recommended: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
    underscored: true,
  });
  return Food;
};