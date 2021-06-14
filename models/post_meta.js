'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post_meta.belongsTo(models.post, {foreignKey:'post_id'})
    }
  };
  post_meta.init({
    post_id: DataTypes.BIGINT,
    key: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'post_meta',
  });
  return post_meta;
};