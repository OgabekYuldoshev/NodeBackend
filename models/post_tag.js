'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post_tag.belongsTo(models.post, {foreignKey:'post_id'})
      post_tag.belongsTo(models.tag, {foreignKey:'tag_id'})

    }
  };
  post_tag.init({
    post_id: DataTypes.BIGINT,
    tag_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'post_tag',
  });
  return post_tag;
};