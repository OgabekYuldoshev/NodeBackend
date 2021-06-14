'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post_category.init({
    post_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'post_category',
  });
  return post_category;
};