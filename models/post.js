'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.Users, {
        foreignKey: 'author_id'
      })
      post.hasMany(models.post_tag)
      post.hasMany(models.post_meta)

    }
  };
  post.init({
    author_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    parent_id: {
      type:DataTypes.INTEGER,
      defaultValue: null
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    metaTitle: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      allowNull:false
    },
    summary: DataTypes.TEXT,
    published: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    publishedAt: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    content: {
      type:DataTypes.TEXT,
      defaultValue:null
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};