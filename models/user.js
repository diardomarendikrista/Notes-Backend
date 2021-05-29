'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Note, { foreignKey: 'user_id'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot empty'
        },
        isEmail: {
          args: true,
          msg: 'Email format incorrect'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot empty'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        user.role == '' || !user.role ? user.role = 'user' : '';
        user.name == '' || !user.name ? user.name = user.email.split('@')[0] : '';
        user.password = bcrypt.hashPassword(user.password);
      }
    }
  });
  return User;
};