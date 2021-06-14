'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.post)
    }
  };
  Users.init({
    fullname: {
      type: DataTypes.STRING(225),
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:true
      }
    },
    email:{
      type: DataTypes.STRING(100),
      allowNull:false,
      validate:{
        isEmail:true,
        notEmpty:true,
        notNull:true
      },
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        min: 6,
        notEmpty:true,
        notNull:true
      },
      allowNull:false
    },
    intro: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};